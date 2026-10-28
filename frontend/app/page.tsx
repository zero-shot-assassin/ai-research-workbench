"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { MessageBubble } from "@/components/MessageBubble";
import { messages as initialMessages, sources } from "@/data/mock-chat";
import { SourceCard } from "@/components/SourceCard";
import { QuestionInput } from "@/components/QuestionInput";
import type { Message } from "@/types/chat";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  function handleQuestionSubmit(question: string): void {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
    };
  
    setMessages((previousMessages) => [...previousMessages, newMessage]);
  }

  return (
    <div className="flex h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <Header title="AI Research Workbench" />

      {/* Sibling row: conversation + sources */}
      <div className="flex min-h-0 flex-1">

        <main className="mx-auto flex w-full max-w-3xl min-h-0 flex-1 flex-col gap-4 px-8 py-6 bg-white dark:bg-black">
          {/* Messages */}
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

          {/* Question Input */}
          <QuestionInput onSubmit={handleQuestionSubmit} />
        </main>

        {/* Sources panel */}
        <aside aria-label="Supporting sources" className="flex w-80 shrink-0 flex-col border-l border-gray-200 bg-white dark:bg-black">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="font-semibold">Sources</h2>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {sources.map((source) => (
              <SourceCard key={source.id} source={source} />
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
}
