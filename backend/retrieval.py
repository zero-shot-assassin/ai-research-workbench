from schemas import SourceOut


class SourceCollector:
    """Accumulates web-search sources from a Bedrock event stream."""

    def __init__(self) -> None:
        self._sources: dict[str, SourceOut] = {}

    def process(self, chunk: dict) -> None:
        if chunk.get("type") == "content_block_start":
            block = chunk.get("content_block", {})
            if block.get("type") == "web_search_tool_result":
                for item in block.get("content", []):
                    self._add(item.get("title"), item.get("url"), item.get("page_age") or "")
        elif chunk.get("type") == "content_block_delta":
            delta = chunk.get("delta", {})
            if delta.get("type") == "citations_delta":
                cit = delta.get("citation", {})
                self._add(cit.get("title"), cit.get("url"), (cit.get("cited_text") or "")[:200])

    def _add(self, title: str | None, url: str | None, excerpt: str) -> None:
        if url and url not in self._sources:
            self._sources[url] = SourceOut(title=title or url, excerpt=excerpt, url=url)

    def list(self) -> list[SourceOut]:
        return list(self._sources.values())


latest_sources: list[SourceOut] = []  # dev simplification — per-request scoping comes later