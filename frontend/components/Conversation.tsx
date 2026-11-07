"use client";

import { useState } from "react";
import { MessageBubble } from "@/components/MessageBubble";
import { QuestionInput } from "@/components/QuestionInput";
import { Eyebrow } from "@/components/Eyebrow";
import type { Message } from "@/types/chat";
import { streamChat } from "@/lib/api";
import type { ChatRequestMessage } from "@/types/api";

type ConversationProps = {
  initialMessages: Message[];
};

export function Conversation({ initialMessages }: ConversationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const threadTitle =
    messages.find((message) => message.role === "user")?.content
    ?? "New research thread";

  async function requestAnswer(currentMessages: Message[]): Promise<void> {
    setIsLoading(true);
    setError(null);
    try {
        const wireMessages: ChatRequestMessage[] = currentMessages.map(
            ({ role, content }) => ({ role, content })
        );
        const assistantId = crypto.randomUUID();
        setMessages((prev) => [...prev, {
            id: assistantId,
            role: "assistant",
            content: "",
        }]);

        let accumulated = "";
        for await (const chunk of streamChat(wireMessages)) {
            accumulated += chunk;
            setMessages((prev) =>
              prev.map(m => (m.id === assistantId ? { ...m, content: accumulated } : m))
            );
        }
    } catch {
        setError("Something went wrong while generating the answer.");
    } finally {
        setIsLoading(false);
    }
  }

  async function handleQuestionSubmit(question: string): Promise<void> {
    const nextMessages = [...messages, {
        id: crypto.randomUUID(),
        role: "user" as const,
        content: question,
    }];
    setMessages(nextMessages);
    await requestAnswer(nextMessages);
  }

  async function handleRetry(): Promise<void> {
    await requestAnswer(messages);
  }

  return (
    <>
      <div className="shrink-0 border-b border-stone-200 pb-4">
        <Eyebrow>Research thread</Eyebrow>
        <h2 className="mt-0.5 text-xl font-semibold">{threadTitle}</h2>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-xl">✦</div>
            <h2 className="text-lg font-semibold">Start a research thread</h2>
            <p className="mt-1 max-w-sm text-sm text-stone-500">Ask a question and get an answer grounded in your indexed sources.</p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
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
            {error}{" "}
            <button className="font-medium underline" onClick={handleRetry}>Try again</button>
          </div>
        )}
      </div>
      <QuestionInput onSubmit={handleQuestionSubmit} isLoading={isLoading} />
    </>
  );
}