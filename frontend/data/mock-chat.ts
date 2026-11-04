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
        title: 'Attention Is All You Need',
        author: 'Vaswani et al. · 2017',
        excerpt: 'The Transformer relies entirely on attention mechanisms, dispensing with recurrence and...',
        url: '#',
        kind: 'Research paper',
    },
    {
        id: 'source-2',
        title: 'Language Models are Few-Shot Learners',
        author: 'Brown et al. · 2020',
        excerpt: 'Scaling up language models greatly improves task-agnostic, few-shot performance...',
        kind: 'Journal article',
    },
    {
        id: 'source-3',
        title: 'Retrieval-Augmented Generation',
        author: 'Lewis et al. · 2020',
        excerpt: 'Retrieval combines parametric and non-parametric memory for knowledge-intensive NL...',
        url: '#',
        kind: 'Technical report',
    },
];