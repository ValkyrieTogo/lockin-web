"""Backend API tests for Lockin landing page.
Covers /api/health, /api/newsletter, /api/orders, /api/contact, /api/stats."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://the-brick.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def _unique_email(prefix="test"):
    return f"TEST_{prefix}_{uuid.uuid4().hex[:10]}@example.com"


# -------- Health --------
class TestHealth:
    def test_health_ok(self, session):
        r = session.get(f"{API}/health", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "time" in data

    def test_root(self, session):
        r = session.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        assert "Lockin" in r.json().get("message", "")


# -------- Newsletter --------
class TestNewsletter:
    def test_create_valid(self, session):
        email = _unique_email("nl")
        r = session.post(f"{API}/newsletter", json={"email": email}, timeout=15)
        assert r.status_code == 201, r.text
        body = r.json()
        assert body["email"] == email
        assert body["source"] == "footer"
        assert "id" in body and isinstance(body["id"], str)
        assert "created_at" in body

    def test_duplicate_returns_409(self, session):
        email = _unique_email("dup")
        r1 = session.post(f"{API}/newsletter", json={"email": email}, timeout=15)
        assert r1.status_code == 201
        r2 = session.post(f"{API}/newsletter", json={"email": email}, timeout=15)
        assert r2.status_code == 409
        assert "already" in r2.json().get("detail", "").lower()

    def test_invalid_email_422(self, session):
        r = session.post(f"{API}/newsletter", json={"email": "not-an-email"}, timeout=15)
        assert r.status_code == 422

    def test_list_contains_created(self, session):
        email = _unique_email("list")
        c = session.post(f"{API}/newsletter", json={"email": email}, timeout=15)
        assert c.status_code == 201
        r = session.get(f"{API}/newsletter", timeout=15)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert any(i.get("email") == email for i in items)


# -------- Orders --------
class TestOrders:
    def test_create_order(self, session):
        payload = {
            "name": "TEST_Ada",
            "email": _unique_email("ord"),
            "quantity": 2,
        }
        r = session.post(f"{API}/orders", json=payload, timeout=15)
        assert r.status_code == 201, r.text
        body = r.json()
        assert body["name"] == payload["name"]
        assert body["email"] == payload["email"]
        assert body["quantity"] == 2
        assert body["variant"] == "lockin-classic"
        assert body["status"] == "received"
        assert "id" in body

        # Verify persistence
        lst = session.get(f"{API}/orders", timeout=15).json()
        assert any(o.get("id") == body["id"] for o in lst)

    def test_invalid_email_rejected(self, session):
        r = session.post(
            f"{API}/orders",
            json={"name": "TEST", "email": "bad", "quantity": 1},
            timeout=15,
        )
        assert r.status_code == 422

    def test_quantity_too_low(self, session):
        r = session.post(
            f"{API}/orders",
            json={"name": "TEST", "email": _unique_email("q0"), "quantity": 0},
            timeout=15,
        )
        assert r.status_code == 422

    def test_quantity_too_high(self, session):
        r = session.post(
            f"{API}/orders",
            json={"name": "TEST", "email": _unique_email("q11"), "quantity": 11},
            timeout=15,
        )
        assert r.status_code == 422

    def test_empty_name_rejected(self, session):
        r = session.post(
            f"{API}/orders",
            json={"name": "", "email": _unique_email("noname"), "quantity": 1},
            timeout=15,
        )
        assert r.status_code == 422


# -------- Contact --------
class TestContact:
    def test_create_contact(self, session):
        payload = {
            "name": "TEST_user",
            "email": _unique_email("ct"),
            "message": "Hello Lockin team",
        }
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 201, r.text
        body = r.json()
        assert body["message"] == payload["message"]
        assert body["email"] == payload["email"]
        assert "id" in body

    def test_empty_message_rejected(self, session):
        r = session.post(
            f"{API}/contact",
            json={"name": "TEST", "email": _unique_email("em"), "message": ""},
            timeout=15,
        )
        assert r.status_code == 422


# -------- Stats --------
class TestStats:
    def test_stats_shape(self, session):
        r = session.get(f"{API}/stats", timeout=15)
        assert r.status_code == 200
        body = r.json()
        assert "subscribers" in body
        assert "orders" in body
        assert isinstance(body["subscribers"], int)
        assert isinstance(body["orders"], int)

    def test_stats_increment_on_subscribe(self, session):
        before = session.get(f"{API}/stats", timeout=15).json()
        session.post(
            f"{API}/newsletter",
            json={"email": _unique_email("stat")},
            timeout=15,
        )
        after = session.get(f"{API}/stats", timeout=15).json()
        assert after["subscribers"] >= before["subscribers"] + 1
