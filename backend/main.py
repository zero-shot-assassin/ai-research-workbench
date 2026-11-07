import asyncio

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from schemas import (
    ChatRequest, ChatResponse, StreamChatRequest
)

app = FastAPI(title="AI Research Workbench API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

MOCK_ANSWER = (
    "RAG combines retrieval and generation: relevant documents are fetched "
    "from a knowledge base and the model grounds its answer in them."
)

async def answer_words():
    for word in MOCK_ANSWER.split(" "):
        yield word + " "
        await asyncio.sleep(0.15)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    last_question = request.messages[-1].content
    return ChatResponse(
        answer=f"Mock answer for: {last_question}",
        sources=[]
    )

@app.post("/chat/stream")
async def chat_stream(request: StreamChatRequest) -> StreamingResponse:
    return StreamingResponse(answer_words(), media_type="text/plain")