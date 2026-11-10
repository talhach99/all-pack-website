/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Layers, Mail, MapPin, MessageCircle, Phone, Ruler } from 'lucide-react';
import { FaqAccordion } from '@/components/FaqAccordion';
import { Eyebrow, SectionHead } from '@/components/Section';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { COMPANY, emailLink, mapsLink, phoneLink, quoteLink } from '@/lib/company';
import { ClientLogos } from '@/components/ClientStrip';
import { ClientWork } from '@/components/ClientWork';

export const metadata: Metadata = {
  title: { absolute: 'ALL PACK — Custom Packaging & Printing in Lahore' },
  description: 'Rigid boxes, mailers, cartons, printed bags and stickers, made to your size in Lahore and delivered across Pakistan. Get a free quote within 24 hours.',
  alternates: { canonical: '/' },
};

const img = (name: string) => `/images/home/${name}.webp`;

const work = [
  { t: 'Wedding gift box', d: 'Full-colour print · rigid board', image: 'custom-wedding-box', span: 'lg:col-span-2 lg:row-span-2' },
  { t: 'Ornate rigid box', d: 'Printed wrap · gold detailing', image: 'foil-ornate-box', span: '' },
  { t: 'Drawer box with dividers', d: 'Soft-touch black · spot colour logo', image: 'rigid-drawer-box', span: '' },
  { t: 'Branded paper bag', d: 'Pattern print · rope handles', image: 'paper-bag', span: '' },
  { t: 'Shaadi gift bag', d: 'Full colour · gold rope', image: 'wedding-bag', span: '' },
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

const heroWork = [
  { image: 'custom-wedding-box', label: 'Wedding gift box', alt: 'Full-colour paisley wedding gift box printed by ALL PACK' },
  { image: 'paper-bag', label: 'Printed paper bag', alt: 'Purple pattern-printed paper bag with rope handles made by ALL PACK' },
  { image: 'stickers', label: 'Printed label', alt: 'Sun Cake Rusk printed label made by ALL PACK' },
];

export default function Home() {
  const quote = quoteLink();
  const mist = 'section bg-mist';
  const white = 'section bg-white';

  return (
    <main>
      {/* 1 · Hero */}
      <section className="border-b border-line bg-mist">
        <div className="container-x grid items-center gap-12 py-12 sm:py-16 lg:min-h-[calc(100svh-72px)] lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-16">
          <div className="anim-up">
            <p className="text-[13px] font-medium text-muted">Custom packaging and printing · Lahore</p>
            <h1 className="mt-4 text-[clamp(2.5rem,5.2vw,4.25rem)] font-medium leading-[1.04] tracking-[-.03em] text-ink">Custom boxes, bags and labels, printed in Lahore</h1>
            <p className="mt-6 max-w-[34rem] text-[18px] leading-[1.6] text-secondary">Rigid gift boxes, mailers, cartons, printed bags and stickers, made to your size and finish. Delivered anywhere in Pakistan.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-dark"><WhatsAppIcon size={18} /> Get a quote on WhatsApp</a>
              <a href={emailLink()} className="btn-light"><Mail size={18} strokeWidth={1.5} /> Email your brief</a>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 border-t border-ink/10 pt-6">
              {[['25+', 'Years in print'], ['22', 'Packaging formats'], ['24h', 'Quote reply']].map(([n, l]) => (
                <div key={l}><dt className="sr-only">{l}</dt><dd className="text-[28px] font-medium leading-none tabular-nums text-ink">{n}</dd><dd className="mt-2 text-[13px] text-muted">{l}</dd></div>
              ))}
            </dl>
          </div>

          <figure className="anim-up d2 crop m-3 sm:m-4">
            <div className="overflow-hidden rounded-2xl border border-line bg-white p-2">
              <div className="grid aspect-[4/3] grid-cols-[1.3fr_1fr] grid-rows-2 gap-2">
                {heroWork.map((w, i) => (
                  <div key={w.image} className={`relative overflow-hidden rounded-[10px] bg-mist ${i === 0 ? 'row-span-2' : ''}`}>
                    <img src={img(w.image)} alt={w.alt} className="absolute inset-0 h-full w-full object-cover" {...(i === 0 ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })} />
                  </div>
                ))}
              </div>
              <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-3 pb-2 pt-4">
                <span className="text-[15px] font-medium text-ink">Recent work from our press</span>
                <span className="meta">{heroWork.map(w => w.label).join(' · ')}</span>
              </figcaption>
            </div>
          </figure>
        </div>

      </section>

      {/* 1b · Clients */}
      <section className="border-b border-line bg-white py-12 sm:py-16">
        <div className="container-x">
          <p className="text-center text-[13px] font-medium text-muted">Trusted by pharmaceutical companies, bakeries and hospitals across Pakistan</p>
          <ClientLogos className="mt-6" />
        </div>
      </section>

      {/* 1c · Printed for our clients */}
      <section className="section bg-mist">
        <div className="container-x">
          <SectionHead kicker="Client work" title="Printed for our clients" sub="Cartons, wrappers and labels we have printed for bakeries, confectioners and pharmaceutical companies." action={{ text: 'See the gallery', href: '/gallery' }} />
          <ClientWork />
        </div>
      </section>

      {/* 2 · Two ways to order */}
      <section className={white}>
        <div className="container-x">
          <SectionHead kicker="Two ways to order" title="Ready today, or made for you" />
          <div className="grid gap-6 lg:grid-cols-2">
            {[
              { t: 'Ready-to-ship stock', d: 'Plain boxes and bags in popular sizes, delivered across Pakistan. Ideal for quick orders and small runs.', cta: 'Shop stock packaging', href: '/products', ext: false, image: 'stock-boxes', alt: 'Stacks of plain corrugated boxes and kraft pouches' },
              { t: 'Custom printed', d: 'Your size, your artwork, your finish. A clear quote and approved artwork before production starts.', cta: 'Start a custom quote', href: quote, ext: true, image: 'custom-wedding-box', alt: 'Full-colour printed wedding gift box made by ALL PACK' },
            ].map(o => (
              <div key={o.t} className="grid overflow-hidden rounded-2xl border border-line bg-mist sm:grid-cols-2">
                <div className="flex flex-col p-6 sm:p-8">
                  <h3 className="text-2xl font-medium">{o.t}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-secondary">{o.d}</p>
                  <a href={o.href} {...(o.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-brand">{o.cta} <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-150 group-hover:translate-x-0.5" /></a>
                </div>
                <img src={img(o.image)} alt={o.alt} loading="lazy" className="h-64 w-full object-cover sm:h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · Why ALL PACK */}
      <section className={mist}>
        <div className="container-x">
          <SectionHead kicker="Why ALL PACK" title="One partner, from carton to sticker" />
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {why.map(w => (
              <div key={w.t} className="border-t border-ink/10 pt-6">
                <w.icon size={18} strokeWidth={1.5} className="text-muted" aria-hidden="true" />
                <h3 className="mt-4 text-[17px] font-medium">{w.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-secondary">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · Our work: the one dark band, where the printed colour carries the page */}
      <section className="section bg-ink text-white">
        <div className="container-x">
          <SectionHead kicker="Our work" title="Recent packaging we've made" action={{ text: 'See the gallery', href: '/gallery' }} light />
          <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:auto-rows-[248px] lg:grid-cols-4">
            {work.map(w => (
              <figure key={w.t} className={`flex flex-col overflow-hidden rounded-xl bg-graphite-card ${w.span}`}>
                <div className="min-h-0 flex-1 overflow-hidden bg-white">
                  <img src={img(w.image)} alt={`${w.t} made by ALL PACK`} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3">
                  <span className="text-[15px] font-medium text-white">{w.t}</span>
                  <span className="font-mono text-[12px] text-cyan">{w.d}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
            <p className="text-[17px] text-cream">Have a design in mind? Send a photo or sketch and we will price it</p>
            <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-white"><WhatsAppIcon size={18} /> Send it on WhatsApp</a>
          </div>
        </div>
      </section>

      {/* 8 · Process */}
      <section className={white} id="how-it-works">
        <div className="container-x">
          <SectionHead kicker="Process" title="From brief to box in four steps" />
          <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t} className="border-t border-ink/10 pt-6">
                <span className="meta tabular-nums">0{i + 1}</span>
                <h3 className="mt-4 text-[17px] font-medium">{s.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-secondary">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 9 · Finishes */}
      <section className={mist}>
        <div className="container-x">
          <SectionHead kicker="Finishes" title="Print and finishing options" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {finishes.map(f => (
              <div key={f.t} className="overflow-hidden rounded-2xl border border-line bg-white">
                <img src={img(f.image)} alt={`${f.t} finish`} loading="lazy" className="aspect-[3/2] w-full object-cover" />
                <div className="p-5"><h3 className="text-[17px] font-medium">{f.t}</h3><p className="mt-2 text-[14px] leading-relaxed text-secondary">{f.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 · FAQ */}
      <section className={white}>
        <div className="container-x grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="h-section mt-3">Questions, answered</h2>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-secondary">The things most customers ask before their first order. Anything else, just ask the team.</p>
            <div className="mt-8 max-w-md rounded-2xl border border-line bg-mist p-6">
              <p className="text-[17px] font-medium">Still have a question?</p>
              <p className="mt-1 text-[14px] text-secondary">Real people reply on WhatsApp, usually within the hour.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-light btn-sm"><WhatsAppIcon size={16} /> Ask on WhatsApp</a>
                <Link href="/faq" className="btn-ghost btn-sm">See all FAQs <ArrowRight size={16} strokeWidth={1.5} /></Link>
              </div>
            </div>
          </div>
          <FaqAccordion limit={6} />
        </div>
      </section>

      {/* 12 · Final CTA */}
      <section className={mist}>
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-20">
            <div>
              <Eyebrow>Start your order</Eyebrow>
              <h2 className="mt-3 text-[clamp(2.25rem,4.2vw,3.5rem)] font-medium leading-[1.06] tracking-[-.03em] text-ink">Send a size, get a box</h2>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-secondary">Tell us what you are packing and how many you need. You will get a clear specification and a free, no-obligation quote within 24 hours.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-dark"><WhatsAppIcon size={18} /> Get a quote on WhatsApp</a>
                <Link href="/products" className="btn-light">Browse products</Link>
              </div>
              <ul className="mt-10 grid gap-3 text-[15px] text-secondary sm:grid-cols-3">
                {['Free, no obligation', 'Reply within 24 hours', 'Delivery across Pakistan'].map(t => (
                  <li key={t} className="flex items-center gap-2"><Check size={16} strokeWidth={1.5} className="text-muted" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-white p-2">
              <p className="px-4 pb-3 pt-4 text-[13px] font-medium text-muted">Talk to the team · replies within 24 hours</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { icon: <WhatsAppIcon size={18} />, label: 'WhatsApp', value: COMPANY.phone, note: 'Fastest reply', href: quote, ext: true, mono: true },
                  { icon: <Phone size={18} strokeWidth={1.5} />, label: 'Call', value: COMPANY.phone, note: 'Mon to Sat', href: phoneLink() || '#', ext: false, mono: true },
                  { icon: <Mail size={18} strokeWidth={1.5} />, label: 'Email', value: COMPANY.email, note: 'For artwork files', href: emailLink(), ext: false, mono: false },
                  { icon: <MapPin size={18} strokeWidth={1.5} />, label: 'Visit', value: 'Royal Park, Lakshmi Chowk, Lahore', note: 'Call ahead first', href: mapsLink, ext: true, mono: false },
                ].map(c => (
                  <a key={c.label} href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex flex-col rounded-[10px] border border-line bg-mist p-4 transition-colors hover:border-ink/20">
                    <span className="flex items-center justify-between text-muted">
                      <span className="flex items-center gap-2 text-[13px]">{c.icon}{c.label}</span>
                      <ArrowUpRight size={16} strokeWidth={1.5} className="transition-colors group-hover:text-ink" />
                    </span>
                    <span className={`mt-4 break-all leading-snug text-ink ${c.mono ? 'font-mono text-[15px] tabular-nums' : 'text-[15px] font-medium'}`}>{c.value}</span>
                    <span className="mt-1 text-[13px] text-muted">{c.note}</span>
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
