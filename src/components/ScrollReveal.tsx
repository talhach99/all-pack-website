'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * One-shot "rise in" for .ap-rv elements when they first come into view, and pauses the
 * sliding rows (.ap-loopwrap) while they are off screen. Replaces scroll-linked animations,
 * which recalculated on every scroll frame and made phones (Safari especially) stutter.
 */
export function ScrollReveal() {
  const path = usePathname();
  useEffect(() => {
    (window as unknown as { __rv?: boolean }).__rv = true;
    const root = document.documentElement;
    if (typeof IntersectionObserver === 'undefined') { root.classList.remove('rv-js'); return; }
    const reveal = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('ap-in'); reveal.unobserve(e.target); }
    }, { rootMargin: '0px 0px -8% 0px' });
    const loops = new IntersectionObserver(entries => {
      for (const e of entries) e.target.classList.toggle('ap-paused', !e.isIntersecting);
    }, { rootMargin: '100px 0px' });
    const scan = () => {
      document.querySelectorAll('.ap-rv:not(.ap-in)').forEach(el => reveal.observe(el));
      document.querySelectorAll('.ap-loopwrap').forEach(el => loops.observe(el));
    };
    scan();
    const mo = new MutationObserver(scan);
    const main = document.getElementById('main');
    if (main) mo.observe(main, { childList: true, subtree: true });
    return () => { reveal.disconnect(); loops.disconnect(); mo.disconnect(); };
  }, [path]);
  return null;
}
