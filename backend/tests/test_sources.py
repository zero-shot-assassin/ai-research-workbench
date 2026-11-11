def test_sources_returns_expected_structure(client):
    response = client.get("/sources")
    
    assert response.status_code == 200