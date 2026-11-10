'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '@/data/faqs';

/** Numbered FAQ list. `dark` renders for navy sections. */
export function FaqAccordion({ limit, dark = false }: { limit?: number; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const list = limit ? faqs.slice(0, limit) : faqs;
  return (
    <div className="grid gap-3">
      {list.map((item, i) => {
        const on = open === i;
        const box = dark
          ? on ? 'border-white/20 bg-white/[.07]' : 'border-white/10 bg-white/[.03] hover:border-white/20'
          : on ? 'border-brand/30 bg-white shadow-card' : 'border-line bg-paper-deep hover:border-ink/20';
        return (
          <div key={item.q} className={`rounded-[14px] border transition-colors ${box}`}>
            <h3>
              <button
                type="button" aria-expanded={on} aria-controls={`faq-${i}`} id={`faq-q-${i}`}
                onClick={() => setOpen(v => (v === i ? null : i))}
                className="flex w-full items-center gap-5 px-6 py-5 text-left sm:px-7"
              >
                <span className={`w-7 shrink-0 text-[13px] font-semibold ${dark ? 'text-cyan' : 'text-brand'}`}>{String(i + 1).padStart(2, '0')}</span>
                <span className={`flex-1 text-[17px] font-semibold leading-snug sm:text-[18px] ${dark ? 'text-white' : 'text-ink'}`}>{item.q}</span>
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${on ? 'rotate-45 bg-brand text-white' : dark ? 'border border-white/20 text-white' : 'border border-line bg-white text-ink'}`}><Plus size={17} /></span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3, ease: [.16, 1, .3, 1] }} className="overflow-hidden">
                  <p className={`px-6 pb-6 pl-[4.25rem] pr-8 text-[15.5px] leading-relaxed sm:px-7 sm:pl-[4.5rem] sm:pr-16 ${dark ? 'text-cream/70' : 'text-muted'}`}>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
