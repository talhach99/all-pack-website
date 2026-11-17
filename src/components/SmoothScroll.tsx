'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Smooth, eased scrolling (Lenis), the gliding feel used on pakpackages.com.
 * Off for reduced motion. Touch devices keep their native scrolling.
 */
export function SmoothScroll() {
  const path = usePathname();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, anchors: { offset: -120 } });
    (window as unknown as { lenis?: Lenis }).lenis = lenis;
    let raf = requestAnimationFrame(function loop(t) { lenis.raf(t); raf = requestAnimationFrame(loop); });
    return () => { cancelAnimationFrame(raf); lenis.destroy(); delete (window as unknown as { lenis?: Lenis }).lenis; };
  }, []);
  // New page: start at the top, or at the #section the link points to.
  useEffect(() => {
    const l = (window as unknown as { lenis?: Lenis }).lenis;
    if (!l) return;
    const hash = window.location.hash;
    const el = hash ? document.querySelector(hash) : null;
    if (el) l.scrollTo(el as HTMLElement, { offset: -120, immediate: true }); else l.scrollTo(0, { immediate: true });
  }, [path]);
  return null;
}
