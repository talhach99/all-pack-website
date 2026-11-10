'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Site-wide motion: one short scroll reveal with a small stagger, and header state. Content stays fully visible without JS.
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
        el.style.setProperty('--rv-d', `${Math.min(i++ % 6, 5) * 50}ms`);
        targets.push(el);
      });
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('rv-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    targets.forEach(t => io.observe(t));

    return () => { io.disconnect(); };
  }, [path]);

  useEffect(() => {
    const onScroll = () => document.documentElement.classList.toggle('scrolled', scrollY > 12);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return null;
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
