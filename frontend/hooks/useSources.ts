"use client";
import { useEffect, useState } from "react";
import { getSources } from "@/lib/api";
import type { ApiSource } from "@/types/api";

export function useSources(): ApiSource[] | null {
  const [sources, setSources] = useState<ApiSource[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const result = await getSources();
        if (!cancelled) setSources(result);
      } catch { /* keep previous sources on failure */ }
    }
    window.addEventListener("answer-complete", load);
    return () => {
      cancelled = true;
      window.removeEventListener("answer-complete", load);
    };
  }, []);

  return sources;
}