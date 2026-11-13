import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { MessageBubble } from "./MessageBubble";

test("user and assistant messages render different content", () => {
    const user = {
        id: "1",
        role: "user" as const,
        content: "Hello",
    };
    const assistant = {
        id: "2",
        role: "assistant" as const,
        content: "**bold**",
    };
    const { rerender } = render(<MessageBubble message={user} />);
    expect(screen.getByText("Hello")).toBeInTheDocument();

    rerender(<MessageBubble message={assistant} />);
    expect(screen.getByText("bold")).toBeInTheDocument(); // Markdown should be rendered
});
