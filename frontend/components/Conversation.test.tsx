import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import { useChat } from "@ai-sdk/react";
import { Conversation } from "./Conversation";

vi.mock("@ai-sdk/react", () => ({
  useChat: vi.fn(),
}));

const mockedUseChat = vi.mocked(useChat);

function chatState(overrides = {}) {
  return {
    messages: [],
    sendMessage: vi.fn(),
    status: "ready",
    error: undefined,
    regenerate: vi.fn(),
    ...overrides,
  } as unknown as ReturnType<typeof useChat>;
}

test("shows empty state when there are no messages", () => {
  mockedUseChat.mockReturnValue(chatState());
  render(<Conversation />);
  expect(screen.getByText(/start a research thread/i)).toBeInTheDocument();
});

test("shows thinking indicator while submitted", () => {
  mockedUseChat.mockReturnValue(chatState({ status: "submitted" }));
  render(<Conversation />);
  expect(screen.getByText(/thinking/i)).toBeInTheDocument();
});

test("shows error banner when a request fails", () => {
  mockedUseChat.mockReturnValue(chatState({ error: new Error("fail") }));
  render(<Conversation />);
  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});