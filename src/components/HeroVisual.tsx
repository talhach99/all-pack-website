'use client';
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react';

/** Print-proof annotations: a registration crosshair on the product, a dashed leader and a note at the side. */
const NOTES = [
  { side: 'left' as const, x: 30.6, y: 47, step: '01 / Structure', title: 'Drawer and rigid boxes', sub: 'Built to your product size' },
  { side: 'left' as const, x: 19.9, y: 79, step: '02 / Finish', title: 'Foil stamping', sub: 'Gold, silver and holographic' },
  { side: 'right' as const, x: 82, y: 66, step: '03 / Finish', title: 'Soft-touch lamination', sub: 'Velvet matte surface' },
];

/** Hero product group: floats gently, leans towards the pointer on desktop, carries spec annotations on wide screens. */
export function HeroVisual() {
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wrap.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(pointer: fine)').matches) return;
    const section = el.closest('section');
    let raf = 0, tx = 0, ty = 0, x = 0, y = 0;
    const tick = () => {
      x += (tx - x) * .08; y += (ty - y) * .08;
      el.style.transform = `translate3d(${x * 12}px, ${y * 8}px, 0) rotateY(${x * 2.5}deg) rotateX(${-y * 1.5}deg)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > .001 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      const r = section!.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width * 2 - 1; ty = (e.clientY - r.top) / r.height * 2 - 1;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const leave = () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(tick); };
    section?.addEventListener('pointermove', move); section?.addEventListener('pointerleave', leave);
    return () => { section?.removeEventListener('pointermove', move); section?.removeEventListener('pointerleave', leave); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="hero-visual anim-up d3 [perspective:1400px]">
      <div ref={wrap} className="will-change-transform">
        <div className="float relative">
          <img
            src="/renders/packaging-range.webp" alt="ALL PACK printed cosmetic packaging: lipstick carton, serum boxes, drawer box and rigid gift boxes"
            width={2000} height={1245} fetchPriority="high" decoding="async" className="relative z-10 w-full"
          />
          <ul aria-label="Finishes and structures shown" className="pointer-events-none absolute inset-0 z-20 hidden min-[1150px]:block">
            {NOTES.map((n, i) => {
              const left = n.side === 'left';
              return (
                <li key={n.title} className="proof-note" style={{ ['--i' as string]: i }}>
                  <span className="proof-x" style={{ left: `${n.x}%`, top: `${n.y}%` }} aria-hidden="true"><i /></span>
                  <span className={`proof-line ${left ? 'origin-right' : 'origin-left'}`} aria-hidden="true"
                    style={{ top: `${n.y}%`, left: left ? '-6%' : `calc(${n.x}% + 12px)`, width: left ? `calc(${n.x + 6}% - 12px)` : `calc(${106 - n.x}% - 12px)` }} />
                  <span className={`proof-text ${left ? 'text-right' : 'text-left'}`} style={{ top: `${n.y}%`, ...(left ? { right: '107%' } : { left: '107%' }) }}>
                    <span className="block font-mono text-[11.5px] uppercase tracking-[.1em] text-[#7FD3F0]">{n.step}</span>
                    <span className="mt-1.5 block whitespace-nowrap font-display text-[17px] font-semibold tracking-[-.01em] text-white min-[1400px]:text-[19px]">{n.title}</span>
                    <span className="mt-0.5 block whitespace-nowrap text-[13.5px] text-cyan">{n.sub}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
