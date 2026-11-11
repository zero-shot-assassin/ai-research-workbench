"use client";
import { useSources } from "@/hooks/useSources";

export function SourceCount() {
    const sources = useSources();
    return <>{sources?.length ?? 0}</>;
}
