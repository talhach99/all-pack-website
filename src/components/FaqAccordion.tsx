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
          ? on ? 'border-white/15 bg-graphite-raised' : 'border-white/10 bg-graphite-card hover:border-white/15'
          : on ? 'border-ink/15 bg-white' : 'border-line bg-white hover:border-ink/15';
        return (
          <div key={item.q} className={`rounded-xl border transition-colors ${box}`}>
            <h3>
              <button
                type="button" aria-expanded={on} aria-controls={`faq-${i}`} id={`faq-q-${i}`}
                onClick={() => setOpen(v => (v === i ? null : i))}
                className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
              >
                <span className={`w-6 shrink-0 font-mono text-[12px] tabular-nums ${dark ? 'text-cyan' : 'text-muted'}`}>{String(i + 1).padStart(2, '0')}</span>
                <span className={`flex-1 text-[17px] font-medium leading-snug ${dark ? 'text-white' : 'text-ink'}`}>{item.q}</span>
                <Plus size={18} strokeWidth={1.5} className={`shrink-0 transition-transform duration-200 ease-out ${on ? 'rotate-45' : ''} ${dark ? 'text-cyan' : 'text-muted'}`} />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3, ease: [.22, 1, .36, 1] }} className="overflow-hidden">
                  <p className={`pb-5 pl-[60px] pr-8 text-[15px] leading-relaxed sm:pl-[64px] sm:pr-16 ${dark ? 'text-cyan' : 'text-secondary'}`}>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
