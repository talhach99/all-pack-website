'use client';
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { products, productImage } from '@/lib/products';

const spans = ['sm:col-span-2 sm:row-span-2', '', '', 'sm:row-span-2', '', 'sm:col-span-2', '', '', 'sm:col-span-2 sm:row-span-2', '', '', ''];

export function GalleryGrid() {
  const [sel, setSel] = useState<number | null>(null);
  const n = products.length;
  useEffect(() => {
    if (sel === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSel(null); if (e.key === 'ArrowRight') setSel(v => v === null ? v : (v + 1) % n); if (e.key === 'ArrowLeft') setSel(v => v === null ? v : (v + n - 1) % n); };
    document.addEventListener('keydown', onKey); document.documentElement.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.documentElement.style.overflow = ''; };
  }, [sel, n]);
  const p = sel === null ? null : products[sel];
  return (
    <>
      <div className="grid auto-rows-[260px] grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((x, i) => (
          <motion.button key={x.slug} type="button" onClick={() => setSel(i)} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6, delay: (i % 4) * .05 }}
            className={`group relative overflow-hidden rounded-4xl border border-line text-left ${x.materials.some(m => /kraft|corrugated/i.test(m)) ? 'tile-warm' : 'tile'} ${spans[i % spans.length]}`} aria-label={`View ${x.name}`}>
            <img src={productImage(x)} alt={x.name} loading="lazy" className="h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-between rounded-2xl bg-white/90 px-4 py-3 opacity-0 shadow-card backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="text-sm font-semibold">{x.name}</span><ArrowUpRight size={16} />
            </span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {p && sel !== null && (
          <motion.div className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => { if (e.target === e.currentTarget) setSel(null); }}>
            <div role="dialog" aria-modal="true" aria-label={p.name} className="relative w-full max-w-5xl">
              <button onClick={() => setSel(null)} className="absolute -top-14 right-0 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close"><X size={20} /></button>
              <motion.div key={p.slug} initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} className="tile overflow-hidden rounded-5xl">
                <img src={productImage(p)} alt={p.name} className="mx-auto max-h-[70vh] w-full object-contain p-8" />
              </motion.div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-white">
                <div><p className="text-sm text-white/60">{p.category}</p><p className="font-display text-2xl font-semibold">{p.name}</p></div>
                <div className="flex gap-2">
                  <button onClick={() => setSel((sel + n - 1) % n)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 hover:bg-white/10"><ArrowLeft size={18} /></button>
                  <button onClick={() => setSel((sel + 1) % n)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 hover:bg-white/10"><ArrowRight size={18} /></button>
                  <Link href={`/products/${p.slug}`} className="btn-white btn-sm !min-h-11">View product</Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
