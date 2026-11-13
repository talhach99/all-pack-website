/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { ClientWork } from '@/components/ClientWork';
import { HeroProof } from '@/components/HeroProof';
import { FinishLab } from '@/components/FinishLab';
import { QuoteBuilder } from '@/components/QuoteBuilder';
import { Dieline } from '@/components/Dieline';
import { CLIENTS, quoteLink } from '@/lib/company';
import { categorySlug, products } from '@/lib/products';

export const metadata: Metadata = {
  title: { absolute: 'ALL PACK — Custom Packaging & Printing in Lahore' },
  description: 'Printed cartons, pharma cartons, rigid gift boxes, corrugated boxes, bags and labels, made to your size in Lahore and delivered across Pakistan. 25+ years on press.',
  alternates: { canonical: '/' },
};

const home = (n: string) => `/images/home/${n}.webp`;
const work = (n: string) => `/work/${n}.webp`;
const cat = (c: string) => `/products?category=${categorySlug(c)}`;

const makes = [
  { t: 'Rigid & gift boxes', tags: 'Drawers · magnetic lids · wedding boxes', image: home('custom-wedding-box'), href: cat('Premium & Retail'), span: 'sm:col-span-2 lg:row-span-2', big: true },
  { t: 'Food & bakery cartons', tags: 'Cake, rusk and sweet cartons', image: work('hoest-eclair'), href: cat('Food & Beverage'), span: 'sm:col-span-2' },
  { t: 'Pharma cartons', tags: 'Tablets · tubes · inserts', image: work('aloram-carton'), href: '/industries/pharmaceutical', span: '', contain: true },
  { t: 'Labels & stickers', tags: 'Roll and sheet labels', image: work('sun-biscuits-label'), href: cat('Labels & Print'), span: '', contain: true },
  { t: 'Corrugated & shipping', tags: 'Single and double wall cartons', image: home('shipping-cartons'), href: cat('Shipping & E-Commerce'), span: 'sm:col-span-2' },
  { t: 'Paper bags', tags: 'Rope handles · full print', image: home('paper-bag'), href: cat('Bags & Flexible'), span: '' },
  { t: 'Mailer boxes', tags: 'E-commerce and subscription', image: home('kraft-mailer-box'), href: cat('Shipping & E-Commerce'), span: '' },
];

const steps = [
  { t: 'Send your brief', d: 'Product, size and quantity on WhatsApp. A photo or an old box is enough to start.' },
  { t: 'Dieline and proof', d: 'We draw the dieline, suggest board and finish, and send a proof with a clear price.' },
  { t: 'On press', d: 'Approved artwork is printed in full colour and colour-checked against the proof.' },
  { t: 'Finish and cut', d: 'Foil, lamination or varnish, then die-cut, folded and glued to fit.' },
  { t: 'Delivered', d: 'Packed by quantity and handed over on the agreed date, anywhere in Pakistan.' },
];

export default function Home() {
  const quote = quoteLink();

  return (
    <main>
      {/* 1 · Hero: a press proof of real client work */}
      <section className="relative isolate overflow-hidden bg-graphite-page text-white">
        <Dieline className="pointer-events-none absolute -right-24 -top-10 -z-10 hidden w-[620px] text-white/[.06] lg:block" />
        <div className="container-x grid items-center gap-14 py-16 sm:py-20 lg:min-h-[calc(100svh-75px)] lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:py-20">
          <div className="anim-up">
            <p className="kicker !text-cyan">Printers & packaging makers · Lahore</p>
            <h1 className="mt-6 font-display text-[clamp(2.9rem,6.2vw,5.4rem)] font-semibold leading-[.95] tracking-[-.045em]">
              We print the box your product <span className="text-brand-light">deserves.</span>
            </h1>
            <p className="mt-7 max-w-[32rem] text-[18px] leading-[1.6] text-cream/75">Cartons, rigid boxes, corrugated shippers, bags and labels for pharma, food and retail brands. Made to your size, colour-matched to your artwork, delivered across Pakistan.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-brand h-[52px] px-6"><WhatsAppIcon size={18} /> Get a quote on WhatsApp</a>
              <a href="#work" className="btn-outline-light h-[52px] px-6">See our work</a>
            </div>
            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6">
              {[['25+', 'Years on press'], [`${CLIENTS.length}+`, 'Brands we print for'], ['24h', 'Quote reply']].map(([n, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-[34px] font-semibold leading-none tracking-[-.03em] tabular-nums">{n}</dd>
                  <dd className="mt-2 font-mono text-[11px] uppercase tracking-[.08em] text-cyan">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="anim-up d2 px-2 sm:px-6 lg:px-0">
            <HeroProof />
          </div>
        </div>
      </section>

      {/* 2 · Clients as a print sheet */}
      <section className="border-b border-line bg-white py-14 sm:py-16">
        <div className="container-x">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="kicker">On press for</p>
            <p className="text-[15px] text-secondary">Pharmaceutical companies, bakeries, hospitals and food brands</p>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4 lg:grid-cols-7">
            {CLIENTS.map(c => (
              <li key={c.name} title={c.name} className="group flex h-24 items-center justify-center bg-white px-4">
                {c.logo
                  ? <img src={c.logo} alt={c.name} loading="lazy" className="max-h-12 w-auto max-w-full object-contain grayscale transition duration-300 group-hover:grayscale-0 [@media(hover:none)]:grayscale-0" />
                  : <span className="text-center font-display text-[15px] font-semibold leading-tight text-secondary">{c.name}</span>}
              </li>
            ))}
            <li className="flex h-24 bg-ink">
              <a href={quote} target="_blank" rel="noopener noreferrer" className="group flex w-full flex-col justify-center px-4 text-white">
                <span className="font-mono text-[11px] uppercase tracking-[.08em] text-cyan">Next on press</span>
                <span className="mt-1 inline-flex items-center gap-1 text-[15px] font-medium">Your brand <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" /></span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* 3 · What we make: bento */}
      <section className="section bg-mist">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="kicker">What we make</p>
              <h2 className="h-section mt-4">From a sticker to a shipping carton, one press does it all.</h2>
            </div>
            <Link href="/products" className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-ink hover:text-brand">All {products.length} formats <ArrowUpRight size={16} strokeWidth={1.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
          </div>
          <div className="mt-12 grid auto-rows-[240px] gap-4 sm:grid-cols-2 lg:auto-rows-[250px] lg:grid-cols-4">
            {makes.map((m, i) => (
              <Link key={m.t} href={m.href} className={`rv group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl ${m.contain ? 'bg-white' : 'bg-ink'} p-5 sm:p-6 ${m.span}`} style={{ ['--rv-d' as string]: `${(i % 4) * 50}ms` }}>
                <img src={m.image} alt="" loading="lazy" className={`absolute inset-0 -z-10 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] ${m.contain ? 'object-contain p-6 pb-20' : 'object-cover'}`} />
                <span aria-hidden="true" className={`absolute inset-0 -z-10 ${m.contain ? 'bg-gradient-to-t from-white via-white/0 to-transparent' : 'bg-gradient-to-t from-ink/85 via-ink/10 to-transparent'}`} />
                <span className={`absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full transition-colors ${m.contain ? 'bg-ink/5 text-ink group-hover:bg-ink group-hover:text-white' : 'bg-white/15 text-white backdrop-blur group-hover:bg-white group-hover:text-ink'}`}><ArrowUpRight size={18} strokeWidth={1.5} /></span>
                <span className={`font-display font-semibold leading-none tracking-[-.03em] ${m.big ? 'text-[clamp(1.8rem,3vw,2.6rem)]' : 'text-[22px]'} ${m.contain ? 'text-ink' : 'text-white'}`}>{m.t}</span>
                <span className={`mt-2 font-mono text-[11px] uppercase tracking-[.08em] ${m.contain ? 'text-muted' : 'text-white/70'}`}>{m.tags}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · Finish lab */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="mb-10 max-w-2xl sm:mb-12">
            <p className="kicker">The finish lab</p>
            <h2 className="h-section mt-4">Same box. Different finish. A completely different feel.</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-secondary">Pick a finish to see it on a box we have made. Not sure which suits your product? We will send samples.</p>
          </div>
          <FinishLab />
        </div>
      </section>

      {/* 5 · Process on a dieline */}
      <section className="section relative isolate overflow-hidden bg-graphite-page text-white">
        <Dieline className="pointer-events-none absolute -bottom-24 -left-20 -z-10 w-[520px] rotate-[-8deg] text-white/[.05]" />
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="kicker !text-cyan">How an order runs</p>
              <h2 className="h-section mt-4 !text-white">From your file to a finished box, in five steps.</h2>
            </div>
            <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-white"><WhatsAppIcon size={18} /> Start with step one</a>
          </div>
          <ol className="relative mt-14 grid gap-8 md:grid-cols-5 md:gap-5">
            <span aria-hidden="true" className="absolute left-[15px] top-4 hidden h-px w-[calc(100%-30px)] border-t border-dashed border-white/25 md:block" />
            {steps.map((s, i) => (
              <li key={s.t} className="rv relative grid grid-cols-[32px_1fr] gap-x-4 md:block" style={{ ['--rv-d' as string]: `${i * 70}ms` }}>
                <span className={`relative grid h-8 w-8 place-items-center rounded-full font-mono text-[12px] tabular-nums ${i === steps.length - 1 ? 'bg-brand text-white' : 'border border-white/30 bg-graphite-page text-white'}`}>{String(i + 1).padStart(2, '0')}</span>
                <div className="md:mt-6">
                  <h3 className="font-display text-[21px] font-semibold tracking-[-.02em]">{s.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-cream/65">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6 · Client work */}
      <section className="section bg-mist" id="work">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-12">
            <div className="max-w-2xl">
              <p className="kicker">Off our press</p>
              <h2 className="h-section mt-4">Real jobs for real brands.</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-secondary">Cartons, wrappers and labels printed for bakeries, confectioners and pharmaceutical companies. No mock-ups.</p>
            </div>
            <Link href="/gallery" className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-ink hover:text-brand">Open the gallery <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" /></Link>
          </div>
          <ClientWork />
        </div>
      </section>

      {/* 7 · Heritage */}
      <section className="section bg-white">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="relative">
            <p aria-hidden="true" className="select-none font-display text-[clamp(9rem,22vw,17rem)] font-semibold leading-[.8] tracking-[-.06em] text-transparent [-webkit-text-stroke:1.5px_#16171A]">25<span className="text-brand [-webkit-text-stroke:0]">+</span></p>
            <p className="mt-6 font-mono text-[12px] uppercase tracking-[.08em] text-muted">Years printing in Lahore</p>
          </div>
          <div>
            <p className="kicker">Who we are</p>
            <h2 className="h-section mt-4">A Lahore print house that has grown with its clients.</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-secondary">For more than 25 years ALL PACK has printed the cartons, wrappers and labels that sit on shelves across Pakistan. Pharmaceutical companies trust us with approved artwork; bakeries trust us with their busiest season. You talk to the people who run the press.</p>
            <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
              {[['One roof', 'Print, finish and cut'], ['Any run', 'Short runs to bulk supply'], ['Straight talk', 'Clear price before print']].map(([t, d]) => (
                <li key={t} className="bg-white p-4"><span className="block text-[15px] font-medium">{t}</span><span className="mt-1 block text-[13px] text-muted">{d}</span></li>
              ))}
            </ul>
            <Link href="/about" className="group mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-ink hover:text-brand">Our story <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" /></Link>
          </div>
        </div>
      </section>

      {/* 8 · Quote builder */}
      <section className="section border-t border-line bg-mist" id="quote">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-12">
            <div className="max-w-2xl">
              <p className="kicker">Quote in 30 seconds</p>
              <h2 className="h-section mt-4">Tap what you need. We&rsquo;ll write back with a price.</h2>
            </div>
            <p className="max-w-xs text-[15px] text-secondary">Your choices become a ready-made WhatsApp message. Nothing is stored on this site.</p>
          </div>
          <QuoteBuilder />
        </div>
      </section>
    </main>
  );
}
