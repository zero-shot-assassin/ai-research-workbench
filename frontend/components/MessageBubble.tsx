import type { Message } from "@/types/chat";

type MessageBubbleProps = {
    message: Message;
};

export function MessageBubble({ message }: MessageBubbleProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-sm font-semibold">{message.role === 'user' ? 'U' : 'AI'}</span>
                </div>
                <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                    <p className="text-sm">{message.content}</p>
                </div>
            </div>
        </div>
    );
}