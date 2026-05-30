import { ArrowUpRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UNIT_PRICE_IDR, ORIGINAL_PRICE_IDR, formatIDR } from "@/lib/format";

const PERKS = [
  "Aluminium unibody NFC brick",
  "Lifetime Lockin app access",
  "Strict mode + emergency unbrick",
  "Scheduled brick modes & alarm",
  "Streaks, badges & session reports",
  "Free shipping across Indonesia",
];

const MARKETPLACES = [
  {
    id: "tokopedia",
    label: "Buy on Tokopedia",
    href: "https://www.tokopedia.com",
    accent: "#03AC0E",
  },
  {
    id: "shopee",
    label: "Buy on Shopee",
    href: "https://shopee.co.id",
    accent: "#EE4D2D",
  },
];

export function Pricing() {
  const savings = Math.round(((ORIGINAL_PRICE_IDR - UNIT_PRICE_IDR) / ORIGINAL_PRICE_IDR) * 100);

  return (
    <section
      id="store"
      data-testid="pricing-section"
      className="relative py-20 md:py-28 bg-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] rounded-full bg-emerald-100/40 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="reveal text-xs md:text-sm uppercase tracking-[0.22em] text-emerald-700 mb-4 block">
            Store
          </span>
          <h2 className="clip-reveal font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter leading-tight text-neutral-900">
            <span className="cr-line">
              <span className="cr-inner">One device. A lifetime of focus.</span>
            </span>
          </h2>
          <p className="reveal mt-5 text-neutral-600 font-light">
            Ships across Indonesia. Free delivery, 30-day money-back guarantee.
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

              <div className="mt-6 flex items-baseline gap-3 flex-wrap">
                <div className="font-display text-5xl md:text-6xl tracking-tighter text-neutral-900">
                  {formatIDR(UNIT_PRICE_IDR)}
                </div>
                <div className="text-neutral-400 line-through text-lg">
                  {formatIDR(ORIGINAL_PRICE_IDR)}
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-emerald-700">
                  Save {savings}%
                </span>
              </div>

              <ul className="mt-8 space-y-3">
                {PERKS.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-neutral-700 text-sm">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                      <Check size={11} className="text-emerald-700" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                {MARKETPLACES.map((m) => (
                  <Button
                    key={m.id}
                    asChild
                    data-testid={`pricing-buy-${m.id}`}
                    className="flex-1 h-12 px-5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 text-sm font-medium"
                  >
                    <a href={m.href} target="_blank" rel="noopener noreferrer">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: m.accent }}
                        aria-hidden="true"
                      />
                      <span>{m.label}</span>
                      <ArrowUpRight size={14} className="opacity-70" />
                    </a>
                  </Button>
                ))}
              </div>

              <p className="mt-3 text-xs text-neutral-500">
                Same price on both stores. Marketplace buyer protection included.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-emerald-50 via-neutral-50 to-white border border-neutral-200 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
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
                    <div className="text-sm text-neutral-900 mt-1">Anodized aluminium</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                      Battery
                    </div>
                    <div className="text-sm text-neutral-900 mt-1">None required</div>
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
