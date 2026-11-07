import json
import os
import boto3

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from schemas import StreamChatRequest

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
    body = {
        "messages": to_anthropic_messages(request.messages),
        "max_tokens": 1024,
        "anthropic_version": "bedrock-2023-05-31",
    }
    response = bedrock_runtime.invoke_model_with_response_stream(
        modelId=BEDROCK_MODEL_ID,
        body=json.dumps(body),
    )

    async def tokens():
        for event in response["body"]:
            chunk = json.loads(event["chunk"]["bytes"])
            if chunk.get("type") == "content_block_delta":
                yield chunk["delta"].get("text", "")

    return StreamingResponse(tokens(), media_type="text/plain")