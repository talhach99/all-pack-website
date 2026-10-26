'use client';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { categories, categoryBlurb, categoryCover, categorySlug, products } from '@/lib/products';
import { Reveal } from '../Reveal';

export function Collections() {
  const [active, setActive] = useState(0);
  const count = (c: string) => products.filter(p => p.category === c).length;
  return (
    <section className="dark-section grain section" id="collections">
      <div className="container-x">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-10">
          <Reveal>
            <p className="kicker">Collections</p>
            <h2 className="h-section mt-6 max-w-[14ch]">Every format your brand <span className="accent">needs.</span></h2>
          </Reveal>
          <Reveal delay={.1} className="max-w-[40ch]">
            <p className="lead">Seven collections, one partner. From the courier box to the sticker that seals it.</p>
            <Link href="/products" className="btn-outline-light mt-6">All {products.length} products <ArrowRight size={16} /></Link>
          </Reveal>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <ul className="border-t border-cream/10">
            {categories.map((cat, i) => {
              const on = i === active;
              return (
                <li key={cat}>
                  <Link
                    href={`/products?category=${categorySlug(cat)}`}
                    onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
                    className={`group grid grid-cols-[48px_1fr_auto] items-center gap-x-4 border-b border-cream/10 py-5 transition-[padding] duration-500 sm:grid-cols-[56px_1fr_auto] ${on ? 'pl-3' : ''}`}
                  >
                    <span className="font-serif text-[15px] italic text-cream/45">{String(i + 1).padStart(2, '0')}</span>
                    <span className={`font-display text-[clamp(1.5rem,2.5vw,2.1rem)] font-light transition-colors duration-300 ${on ? 'text-brass-light' : 'text-cream'}`}>{cat}</span>
                    <span className="flex items-center gap-3 text-[13px] tracking-wide text-cream/45">
                      <span className="hidden sm:inline">{count(cat)} products</span>
                      <ArrowUpRight size={18} className={`transition-all duration-300 ${on ? 'rotate-45 text-brass-light' : ''}`} />
                    </span>
                    <span className={`col-start-2 col-end-4 overflow-hidden text-[14.5px] leading-relaxed text-cream/55 transition-all duration-500 ${on ? 'mt-2 max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>{categoryBlurb[cat]}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Reveal className="order-first mx-auto w-full max-w-[520px] lg:order-none">
            <div className="relative aspect-[4/4.4] overflow-hidden rounded-[220px_220px_24px_24px] bg-[linear-gradient(170deg,#F6F1E8,#E3D9C6)] shadow-[0_50px_90px_-40px_rgba(0,0,0,.65)]">
              {categories.map((cat, i) => (
                <img
                  key={cat} src={`/renders/${categoryCover[cat]}.webp`} alt={i === active ? `${cat} by ALL PACK` : ''} loading="lazy"
                  className={`absolute inset-0 h-full w-full object-contain p-8 mix-blend-multiply transition-all duration-700 ${i === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
                />
              ))}
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl bg-ink/90 px-5 py-4 text-sm text-cream backdrop-blur">
                <span className="font-display text-lg">{categories[active]}</span>
                <span className="text-cream/60">{count(categories[active])} products</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
