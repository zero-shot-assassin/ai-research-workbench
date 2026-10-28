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
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No messages yet. Ask a research question to get started.
            </p>
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