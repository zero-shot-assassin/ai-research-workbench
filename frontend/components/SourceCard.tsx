import type { Source } from "@/types/chat";

type SourceCardProps = {
    source: Source;
};

export function SourceCard({ source }: SourceCardProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-sm font-semibold">S</span>
                </div>
                <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                    <h2 className="text-sm">{source.title}</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{source.excerpt}</p>
                    {source.url !== undefined && (
                        <a href={source.url} className="text-xs text-blue-500 dark:text-blue-400">
                            View source
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}