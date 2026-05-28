import { Smartphone, Hand, Lock } from "lucide-react";

const HOW_IMG =
  "https://static.prod-images.emergentagent.com/jobs/d5f33ca5-0695-4e28-bd44-17f3f8fe1b8c/images/929d1d792cddf2b0fa5c7c6496a7a8417daf2a5de820b4f1e6164f96d7d3e0ba.png";

const steps = [
  {
    n: "01",
    icon: Smartphone,
    title: "Open Lockin",
    body: "Launch the app and pick a brick mode — whitelist, blacklist, or a custom preset.",
    testId: "how-step-1",
  },
  {
    n: "02",
    icon: Hand,
    title: "Tap to Lockin",
    body: "Hit the big focus button (or skip it). The app waits for the brick.",
    testId: "how-step-2",
  },
  {
    n: "03",
    icon: Lock,
    title: "Tap to the Brick",
    body: "Touch your phone to the NFC brick. The screen switches to dark mode and the stopwatch starts.",
    testId: "how-step-3",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      data-testid="how-it-works-section"
      className="relative py-20 md:py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl reveal">
          <span className="text-xs md:text-sm uppercase tracking-[0.22em] text-emerald-700 mb-4 block">
            How it works
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter leading-tight text-neutral-900">
            Three taps to a quieter mind.
          </h2>
          <p className="mt-6 text-lg text-neutral-600 font-light max-w-2xl">
            Lockin is built around a single ritual: place your phone on the
            brick to enter deep work, tap again to come back.
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative reveal">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-neutral-200 bg-neutral-50 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.12)]">
              <img
                src={HOW_IMG}
                alt="Tap your phone to the Lockin brick"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-2 border-emerald-500 pulse-ring" />
                  <div className="absolute inset-3 rounded-full border-2 border-emerald-500/60 pulse-ring [animation-delay:0.6s]" />
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-5">
            {steps.map((s, i) => (
              <div
                key={s.n}
                data-testid={s.testId}
                className="reveal card-light rounded-2xl p-6 md:p-8 transition-all duration-500"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    <s.icon size={20} className="text-emerald-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-xs text-neutral-400 tracking-[0.2em]">
                        {s.n}
                      </span>
                      <h3 className="font-display text-xl md:text-2xl font-medium text-neutral-900">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-neutral-600 leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
