import type { Source } from "@/types/chat";

type SourceCardProps = {
    source: Source;
    index: number;
};

export function SourceCard({ source, index }: SourceCardProps) {
    return (
        <div className="rounded-lg border border-stone-200 bg-white p-3.5 shadow-sm">
            <div className="flex items-start justify-between">
                {source.kind !== undefined && (
                    <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-indigo-700">{source.kind}</span>
                )}
                <span className="text-[10px] font-medium text-stone-400">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="mt-2 text-sm font-semibold leading-snug">{source.title}</h3>
            {source.author !== undefined && (
                <p className="text-xs text-stone-500">{source.author}</p>
            )}
            <p className="mt-2 text-xs leading-relaxed text-stone-600">{source.excerpt}</p>
            {source.url !== undefined && (
                <a href={source.url} className="mt-2 inline-block text-xs font-medium text-indigo-600 hover:underline">View source →</a>
            )}
        </div>
    );
}