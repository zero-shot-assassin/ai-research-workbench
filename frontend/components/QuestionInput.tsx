export function QuestionInput() {
    return (
        <div className="w-full">
            <label htmlFor="research-question">Research question</label>
            <textarea id="research-question" placeholder="Ask a research question..." className="w-full border border-gray-200 dark:border-gray-700 rounded-lg p-2"></textarea>
            <button type="button" disabled className="bg-blue-500 text-white px-4 py-2 rounded-lg">Ask</button>
        </div>
    );
}