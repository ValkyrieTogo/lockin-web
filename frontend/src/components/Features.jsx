import {
  Lock,
  Timer,
  Bell,
  CalendarClock,
  AlarmClock,
  Flame,
  Trophy,
  ShieldCheck,
  KeyRound,
  EyeOff,
} from "lucide-react";

const GAMIFY_IMG =
  "https://static.prod-images.emergentagent.com/jobs/d5f33ca5-0695-4e28-bd44-17f3f8fe1b8c/images/5f868273e9010879bd93989bddc4b1737e72572b188557693a241e7770d85d49.png";

export default function Features() {
  return (
    <section
      id="features"
      data-testid="features-section"
      className="relative py-24 md:py-40 bg-[#0B0B0D]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl reveal">
          <span className="text-xs md:text-sm uppercase tracking-[0.22em] text-emerald-400/80 mb-4 block">
            Capabilities
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter leading-tight">
            A whole focus system,
            <br />
            <span className="text-white/50">in one tap.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {/* Card 1: Bricking (large) */}
          <div
            data-testid="feature-bricking"
            className="reveal md:col-span-2 glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden group transition-all duration-500 hover:bg-white/[0.045]"
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-6">
              <Lock size={18} className="text-emerald-400" />
              <span className="text-xs uppercase tracking-[0.22em] text-white/40">
                Bricking
              </span>
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-light tracking-tight">
              Block what breaks your focus.
            </h3>
            <p className="mt-4 text-white/55 max-w-lg">
              Curate apps and websites that disappear the moment your phone
              touches the brick. Notifications go silent. The theme flips
              dark. A stopwatch starts counting your time saved.
            </p>

            {/* Mock stopwatch */}
            <div className="mt-8 inline-flex items-center gap-4 px-5 py-3 rounded-2xl bg-black/40 border border-white/10">
              <Timer size={16} className="text-emerald-400" />
              <div className="font-display text-2xl tracking-tighter">
                01:42:08
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                Locked in
              </span>
            </div>
          </div>

          {/* Card 2: Notifications */}
          <div
            data-testid="feature-notifications"
            className="reveal glass-card rounded-3xl p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.045]"
          >
            <Bell size={20} className="text-emerald-400 mb-6" />
            <h3 className="font-display text-2xl font-medium">
              Silenced notifications
            </h3>
            <p className="mt-3 text-white/55">
              Every blocked app's notifications are intercepted. View them
              later in one tidy log — never as an interruption.
            </p>
            <div className="mt-6 space-y-2">
              {["Instagram", "Twitter", "TikTok"].map((n, i) => (
                <div
                  key={n}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5"
                  style={{ opacity: 1 - i * 0.25 }}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-sm text-white/70">{n}</span>
                  <EyeOff size={12} className="ml-auto text-white/30" />
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Scheduled Bricking */}
          <div
            data-testid="feature-scheduled"
            className="reveal glass-card rounded-3xl p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.045]"
          >
            <CalendarClock size={20} className="text-emerald-400 mb-6" />
            <h3 className="font-display text-2xl font-medium">
              Scheduled brick modes
            </h3>
            <p className="mt-3 text-white/55">
              Build presets — whitelist or blacklist — and assign them to
              calendar slots. Mornings deep work, evenings social.
            </p>

            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] border border-white/5">
                <span className="text-white/80">Deep Work</span>
                <span className="text-white/40 text-xs">
                  Mon–Fri · 9:00–12:00
                </span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] border border-white/5">
                <span className="text-white/80">Sleep</span>
                <span className="text-white/40 text-xs">Daily · 22:00–07:00</span>
              </div>
            </div>
          </div>

          {/* Card 4: Alarm (large with image) */}
          <div
            data-testid="feature-alarm"
            className="reveal md:col-span-2 glass-card rounded-3xl p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.045] relative overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <AlarmClock size={20} className="text-emerald-400 mb-6" />
                <h3 className="font-display text-2xl md:text-3xl font-medium">
                  Wake up with a tap.
                </h3>
                <p className="mt-3 text-white/55">
                  Set an alarm that only ends when you tap your phone to the
                  brick. No more snooze, no scrolling in bed.
                </p>
                <div className="mt-6 flex items-center gap-3 text-white/60">
                  <div className="font-display text-4xl tracking-tighter">
                    06:30
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Mon–Fri
                  </span>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 aspect-square">
                <img
                  src={GAMIFY_IMG}
                  alt="Gamification UI"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Card 5: Gamification */}
          <div
            data-testid="feature-gamification"
            className="reveal glass-card rounded-3xl p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.045]"
          >
            <Flame size={20} className="text-emerald-400 mb-6" />
            <h3 className="font-display text-2xl font-medium">Streaks & badges</h3>
            <p className="mt-3 text-white/55">
              Earn streaks for consecutive focus days. Unlock badges as your
              session totals grow.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[Flame, Trophy, ShieldCheck].map((Ic, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
                >
                  <Ic size={16} className="text-emerald-400" />
                </div>
              ))}
              <div className="ml-2 font-display text-xl text-white/80">
                42<span className="text-white/40 text-base"> day streak</span>
              </div>
            </div>
          </div>

          {/* Card 6: Strict mode */}
          <div
            data-testid="feature-strict"
            className="reveal glass-card rounded-3xl p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.045]"
          >
            <ShieldCheck size={20} className="text-emerald-400 mb-6" />
            <h3 className="font-display text-2xl font-medium">Strict mode</h3>
            <p className="mt-3 text-white/55">
              Lockin defends itself. While you're bricked, the app can't be
              uninstalled and permissions can't be tampered with.
            </p>
          </div>

          {/* Card 7: Emergency unbrick */}
          <div
            data-testid="feature-emergency"
            className="reveal glass-card rounded-3xl p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.045]"
          >
            <KeyRound size={20} className="text-emerald-400 mb-6" />
            <h3 className="font-display text-2xl font-medium">
              Emergency unbrick
            </h3>
            <p className="mt-3 text-white/55">
              Five lifetime escape hatches for true emergencies. Separate
              alarm credits keep mornings safe.
            </p>
            <div className="mt-6 flex items-center gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${
                    i < 4 ? "bg-emerald-400" : "bg-white/15"
                  }`}
                />
              ))}
              <span className="ml-3 text-xs text-white/50">4 / 5 left</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
