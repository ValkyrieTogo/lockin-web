"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type Feed = { icon: string; app: string; text: string; color: string };

const FEED: Feed[] = [
  { icon: "📸", app: "Instagram", text: "jaylen liked your photo", color: "#E1306C" },
  { icon: "🎵", app: "TikTok", text: "47 new videos for you", color: "#FE2C55" },
  { icon: "💬", app: "Messages", text: "Mom: did you eat?", color: "#34C759" },
  { icon: "📧", app: "Gmail", text: "Newsletter · 94 unread", color: "#EA4335" },
  { icon: "🐦", app: "X", text: "23 new mentions", color: "#1DA1F2" },
  { icon: "▶️", app: "YouTube", text: "8 recommendations", color: "#FF0000" },
  { icon: "💼", app: "Slack", text: "#general · 18 new", color: "#4A154B" },
  { icon: "🔗", app: "LinkedIn", text: "14 profile views", color: "#0077B5" },
];

type Item = Feed & { uid: number };
type Phase = "idle" | "flooding" | "clearing" | "locked";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function NotificationAvalanche({
  variant = "full",
}: {
  variant?: "full" | "relentless";
} = {}) {
  const phoneRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const [items, setItems] = useState<Item[]>([]);
  const [brand, setBrand] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const node = phoneRef.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let uid = 0;

    const push = (f: Feed) =>
      setItems((prev) => [{ ...f, uid: uid++ }, ...prev].slice(0, 5));

    async function play() {
      setPhase("flooding");
      // trickle in
      for (let i = 0; i < 3; i++) {
        if (cancelled) return;
        push(FEED[i]);
        await sleep(640);
      }
      await sleep(820);
      // escalate
      for (let i = 3; i < 6; i++) {
        if (cancelled) return;
        push(FEED[i]);
        await sleep(280);
      }
      await sleep(420);
      // rapid burst
      push(FEED[6]);
      await sleep(130);
      push(FEED[7]);
      await sleep(120);
      push(FEED[0]);
      if (cancelled) return;
      // shake under the weight
      await sleep(220);
      setShaking(true);
      await sleep(380);
      setShaking(false);
      await sleep(360);
      // the one tap
      if (cancelled) return;
      setBrand(true);
      await sleep(1300);
      // clear to calm
      if (cancelled) return;
      setPhase("clearing");
      await sleep(680);
      if (cancelled) return;
      setPhase("locked");
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        obs.disconnect();
        if (reduce) {
          if (variant === "relentless") {
            setItems(FEED.slice(0, 5).map((f, i) => ({ ...f, uid: i })));
          } else {
            setPhase("locked");
          }
          return;
        }
        void play();
      },
      { threshold: 0.5 },
    );
    obs.observe(node);

    return () => {
      cancelled = true;
      obs.disconnect();
    };
  }, []);

  const cleared = phase === "clearing" || phase === "locked";

  return (
    <div
      ref={phoneRef}
      data-testid="notification-avalanche"
      className="relative mx-auto h-[420px] w-[210px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0d] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.45)]"
    >
      {/* notch */}
      <div className="absolute left-1/2 top-2.5 z-30 h-4 w-16 -translate-x-1/2 rounded-full bg-black/80" />
      {/* clock */}
      <div className="pt-3.5 text-center text-3xl font-extralight tracking-tight text-white tabular-nums">
        9:41
      </div>

      {/* feed */}
      <div className={cn("av-feed mt-3 flex flex-col gap-2 px-2.5", shaking && "is-shaking")}>
        {brand && (
          <div
            className={cn(
              "av-notif flex items-center gap-2.5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-2",
              cleared && "is-cleared",
            )}
          >
            <Image
              src="/lockin-icon.png"
              alt=""
              width={24}
              height={24}
              className="rounded-md ring-1 ring-white/15"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[9px] uppercase tracking-wide text-emerald-300/80">Lockin</div>
              <div className="truncate text-[10px] text-white">Time to focus.</div>
            </div>
          </div>
        )}
        {items.map((n) => (
          <div
            key={n.uid}
            className={cn(
              "av-notif flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.07] px-2.5 py-2",
              cleared && "is-cleared",
            )}
          >
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[12px]"
              style={{ background: `${n.color}22` }}
            >
              {n.icon}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[9px] uppercase tracking-wide text-white/40">{n.app}</div>
              <div className="truncate text-[10px] text-white/85">{n.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* locked / calm state */}
      <div
        className={cn(
          "av-locked absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[#0b0b0d]",
          phase === "locked" && "is-on",
        )}
      >
        <Image
          src="/lockin-icon.png"
          alt="Lockin"
          width={46}
          height={46}
          className="rounded-[11px] ring-1 ring-white/15"
        />
        <div className="text-sm font-medium text-white/90">Locked in</div>
        <div className="font-display text-2xl tracking-tighter text-white tabular-nums">00:14:32</div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/35">focus session</div>
      </div>
    </div>
  );
}
