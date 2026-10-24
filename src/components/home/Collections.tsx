/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categories, categoryBlurb, categoryCover, categorySlug, products } from '@/lib/products';
import { Reveal } from '../Reveal';
import { SectionHeading } from '../SectionHeading';

const layout = ['lg:col-span-2 lg:row-span-2', '', '', '', '', 'lg:col-span-2', 'lg:col-span-2'];
const warm = new Set(['Food & Beverage', 'Bags & Flexible', 'Protection & Supplies', 'Specialty Packaging']);

export function Collections() {
  return (
    <section className="section" id="collections">
      <div className="container-x">
        <SectionHeading kicker="Collections" title={<>Every format your <span className="accent">brand</span> needs.</>} description="Seven collections, one partner. From the courier box to the sticker that seals it.">
          <Link href="/products" className="btn-light">All {products.length} products <ArrowUpRight size={16} /></Link>
        </SectionHeading>
        <div className="grid auto-rows-[300px] gap-4 sm:grid-cols-2 lg:auto-rows-[290px] lg:grid-cols-4">
          {categories.map((cat, i) => {
            const big = i === 0;
            return (
              <Reveal key={cat} delay={i * .04} className={layout[i] || ''}>
                <Link href={`/products?category=${categorySlug(cat)}`} className={`group relative flex h-full flex-col overflow-hidden rounded-4xl border border-line ${warm.has(cat) ? 'tile-warm' : 'tile'}`}>
                  <div className="relative z-10 flex items-start justify-between p-6 sm:p-7">
                    <div>
                      <p className="text-xs font-medium text-muted">{String(i + 1).padStart(2, '0')} · {products.filter(p => p.category === cat).length} products</p>
                      <h3 className={`mt-2 font-display font-semibold tracking-tight ${big ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>{cat}</h3>
                      {big && <p className="mt-3 max-w-sm text-muted">{categoryBlurb[cat]}</p>}
                    </div>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white shadow-card transition-all duration-300 group-hover:rotate-45 group-hover:bg-ink group-hover:text-white"><ArrowUpRight size={18} /></span>
                  </div>
                  <img src={`/renders/${categoryCover[cat]}.webp`} alt="" loading="lazy" className={`absolute object-contain transition-transform duration-700 ease-out group-hover:scale-105 ${big ? 'inset-x-0 bottom-0 h-[72%] w-full p-6' : 'bottom-0 right-0 h-[68%] w-[88%] p-3'}`} />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
