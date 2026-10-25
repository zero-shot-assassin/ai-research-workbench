import type { Message, Source } from '@/types/chat';

// Mock chat data for development
export const messages: Message[] = [
    {
        id: 'msg-1',
        role: 'user',
        content: 'What is RAG?',
    },
    {
        id: 'msg-2',
        role: 'assistant',
        content: 'RAG stands for Retrieval-Augmented Generation. It is a technique for retrieving information from a knowledge base and generating responses based on that information.',
    },
];

// Mock sources data for development
export const sources: Source[] = [
    {
        id: 'source-1',
        title: 'RAG Overview',
        excerpt: 'RAG is a technique for retrieving information from a knowledge base.',
        url: '#',
    },
    {
        id: 'source-2',
        title: 'RAG Implementation',
        excerpt: 'RAG can be implemented using various techniques and frameworks.',
    },
];

const source: Source = sources[1];
if (source.url !== undefined) {
    console.log(source.url.toUpperCase());
}
else {
    console.log('No source URL available');
}