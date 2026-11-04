import { Header } from "@/components/Header";
import { SourceCard } from "@/components/SourceCard";
import { Conversation } from "@/components/Conversation";
import { messages as initialMessages, sources } from "@/data/mock-chat";
import { Eyebrow } from "@/components/Eyebrow";

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-stone-50 font-sans">
      <Header title="AI Research Workbench" sourceCount={sources.length} />

      {/* Sibling row: conversation + sources */}
      <div className="flex min-h-0 flex-1">

        <main className="mx-auto flex w-full max-w-3xl min-h-0 flex-1 flex-col gap-4 px-4 sm:px-8 py-6 bg-white">

          {/* Conversation */}
          <Conversation initialMessages={initialMessages} />
        
        </main>

        {/* Sources panel */}
        <aside aria-label="Supporting sources" className="hidden w-80 shrink-0 flex-col border-l border-stone-200 bg-white md:flex">
          <div className="border-b border-stone-200 px-5 py-4">
            <Eyebrow>Evidence library</Eyebrow>
            <h2 className="mt-0.5 font-semibold">Sources</h2>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {sources.map((source, index) => (
              <SourceCard key={source.id} source={source} index={index} />
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
}