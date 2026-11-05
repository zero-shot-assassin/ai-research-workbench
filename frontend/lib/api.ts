import type { ChatRequestMessage, ChatResponse } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function askChat(messages: ChatRequestMessage[]): Promise<ChatResponse> {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error(`Chat request failed: ${response.status}`);
  }

  return response.json();
}