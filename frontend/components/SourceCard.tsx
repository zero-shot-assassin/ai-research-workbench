import type { Source } from "@/types/chat";

type SourceCardProps = {
    source: Source;
};

export function SourceCard({ source }: SourceCardProps) {
    return (
        <div className="rounded-lg border border-stone-200 bg-white p-3.5 shadow-sm">
            <h3 className="text-sm font-semibold leading-snug">{source.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-600">{source.excerpt}</p>
            {source.url !== undefined && (
                <a href={source.url} className="mt-2 inline-block text-xs font-medium text-indigo-600 hover:underline">
                    View source →
                </a>
            )}
        </div>
    );
}