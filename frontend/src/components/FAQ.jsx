import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What exactly is Lockin?",
    a: "Lockin is a small NFC-enabled physical brick that pairs with our companion app. Tap your phone to the brick to instantly block your distracting apps and websites. Tap again to unlock.",
  },
  {
    q: "Do I need to charge the brick?",
    a: "No. The Lockin brick is fully passive — no battery, no charging, no firmware updates. It works for life.",
  },
  {
    q: "Which phones work with Lockin?",
    a: "Any phone with NFC. That covers virtually all modern Android devices and iPhones from iPhone 7 onward.",
  },
  {
    q: "Can I cheat my way out?",
    a: "Strict mode prevents uninstalling Lockin while you're bricked, and locks permission changes. You also get 5 lifetime emergency unbricks for true emergencies.",
  },
  {
    q: "What does the app track?",
    a: "Total and average daily brick time, per-day session breakdowns, streaks, and unlocked badges. All session data is stored locally — your focus is private.",
  },
  {
    q: "When does it ship?",
    a: "Early 2026. Reserving today secures your spot in the first batch and the launch price of $89.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="relative py-20 md:py-28 bg-white"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="text-center reveal">
          <span className="text-xs md:text-sm uppercase tracking-[0.22em] text-emerald-700 mb-4 block">
            FAQ
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter leading-tight text-neutral-900">
            Questions, answered.
          </h2>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mt-10 reveal"
          data-testid="faq-accordion"
        >
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              data-testid={`faq-item-${i + 1}`}
              className="border-b border-neutral-200"
            >
              <AccordionTrigger className="font-display text-lg md:text-xl font-normal text-left hover:no-underline text-neutral-900 py-6">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-600 text-base leading-relaxed pb-6">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
