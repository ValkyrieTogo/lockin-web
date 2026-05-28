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

    # ----- IDR pricing + new fields -----
    def test_order_idr_pricing_default(self, session):
        payload = {
            "name": "TEST_IDR",
            "email": _unique_email("idr"),
            "phone": "+62 812 0000 0001",
            "quantity": 1,
            "address_line": "Jl. Sudirman 1",
            "city": "Jakarta",
            "province": "DKI Jakarta",
            "postal_code": "12345",
            "payment_method": "bank_transfer",
            "country": "Indonesia",
        }
        r = session.post(f"{API}/orders", json=payload, timeout=15)
        assert r.status_code == 201, r.text
        b = r.json()
        assert b["unit_price"] == 1399000
        assert b["shipping"] == 0
        assert b["discount"] == 0
        assert b["total"] == 1399000
        assert b["payment_method"] == "bank_transfer"
        assert b["city"] == "Jakarta"
        assert b["province"] == "DKI Jakarta"
        assert b["postal_code"] == "12345"
        assert b["country"] == "Indonesia"
        assert b["phone"] == payload["phone"]
        assert b["address_line"] == payload["address_line"]

    def test_order_promo_lockin10(self, session):
        r = session.post(
            f"{API}/orders",
            json={
                "name": "TEST_promo10",
                "email": _unique_email("p10"),
                "quantity": 2,
                "promo_code": "LOCKIN10",
            },
            timeout=15,
        )
        assert r.status_code == 201, r.text
        b = r.json()
        # subtotal = 2 * 1,399,000 = 2,798,000; 10% off = 279,800; total = 2,518,200
        assert b["unit_price"] == 1399000
        assert b["discount"] == 279800
        assert b["total"] == 2518200
        assert b["promo_code"] == "LOCKIN10"

    def test_order_promo_focus20(self, session):
        r = session.post(
            f"{API}/orders",
            json={
                "name": "TEST_promo20",
                "email": _unique_email("p20"),
                "quantity": 1,
                "promo_code": "focus20",  # lowercase, should be normalized
            },
            timeout=15,
        )
        assert r.status_code == 201, r.text
        b = r.json()
        # 1,399,000 * 20% = 279,800; total = 1,119,200
        assert b["discount"] == 279800
        assert b["total"] == 1119200

    def test_order_invalid_promo_no_discount(self, session):
        r = session.post(
            f"{API}/orders",
            json={
                "name": "TEST_promoX",
                "email": _unique_email("px"),
                "quantity": 1,
                "promo_code": "NOPE",
            },
            timeout=15,
        )
        assert r.status_code == 201
        b = r.json()
        assert b["discount"] == 0
        assert b["total"] == 1399000

    def test_order_empty_promo_no_discount(self, session):
        r = session.post(
            f"{API}/orders",
            json={
                "name": "TEST_promoE",
                "email": _unique_email("pe"),
                "quantity": 3,
                "promo_code": "",
            },
            timeout=15,
        )
        assert r.status_code == 201
        b = r.json()
        assert b["discount"] == 0
        assert b["total"] == 1399000 * 3


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
