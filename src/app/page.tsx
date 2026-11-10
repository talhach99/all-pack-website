/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Clock, Layers, Mail, MapPin, MessageCircle, Phone, Ruler } from 'lucide-react';
import { FaqAccordion } from '@/components/FaqAccordion';
import { Eyebrow, SectionHead } from '@/components/Section';
import { Marquee } from '@/components/Motion';
import { AddToQuoteButton } from '@/components/AddToQuoteButton';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { CLIENTS, COMPANY, mapsLink, phoneLink, whatsappLink } from '@/lib/company';
import { industries } from '@/data/industries';

export const metadata: Metadata = {
  title: { absolute: 'ALL PACK — Custom Packaging & Printing in Lahore' },
  description: 'Rigid boxes, mailers, cartons, printed bags and stickers, made to your size in Lahore and delivered across Pakistan. Get a free quote within 24 hours.',
  alternates: { canonical: '/' },
};

const img = (name: string) => `/images/home/${name}.webp`;

const bestSellers = [
  { slug: 'ecommerce-mailer-boxes', name: 'White mailer box', note: 'Clean unboxing for online brands', image: 'white-mailer-box' },
  { slug: 'ecommerce-mailer-boxes', name: 'Kraft mailer box', note: 'Self-locking, eco look', image: 'kraft-mailer-box' },
  { slug: 'corrugated-shipping-boxes', name: 'Shipping cartons', note: '3-ply and 5-ply for transit', image: 'shipping-cartons' },
  { slug: 'pizza-boxes', name: 'Pizza boxes', note: 'Food-safe, stack and travel well', image: 'pizza-boxes' },
];

const styles = [
  { slug: 'ecommerce-mailer-boxes', name: 'Mailer boxes', image: 'mailer-boxes' },
  { slug: 'rigid-gift-boxes', name: 'Rigid gift boxes', image: 'rigid-drawer-box' },
  { slug: 'corrugated-shipping-boxes', name: 'Shipping cartons', image: 'shipping-carton' },
  { slug: 'folding-cartons', name: 'Folding cartons', image: 'folding-carton' },
  { slug: 'takeaway-containers', name: 'Food boxes', image: 'food-boxes' },
  { slug: 'cake-boxes', name: 'Bakery boxes', image: 'bakery-box' },
  { slug: 'kraft-shopping-bags', name: 'Paper bags', image: 'paper-bag' },
  { slug: 'labels-stickers', name: 'Custom stickers', image: 'stickers' },
];

const work = [
  { t: 'Wedding gift box', d: 'Full-colour print, rigid board', image: 'custom-wedding-box', span: 'lg:col-span-2 lg:row-span-2' },
  { t: 'Ornate rigid box', d: 'Printed wrap with gold detailing', image: 'foil-ornate-box', span: '' },
  { t: 'Drawer box with dividers', d: 'Soft-touch black, spot colour logo', image: 'rigid-drawer-box', span: '' },
  { t: 'Branded paper bag', d: 'Pattern print, rope handles', image: 'paper-bag', span: '' },
  { t: 'Shaadi gift bag', d: 'Full colour with gold rope', image: 'wedding-bag', span: '' },
];

const why = [
  { icon: Ruler, t: 'Made to measure', d: 'Sized to your product, so it protects better and ships cheaper.' },
  { icon: Check, t: 'Clear quotes', d: 'Specification, price and lead time confirmed before anything is printed.' },
  { icon: Layers, t: 'One supplier', d: 'From shipping carton to sticker, every format in one place.' },
  { icon: MessageCircle, t: 'Real people', d: 'Talk to the team on phone or WhatsApp, not a ticket queue.' },
];

const steps = [
  { t: 'Share your brief', d: 'What you are packing, the quantity and the size. A photo is enough to start.' },
  { t: 'Get your quote', d: 'We recommend structure, board and finish, with a clear price and lead time.' },
  { t: 'Approve and print', d: 'Once artwork is approved, your packaging is printed, cut and finished.' },
  { t: 'Delivered', d: 'Packed and handed over on the agreed date, anywhere in Pakistan.' },
];

const finishes = [
  { t: 'Foil stamping', d: 'Gold, silver or coloured foil on logos and patterns.', image: 'foil-ornate-box' },
  { t: 'Soft-touch', d: 'A velvety matte coating people notice the moment they hold it.', image: 'soft-touch-box' },
  { t: 'Full colour', d: 'Rich CMYK print in matte or gloss, edge to edge.', image: 'full-colour-cartons' },
  { t: 'Natural kraft', d: 'Earthy board that looks great with a one-colour print.', image: 'kraft-box' },
];

const guides = [
  { t: 'How to choose the right shipping box', image: 'guide-box-size', href: '/insights/choose-the-right-shipping-box', min: 4 },
  { t: 'Kraft vs white cardboard: which fits your brand?', image: 'guide-corrugated', href: '/insights/kraft-vs-white-cardboard', min: 3 },
  { t: 'A simple checklist before sending artwork', image: 'mailer-boxes', href: '/insights/prepare-packaging-artwork', min: 5 },
];

export default function Home() {
  const wa = whatsappLink() || '/contact';
  const featured = industries.filter(i => ['e-commerce', 'restaurants', 'bakeries', 'beauty', 'pharmaceutical', 'agriculture'].includes(i.slug));
  const dark = 'section grain-dark relative bg-ink text-white';
  const light = 'section bg-white';

  return (
    <main>
      {/* 1 · Hero — dark */}
      <section className="grain-dark relative isolate overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 -z-10 opacity-[.16] [background-image:radial-gradient(#8FA6FF_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(70%_60%_at_70%_40%,#000,transparent)]" aria-hidden="true" />
        <div className="absolute right-[-10%] top-[-20%] -z-10 h-[620px] w-[620px] rounded-full bg-brand/30 blur-[160px]" aria-hidden="true" />

        <div className="container-x grid items-center gap-14 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.08fr_1fr] lg:gap-16 lg:pb-20">
          <div>
            <p className="anim-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[12.5px] font-semibold text-cream/85">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#2BD576]" aria-hidden="true" /> Custom packaging and printing · Lahore
            </p>
            <h1 className="mt-6 text-[clamp(2.7rem,5.4vw,4.6rem)] font-semibold leading-[1.02] tracking-[-.045em] text-white"><span className="line-mask"><span className="d1">Packaging that</span></span><span className="line-mask"><span className="d2">carries your</span></span><span className="line-mask"><span className="d3 text-[#8FA6FF]">brand with intent.</span></span></h1>
            <p className="anim-up d4 mt-6 max-w-xl text-[17px] leading-relaxed text-cream/70 sm:text-lg">Rigid boxes, mailers, cartons, printed bags and stickers, made to your size and finished to a standard your customers notice.</p>
            <div className="anim-up d5 mt-9 flex flex-wrap gap-3">
              <Link href="/quote" className="btn-dark">Request a quote <ArrowRight size={17} /></Link>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn border-[1.5px] border-white/40 text-white hover:border-white hover:bg-white/5"><WhatsAppIcon size={17} /> Chat on WhatsApp</a>
            </div>
            <dl className="anim-up d6 mt-12 grid max-w-lg grid-cols-3 divide-x divide-white/10 border-y border-white/10">
              {[['22', '', 'Packaging formats'], ['9', '', 'Industries served'], ['24', 'h', 'Quote reply']].map(([n, suf, l], i) => (
                <div key={l} className={`py-5 ${i ? 'pl-5 sm:pl-7' : ''}`}><dt className="sr-only">{l}</dt><dd className="text-3xl font-semibold tabular-nums tracking-tight text-white" data-count={n} data-suffix={suf}>{n}{suf}</dd><dd className="mt-0.5 text-[13px] text-cream/60">{l}</dd></div>
              ))}
            </dl>
          </div>

          <div className="anim-up d3 relative mx-auto w-full max-w-[560px] pb-12 pl-6 pr-2 pt-6 sm:pl-10">
            <div className="absolute bottom-6 left-0 right-8 top-0 rounded-[18px] border border-cyan/50" aria-hidden="true" />
            <div className="anim-float relative overflow-hidden rounded-[18px] bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,.7)] ring-1 ring-white/10">
              <img src={img('hero-magnetic-rigid-box')} alt="Black magnetic rigid gift box with a branded insert card, made by ALL PACK" className="aspect-[1.05] w-full object-cover" fetchPriority="high" />
            </div>
            <span className="anim-pop d7 absolute right-6 top-10 rounded-full bg-cyan px-3.5 py-1.5 text-[12.5px] font-bold text-ink shadow-lg">Made in Lahore</span>
            <div className="anim-slide d6 absolute bottom-0 left-0 w-[250px] rounded-[14px] bg-white p-5 text-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)]">
              <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-brand">Spec sheet</p>
              <p className="mt-1.5 text-[17px] font-semibold">Magnetic rigid box</p>
              <dl className="mt-3 grid gap-1.5 text-[13px]">
                {[['Board', '2 mm grey board'], ['Wrap', 'Soft-touch paper'], ['Close', 'Magnetic flap']].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-t border-line pt-1.5"><dt className="text-muted">{k}</dt><dd className="font-semibold">{v}</dd></div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-white/[.03]">
          <div className="container-x flex items-center gap-8 py-6">
            <span className="shrink-0 text-[12px] font-semibold uppercase tracking-[.16em] text-cyan">Trusted by</span>
            <Marquee items={[...CLIENTS, ...CLIENTS]} className="flex-1" itemClass="text-lg font-semibold text-white/55" />
          </div>
        </div>
      </section>

      <div className="border-b border-line bg-white py-5" data-no-reveal>
        <Marquee items={['Mailer boxes', 'Rigid gift boxes', 'Shipping cartons', 'Folding cartons', 'Pizza boxes', 'Bakery boxes', 'Paper bags', 'Custom stickers', 'Pouches', 'Labels']} itemClass="text-[22px] font-semibold tracking-[-.02em] text-ink/80" />
      </div>

      {/* 2 · Two ways to order — light */}
      <section className={light}>
        <div className="container-x">
          <SectionHead n={1} kicker="Two ways to order" title="Ready today, or made for you." />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="grid overflow-hidden rounded-[14px] border border-line bg-paper-deep sm:grid-cols-2">
              <div className="flex flex-col p-8">
                <h3 className="text-2xl font-semibold">Ready-to-ship stock</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">Plain boxes and bags in popular sizes, delivered across Pakistan. Ideal for quick orders and small runs.</p>
                <Link href="/products" className="mt-6 inline-flex items-center gap-1.5 font-bold text-brand hover:underline">Shop stock packaging <ArrowRight size={16} /></Link>
              </div>
              <img src={img('stock-boxes')} alt="Stacks of plain corrugated boxes and kraft pouches" loading="lazy" className="h-64 w-full object-cover sm:h-full" />
            </div>
            <div className="grid overflow-hidden rounded-[14px] border border-line bg-paper-deep sm:grid-cols-2">
              <div className="flex flex-col p-8">
                <h3 className="text-2xl font-semibold">Custom printed</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">Your size, your artwork, your finish. A clear quote and approved artwork before production starts.</p>
                <Link href="/quote" className="mt-6 inline-flex items-center gap-1.5 font-bold text-brand hover:underline">Start a custom quote <ArrowRight size={16} /></Link>
              </div>
              <img src={img('custom-wedding-box')} alt="Full-colour printed wedding gift box made by ALL PACK" loading="lazy" className="h-64 w-full object-cover sm:h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 3 · Best sellers — dark */}
      <section className={dark}>
        <div className="container-x">
          <SectionHead n={2} kicker="Most ordered" title="Best sellers" action={{ text: 'View all products', href: '/products' }} light />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map(p => (
              <article key={p.name} className="flex flex-col overflow-hidden rounded-[14px] bg-white text-ink">
                <Link href={`/products/${p.slug}`} className="block aspect-[5/4] overflow-hidden bg-soft">
                  <img src={img(p.image)} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold"><Link href={`/products/${p.slug}`} className="hover:text-brand">{p.name}</Link></h3>
                  <p className="mt-1 flex-1 text-[14px] text-muted">{p.note}</p>
                  <AddToQuoteButton slug={p.slug} className="btn-light btn-sm mt-5 w-full" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · Shop by box style — light */}
      <section className={light}>
        <div className="container-x">
          <SectionHead n={3} kicker="Catalogue" title="Shop by box style" action={{ text: 'All 22 formats', href: '/products' }} />
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {styles.map(s => (
              <Link key={s.name} href={`/products/${s.slug}`} className="group relative aspect-[1.05] overflow-hidden rounded-[14px]">
                <img src={img(s.image)} alt={s.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/90 to-ink/0 p-4 pt-12 sm:p-5">
                  <span className="text-[15px] font-semibold text-white sm:text-lg">{s.name}</span>
                  <ArrowRight size={18} className="text-cyan transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · Industries — dark */}
      <section className={dark}>
        <div className="container-x">
          <SectionHead n={4} kicker="Industries" title="Built for how you sell." action={{ text: 'All industries', href: '/industries' }} light />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map(i => (
              <Link key={i.slug} href={`/industries/${i.slug}`} className="group flex gap-4 rounded-[14px] border border-white/10 bg-white/[.04] p-6 transition hover:border-cyan hover:bg-white/[.07]">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand" aria-hidden="true">
                  <svg viewBox="0 0 20 18" className="h-4 w-4"><path d="M10 0 20 18H0Z" fill="#fff" /></svg>
                </span>
                <span>
                  <span className="block text-lg font-semibold text-white group-hover:text-cyan">{i.name}</span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-cream/65">{i.short}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · Why ALL PACK — light */}
      <section className={light}>
        <div className="container-x">
          <SectionHead n={5} kicker="Why ALL PACK" title="One partner, from carton to sticker." />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w, i) => (
              <div key={w.t} className={`border-t-2 pt-6 ${i % 2 ? 'border-cyan' : 'border-brand'}`}>
                <w.icon size={22} className="text-brand" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold">{w.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{w.d}</p>
              </div>
            ))}
          </div>
          <dl className="mt-16 grid grid-cols-2 gap-8 rounded-[14px] bg-paper-deep p-8 sm:p-10 lg:grid-cols-4">
            {[['22', '', 'Packaging formats'], ['9', '', 'Industries served'], ['7', '', 'Collections'], ['24', 'h', 'Quote reply']].map(([n, suf, l]) => (
              <div key={l}><dt className="sr-only">{l}</dt><dd className="text-4xl font-semibold tabular-nums tracking-tight text-navy sm:text-5xl" data-count={n} data-suffix={suf}>{n}{suf}</dd><dd className="mt-1 text-[14px] text-muted">{l}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      {/* 7 · Our work — dark */}
      <section className={dark}>
        <div className="container-x">
          <SectionHead n={6} kicker="Our work" title="Recent packaging we've made." action={{ text: 'See the gallery', href: '/gallery' }} light />
          <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 sm:gap-5 lg:auto-rows-[250px] lg:grid-cols-4">
            {work.map(w => (
              <figure key={w.t} className={`group relative overflow-hidden rounded-[14px] bg-white ${w.span}`}>
                <img src={img(w.image)} alt={`${w.t} made by ALL PACK`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-ink/0 p-5 pt-14">
                  <span className="block text-[16px] font-semibold text-white">{w.t}</span>
                  <span className="mt-0.5 block text-[13px] text-cream/75">{w.d}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[14px] border border-white/10 bg-white/[.04] p-6 sm:p-8">
            <p className="text-lg font-bold text-white">Have a design in mind? Send a photo or sketch and we will price it.</p>
            <Link href="/quote" className="btn-dark">Start your project <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      {/* 8 · Process — light */}
      <section className={light} id="how-it-works">
        <div className="container-x">
          <SectionHead n={7} kicker="Process" title="From brief to box in four steps." />
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t}>
                <span className="text-[15px] font-semibold text-brand">0{i + 1}</span>
                <span className={`mb-5 mt-3 block h-0.5 ${i % 2 ? 'bg-cyan' : 'bg-brand'}`} aria-hidden="true" />
                <h3 className="text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 9 · Finishes — dark */}
      <section className={dark}>
        <div className="container-x">
          <SectionHead n={8} kicker="Finishes" title="Print and finishing options." light />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {finishes.map(f => (
              <div key={f.t} className="overflow-hidden rounded-[14px] border border-white/10 bg-white/[.04]">
                <img src={img(f.image)} alt={`${f.t} finish`} loading="lazy" className="aspect-[3/2] w-full object-cover" />
                <div className="p-5"><h3 className="text-lg font-semibold text-white">{f.t}</h3><p className="mt-1.5 text-[14px] leading-relaxed text-cream/65">{f.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 · Guides — light */}
      <section className={light}>
        <div className="container-x">
          <SectionHead n={9} kicker="Guides" title="Packaging know-how." action={{ text: 'All guides', href: '/insights' }} />
          <div className="grid gap-6 md:grid-cols-3">
            {guides.map(g => (
              <Link key={g.t} href={g.href} className="group overflow-hidden rounded-[14px] border border-line bg-white">
                <img src={img(g.image)} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="p-6">
                  <p className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[.12em] text-brand"><Clock size={13} /> Guide · {g.min} min read</p>
                  <h3 className="mt-2 text-lg font-semibold group-hover:text-brand">{g.t}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11 · FAQ — dark */}
      <section className={dark}>
        <div className="container-x grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow n={10} light>FAQ</Eyebrow>
            <h2 className="h-section mt-5 !text-white">Questions, answered.</h2>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-cream/70">The things most customers ask before their first order. Anything else, just ask the team.</p>
            <div className="mt-10 rounded-[14px] border border-white/10 bg-white/[.04] p-7">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#1F9D55] text-white"><WhatsAppIcon size={22} /></span>
                <div>
                  <p className="text-lg font-semibold text-white">Still have a question?</p>
                  <p className="text-[14px] text-cream/60">Real people reply on WhatsApp, usually within the hour.</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-sm bg-white !px-5 text-ink hover:bg-cream"><WhatsAppIcon size={16} /> Ask on WhatsApp</a>
                <Link href="/faq" className="btn btn-sm border border-white/25 !px-5 text-white hover:border-white">See all FAQs <ArrowRight size={15} /></Link>
              </div>
            </div>
          </div>
          <FaqAccordion limit={6} dark />
        </div>
      </section>

      {/* 12 · Final CTA — light */}
      <section className="section bg-paper-deep">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-20">
            <div>
              <Eyebrow n={11}>Start your order</Eyebrow>
              <h2 className="mt-5 text-[clamp(2.4rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-.035em] text-ink">Send a size. <span className="text-brand">Get a box.</span></h2>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">Tell us what you are packing and how many you need. You will get a clear specification and a free, no-obligation quote within 24 hours.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/quote" className="btn-dark">Request a free quote <ArrowRight size={17} /></Link>
                <Link href="/products" className="btn-light">Browse products</Link>
              </div>
              <ul className="mt-10 grid gap-3 text-[15px] text-ink sm:grid-cols-3">
                {['Free, no obligation', 'Reply within 24 hours', 'Delivery across Pakistan'].map(t => (
                  <li key={t} className="flex items-center gap-2.5"><span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-white"><Check size={12} /></span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="relative isolate overflow-hidden rounded-[20px] bg-ink p-7 text-white shadow-[0_40px_80px_-40px_rgba(6,16,74,.6)] sm:p-8">
              <div className="absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full bg-brand/40 blur-[90px]" aria-hidden="true" />
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[.16em] text-cyan">Talk to the team</p>
                  <p className="mt-2 text-2xl font-semibold leading-tight">Pick the way that suits you.</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[12.5px] font-semibold text-cream/85"><span className="pulse-dot h-2 w-2 rounded-full bg-[#2BD576]" aria-hidden="true" /> Replies in 24h</span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: <WhatsAppIcon size={20} />, label: 'WhatsApp', value: COMPANY.phone, note: 'Fastest reply', href: wa, ext: true, tone: 'bg-[#1F9D55]' },
                  { icon: <Phone size={19} />, label: 'Call us', value: COMPANY.phone, note: 'Mon to Sat', href: phoneLink() || '#', ext: false, tone: 'bg-brand' },
                  { icon: <Mail size={19} />, label: 'Email', value: COMPANY.email, note: 'For artwork files', href: `mailto:${COMPANY.email}`, ext: false, tone: 'bg-cyan !text-ink' },
                  { icon: <MapPin size={19} />, label: 'Visit', value: 'Lakshmi Chowk, Lahore', note: 'Call ahead first', href: mapsLink, ext: true, tone: 'bg-white !text-ink' },
                ].map(c => (
                  <a key={c.label} href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex flex-col rounded-[14px] border border-white/10 bg-white/[.04] p-5 transition hover:-translate-y-0.5 hover:border-cyan/60 hover:bg-white/[.08]">
                    <div className="flex items-center justify-between">
                      <span className={`grid h-11 w-11 place-items-center rounded-xl text-white ${c.tone}`}>{c.icon}</span>
                      <ArrowUpRight size={18} className="text-cream/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    </div>
                    <span className="mt-5 text-[12px] font-semibold uppercase tracking-[.14em] text-cream/55">{c.label}</span>
                    <span className={`mt-1 font-semibold leading-snug text-white ${c.label === 'Email' ? 'text-[13.5px] tracking-[-.01em]' : 'text-[16px]'}`}>{c.value}</span>
                    <span className="mt-1 text-[13px] text-cream/55">{c.note}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
