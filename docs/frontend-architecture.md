# Frontend architecture

A snapshot of how the interface is organized — written at the end of Week 2, before backend integration.

## Rendering split

**Server Components** (render-only — no state, no event handlers, ship no component JS):

- `app/layout.tsx` — html/body, Geist fonts, metadata
- `app/page.tsx` — the shell: `Header`, conversation column, sources `aside`
- `components/Header.tsx`, `components/SourceCard.tsx`, `components/Eyebrow.tsx`

**Client Components** (interactive — state, handlers, browser APIs):

- `components/Conversation.tsx` (`'use client'`) — owns `messages`, `isLoading`, `error`
- `components/QuestionInput.tsx` (`'use client'`) — owns the draft string
- `components/ui/button.tsx` (`'use client'` — added by us; Base UI uses hooks internally)
- `components/ui/textarea.tsx`, `components/ui/card.tsx` — render-only, work on both sides of the boundary

The boundary: `page.tsx` (server) hands serializable `initialMessages` into `Conversation` (client). Everything `Conversation` imports joins the client graph.

## Data flow

- **Down as props:** `initialMessages` → `Conversation`; `onSubmit` + `isLoading` → `QuestionInput`; `source` + `index` → `SourceCard`; `title` + `sourceCount` → `Header`; `message` → `MessageBubble`
- **Up as events:** `QuestionInput` → `onSubmit(text)` → `Conversation` appends a user `Message`; error banner → `handleRetry` → replays the mock
- **Derived (never state):** `threadTitle` (first user message, via `find` + `?.` + `??`), `trimmedQuestion` (`question.trim()`), Ask-disabled condition (`isLoading || empty`)

## Layout mechanics

- `h-screen` bounds the shell; each flex level uses `min-h-0` + `flex-1` so the messages region scrolls internally while header/input stay pinned
- Sources: `aside` (`hidden md:flex`) covers ≥768px; a native `<details>` disclosure inside `main` covers mobile — browser-owned toggle, no state
- shadcn `Card` composition: `CardHeader` grid places `CardAction` (index number) top-right; `justify-self-start` keeps the `kind` badge hugging content

## File organization

```
app/            routes — layout (html/body/fonts/metadata), page (server shell), globals.css (theme vars)
components/     app components — Conversation, QuestionInput, MessageBubble, SourceCard, Header, Eyebrow
components/ui/  shadcn-owned primitives — Button, Textarea, Card (copied source, editable)
types/          Message, Source contracts
data/           mock fixtures — the seam Week 3 replaces
lib/            utils (cn re-export)
```

## Mock seams — what Week 3 replaces

| Today | Becomes |
|---|---|
| `data/mock-chat.ts` fixtures | Real API responses |
| `setTimeout` in `handleQuestionSubmit` | `fetch` / streaming |
| "error" keyword trigger | Real API error handling |
| `isLoading` / `error` state | `useChat` status (Vercel AI SDK) |
| Static sources `aside` | Sources tied to the current answer |
