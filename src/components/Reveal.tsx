'use client';
import { motion, useReducedMotion } from 'framer-motion';

export function Reveal({ children, className = '', delay = 0, y = 28, as = 'div' }: { children: React.ReactNode; className?: string; delay?: number; y?: number; as?: 'div' | 'li' | 'section' }) {
  const reduced = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp className={className} initial={reduced ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .8, delay, ease: [.16, 1, .3, 1] }}>
      {children}
    </Comp>
  );
}
