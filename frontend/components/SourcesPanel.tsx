"use client";
import { SourceCard } from "@/components/SourceCard";
import { useSources } from "@/hooks/useSources";

export function SourcesPanel() {
  const sources = useSources();
  if (!sources || sources.length === 0) return null;
  return (
    <>
      {sources.map((source, index) => (
        <SourceCard
          key={source.url ?? source.title}
          index={index}
          source={{
            id: source.url ?? source.title,
            title: source.title,
            excerpt: source.excerpt,
            url: source.url,
            kind: "Web source",
          }}
        />
      ))}
    </>
  );
}