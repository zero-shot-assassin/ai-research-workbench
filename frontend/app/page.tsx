import { Header } from "@/components/Header";
import { SourceCount } from "@/components/SourceCount";
import { SourcesPanel } from "@/components/SourcesPanel";
import { Conversation } from "@/components/Conversation";
import { Eyebrow } from "@/components/Eyebrow";

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-stone-50 font-sans">
      <Header title="AI Research Workbench" />

      {/* Sibling row: conversation + sources */}
      <div className="flex min-h-0 flex-1">

        <main className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 bg-white px-4 py-6 sm:px-8">

          {/* Conversation */}
          <Conversation />

          {/* Sources — mobile disclosure (aside covers md+) */}
          <details className="md:hidden rounded-lg border border-stone-200 bg-white p-3">
            <summary className="cursor-pointer text-sm font-medium">
              Sources (<SourceCount />)
            </summary>
            <div className="mt-3 space-y-3">
              <SourcesPanel />
            </div>
          </details>

        </main>

        {/* Sources panel */}
        <aside aria-label="Supporting sources" className="hidden w-80 shrink-0 flex-col border-l border-stone-200 bg-white md:flex">
          <div className="border-b border-stone-200 px-5 py-4">
            <Eyebrow>Evidence library</Eyebrow>
            <h2 className="mt-0.5 font-semibold">Sources</h2>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            <SourcesPanel />
          </div>
        </aside>

      </div>
    </div>
  );
}