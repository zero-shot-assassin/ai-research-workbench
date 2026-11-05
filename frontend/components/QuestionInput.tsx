"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
                <Textarea
                    id="research-question"
                    placeholder="Ask a research question..."
                    rows={1}
                    className="min-h-0 flex-1 resize-none border-0 bg-transparent px-0 py-0 text-sm shadow-none focus-visible:border-transparent focus-visible:ring-0 placeholder:text-stone-400"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <Button
                    type="button"
                    disabled={trimmedQuestion.length === 0}
                    onClick={handleSubmit}
                >
                    Ask
                </Button>
            </div>
        </div>
    );
}