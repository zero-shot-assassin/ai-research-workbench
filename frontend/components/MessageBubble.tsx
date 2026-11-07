import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { Message } from "@/types/chat";
import { Eyebrow } from "@/components/Eyebrow";

type MessageBubbleProps = {
    message: Message;
};

export function MessageBubble({ message }: MessageBubbleProps) {
    if (message.role === 'user') {
        return (
            <div className="flex justify-end">
                <div className="max-w-[70%] rounded-2xl rounded-br-sm border border-stone-200 bg-white px-4 py-3 text-sm shadow-sm">
                    {message.content}
                </div>
            </div>
        );
    }
    return (
        <div className="flex gap-3">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">✦</div>
            <div className="max-w-[75%] text-sm leading-relaxed">
                <Eyebrow>Research assistant</Eyebrow>
                <div className="prose prose-sm mt-1 max-w-none prose-stone">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}