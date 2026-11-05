# API Contract — AI Research Workbench

Defines the JSON shape the frontend and backend agree on. Both sides enforce it independently: TypeScript types check frontend code at compile time; Pydantic models validate every request at runtime.

## `POST /chat`

Send the current conversation, receive an answer and its supporting sources.

### Request

```json
{
  "messages": [
    { "role": "user", "content": "What is RAG?" },
    { "role": "assistant", "content": "RAG stands for Retrieval-Augmented Generation." },
    { "role": "user", "content": "How does it reduce hallucinations?" }
  ]
}
```

| Field | Type | Notes |
|---|---|---|
| `messages` | array, required | Full conversation — the backend is stateless; the frontend owns history |
| `messages[].role` | `"user"` \| `"assistant"` | `Literal` in Pydantic; union type in TS |
| `messages[].content` | string | The message text |

The frontend `Message.id` is **not** sent — ids are a client-side rendering detail, not part of the contract.

### Response

```json
{
  "answer": "RAG reduces hallucinations by grounding generation in retrieved documents...",
  "sources": [
    {
      "title": "Retrieval-Augmented Generation",
      "excerpt": "Retrieval combines parametric and non-parametric memory...",
      "url": "https://example.com/paper"
    }
  ]
}
```

| Field | Type | Notes |
|---|---|---|
| `answer` | string, required | The generated response text (streams as plain text later — see streaming notes) |
| `sources` | array, default `[]` | May be empty; populated once retrieval lands (Day 23–24) |
| `sources[].url` | string, optional | `str \| None` — a source may not have a link |

### Errors

Invalid payloads are rejected by Pydantic before the handler runs — HTTP **422 Unprocessable Entity** with a detail array locating each bad field (e.g. `messages.0.role` — "Input should be 'user' or 'assistant'").

## Schema locations

- Backend (runtime enforcement): `backend/schemas.py` — `ChatRequest`, `ChatResponse`, `ChatMessage`, `SourceOut`
- Frontend (compile-time): `frontend/types/api.ts` — `ChatRequest`, `ChatResponse`, `ChatRequestMessage`, `ApiSource`

These are intentionally separate files from `frontend/types/chat.ts` — app state and wire data are different contracts and will diverge (streaming, source ids, metadata).

## Streaming note

Day 18 replaces the plain `answer` body with a streamed text response (`StreamingResponse`). The request shape does not change.
