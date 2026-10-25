export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export type Source = {
  id: string;
  title: string;
  excerpt: string;
  url?: string;
};