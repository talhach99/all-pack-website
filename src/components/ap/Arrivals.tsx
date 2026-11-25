'use client';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useState } from 'react';
import type { CatalogItem } from '@/data/home';

/** "New arrivals" carousel, four products per page. */
export function Arrivals({ items }: { items: CatalogItem[] }) {
  const [pg, setPg] = useState(0);
  const pages = Math.ceil(items.length / 4);
  const shown = items.slice(pg * 4, pg * 4 + 4);
  return (
    <section id="new" className="mt-20 scroll-mt-28" aria-labelledby="h-new">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-[520px]"><h2 id="h-new" className="text-[32px]">New arrivals</h2><p className="mt-2 text-[15px] leading-[1.55] text-[#3B4256]">Fresh structures and products our team has added this season.</p></div>
        <div className="flex items-center gap-2">
          <span className="mr-1.5 text-[14px] text-[#5A6276]">{pg + 1} / {pages}</span>
          <button type="button" onClick={() => setPg(p => Math.max(0, p - 1))} disabled={pg === 0} aria-label="Previous products" className="grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-[#E6E9F2] text-[18px] disabled:opacity-40">←</button>
          <button type="button" onClick={() => setPg(p => (p + 1) % pages)} aria-label="Next products" className="grid h-11 w-11 place-items-center rounded-full bg-[#0B1020] text-[18px] text-white">→</button>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {shown.map(it => (
          <Link key={pg + it.name} href={`/contact?product=${encodeURIComponent(it.name)}`} className="ap-card ap-rise flex flex-col gap-2">
            <div className="relative aspect-square overflow-hidden rounded-[20px] border border-[#ECEEF3] bg-white">
              <span className="absolute left-3 top-3 z-[1] rounded-full bg-[#22C3EE] px-2.5 py-1 text-[11px] font-extrabold text-[#0A208C]">NEW</span>
              <img src={it.src} alt={`ALL PACK ${it.name}`} width={480} height={480} loading="lazy" className={`ap-img h-full w-full ${it.fit === 'contain' ? 'object-contain p-4' : 'object-cover'}`} />
            </div>
            <span className="px-1 pt-1 text-[15px] font-extrabold">{it.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
