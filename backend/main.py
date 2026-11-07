import asyncio
import json
import os
import boto3

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from schemas import StreamChatRequest, SourceOut
from retrieval import latest_sources, sources_as_context, tavily_search

load_dotenv()

app = FastAPI(title="AI Research Workbench API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

bedrock_runtime = boto3.client(
    service_name="bedrock-runtime",
    region_name=os.getenv("AWS_REGION", "us-east-1"),
)
BEDROCK_MODEL_ID = os.getenv("BEDROCK_MODEL_ID", "us.anthropic.claude-sonnet-4-6")

def to_anthropic_messages(messages: list) -> list:
    result = []
    for m in messages:
        text = "".join(p.text for p in m.parts if p.type == "text" and p.text)
        if text:
            result.append({"role": m.role, "content": [{"type": "text", "text": text}]})
    return result

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}

@app.post("/chat/stream")
async def chat_stream(request: StreamChatRequest) -> StreamingResponse:
    anthropic_messages = to_anthropic_messages(request.messages)
    question = anthropic_messages[-1]["content"][0]["text"]

    sources = await asyncio.to_thread(tavily_search, question)
    latest_sources[:] = sources

    body = {
        "messages": anthropic_messages,
        "max_tokens": 1024,
        "anthropic_version": "bedrock-2023-05-31",
        "system": (
            "Answer using the numbered web sources below where relevant, "
            "and cite them inline as [n].\n\n" + sources_as_context(sources)
        ),
    }
    try:
        response = await asyncio.to_thread(
            bedrock_runtime.invoke_model_with_response_stream,
            modelId=BEDROCK_MODEL_ID,
            body=json.dumps(body),
        )
    except Exception:
        raise HTTPException(status_code=502, detail="Model request failed")

    async def tokens():
        loop = asyncio.get_running_loop()
        queue: asyncio.Queue = asyncio.Queue()

        def worker():
            try:
                for event in response["body"]:
                    loop.call_soon_threadsafe(queue.put_nowait, event)
            finally:
                loop.call_soon_threadsafe(queue.put_nowait, None)

        loop.run_in_executor(None, worker)

        while True:
            event = await queue.get()
            if event is None:
                break
            chunk = json.loads(event["chunk"]["bytes"])
            if chunk.get("type") == "content_block_delta":
                yield chunk["delta"].get("text", "")

    return StreamingResponse(tokens(), media_type="text/plain")

@app.get("/sources")
def get_sources() -> list[SourceOut]:
    return latest_sources