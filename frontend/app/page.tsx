import { Header } from "@/components/Header";
import { SourceCard } from "@/components/SourceCard";
import { Conversation } from "@/components/Conversation";
import { messages as initialMessages, sources } from "@/data/mock-chat";

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <Header title="AI Research Workbench" />

      {/* Sibling row: conversation + sources */}
      <div className="flex min-h-0 flex-1">

        <main className="mx-auto flex w-full max-w-3xl min-h-0 flex-1 flex-col gap-4 px-8 py-6 bg-white dark:bg-black">

          {/* Conversation */}
          <Conversation initialMessages={initialMessages} />
        
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