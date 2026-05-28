import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.4) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Stat({ value, suffix = "", label, testId }) {
  const [ref, inView] = useInView();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const startTs = performance.now();
    let raf;
    const tick = (ts) => {
      const p = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(start + eased * (value - start)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} data-testid={testId}>
      <div className="font-display text-5xl md:text-6xl font-light tracking-tighter">
        {count.toLocaleString()}
        <span className="text-emerald-400">{suffix}</span>
      </div>
      <div className="text-xs md:text-sm uppercase tracking-[0.22em] text-white/40 mt-3">
        {label}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section
      data-testid="social-proof-section"
      className="relative py-16 md:py-20 border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
        <Stat value={12480} suffix="+" label="Locked-in users" testId="stat-users" />
        <Stat value={3} suffix="M+" label="Distractions blocked" testId="stat-blocked" />
        <Stat value={42} suffix="d" label="Top streak" testId="stat-streak" />
        <Stat value={97} suffix="%" label="Stay focused" testId="stat-focused" />
      </div>
    </section>
  );
}
