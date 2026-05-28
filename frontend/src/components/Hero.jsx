import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_IMG =
  "https://static.prod-images.emergentagent.com/jobs/d5f33ca5-0695-4e28-bd44-17f3f8fe1b8c/images/40ffef3e09b559fa1b49d93b9ac901ced08e1ed88aab915356003405adcf22b8.png";

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-28 md:pt-32"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Lockin NFC brick beside a smartphone"
          className="w-full h-full object-cover object-center opacity-70"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/55 to-[#0A0A0B]/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.18),transparent_55%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">
          <div
            data-testid="hero-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-xs uppercase tracking-[0.2em] text-white/70"
          >
            <Sparkles size={12} className="text-emerald-400" />
            <span>The focus device</span>
          </div>

          <h1
            data-testid="hero-headline"
            className="font-display mt-6 text-5xl md:text-7xl lg:text-[88px] font-light tracking-tighter leading-[0.95] text-balance"
          >
            Focus,
            <br />
            <span className="italic font-extralight text-white/80">
              materialized.
            </span>
          </h1>

          <p
            data-testid="hero-subheadline"
            className="mt-8 text-lg md:text-xl text-white/65 font-light max-w-xl leading-relaxed"
          >
            Tap to disconnect. Lockin is a physical brick that instantly blocks
            distracting apps, websites and notifications — paired with a
            companion app that tracks every minute you reclaim.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              data-testid="hero-primary-cta"
              className="h-12 px-7 rounded-full bg-white text-black hover:bg-white/90 text-sm font-medium group"
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
              className="h-12 px-7 rounded-full bg-transparent border-white/20 text-white hover:bg-white/5 hover:border-white/40 hover:text-white text-sm font-medium"
            >
              <a href="#how">See how it works</a>
            </Button>
          </div>

          <div className="mt-16 flex items-center gap-8">
            <div data-testid="hero-stat-1">
              <div className="font-display text-3xl font-light">3.2h</div>
              <div className="text-xs uppercase tracking-[0.18em] text-white/40 mt-1">
                Avg. daily focus
              </div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div data-testid="hero-stat-2">
              <div className="font-display text-3xl font-light">42d</div>
              <div className="text-xs uppercase tracking-[0.18em] text-white/40 mt-1">
                Longest streak
              </div>
            </div>
            <div className="h-10 w-px bg-white/10 hidden sm:block" />
            <div className="hidden sm:block" data-testid="hero-stat-3">
              <div className="font-display text-3xl font-light">12k+</div>
              <div className="text-xs uppercase tracking-[0.18em] text-white/40 mt-1">
                People locked in
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/40">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}
