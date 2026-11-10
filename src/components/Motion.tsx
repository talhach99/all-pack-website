'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Site-wide motion: scroll reveals with stagger, count-up numbers,
 * scroll progress bar and header state. Content stays fully visible without JS.
 */
export function Motion() {
  const path = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.classList.add('motion-on');

    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section')).slice(1);
    const targets: HTMLElement[] = [];
    sections.forEach(sec => {
      const groups = sec.querySelectorAll<HTMLElement>(':scope .container-x > *, .grid > *, ol > li, dl > div');
      let i = 0;
      groups.forEach(el => {
        if (el.closest('[data-no-reveal]') || el.classList.contains('rv')) return;
        el.classList.add('rv');
        el.style.setProperty('--rv-d', `${Math.min(i++ % 8, 7) * 70}ms`);
        targets.push(el);
      });
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('rv-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    targets.forEach(t => io.observe(t));

    // count-up for [data-count]
    const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
    const cio = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement; cio.unobserve(el);
        const end = Number(el.dataset.count); const suffix = el.dataset.suffix || '';
        const t0 = performance.now(); const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min((t - t0) / dur, 1); const v = Math.round(end * (1 - Math.pow(1 - p, 3)));
          el.textContent = `${v}${suffix}`; if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: .6 });
    counters.forEach(c => cio.observe(c));

    return () => { io.disconnect(); cio.disconnect(); };
  }, [path]);

  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      if (bar) bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
      document.documentElement.classList.toggle('scrolled', scrollY > 12);
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return <div id="scroll-progress" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-cyan to-brand" aria-hidden="true" />;
}

/** Infinite horizontal ticker. Pure CSS, works without JS. */
export function Marquee({ items, className = '', itemClass = '', sep = true }: { items: string[]; className?: string; itemClass?: string; sep?: boolean }) {
  const row = (aria: boolean) => (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={aria || undefined}>
      {items.map(t => (
        <span key={t} className={`flex items-center gap-10 whitespace-nowrap ${itemClass}`}>{t}{sep && <svg viewBox="0 0 20 18" className="h-2.5 w-2.5 opacity-60" aria-hidden="true"><path d="M10 0 20 18H0Z" fill="currentColor" /></svg>}</span>
      ))}
    </div>
  );
  return (
    <div className={`marquee flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] ${className}`}>
      <div className="marquee-track flex">{row(false)}{row(true)}</div>
    </div>
  );
}
