'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Faq } from '@/lib/site';

/** Lightweight FAQ list (CSS height transition, no animation library). */
export function FaqAccordion({ faqs, limit }: { faqs: Faq[]; limit?: number; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const list = limit ? faqs.slice(0, limit) : faqs;
  return (
    <div className="border-t border-[#E6E8EE]">
      {list.map((item, i) => {
        const on = open === i;
        return (
          <div key={item.q} className="border-b border-[#E6E8EE]">
            <h3>
              <button type="button" aria-expanded={on} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(v => (v === i ? null : i))} className="flex min-h-[68px] w-full items-center justify-between gap-4 py-4 text-left">
                <span className="text-[17px] font-bold leading-snug sm:text-[18px]">{item.q}</span>
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F2F3F5] transition-transform duration-300 ${on ? 'rotate-45' : ''}`}><Plus size={18} strokeWidth={2} /></span>
              </button>
            </h3>
            <div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className={`grid transition-[grid-template-rows] duration-300 ease-out ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden"><p className="max-w-[720px] pb-6 text-[16px] leading-[1.7] text-[#4A5060]">{item.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
