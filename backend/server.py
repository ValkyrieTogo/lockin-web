from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Lockin API")
api_router = APIRouter(prefix="/api")


# ----------------- Models -----------------
class NewsletterCreate(BaseModel):
    email: EmailStr
    source: Optional[str] = "footer"


class NewsletterEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    source: Optional[str] = "footer"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class OrderCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = None
    quantity: int = Field(ge=1, le=10, default=1)
    variant: Optional[str] = "lockin-classic"
    # shipping address
    address_line: Optional[str] = None
    city: Optional[str] = None
    province: Optional[str] = None
    postal_code: Optional[str] = None
    country: Optional[str] = "Indonesia"
    # payment
    payment_method: Optional[str] = "bank_transfer"
    promo_code: Optional[str] = None
    notes: Optional[str] = None


class OrderEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    quantity: int = 1
    variant: str = "lockin-classic"
    address_line: Optional[str] = None
    city: Optional[str] = None
    province: Optional[str] = None
    postal_code: Optional[str] = None
    country: str = "Indonesia"
    payment_method: str = "bank_transfer"
    promo_code: Optional[str] = None
    notes: Optional[str] = None
    # totals snapshot (IDR)
    unit_price: int = 1399000
    shipping: int = 0
    discount: int = 0
    total: int = 1399000
    status: str = "received"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=2000)


class ContactEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ----------------- Routes -----------------
@api_router.get("/")
async def root():
    return {"message": "Lockin API up", "version": "1.0.0"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "time": datetime.now(timezone.utc).isoformat()}


@api_router.post("/newsletter", response_model=NewsletterEntry, status_code=201)
async def create_newsletter(payload: NewsletterCreate):
    existing = await db.newsletter.find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=409, detail="Email already subscribed")
    entry = NewsletterEntry(email=payload.email, source=payload.source or "footer")
    await db.newsletter.insert_one(entry.model_dump())
    return entry


@api_router.get("/newsletter", response_model=List[NewsletterEntry])
async def list_newsletter():
    items = await db.newsletter.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return items


@api_router.post("/orders", response_model=OrderEntry, status_code=201)
async def create_order(payload: OrderCreate):
    UNIT_PRICE = 1399000  # IDR
    qty = max(1, min(10, payload.quantity))
    subtotal = UNIT_PRICE * qty
    shipping = 0  # free shipping
    discount = 0
    code = (payload.promo_code or "").strip().upper()
    if code == "LOCKIN10":
        discount = int(subtotal * 0.10)
    elif code == "FOCUS20":
        discount = int(subtotal * 0.20)
    total = subtotal + shipping - discount

    entry = OrderEntry(
        **payload.model_dump(),
        unit_price=UNIT_PRICE,
        shipping=shipping,
        discount=discount,
        total=total,
    )
    await db.orders.insert_one(entry.model_dump())
    return entry


@api_router.get("/orders", response_model=List[OrderEntry])
async def list_orders():
    items = await db.orders.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return items


@api_router.post("/contact", response_model=ContactEntry, status_code=201)
async def create_contact(payload: ContactCreate):
    entry = ContactEntry(**payload.model_dump())
    await db.contacts.insert_one(entry.model_dump())
    return entry


@api_router.get("/contact", response_model=List[ContactEntry])
async def list_contact():
    items = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return items


@api_router.get("/stats")
async def stats():
    """Public stats for the landing page (totals)."""
    newsletter_count = await db.newsletter.count_documents({})
    order_count = await db.orders.count_documents({})
    return {
        "subscribers": newsletter_count,
        "orders": order_count,
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
