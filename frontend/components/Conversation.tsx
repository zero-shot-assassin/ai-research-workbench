"use client";

import { useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport, type UIMessage } from "ai";
import { MessageBubble } from "@/components/MessageBubble";
import { QuestionInput } from "@/components/QuestionInput";
import { Eyebrow } from "@/components/Eyebrow";
import type { Message } from "@/types/chat";

const transport = new TextStreamChatTransport({
  api: `${process.env.NEXT_PUBLIC_API_URL}/chat/stream`,
});

function toMessage(uiMessage: UIMessage): Message {
  return {
    id: uiMessage.id,
    role: uiMessage.role === "user" ? "user" : "assistant",
    content: uiMessage.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join(""),
  };
}

export function Conversation() {
  const { messages, sendMessage, status, error, regenerate } = useChat({ transport });

  const prevStatus = useRef(status);
  useEffect(() => {
    if (prevStatus.current !== "ready" && status === "ready") {
      window.dispatchEvent(new Event("answer-complete"));
    }
    prevStatus.current = status;
  }, [status]);

  const displayMessages: Message[] = messages.map(toMessage);
  const threadTitle =
    displayMessages.find((m) => m.role === "user")?.content ?? "New research thread";
  const isLoading = status === "submitted" || status === "streaming";

  function handleQuestionSubmit(question: string): void {
    sendMessage({ text: question });
  }

  return (
    <>
      <div className="shrink-0 border-b border-stone-200 pb-4">
        <Eyebrow>Research thread</Eyebrow>
        <h2 className="mt-0.5 text-xl font-semibold">{threadTitle}</h2>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
        {displayMessages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-xl">✦</div>
            <h2 className="text-lg font-semibold">Start a research thread</h2>
            <p className="mt-1 max-w-sm text-sm text-stone-500">Ask a question and get an answer grounded in your indexed sources.</p>
          </div>
        ) : (
          displayMessages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        {status === "submitted" && (
          <div className="flex gap-3">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">✦</div>
            <div className="text-sm leading-relaxed">
              <Eyebrow>Research assistant</Eyebrow>
              <p className="mt-1">Thinking<span className="ml-1 inline-block h-4 w-1.5 animate-pulse bg-indigo-500 align-middle"></span></p>
            </div>
          </div>
        )}
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Something went wrong while generating the answer.{" "}
            <button className="font-medium underline" onClick={() => regenerate()}>Try again</button>
          </div>
        )}
      </div>
      <QuestionInput onSubmit={handleQuestionSubmit} isLoading={isLoading} />
    </>
  );
}