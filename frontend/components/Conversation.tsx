"use client";

import { useState } from "react";
import { MessageBubble } from "@/components/MessageBubble";
import { QuestionInput } from "@/components/QuestionInput";
import type { Message } from "@/types/chat";

type ConversationProps = {
  initialMessages: Message[];
};

export function Conversation({ initialMessages }: ConversationProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  function handleQuestionSubmit(question: string): void {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
    };
    setMessages((prev) => [...prev, newMessage]);
  }

  return (
    <>
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
      </div>
      <QuestionInput onSubmit={handleQuestionSubmit} />
    </>
  );
}