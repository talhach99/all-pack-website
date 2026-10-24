'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '@/data/faqs';

export function FaqAccordion({ limit }: { limit?: number }) {
  const [open, setOpen] = useState<number | null>(0);
  const list = limit ? faqs.slice(0, limit) : faqs;
  return (
    <div className="divide-y divide-line border-y border-line">
      {list.map((item, i) => (
        <div key={item.q}>
          <h3>
            <button
              type="button" aria-expanded={open === i} aria-controls={`faq-${i}`} id={`faq-q-${i}`}
              onClick={() => setOpen(v => (v === i ? null : i))}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-semibold tracking-tight sm:text-xl"
            >
              <span className="transition-colors group-hover:text-brand">{item.q}</span>
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-300 ${open === i ? 'rotate-45 border-ink bg-ink text-white' : 'border-line'}`}><Plus size={18} /></span>
            </button>
          </h3>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3, ease: [.16, 1, .3, 1] }} className="overflow-hidden">
                <p className="max-w-3xl pb-7 pr-14 leading-relaxed text-muted">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
