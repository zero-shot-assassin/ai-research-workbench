import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuestionInput } from "./QuestionInput";
import { test, expect, vi } from "vitest";

const noop = () => {};

test("Ask is disabled when input is empty", () => {
  render(<QuestionInput onSubmit={noop} isLoading={false} />);
  expect(screen.getByRole("button", { name: /ask/i })).toBeDisabled();
});

test("submits trimmed text on Enter and clears the input", async () => {
  const onSubmit = vi.fn();
  render(<QuestionInput onSubmit={onSubmit} isLoading={false} />);
  const input = screen.getByRole("textbox");

  await userEvent.type(input, "  what is RAG  {Enter}");

  expect(onSubmit).toHaveBeenCalledWith("what is RAG");
  expect(input).toHaveValue("");
});

test("Shift+Enter inserts a newline instead of submitting", async () => {
  const onSubmit = vi.fn();
  render(<QuestionInput onSubmit={onSubmit} isLoading={false} />);
  const input = screen.getByRole("textbox");

  await userEvent.type(input, "line one{Shift>}{Enter}{/Shift}line two");

  expect(onSubmit).not.toHaveBeenCalled();
  expect(input).toHaveValue("line one\nline two");
});