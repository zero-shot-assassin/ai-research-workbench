
from unittest.mock import patch

from schemas import SourceOut


# --------------------------------------------------
# 1. Test data
# --------------------------------------------------

FAKE_SOURCES = [
    SourceOut(
        title="Test Source",
        url="https://example.com",
        excerpt="This is a test excerpt."
    )
]

VALID = {
    "messages": [
        {
            "id": "m1",
            "role": "user",
            "parts": [
                {
                    "type": "text",
                    "text": "What is machine learning?"
                }
            ]
        }
    ]
}


# --------------------------------------------------
# 2. Fake Bedrock streaming response
# --------------------------------------------------

def fake_bedrock_stream(text):
    """
    Simulates an AWS Bedrock streaming response.

    Assumes the application processes Anthropic-style
    content_block_delta events.
    """

    import json

    event = {
        "type": "content_block_delta",
        "index": 0,
        "delta": {
            "type": "text_delta",
            "text": text
        }
    }

    return {
        "body": iter([
            {
                "chunk": {
                    "bytes": json.dumps(event).encode("utf-8")
                }
            }
        ])
    }


# --------------------------------------------------
# 3. Validation tests
# --------------------------------------------------

def test_chat_stream_empty_messages_returns_400(client):
    response = client.post(
        "/chat/stream",
        json={"messages": []}
    )

    assert response.status_code == 400


def test_chat_stream_malformed_returns_422(client):
    response = client.post(
        "/chat/stream",
        json={"messages": [{"role": "user"}]}
    )

    assert response.status_code == 422


# --------------------------------------------------
# 4. Successful chat test
# --------------------------------------------------

@patch("main.bedrock_runtime.invoke_model_with_response_stream")
@patch("main.build_search_query", return_value="rewritten")
@patch("main.tavily_search", return_value=FAKE_SOURCES)
def test_chat_stream_happy_path(
    mock_tavily,
    mock_rewrite,
    mock_invoke,
    client
):
    # Configure fake Bedrock response
    mock_invoke.return_value = fake_bedrock_stream("hello")

    # Send a valid chat request
    response = client.post(
        "/chat/stream",
        json=VALID
    )

    # Verify HTTP response
    assert response.status_code == 200

    # Verify generated content
    assert "hello" in response.text

    # Verify external dependencies were called
    mock_rewrite.assert_called_once()
    mock_tavily.assert_called_once_with("rewritten")
    mock_invoke.assert_called_once()


# --------------------------------------------------
# 5. External service failure
# --------------------------------------------------

@patch("main.build_search_query", return_value="rewritten")
@patch("main.tavily_search", side_effect=Exception("Tavily down"))
def test_chat_stream_tavily_failure_returns_502(
    mock_tavily,
    mock_rewrite,
    client
):
    from fastapi.testclient import TestClient
    from main import app

    # Let exceptions become HTTP responses instead of raising
    response = TestClient(app, raise_server_exceptions=False).post(
        "/chat/stream",
        json=VALID
    )

    assert response.status_code == 502
