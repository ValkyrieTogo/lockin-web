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
      className="relative py-20 md:py-28 bg-[#F5F5F7]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 reveal">
          <div className="max-w-2xl">
            <span className="text-xs md:text-sm uppercase tracking-[0.22em] text-emerald-700 mb-4 block">
              From the locked-in
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter leading-tight text-neutral-900">
              Quiet phones.
              <br />
              <span className="text-neutral-500">Loud results.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-neutral-600 text-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-emerald-600 text-emerald-600" />
              ))}
            </div>
            <span>4.9 average from 1,200+ early adopters</span>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-5 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              data-testid={`testimonial-${i + 1}`}
              className="reveal card-light rounded-3xl p-8 flex flex-col transition-all duration-500"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={13}
                    className="fill-emerald-600 text-emerald-600"
                  />
                ))}
              </div>
              <blockquote className="text-neutral-800 leading-relaxed text-base md:text-lg font-light flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 pt-6 border-t border-neutral-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                />
                <div>
                  <div className="text-sm text-neutral-900">{t.name}</div>
                  <div className="text-xs text-neutral-500">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
