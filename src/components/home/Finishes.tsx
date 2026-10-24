'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LogoMark } from '../Logo';
import { SectionHeading } from '../SectionHeading';

const finishes = [
  { name: 'Matte lamination', short: 'Matte', text: 'A calm, glare-free surface with a modern, understated look. Our most popular all-rounder.', face: 'bg-[#2B3A8C]', mark: 'text-white', sheen: 'opacity-0' },
  { name: 'Gloss lamination', short: 'Gloss', text: 'Rich, saturated colour and a reflective shine that makes photography and bold graphics pop.', face: 'bg-[#2B3A8C]', mark: 'text-white', sheen: 'opacity-100' },
  { name: 'Soft-touch', short: 'Soft-touch', text: 'A velvety, tactile coating that customers notice the moment they pick the box up.', face: 'bg-[#1C2750]', mark: 'text-white/90', sheen: 'opacity-0', soft: true },
  { name: 'Foil stamping', short: 'Foil', text: 'Metallic gold, silver or coloured foil on logos and details for an unmistakably premium cue.', face: 'bg-[#141C45]', mark: 'foil', sheen: 'opacity-0' },
  { name: 'Natural kraft', short: 'Kraft', text: 'Honest, earthy and recyclable-looking. Perfect with a single-colour print for a crafted feel.', face: 'kraft', mark: 'text-ink/85', sheen: 'opacity-0' },
];

export function Finishes() {
  const [active, setActive] = useState(0);
  const f = finishes[active];
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading kicker="Print & finishing" title={<>The finish is what they <span className="accent">feel.</span></>} description="Choose from finishes that change how your packaging looks, feels and photographs. Tap through to preview." />
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative grid aspect-[5/4] place-items-center overflow-hidden rounded-5xl bg-[radial-gradient(120%_90%_at_50%_0%,#fff,#EEF2F8_60%,#E2E8F2)]">
            <div className="grid-lines absolute inset-0 opacity-60" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, rotateY: -25, scale: .92 }} animate={{ opacity: 1, rotateY: 0, scale: 1 }} exit={{ opacity: 0, rotateY: 25, scale: .92 }} transition={{ duration: .55, ease: [.16, 1, .3, 1] }} style={{ perspective: 1000 }} className="relative">
                <div
                  className={`relative grid aspect-square w-[min(56vw,340px)] place-items-center overflow-hidden rounded-[28px] shadow-[0_50px_80px_-30px_rgba(10,20,51,.55)] ${f.face === 'kraft' ? '' : f.face}`}
                  style={f.face === 'kraft' ? { background: 'radial-gradient(circle at 30% 20%, #D9B48A, #BF915F 70%)' } : undefined}
                >
                  {f.soft && <div className="noise absolute inset-0" />}
                  <div className={`absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,.55)_45%,transparent_60%)] transition-opacity ${f.sheen}`} />
                  <div className="relative flex flex-col items-center gap-4">
                    {f.mark === 'foil' ? (
                      <>
                        <div className="foil h-24 w-24 animate-shimmer [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
                        <p className="foil animate-shimmer bg-clip-text font-display text-3xl font-bold tracking-[.12em] text-transparent">ALL PACK</p>
                      </>
                    ) : (
                      <>
                        <LogoMark className="h-24 w-24" light={f.mark !== 'text-ink/85'} />
                        <p className={`font-display text-3xl font-bold tracking-[.12em] ${f.mark}`}>ALL PACK</p>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur">{f.name}</p>
          </div>
          <div role="tablist" aria-label="Finishes" className="space-y-2">
            {finishes.map((x, i) => (
              <button
                key={x.name} role="tab" aria-selected={i === active} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
                className={`w-full rounded-3xl border p-5 text-left transition-all duration-300 sm:p-6 ${i === active ? 'border-ink bg-white shadow-card' : 'border-transparent hover:bg-white/70'}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{x.name}</span>
                  <span className={`h-2.5 w-2.5 rounded-full transition-colors ${i === active ? 'bg-sky' : 'bg-line'}`} />
                </div>
                <AnimatePresence initial={false}>
                  {i === active && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden text-muted">
                      <span className="block pt-2 leading-relaxed">{x.text}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
