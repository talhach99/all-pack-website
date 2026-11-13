'use client';
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const finishes = [
  { t: 'Foil stamping', d: 'Gold, silver or coloured foil pressed onto logos, borders and patterns. Catches the light on a shelf and in a photo.', best: 'Gift boxes, sweets, premium cartons', image: '/images/home/foil-ornate-box.webp' },
  { t: 'Soft-touch matte', d: 'A velvety laminate that feels expensive the moment a box is picked up, and hides fingerprints.', best: 'Rigid boxes, cosmetics, electronics', image: '/images/home/soft-touch-box.webp' },
  { t: 'Full-colour offset', d: 'Rich four-colour print edge to edge, colour-matched to your approved artwork, in gloss or matte.', best: 'Food cartons, pharma cartons, labels', image: '/images/home/full-colour-cartons.webp' },
  { t: 'Natural kraft', d: 'Brown board with a one or two-colour print. Honest, sturdy and lower in cost for big runs.', best: 'Mailers, bakery boxes, e-commerce', image: '/images/home/kraft-box.webp' },
  { t: 'Rigid wrap', d: 'Thick greyboard wrapped in printed paper, with drawers, magnetic lids or inserts.', best: 'Gifts, weddings, corporate kits', image: '/images/home/rigid-drawer-box.webp' },
];

/** Pick a finish, see it on a real box. */
export function FinishLab() {
  const [i, setI] = useState(0);
  const f = finishes[i];
  return (
    <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-10">
      <div role="tablist" aria-label="Finishes" aria-orientation="vertical" className="grid content-start">
        {finishes.map((x, n) => {
          const on = n === i;
          return (
            <button
              key={x.t} type="button" role="tab" aria-selected={on} aria-controls="finish-panel"
              onClick={() => setI(n)} onMouseEnter={() => setI(n)}
              className={`group grid grid-cols-[36px_1fr] items-baseline gap-x-2 border-t border-line py-5 text-left transition-colors last:border-b ${on ? 'text-ink' : 'text-muted hover:text-ink'}`}
            >
              <span className="font-mono text-[12px] tabular-nums">{String(n + 1).padStart(2, '0')}</span>
              <span>
                <span className="block font-display text-[clamp(1.4rem,2.2vw,1.85rem)] font-semibold leading-tight tracking-[-.025em]">{x.t}</span>
                <span className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <span className="overflow-hidden">
                    <span className="block pt-2 text-[15px] leading-relaxed text-secondary">{x.d}</span>
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div id="finish-panel" role="tabpanel" className="relative overflow-hidden rounded-2xl bg-ink lg:min-h-[480px]">
        <div className="relative aspect-[4/3] lg:absolute lg:inset-0 lg:aspect-auto">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img key={f.image} src={f.image} alt={`${f.t} finish on a box made by ALL PACK`} loading="lazy"
              initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45, ease: [.22, 1, .36, 1] }}
              className="absolute inset-0 h-full w-full object-cover" />
          </AnimatePresence>
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/80 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5 sm:p-6">
          <div>
            <span className="block font-mono text-[11px] uppercase tracking-[.08em] text-white/60">Works best on</span>
            <span className="mt-1 block text-[15px] font-medium text-white">{f.best}</span>
          </div>
          <span className="rounded-md bg-white/15 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[.08em] text-white backdrop-blur">Finish {String(i + 1).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
}
