import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Loader2,
  Lock,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { createOrder } from "@/lib/api";
import {
  UNIT_PRICE_IDR,
  ORIGINAL_PRICE_IDR,
  formatIDR,
} from "@/lib/format";

const PROVINCES = [
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Banten",
  "Bali",
  "Sumatera Utara",
  "Sumatera Barat",
  "Sumatera Selatan",
  "Riau",
  "Kalimantan Timur",
  "Kalimantan Selatan",
  "Sulawesi Selatan",
  "Sulawesi Utara",
  "Papua",
];

const PAYMENTS = [
  {
    id: "bank_transfer",
    label: "Bank Transfer",
    sub: "BCA · Mandiri · BNI · BRI",
  },
  { id: "qris", label: "QRIS", sub: "Scan & pay with any e-wallet" },
  { id: "ewallet", label: "GoPay / OVO / DANA / ShopeePay", sub: "E-wallet" },
  { id: "card", label: "Credit / Debit Card", sub: "Visa · Mastercard · JCB" },
];

const PRODUCT_IMG =
  "https://static.prod-images.emergentagent.com/jobs/d5f33ca5-0695-4e28-bd44-17f3f8fe1b8c/images/40ffef3e09b559fa1b49d93b9ac901ced08e1ed88aab915356003405adcf22b8.png";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    address_line: "",
    city: "",
    province: "",
    postal_code: "",
    payment_method: "bank_transfer",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { subtotal, discount, total } = useMemo(() => {
    const sub = UNIT_PRICE_IDR * qty;
    let disc = 0;
    if (appliedPromo === "LOCKIN10") disc = Math.round(sub * 0.1);
    else if (appliedPromo === "FOCUS20") disc = Math.round(sub * 0.2);
    return { subtotal: sub, discount: disc, total: sub - disc };
  }, [qty, appliedPromo]);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (code === "LOCKIN10" || code === "FOCUS20") {
      setAppliedPromo(code);
      toast.success(`Promo applied: ${code}`, {
        description: code === "FOCUS20" ? "20% off" : "10% off",
      });
    } else {
      setAppliedPromo(null);
      toast.error("Invalid promo code", {
        description: "Try LOCKIN10 or FOCUS20",
      });
    }
  };

  const validate = () => {
    const required = [
      "email",
      "name",
      "phone",
      "address_line",
      "city",
      "province",
      "postal_code",
    ];
    for (const k of required) {
      if (!form[k] || String(form[k]).trim() === "") {
        toast.error("Please complete all required fields");
        return false;
      }
    }
    return true;
  };

  const handlePay = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await createOrder({
        ...form,
        quantity: qty,
        variant: "lockin-classic",
        promo_code: appliedPromo || undefined,
        country: "Indonesia",
      });
      setSuccess(res.data);
      toast.success("Order confirmed!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      toast.error("Couldn't place order", {
        description: err?.response?.data?.detail || "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div
        className="min-h-screen bg-white text-neutral-900"
        data-testid="checkout-success-page"
      >
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-20 md:py-28 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto">
            <Check size={28} className="text-emerald-700" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-light tracking-tighter mt-8">
            You're locked in.
          </h1>
          <p className="mt-4 text-neutral-600">
            Order{" "}
            <span className="font-mono text-neutral-900">
              #{success.id.slice(0, 8).toUpperCase()}
            </span>{" "}
            confirmed. We've sent a payment guide to{" "}
            <span className="text-neutral-900">{success.email}</span>.
          </p>

          <div className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-left">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-500">Total paid</span>
              <span className="font-display text-xl text-neutral-900">
                {formatIDR(success.total)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-neutral-500">Payment method</span>
              <span className="text-neutral-900 capitalize">
                {success.payment_method.replace("_", " ")}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-neutral-500">Shipping to</span>
              <span className="text-neutral-900 text-right">
                {success.city}, {success.province}
              </span>
            </div>
          </div>

          <Button
            onClick={() => navigate("/")}
            data-testid="back-home-button"
            className="mt-10 h-12 px-7 rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
          >
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="checkout-page"
      className="min-h-screen bg-white text-neutral-900"
    >
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            data-testid="checkout-back-button"
            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeft size={16} />
            Back to store
          </button>
          <div className="flex items-center gap-2 font-display">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-emerald-600" />
            <span className="font-semibold">Lockin</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-neutral-500">
            <Lock size={12} />
            <span>Secure checkout</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14 grid lg:grid-cols-12 gap-10 lg:gap-16">
        {/* LEFT: Form */}
        <form
          onSubmit={handlePay}
          className="lg:col-span-7 space-y-10"
          data-testid="checkout-form"
        >
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-light tracking-tighter">
              Checkout
            </h1>
            <p className="mt-2 text-neutral-600 text-sm">
              Just a few details and your Lockin is on the way.
            </p>
          </div>

          {/* Contact */}
          <section>
            <SectionHeader index="1" title="Contact" />
            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              <Field
                label="Email"
                id="email"
                testId="checkout-email"
                value={form.email}
                onChange={(v) => update("email", v)}
                type="email"
                placeholder="you@focus.com"
              />
              <Field
                label="Phone"
                id="phone"
                testId="checkout-phone"
                value={form.phone}
                onChange={(v) => update("phone", v)}
                type="tel"
                placeholder="+62 812 0000 0000"
              />
            </div>
          </section>

          {/* Shipping */}
          <section>
            <SectionHeader index="2" title="Shipping address" />
            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              <Field
                label="Full name"
                id="name"
                testId="checkout-name"
                value={form.name}
                onChange={(v) => update("name", v)}
                placeholder="Nama lengkap"
              />
              <Field
                label="Postal code"
                id="postal_code"
                testId="checkout-postal"
                value={form.postal_code}
                onChange={(v) => update("postal_code", v)}
                placeholder="12345"
              />
              <div className="sm:col-span-2">
                <Field
                  label="Address"
                  id="address_line"
                  testId="checkout-address"
                  value={form.address_line}
                  onChange={(v) => update("address_line", v)}
                  placeholder="Jl. Sudirman No. 1, RT 01/RW 02, Kelurahan ..."
                />
              </div>
              <Field
                label="City"
                id="city"
                testId="checkout-city"
                value={form.city}
                onChange={(v) => update("city", v)}
                placeholder="Jakarta Selatan"
              />
              <div>
                <Label className="text-sm text-neutral-700">Province</Label>
                <Select
                  value={form.province}
                  onValueChange={(v) => update("province", v)}
                >
                  <SelectTrigger
                    data-testid="checkout-province"
                    className="mt-1.5 h-11 bg-white border-neutral-200 text-neutral-900"
                  >
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROVINCES.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Payment */}
          <section>
            <SectionHeader index="3" title="Payment method" />
            <RadioGroup
              value={form.payment_method}
              onValueChange={(v) => update("payment_method", v)}
              className="mt-5 space-y-3"
              data-testid="checkout-payment-group"
            >
              {PAYMENTS.map((p) => {
                const active = form.payment_method === p.id;
                return (
                  <label
                    key={p.id}
                    htmlFor={`pay-${p.id}`}
                    data-testid={`payment-option-${p.id}`}
                    className={`flex items-center justify-between gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                      active
                        ? "border-emerald-600 bg-emerald-50/40"
                        : "border-neutral-200 bg-white hover:border-neutral-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem
                        id={`pay-${p.id}`}
                        value={p.id}
                        className="text-emerald-600"
                      />
                      <div>
                        <div className="text-sm font-medium text-neutral-900">
                          {p.label}
                        </div>
                        <div className="text-xs text-neutral-500 mt-0.5">
                          {p.sub}
                        </div>
                      </div>
                    </div>
                    <Lock size={14} className="text-neutral-400" />
                  </label>
                );
              })}
            </RadioGroup>
          </section>

          <Button
            type="submit"
            data-testid="checkout-pay-button"
            disabled={loading}
            className="w-full h-14 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 text-base font-medium"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Lock size={16} className="mr-2" />
                Pay {formatIDR(total)}
              </>
            )}
          </Button>

          <p className="text-xs text-neutral-500 flex items-center gap-2 justify-center">
            <ShieldCheck size={12} className="text-emerald-600" />
            Secured by 256-bit encryption. 30-day money-back guarantee.
          </p>
        </form>

        {/* RIGHT: Order summary */}
        <aside
          className="lg:col-span-5"
          data-testid="checkout-summary"
        >
          <div className="lg:sticky lg:top-24 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 md:p-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-lg font-medium">Order summary</h3>
              <span className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                {qty} item{qty > 1 ? "s" : ""}
              </span>
            </div>

            {/* Product */}
            <div className="flex gap-4">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-neutral-200 bg-white flex-shrink-0">
                <img
                  src={PRODUCT_IMG}
                  alt="Lockin Classic"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-lg font-medium text-neutral-900">
                  Lockin <span className="text-neutral-500">Classic</span>
                </div>
                <div className="text-xs text-neutral-500 mt-1">
                  Anodized aluminium · NFC
                </div>

                {/* Qty stepper */}
                <div className="mt-3 inline-flex items-center gap-3 bg-white border border-neutral-200 rounded-full px-1.5 py-1">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    data-testid="qty-decrement"
                    className="w-7 h-7 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-700 disabled:opacity-40"
                    disabled={qty <= 1}
                  >
                    <Minus size={13} />
                  </button>
                  <span
                    data-testid="qty-display"
                    className="text-sm font-medium w-5 text-center"
                  >
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(10, q + 1))}
                    data-testid="qty-increment"
                    className="w-7 h-7 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-700 disabled:opacity-40"
                    disabled={qty >= 10}
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-display text-lg text-neutral-900">
                  {formatIDR(UNIT_PRICE_IDR)}
                </div>
                <div className="text-xs text-neutral-400 line-through">
                  {formatIDR(ORIGINAL_PRICE_IDR)}
                </div>
              </div>
            </div>

            <Separator className="my-6 bg-neutral-200" />

            {/* Promo */}
            <div>
              <Label className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                Promo code
              </Label>
              <div className="mt-2 flex gap-2">
                <Input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="LOCKIN10"
                  data-testid="promo-input"
                  className="h-11 bg-white border-neutral-200"
                />
                <Button
                  type="button"
                  variant="outline"
                  data-testid="promo-apply-button"
                  onClick={applyPromo}
                  className="h-11 rounded-lg border-neutral-300 hover:bg-neutral-100"
                >
                  Apply
                </Button>
              </div>
              {appliedPromo && (
                <div
                  data-testid="promo-applied"
                  className="mt-2 text-xs text-emerald-700 flex items-center gap-1"
                >
                  <Check size={12} /> {appliedPromo} applied
                </div>
              )}
            </div>

            <Separator className="my-6 bg-neutral-200" />

            {/* Totals */}
            <div className="space-y-3 text-sm">
              <Row label="Subtotal" value={formatIDR(subtotal)} testId="sum-subtotal" />
              <Row
                label={
                  <span className="flex items-center gap-1.5">
                    <Truck size={13} className="text-emerald-600" />
                    Shipping
                  </span>
                }
                value={<span className="text-emerald-700">Free</span>}
                testId="sum-shipping"
              />
              {discount > 0 && (
                <Row
                  label={`Discount (${appliedPromo})`}
                  value={`− ${formatIDR(discount)}`}
                  testId="sum-discount"
                  accent
                />
              )}
            </div>

            <Separator className="my-5 bg-neutral-200" />

            <div className="flex items-center justify-between">
              <span className="text-neutral-700">Total</span>
              <span
                data-testid="sum-total"
                className="font-display text-2xl tracking-tighter text-neutral-900"
              >
                {formatIDR(total)}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-emerald-600" />
                Free shipping
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-600" />
                30-day return
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SectionHeader({ index, title }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-7 h-7 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-medium">
        {index}
      </span>
      <h2 className="font-display text-xl font-medium text-neutral-900">
        {title}
      </h2>
    </div>
  );
}

function Field({ label, id, testId, value, onChange, type = "text", placeholder }) {
  return (
    <div>
      <Label htmlFor={id} className="text-sm text-neutral-700">
        {label}
      </Label>
      <Input
        id={id}
        data-testid={testId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 h-11 bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-emerald-500/40"
      />
    </div>
  );
}

function Row({ label, value, testId, accent }) {
  return (
    <div className="flex items-center justify-between" data-testid={testId}>
      <span className="text-neutral-600">{label}</span>
      <span className={accent ? "text-emerald-700" : "text-neutral-900"}>
        {value}
      </span>
    </div>
  );
}
