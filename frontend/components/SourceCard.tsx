import type { Source } from "@/types/chat";
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from "@/components/ui/card";

type SourceCardProps = {
    source: Source;
    index: number;
};

export function SourceCard({ source, index }: SourceCardProps) {
    return (
        <Card size="sm" className="rounded-lg border-stone-200 shadow-sm">
            <CardHeader>
                {source.kind !== undefined && (
                    <span className="justify-self-start rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-indigo-700">
                        {source.kind}
                    </span>
                )}
                <CardAction>
                    <span className="text-[10px] font-medium text-stone-400">{String(index + 1).padStart(2, '0')}</span>
                </CardAction>
                <CardTitle className="text-sm">{source.title}</CardTitle>
                {source.author !== undefined && (
                    <CardDescription className="text-xs">{source.author}</CardDescription>
                )}
            </CardHeader>
            <CardContent>
                <p className="text-xs leading-relaxed text-stone-600">{source.excerpt}</p>
                {source.url !== undefined && (
                    <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-xs font-medium text-indigo-600 hover:underline"
                    >
                        View source →
                    </a>
                )}
            </CardContent>
        </Card>
    );
}