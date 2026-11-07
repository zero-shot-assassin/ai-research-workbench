import os

import httpx

from schemas import SourceOut

latest_sources: list[SourceOut] = []  # dev simplification — per-request scoping comes later


def tavily_search(query: str, max_results: int = 5) -> list[SourceOut]:
    """Search the web via Tavily and return results as sources."""
    resp = httpx.post(
        "https://api.tavily.com/search",
        json={
            "api_key": os.environ["TAVILY_API_KEY"],
            "query": query,
            "max_results": max_results,
        },
        timeout=20,
    )
    resp.raise_for_status()
    return [
        SourceOut(title=r["title"], url=r["url"], excerpt=r["content"][:200])
        for r in resp.json()["results"]
    ]


def sources_as_context(sources: list[SourceOut]) -> str:
    """Format sources as numbered context for the model to ground on."""
    return "\n".join(
        f"[{i + 1}] {s.title} ({s.url})\n{s.excerpt}"
        for i, s in enumerate(sources)
    )
