'use client';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { products, productThumb } from '@/lib/products';

/** Header search: instant results across all products. */
export function ProductSearch({ className = '' }: { className?: string }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const results = useMemo(() => {
    const t = q.toLowerCase().trim(); if (!t) return [];
    return products.filter(p => `${p.name} ${p.category} ${p.uses.join(' ')} ${p.materials.join(' ')}`.toLowerCase().includes(t)).slice(0, 6);
  }, [q]);
  return (
    <div ref={box} className={`relative ${className}`} onBlur={e => { if (!box.current?.contains(e.relatedTarget as Node)) setOpen(false); }}>
      <label className="flex h-11 items-center gap-2 rounded-lg border border-line bg-paper-light px-3.5 focus-within:border-brand focus-within:bg-white">
        <Search size={17} className="shrink-0 text-muted" />
        <span className="sr-only">Search packaging</span>
        <input value={q} onChange={e => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} placeholder="Search boxes, bags, labels…" className="w-full bg-transparent text-[14.5px] outline-none placeholder:text-muted/80" />
      </label>
      {open && q.trim() && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-line bg-white shadow-lift">
          {results.length ? results.map(p => (
            <Link key={p.slug} href={`/products/${p.slug}`} onClick={() => { setOpen(false); setQ(''); }} className="flex items-center gap-3 px-3 py-2.5 hover:bg-paper-deep">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={productThumb(p)} alt="" className="h-11 w-14 rounded-md object-cover" />
              <span><span className="block text-sm font-semibold">{p.name}</span><span className="block text-xs text-muted">{p.category}</span></span>
            </Link>
          )) : <p className="px-4 py-4 text-sm text-muted">No match. <Link href="/quote" className="font-semibold text-brand">Ask us for a custom pack →</Link></p>}
        </div>
      )}
    </div>
  );
}
