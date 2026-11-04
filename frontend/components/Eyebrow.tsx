import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
    return <p className="text-[10px] font-medium uppercase tracking-widest text-stone-400">{children}</p>;
}