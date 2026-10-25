"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { MessageBubble } from "@/components/MessageBubble";
import { messages as InitialMessages, sources } from "@/data/mock-chat";
import { SourceCard } from "@/components/SourceCard";
import { QuestionInput } from "@/components/QuestionInput";
import type { Message } from "@/types/chat";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(InitialMessages);

  function handleQuestionSubmit(question: string): void {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
    };
  
    setMessages((previousMessages) => [...previousMessages, newMessage]);
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Header title="AI Research Workbench" />
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-6 px-8 bg-white dark:bg-black sm:items-start">
        
        {/* Messages */}
        {messages.length === 0 ? (
          <p>No messages yet. Ask a research question to get started.</p>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}

        {/* Supporting Sources */}
        <section aria-label="Supporting sources" className="flex w-full flex-col gap-3">
          {sources.map((source) => (
            <SourceCard key={source.id} source={source} />
          ))}
        </section>

        {/* Question Input */}
        <QuestionInput onSubmit={handleQuestionSubmit}/>

      </main>
    </div>
  );
}
