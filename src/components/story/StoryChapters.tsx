import type { CSSProperties } from "react";
import Image from "next/image";
import { Shield, Flame, Award, KeyRound, DoorOpen, MoonStar } from "lucide-react";

import { NotificationAvalanche } from "@/components/NotificationAvalanche";

const MODES = [
  { name: "Deep Work", rule: "allow only", apps: ["Docs", "Figma", "Mail"] },
  { name: "Sleep", rule: "block", apps: ["Everything"] },
  { name: "Studio", rule: "block", apps: ["Socials", "News", "Shorts"] },
];

const WEEK = [
  { d: "Mon", w: 82 },
  { d: "Tue", w: 60 },
  { d: "Wed", w: 94 },
  { d: "Thu", w: 71 },
  { d: "Fri", w: 66 },
  { d: "Sat", w: 38 },
  { d: "Sun", w: 88 },
];

const PRIVACY = ["no internet", "no servers", "no analytics", "no trace"];

const MARKETPLACES = [
  { id: "tokopedia", label: "Tokopedia", href: "https://www.tokopedia.com", accent: "#03AC0E" },
  { id: "shopee", label: "Shopee", href: "https://shopee.co.id", accent: "#EE4D2D" },
];

export function StoryChapters() {
  return (
    <>
      {/* 01 — THE GLARE */}
      <section data-chapter="01" className="story-chapter story-bright">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="story-eyebrow mb-6">The problem</div>
            <h2 className="story-pull">Your phone is a light that never turns off.</h2>
            <p className="story-sub mt-7">
              Every ping is a small flash in the dark. By noon you have been pulled away a hundred
              times and called it a normal Tuesday.
            </p>
            <div className="story-mono mt-9" style={{ color: "#7a7f86" }}>
              STATE / OPEN
            </div>
          </div>
          <div className="flex justify-center">
            <div className="story-fade">
              <NotificationAvalanche variant="relentless" />
            </div>
          </div>
        </div>
      </section>

      {/* 02 — DISTRACTION IS LOUD */}
      <section data-chapter="02" className="story-chapter story-dusk">
        <div className="w-full max-w-5xl">
          <div className="story-eyebrow mb-6" style={{ color: "#cdd2cd" }}>
            The reframe
          </div>
          <h2 className="story-pull" style={{ color: "#f4f4f2" }}>
            Focus was never quiet.
            <br />
            <em>So we made silence physical.</em>
          </h2>
          <p className="story-sub mt-7" style={{ color: "rgba(244,244,242,0.7)" }}>
            Not another app screaming for attention inside the thing that steals it. A brick of
            aluminium that ends the noise the moment you touch it.
          </p>
        </div>
      </section>

      {/* 03 — THE TAP (the spine) */}
      <section data-chapter="03" className="story-chapter story-tap" style={{ padding: 0 }}>
        <div className="st-bright">
          <div className="story-mono" style={{ color: "#9aa0a6" }}>
            NFC · TAP TO LOCKIN
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 12vw, 8rem)",
              color: "#15171a",
              lineHeight: 1,
              fontWeight: 500,
            }}
          >
            tap<span style={{ color: "#10b981" }}>.</span>
          </div>
          <div className="story-mono" style={{ color: "#9aa0a6" }}>
            place phone to brick
          </div>
        </div>
        <div className="st-void">
          <div className="story-eyebrow">Locked in</div>
          <h2 className="story-pull in-view" style={{ textAlign: "center" }}>
            Tap the brick.
            <br />
            The lights go off.
          </h2>
          <p className="story-sub" style={{ textAlign: "center", margin: "0 auto" }}>
            Chosen apps and sites vanish. Notifications fall silent. The screen turns dark. A
            stopwatch starts counting the time you just took back.
          </p>
          <div
            className="story-mono mt-3 inline-flex items-center gap-2"
            style={{ color: "#34d399" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
            00:00:00 · session live
          </div>
        </div>
      </section>

      {/* 04 — MODES OF YOU */}
      <section data-chapter="04" className="story-chapter">
        <div className="w-full max-w-6xl">
          <div className="story-eyebrow mb-6">Brick Modes</div>
          <h2 className="story-pull">
            Build a darkness
            <br />
            that fits the moment.
          </h2>
          <p className="story-sub mt-7">
            Name a mode, hand it a list. Whitelist to allow only what matters, or blacklist to bury
            what does not. Switch the version of you with a tap.
          </p>
          <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl">
            {MODES.map((m, i) => (
              <div key={m.name} className={`story-card story-fade d${i + 1} p-5`}>
                <div
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-2xl text-[#ecefec]"
                >
                  {m.name}
                </div>
                <div
                  className="story-mono mt-1"
                  style={{ color: m.rule === "allow only" ? "#34d399" : "#8a938e" }}
                >
                  {m.rule}
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {m.apps.map((a) => (
                    <span key={a} className="story-chip text-xs py-1.5">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — IT STARTS WITHOUT YOU */}
      <section data-chapter="05" className="story-chapter">
        <div className="w-full max-w-5xl">
          <div className="story-eyebrow mb-6">Schedules</div>
          <h2 className="story-pull">The dark can arrive on schedule.</h2>
          <p className="story-sub mt-7">
            Pick the hours, pick the days, pick the mode. Lockin starts the session for you, and ends
            it when the clock says so, or when you finally tap back.
          </p>
          <div className="story-card story-fade mt-12 p-6 max-w-2xl">
            <div className="flex items-center justify-between">
              <span className="story-mono">Deep Work</span>
              <span className="story-mono" style={{ color: "#8a938e" }}>
                Mon–Fri
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span
                  key={i}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium"
                  style={{
                    background: i < 5 ? "rgba(16,185,129,0.14)" : "transparent",
                    color: i < 5 ? "#34d399" : "#5a625d",
                    border: "1px solid " + (i < 5 ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.07)"),
                  }}
                >
                  {d}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <span className="story-mono">09:00</span>
              <div className="story-fade flex-1 h-2 rounded-full overflow-hidden bg-white/5">
                <div className="story-bar h-full" style={{ "--bar-w": "100%" } as CSSProperties} />
              </div>
              <span
                className="story-mono px-2 py-1 rounded"
                style={{ color: "#34d399", border: "1px solid rgba(16,185,129,0.3)" }}
              >
                ON TAP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — WAKE INTO FOCUS */}
      <section data-chapter="06" className="story-chapter">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="story-eyebrow mb-6">Alarm</div>
            <h2 className="story-pull">An alarm you cannot scroll away from.</h2>
            <p className="story-sub mt-7">
              It rings at the time you set and stops only when you tap the brick. No snooze spiral. It
              even warns you the night before, so morning is never a fight.
            </p>
            <div className="story-mono mt-6" style={{ color: "#5a625d" }}>
              + a separate emergency credit, just for alarms
            </div>
          </div>
          <div className="flex justify-center">
            <div className="story-fade relative flex items-center justify-center w-64 h-64">
              <div className="breathe-ring" style={{ width: "70%", height: "70%" }} />
              <div className="breathe-ring" style={{ width: "100%", height: "100%", animationDelay: "0.6s" }} />
              <div className="relative text-center">
                <div
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-6xl text-[#ecefec] tracking-tight tabular-nums"
                >
                  06:30
                </div>
                <div className="mt-3 story-mono" style={{ color: "#34d399" }}>
                  tap to stop
                </div>
                <div
                  className="mt-2 inline-block story-mono px-2.5 py-1 rounded line-through"
                  style={{ color: "#4a4f55", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  snooze
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — EVEN THE DARK HAS DOORS */}
      <section data-chapter="07" className="story-chapter">
        <div className="w-full max-w-5xl">
          <div className="story-eyebrow mb-6">Breaks & emergencies</div>
          <h2 className="story-pull">Discipline, with an exit you can trust.</h2>
          <p className="story-sub mt-7">
            Schedule five to fifteen minute openings for the things that cannot wait. Keep five
            lifetime emergency unlocks in reserve, and a separate one just for alarms.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-10">
            <div className="story-fade flex items-center gap-3">
              <DoorOpen size={20} className="text-[#34d399]" />
              <div>
                <div className="story-mono" style={{ color: "#8a938e" }}>
                  scheduled break
                </div>
                <div
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-3xl text-[#ecefec] tabular-nums"
                >
                  10:00
                </div>
              </div>
            </div>
            <div className="story-fade d1">
              <div className="story-mono mb-2 flex items-center gap-2" style={{ color: "#8a938e" }}>
                <KeyRound size={13} className="text-[#34d399]" /> emergency unbrick
              </div>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-10 rounded-full"
                    style={{ background: i < 4 ? "#10b981" : "rgba(255,255,255,0.12)" }}
                  />
                ))}
                <span className="story-mono ml-3" style={{ color: "#8a938e" }}>
                  4 / 5 lifetime
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08 — NOTHING SLIPS PAST */}
      <section data-chapter="08" className="story-chapter">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="story-eyebrow mb-6">Strict mode</div>
            <h2 className="story-pull">
              While you focus,
              <br />
              Lockin guards the door.
            </h2>
            <p className="story-sub mt-7">
              Strict Mode blocks uninstalling the app and changing its permissions mid session. Every
              silenced notification is kept, ready for you to review when you choose.
            </p>
            <div className="mt-7 flex items-center gap-3 story-fade">
              <Shield size={18} className="text-[#34d399]" />
              <span className="story-mono" style={{ color: "#8a938e" }}>
                uninstall locked · permissions locked
              </span>
            </div>
          </div>
          <div className="story-fade story-card p-5 max-w-sm w-full">
            <div className="story-mono mb-3" style={{ color: "#5a625d" }}>
              held, not shown
            </div>
            <div className="flex flex-col gap-2">
              {["Instagram", "Slack", "TikTok", "Gmail"].map((a, i) => (
                <div
                  key={a}
                  className="flex items-center justify-between px-3 py-2 rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    opacity: 1 - i * 0.16,
                  }}
                >
                  <span className="text-sm text-[#ecefec]/80">{a}</span>
                  <span className="story-mono" style={{ color: "#5a625d" }}>
                    held
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 09 — THE TIME YOU TOOK BACK */}
      <section data-chapter="09" className="story-chapter">
        <div className="w-full max-w-6xl">
          <div className="story-eyebrow mb-6">Your progress</div>
          <h2 className="story-pull">
            You can finally see
            <br />
            the hours you kept.
          </h2>
          <p className="story-sub mt-7">
            Total and average focus time today, day by day. Streaks for every consecutive day you
            show up, badges as the minutes add up. Proof, not pressure.
          </p>

          <div className="mt-12 grid lg:grid-cols-3 gap-5 max-w-4xl">
            <div className="story-card story-fade p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-5">
                <span className="story-mono" style={{ color: "#8a938e" }}>
                  this week
                </span>
                <span className="story-mono" style={{ color: "#34d399" }}>
                  18h 42m
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                {WEEK.map((row) => (
                  <div key={row.d} className="flex items-center gap-3">
                    <span className="story-mono w-8" style={{ color: "#5a625d" }}>
                      {row.d}
                    </span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden bg-white/5">
                      <div className="story-bar h-full" style={{ "--bar-w": `${row.w}%` } as CSSProperties} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="story-card story-fade d1 p-6 flex flex-col justify-center items-center text-center">
              <Flame size={22} className="text-[#34d399]" />
              <div
                style={{ fontFamily: "var(--font-display)" }}
                className="text-5xl text-[#ecefec] mt-2 tabular-nums"
              >
                27
              </div>
              <div className="story-mono mt-1" style={{ color: "#8a938e" }}>
                day streak
              </div>
              <div className="flex gap-2 mt-5">
                {[Award, Award, Award].map((Ic, i) => (
                  <span
                    key={i}
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)" }}
                  >
                    <Ic size={15} className="text-[#34d399]" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — IT NEVER LEAVES THE ROOM */}
      <section data-chapter="10" className="story-chapter">
        <div className="w-full max-w-4xl">
          <div className="story-eyebrow mb-6" style={{ color: "#8a938e" }}>
            <span style={{ color: "#8a938e" }}>Privacy</span>
          </div>
          <h2 className="story-pull" style={{ color: "#cdd2cd" }}>
            What happens in the dark
            <br />
            stays in the dark.
          </h2>
          <p className="story-sub mt-7">
            Lockin runs fully on your device. No internet permission, no servers, no analytics, no
            ads. Your focus is yours. Nothing ever leaves your phone.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3">
            {PRIVACY.map((p, i) => (
              <span
                key={p}
                className={`story-mono story-fade d${i} flex items-center gap-2`}
                style={{ color: "#8a938e" }}
              >
                <MoonStar size={13} style={{ color: "#5a625d" }} />
                {p}
              </span>
            ))}
          </div>
          <div className="story-mono mt-10" style={{ color: "#5a625d" }}>
            NO SIGNAL · com.lockin.tap
          </div>
        </div>
      </section>

      {/* 11 — LIGHTS OFF (store / CTA) */}
      <section data-chapter="11" className="story-chapter">
        <div className="w-full max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="story-fade relative flex items-center justify-center mb-8">
            <div className="breathe-aura absolute -inset-10 rounded-full pointer-events-none" />
            <Image
              src="/lockin-icon.png"
              alt="Lockin"
              width={72}
              height={72}
              className="relative rounded-[16px] ring-1 ring-white/15"
            />
          </div>
          <div className="story-eyebrow mb-5 justify-center">Get Lockin</div>
          <h2 className="story-pull" style={{ textAlign: "center" }}>
            One tap is all it takes
            <br />
            <em>to go dark.</em>
          </h2>
          <p className="story-sub mt-6 mx-auto">
            The aluminium brick and the Lockin app. Free shipping, thirty day return.
          </p>
          <div className="story-fade mt-7 flex items-baseline gap-3 justify-center">
            <span
              style={{ fontFamily: "var(--font-display)" }}
              className="text-4xl text-[#ecefec] tabular-nums"
            >
              Rp 1.399.000
            </span>
            <span className="story-mono line-through" style={{ color: "#5a625d" }}>
              Rp 1.899.000
            </span>
          </div>
          <div className="story-fade d1 mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {MARKETPLACES.map((m) => (
              <a
                key={m.id}
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full text-sm font-medium transition-colors"
                style={{ background: "#ecefec", color: "#0b0b0d" }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: m.accent }} />
                Buy on {m.label}
              </a>
            ))}
          </div>
          <div className="mt-16 pt-7 w-full border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <a href="/" className="story-mono hover:text-[#ecefec] transition-colors">
                ← lockintap.com
              </a>
              <a
                href="mailto:support@lockintap.com"
                className="story-mono hover:text-[#ecefec] transition-colors"
              >
                support@lockintap.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
