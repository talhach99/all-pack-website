'use client';
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react';

/** Print-proof annotations: a registration crosshair on the product, a dashed leader and a note at the side. Positions belong to the default picture. */
export type HeroNote = { step: string; title: string; sub: string };
const POS = [
  { side: 'left' as const, x: 30.6, y: 47 },
  { side: 'left' as const, x: 19.9, y: 79 },
  { side: 'right' as const, x: 82, y: 66 },
];

/** Hero product group: floats gently, leans towards the pointer on desktop, carries spec annotations on wide screens. */
export function HeroVisual({ image, alt, notes }: { image: string; alt: string; notes: HeroNote[] }) {
  const isDefault = image.startsWith('/renders/packaging-range');
  const NOTES = isDefault ? POS.map((p, i) => ({ ...p, ...notes[i] })) : [];
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
            src={isDefault ? '/renders/packaging-range-1400.webp' : image}
            {...(isDefault ? { srcSet: '/renders/packaging-range-800.webp 800w, /renders/packaging-range-1400.webp 1400w, /renders/packaging-range.webp 2400w', sizes: '(min-width: 1024px) 60vw, 100vw', width: 2400, height: 1494 } : {})}
            alt={alt}
            fetchPriority="high" decoding="async" className="relative z-10 w-full"
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
                    <span className="block font-mono text-[12px] tracking-[.02em] text-[#7FD3F0]">{n.step}</span>
                    <span className="mt-1.5 block whitespace-nowrap font-display text-[17px] font-semibold tracking-[-.01em] text-white min-[1400px]:text-[19px]">{n.title}</span>
                    <span className="mt-0.5 block whitespace-nowrap text-[14px] text-cyan">{n.sub}</span>
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
