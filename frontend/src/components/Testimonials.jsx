import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "I used to lose two hours a day to Instagram. After a week with Lockin, my screen time dropped by 71%. The brick just works.",
    name: "Maya R.",
    role: "Product Designer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDB8fHx8MTc3OTg4NzU2Mnww&ixlib=rb-4.1.0&q=85",
  },
  {
    quote:
      "The morning alarm that only ends when you tap the brick changed my life. No more doomscrolling in bed.",
    name: "Daniel K.",
    role: "Software Engineer",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDB8fHx8MTc3OTg4NzU2Mnww&ixlib=rb-4.1.0&q=85",
  },
  {
    quote:
      "Strict mode means I can't talk myself out of it. As a writer, that's everything. My streak is at 38 days.",
    name: "Sofía L.",
    role: "Novelist",
    avatar:
      "https://images.unsplash.com/photo-1607503873903-c5e95f80d7b9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDB8fHx8MTc3OTg4NzU2Mnww&ixlib=rb-4.1.0&q=85",
  },
];

export default function Testimonials() {
  return (
    <section
      data-testid="testimonials-section"
      className="relative py-24 md:py-40 bg-[#0B0B0D]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 reveal">
          <div className="max-w-2xl">
            <span className="text-xs md:text-sm uppercase tracking-[0.22em] text-emerald-400/80 mb-4 block">
              From the locked-in
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter leading-tight">
              Quiet phones.
              <br />
              <span className="text-white/50">Loud results.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-emerald-400 text-emerald-400" />
              ))}
            </div>
            <span>4.9 average from 1,200+ early adopters</span>
          </div>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              data-testid={`testimonial-${i + 1}`}
              className="reveal glass-card rounded-3xl p-8 flex flex-col transition-all duration-500 hover:bg-white/[0.05]"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={13}
                    className="fill-emerald-400 text-emerald-400"
                  />
                ))}
              </div>
              <blockquote className="text-white/80 leading-relaxed text-base md:text-lg font-light flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 pt-6 border-t border-white/5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
                <div>
                  <div className="text-sm text-white">{t.name}</div>
                  <div className="text-xs text-white/45">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
