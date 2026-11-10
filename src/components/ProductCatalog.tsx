'use client';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Search, X } from 'lucide-react';
import { categories, categorySlug, materialFilters, products, useFilters } from '@/lib/products';
import { ProductCard } from './ProductCard';
import { quoteLink } from '@/lib/company';

export function ProductCatalog({ initialCategory = '' }: { initialCategory?: string }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState(initialCategory);
  const [material, setMaterial] = useState('');
  const [use, setUse] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => { setCat(initialCategory); }, [initialCategory]);
  useEffect(() => {
    const url = cat ? `${pathname}?category=${categorySlug(cat)}` : pathname;
    router.replace(url, { scroll: false });
  }, [cat, pathname, router]);

  const visible = useMemo(() => {
    const q = query.toLowerCase().trim();
    return products.filter(p =>
      (!cat || p.category === cat) && (!material || p.materials.includes(material)) && (!use || p.uses.includes(use)) &&
      (!q || `${p.name} ${p.description} ${p.category} ${p.uses.join(' ')} ${p.materials.join(' ')}`.toLowerCase().includes(q)));
  }, [cat, material, use, query]);
  const filtered = Boolean(cat || material || use || query);
  const reset = () => { setCat(''); setMaterial(''); setUse(''); setQuery(''); };

  return (
    <>
      <div className="sticky top-[84px] z-30 -mx-4 mb-10 border-b border-line bg-white/90 px-4 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-1 lg:pb-0 [scrollbar-width:none]" role="tablist" aria-label="Collections">
            {['', ...categories].map(c => (
              <button key={c || 'all'} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${cat === c ? 'bg-ink text-white' : 'border border-line bg-white text-ink/75 hover:border-ink/30 hover:text-ink'}`}>
                {c || 'All'}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-[1fr_auto_auto] lg:w-auto">
            <label className="relative col-span-2 sm:col-span-1">
              <span className="sr-only">Search products</span>
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input className="input !min-h-11 !rounded-full !pl-10 lg:w-56" placeholder="Search…" value={query} onChange={e => setQuery(e.target.value)} />
            </label>
            <label><span className="sr-only">Material</span>
              <select className="input !min-h-11 !rounded-full !py-2 text-sm" value={material} onChange={e => setMaterial(e.target.value)}>
                <option value="">Any material</option>{materialFilters.map(m => <option key={m}>{m}</option>)}
              </select>
            </label>
            <label><span className="sr-only">Industry</span>
              <select className="input !min-h-11 !rounded-full !py-2 text-sm" value={use} onChange={e => setUse(e.target.value)}>
                <option value="">Any industry</option>{useFilters.map(u => <option key={u}>{u}</option>)}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="mb-8 flex items-center justify-between text-sm text-muted">
        <p aria-live="polite"><span className="font-semibold text-ink">{visible.length}</span> {visible.length === 1 ? 'product' : 'products'}{cat && <> in <span className="text-ink">{cat}</span></>}</p>
        {filtered && <button onClick={reset} className="inline-flex items-center gap-1 font-medium text-ink hover:text-brand"><X size={14} /> Clear filters</button>}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.div layout key={p.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .35 }}>
              <ProductCard product={p} priority={i < 3} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
        {!filtered && (
          <motion.div layout key="custom-card">
            <a href={quoteLink()} target="_blank" rel="noopener noreferrer" className="group flex h-full min-h-[320px] flex-col justify-between rounded-2xl bg-ink p-8 text-white">
              <span className="text-[12px] font-semibold text-cyan">Custom</span>
              <span>
                <span className="block text-2xl font-semibold leading-tight">Need a size or style that isn&apos;t listed?</span>
                <span className="mt-3 block text-[15px] leading-relaxed text-cream/70">Send a photo, sketch or dimensions and we will make it for you.</span>
                <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[14px] font-semibold">Start a custom quote <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" /></span>
              </span>
            </a>
          </motion.div>
        )}
      </motion.div>
      {visible.length === 0 && (
        <div className="rounded-4xl border border-dashed border-line py-24 text-center">
          <h3 className="text-2xl font-semibold">Nothing matches that yet</h3>
          <p className="mt-2 text-muted">We probably still make it. Clear the filters or just ask us.</p>
          <button onClick={reset} className="btn-light mt-6">Clear filters</button>
        </div>
      )}
    </>
  );
}
