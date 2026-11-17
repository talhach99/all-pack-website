'use client';
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react';

/** Hero product group: drifts gently and leans a few pixels towards the pointer on desktop. */
export function HeroVisual() {
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wrap.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(pointer: fine)').matches) return;
    const section = el.closest('section');
    let raf = 0, tx = 0, ty = 0, x = 0, y = 0;
    const tick = () => {
      x += (tx - x) * .08; y += (ty - y) * .08;
      el.style.transform = `translate3d(${x * 14}px, ${y * 10}px, 0) rotateY(${x * 3}deg) rotateX(${-y * 2}deg)`;
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
    <div className="hero-visual anim-up d3 [perspective:1200px]">
      <div ref={wrap} className="will-change-transform">
        <img
          src="/renders/packaging-range.webp" alt="ALL PACK printed cosmetic packaging: lipstick carton, serum boxes, drawer box and rigid gift boxes"
          width={1600} height={986} fetchPriority="high"
          className="float mx-auto w-full max-w-[720px] lg:max-w-none lg:origin-left lg:scale-[1.28]"
        />
      </div>
    </div>
  );
}
