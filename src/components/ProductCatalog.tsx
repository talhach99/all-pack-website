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
      <div className="mb-8 rounded-2xl border border-line bg-mist p-4 sm:p-5">
        {/* Row 1: collections */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Collections">
          {['', ...categories].map(c => (
            <button key={c || 'all'} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
              className={`h-9 rounded-lg px-3.5 text-[14px] font-medium transition-colors ${cat === c ? 'bg-ink text-white' : 'border border-line bg-white text-secondary hover:border-ink/30 hover:text-ink'}`}>
              {c || 'All'}
            </button>
          ))}
        </div>
        {/* Row 2: search and filters */}
        <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_200px_200px]">
          <label className="relative">
            <span className="sr-only">Search products</span>
            <Search size={16} strokeWidth={1.5} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input className="input !h-10 !pl-10 text-[14px]" placeholder="Search" value={query} onChange={e => setQuery(e.target.value)} />
          </label>
          <label><span className="sr-only">Material</span>
            <select className="input !h-10 !py-0 text-[14px]" value={material} onChange={e => setMaterial(e.target.value)}>
              <option value="">Any material</option>{materialFilters.map(m => <option key={m}>{m}</option>)}
            </select>
          </label>
          <label><span className="sr-only">Industry</span>
            <select className="input !h-10 !py-0 text-[14px]" value={use} onChange={e => setUse(e.target.value)}>
              <option value="">Any industry</option>{useFilters.map(u => <option key={u}>{u}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="mb-8 flex items-center justify-between text-sm text-muted">
        <p aria-live="polite"><span className="font-medium tabular-nums text-ink">{visible.length}</span> {visible.length === 1 ? 'product' : 'products'}{cat && <> in <span className="text-ink">{cat}</span></>}</p>
        {filtered && <button onClick={reset} className="inline-flex items-center gap-1 font-medium text-ink hover:text-brand"><X size={16} strokeWidth={1.5} /> Clear filters</button>}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.div layout key={p.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .3, ease: [.22, 1, .36, 1] }}>
              <ProductCard product={p} priority={i < 3} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
        {!filtered && (
          <motion.div layout key="custom-card">
            <a href={quoteLink()} target="_blank" rel="noopener noreferrer" className="group flex h-full min-h-[320px] flex-col justify-between rounded-2xl border border-dashed border-ink/20 bg-mist p-7 text-ink transition-colors hover:border-ink/40">
              <span className="text-[13px] text-muted">Custom</span>
              <span>
                <span className="block text-[22px] font-medium leading-tight">Need a size or style that isn&apos;t listed?</span>
                <span className="mt-3 block text-[15px] leading-relaxed text-secondary">Send a photo, sketch or dimensions and we will make it for you.</span>
                <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-brand">Start a custom quote <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-150 group-hover:translate-x-0.5" /></span>
              </span>
            </a>
          </motion.div>
        )}
      </motion.div>
      {visible.length === 0 && (
        <div className="rounded-2xl border border-dashed border-line py-24 text-center">
          <h3 className="text-2xl font-medium">Nothing matches that yet</h3>
          <p className="mt-2 text-muted">We probably still make it. Clear the filters or just ask us.</p>
          <button onClick={reset} className="btn-light mt-6">Clear filters</button>
        </div>
      )}
    </>
  );
}
