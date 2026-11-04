"use client";

import { useState } from "react";

type QuestionInputProps = {
    onSubmit: (question: string) => void;
}

export function QuestionInput({ onSubmit }: QuestionInputProps) {
    const [question, setQuestion] = useState("");
    const trimmedQuestion = question.trim();

    function handleSubmit() {
        if (trimmedQuestion.length === 0) {
            return;
        }

        onSubmit(trimmedQuestion);
        setQuestion("");
    }

    return (
        <div className="w-full">
            <label htmlFor="research-question" className="sr-only">Research question</label>
            <div className="flex items-center gap-2 rounded-xl border border-stone-300 bg-stone-50 px-4 py-2.5 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
                <textarea
                    id="research-question"
                    placeholder="Ask a research question..."
                    rows={1}
                    className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-stone-400"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button
                    type="button"
                    disabled={trimmedQuestion.length === 0}
                    className="flex h-8 items-center justify-center rounded-lg bg-stone-900 px-4 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSubmit}
                >
                    Ask
                </button>
            </div>
        </div>
    );
}