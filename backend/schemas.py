from typing import Literal
from pydantic import BaseModel

class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class ChatRequest(BaseModel):
    messages: list[ChatMessage]

class SourceOut(BaseModel):
    title: str
    excerpt: str
    url: str | None = None

class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceOut] = []

class MessagePart(BaseModel):
    type: str
    text: str | None = None

class UIChatMessage(BaseModel):
    id: str
    role: Literal["user", "assistant"]
    parts: list[MessagePart]

class StreamChatRequest(BaseModel):
    messages: list[UIChatMessage]