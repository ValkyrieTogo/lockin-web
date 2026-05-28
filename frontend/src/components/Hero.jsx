import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_IMG =
  "https://static.prod-images.emergentagent.com/jobs/d5f33ca5-0695-4e28-bd44-17f3f8fe1b8c/images/40ffef3e09b559fa1b49d93b9ac901ced08e1ed88aab915356003405adcf22b8.png";

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-28 md:pt-32 bg-white"
    >
      {/* Soft background wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-neutral-100 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-12 gap-10 items-center">
        {/* Left: content */}
        <div className="lg:col-span-6">
          <div
            data-testid="hero-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 text-xs uppercase tracking-[0.2em] text-neutral-700 shadow-sm"
          >
            <Sparkles size={12} className="text-emerald-600" />
            <span>The focus device</span>
          </div>

          <h1
            data-testid="hero-headline"
            className="font-display mt-6 text-5xl md:text-6xl lg:text-7xl xl:text-[88px] font-light tracking-tighter leading-[0.95] text-neutral-900 text-balance"
          >
            Focus,
            <br />
            <span className="italic font-extralight text-neutral-500">
              materialized.
            </span>
          </h1>

          <p
            data-testid="hero-subheadline"
            className="mt-8 text-lg md:text-xl text-neutral-600 font-light max-w-xl leading-relaxed"
          >
            Tap to disconnect. Lockin is a physical brick that instantly blocks
            distracting apps, websites and notifications — paired with a
            companion app that tracks every minute you reclaim.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              data-testid="hero-primary-cta"
              className="h-12 px-7 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 text-sm font-medium group"
            >
              <a href="#store" className="flex items-center gap-2">
                Get Lockin
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              data-testid="hero-secondary-cta"
              className="h-12 px-7 rounded-full bg-white border-neutral-300 text-neutral-900 hover:bg-neutral-50 hover:border-neutral-400 text-sm font-medium"
            >
              <a href="#how">See how it works</a>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-8">
            <div data-testid="hero-stat-1">
              <div className="font-display text-3xl font-light text-neutral-900">3.2h</div>
              <div className="text-xs uppercase tracking-[0.18em] text-neutral-500 mt-1">
                Avg. daily focus
              </div>
            </div>
            <div className="h-10 w-px bg-neutral-200" />
            <div data-testid="hero-stat-2">
              <div className="font-display text-3xl font-light text-neutral-900">42d</div>
              <div className="text-xs uppercase tracking-[0.18em] text-neutral-500 mt-1">
                Longest streak
              </div>
            </div>
            <div className="h-10 w-px bg-neutral-200 hidden sm:block" />
            <div className="hidden sm:block" data-testid="hero-stat-3">
              <div className="font-display text-3xl font-light text-neutral-900">12k+</div>
              <div className="text-xs uppercase tracking-[0.18em] text-neutral-500 mt-1">
                People locked in
              </div>
            </div>
          </div>
        </div>

        {/* Right: product image showcase */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-square w-full max-w-[620px] mx-auto">
            {/* halo */}
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-emerald-100 via-neutral-100 to-white blur-2xl opacity-80" />
            <div className="relative aspect-square rounded-[36px] overflow-hidden border border-neutral-200 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)] bg-neutral-50">
              <img
                src={HERO_IMG}
                alt="Lockin NFC brick beside a smartphone"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            {/* floating chip */}
            <div className="absolute -bottom-5 -left-3 md:-left-6 bg-white border border-neutral-200 rounded-2xl px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.06)] flex items-center gap-3">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-full border-2 border-emerald-500/70 pulse-ring" />
                <div className="absolute inset-0 rounded-full bg-emerald-500" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                  NFC ready
                </div>
                <div className="text-sm font-medium text-neutral-900">
                  Tap to Lockin
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
