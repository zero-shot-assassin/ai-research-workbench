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
            <label htmlFor="research-question">Research question</label>
            <textarea 
                id="research-question" 
                placeholder="Ask a research question..." 
                className="w-full border border-gray-200 dark:border-gray-700 rounded-lg p-2"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />

            <button 
              type="button" 
              disabled={trimmedQuestion.length === 0} 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
            >
              Ask
            </button>
        </div>
    );
}