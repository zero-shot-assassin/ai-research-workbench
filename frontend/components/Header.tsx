import { Button } from "@/components/ui/button";

type HeaderProps = {
    title: string;
    sourceCount: number;
};

export function Header({ title, sourceCount }: HeaderProps) {
    return (
        <header className="flex h-14 items-center justify-between border-b border-stone-200 bg-white px-5">
            <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white">✦</div>
                <h1 className="font-semibold">{title}</h1>
                <span className="rounded border border-stone-300 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-stone-500">Beta</span>
            </div>
            <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs text-stone-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    {sourceCount} sources indexed
                </span>
                <Button type="button" size="sm">+ New thread</Button>
            </div>
        </header>
    );
}