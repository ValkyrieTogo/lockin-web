import { useState } from "react";
import { Check, Loader2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createOrder } from "@/lib/api";

const PERKS = [
  "Aluminium unibody NFC brick",
  "Lifetime Lockin app access",
  "Strict mode + emergency unbrick",
  "Scheduled brick modes & alarm",
  "Streaks, badges & session reports",
  "Free worldwide shipping",
];

export default function Pricing() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", quantity: 1 });
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please fill in your name and email");
      return;
    }
    setLoading(true);
    try {
      await createOrder({
        name: form.name,
        email: form.email,
        quantity: Number(form.quantity) || 1,
        variant: "lockin-classic",
      });
      setDone(true);
      toast.success("You're on the list!", {
        description: "We'll email you when Lockin ships.",
      });
    } catch (err) {
      toast.error("Couldn't place reservation", {
        description: err?.response?.data?.detail || "Try again in a moment.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="store"
      data-testid="pricing-section"
      className="relative py-20 md:py-28 bg-white overflow-hidden"
    >
      {/* Soft accent backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] rounded-full bg-emerald-100/40 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto reveal">
          <span className="text-xs md:text-sm uppercase tracking-[0.22em] text-emerald-700 mb-4 block">
            Store
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter leading-tight text-neutral-900">
            One device. A lifetime of focus.
          </h2>
          <p className="mt-5 text-neutral-600 font-light">
            Reserve your Lockin today. Ships in early 2026.
          </p>
        </div>

        <div className="mt-12 max-w-5xl mx-auto reveal">
          <div className="rounded-[28px] bg-white border border-neutral-200 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.18)] p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[11px] uppercase tracking-[0.2em]">
                Limited launch batch
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-medium mt-5 text-neutral-900">
                Lockin <span className="text-neutral-400">Classic</span>
              </h3>

              <div className="mt-6 flex items-baseline gap-3">
                <div className="font-display text-5xl md:text-6xl tracking-tighter text-neutral-900">
                  $89
                </div>
                <div className="text-neutral-400 line-through text-lg">
                  $119
                </div>
                <span className="ml-2 text-xs uppercase tracking-[0.2em] text-emerald-700">
                  Save 25%
                </span>
              </div>

              <ul className="mt-8 space-y-3">
                {PERKS.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 text-neutral-700 text-sm"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                      <Check size={11} className="text-emerald-700" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <Dialog
                open={open}
                onOpenChange={(o) => {
                  setOpen(o);
                  if (!o) setDone(false);
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    data-testid="pricing-buy-button"
                    className="mt-10 h-12 px-7 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 text-sm font-medium"
                  >
                    <ShoppingBag size={16} className="mr-2" />
                    Reserve yours
                  </Button>
                </DialogTrigger>
                <DialogContent
                  data-testid="order-dialog"
                  className="bg-white border-neutral-200 text-neutral-900 max-w-md"
                >
                  {!done ? (
                    <form onSubmit={handleSubmit}>
                      <DialogHeader>
                        <DialogTitle className="font-display text-2xl font-medium text-neutral-900">
                          Reserve your Lockin
                        </DialogTitle>
                        <DialogDescription className="text-neutral-600">
                          We'll email you the moment your Lockin is ready to
                          ship. No payment required today.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label htmlFor="name" className="text-neutral-700 text-sm">
                            Full name
                          </Label>
                          <Input
                            id="name"
                            data-testid="order-input-name"
                            value={form.name}
                            onChange={(e) =>
                              setForm({ ...form, name: e.target.value })
                            }
                            placeholder="Ada Lovelace"
                            className="mt-1 bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-emerald-500/40"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-neutral-700 text-sm">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            data-testid="order-input-email"
                            value={form.email}
                            onChange={(e) =>
                              setForm({ ...form, email: e.target.value })
                            }
                            placeholder="you@focus.com"
                            className="mt-1 bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-emerald-500/40"
                          />
                        </div>
                        <div>
                          <Label htmlFor="qty" className="text-neutral-700 text-sm">
                            Quantity
                          </Label>
                          <Input
                            id="qty"
                            type="number"
                            min={1}
                            max={10}
                            data-testid="order-input-quantity"
                            value={form.quantity}
                            onChange={(e) =>
                              setForm({ ...form, quantity: e.target.value })
                            }
                            className="mt-1 bg-white border-neutral-200 text-neutral-900 focus-visible:ring-emerald-500/40"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          disabled={loading}
                          data-testid="order-submit-button"
                          className="w-full h-11 rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
                        >
                          {loading ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            "Confirm reservation"
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  ) : (
                    <div className="py-6 text-center" data-testid="order-success">
                      <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto">
                        <Check size={22} className="text-emerald-700" />
                      </div>
                      <h3 className="font-display text-2xl font-medium mt-5 text-neutral-900">
                        You're locked in.
                      </h3>
                      <p className="text-neutral-600 mt-2 text-sm">
                        We'll send you a confirmation at{" "}
                        <span className="text-neutral-900">{form.email}</span>.
                      </p>
                      <Button
                        onClick={() => setOpen(false)}
                        data-testid="order-close-button"
                        className="mt-6 rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
                      >
                        Close
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>

            {/* Product visual */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-emerald-50 via-neutral-50 to-white border border-neutral-200 overflow-hidden relative">
                <img
                  src="https://static.prod-images.emergentagent.com/jobs/d5f33ca5-0695-4e28-bd44-17f3f8fe1b8c/images/cdb39427104441ddc838273884871cad5d5e77d70aa542c227568a3c868632e0.png"
                  alt="Lockin product"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between bg-white/85 backdrop-blur-md rounded-2xl px-4 py-3 border border-neutral-200">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                      Material
                    </div>
                    <div className="text-sm text-neutral-900 mt-1">
                      Anodized aluminium
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                      Battery
                    </div>
                    <div className="text-sm text-neutral-900 mt-1">
                      None required
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
