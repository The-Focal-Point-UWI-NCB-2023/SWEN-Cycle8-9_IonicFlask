from ... import app


def test_api_entry():
    with app.test_client() as test_client:
        response = test_client.get("/api/")
        assert response.status_code == 200
