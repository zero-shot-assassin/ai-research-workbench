export type ChatRequestMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type ChatRequest = {
  messages: ChatRequestMessage[];
};

export type ApiSource = {
  title: string;
  excerpt: string;
  url?: string;
};

export type ChatResponse = {
  answer: string;
  sources: ApiSource[];
};