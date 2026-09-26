import pytest
from httpx import AsyncClient
from src.core.enums import ReportCategory


async def register_and_login(client: AsyncClient, email: str = "reporter@example.com", password: str = "testpassword123") -> tuple[str, dict]:
    reg_res = await client.post("/api/auth/register", json={"email": email, "password": password})
    assert reg_res.status_code == 201, reg_res.text
    login_res = await client.post("/api/auth/login", json={"email": email, "password": password})
    assert login_res.status_code == 200, login_res.text
    token = login_res.json()["access_token"]
    user = login_res.json()["user"]
    return token, user


async def test_create_report_authenticated(client: AsyncClient):
    token, user = await register_and_login(client, "rep_auth@example.com")
    payload = {
        "title": "Broken Streetlight",
        "description": "Streetlight flickering at night",
        "category": "infrastructure",
        "latitude": 37.77,
        "longitude": -122.41,
        "address": "123 Elm St",
        "media_urls": ["https://example.com/img1.jpg"]
    }
    res = await client.post("/api/reports", json=payload, headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 201, res.text
    data = res.json()
    assert data["title"] == "Broken Streetlight"
    assert data["category"] == "infrastructure"
    assert data["status"] == "submitted"
    assert data["user_id"] == user["id"]


async def test_create_report_unauthenticated_returns_401(client: AsyncClient):
    payload = {
        "title": "Broken Streetlight",
        "description": "Streetlight flickering at night",
        "category": "infrastructure"
    }
    res = await client.post("/api/reports", json=payload)
    assert res.status_code == 401


async def test_list_reports(client: AsyncClient):
    res = await client.get("/api/reports")
    assert res.status_code == 200
    assert isinstance(res.json(), list)
