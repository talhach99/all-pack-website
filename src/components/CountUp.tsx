'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * A number that counts up from 0 when it scrolls into view.
 * The final value is rendered on the server, so search engines and visitors without JavaScript
 * see the real figure; people who prefer reduced motion see it without animation.
 */
export function CountUp({ value, suffix = '', duration = 1600 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    setShown(0);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); };
  }, [value, duration]);

  return <span ref={ref} className="tabular-nums">{shown}{suffix}</span>;
}
