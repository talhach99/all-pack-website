/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Handshake, PackageCheck, Palette, Ruler, ShieldCheck, Timer, Wallet } from 'lucide-react';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { Eyebrow } from '@/components/Section';
import { COMPANY, quoteLink, whatsappLink } from '@/lib/company';
import { ClientStrip } from '@/components/ClientStrip';
import { industries } from '@/data/industries';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'ALL PACK is a Lahore packaging and printing company with more than 25 years of experience making boxes, bags, labels and printed packaging for businesses across Pakistan.',
  alternates: { canonical: '/about' },
};

const img = (name: string) => `/images/home/${name}.webp`;

const impact = [
  { icon: ShieldCheck, t: 'Protects the product', d: 'The right board, structure and fit, so goods arrive the way they left, whether they travel across town or across the country.' },
  { icon: Palette, t: 'Builds the brand', d: 'Print, colour and finish that make a product recognisable on a shelf, at a counter and on a customer’s doorstep.' },
  { icon: Wallet, t: 'Controls cost', d: 'Right-sized packs use less material, less void fill and less space in transit. Good packaging should save money, not just spend it.' },
  { icon: Timer, t: 'Keeps you on schedule', d: 'Clear specifications and realistic lead times, agreed before production, so launches and seasons are not left to chance.' },
];

const values = [
  { icon: Ruler, t: 'Fit first', d: 'Every pack starts with the product it has to hold.' },
  { icon: BadgeCheck, t: 'Quality you can check', d: 'Samples and proofs before a full run, not after.' },
  { icon: Handshake, t: 'Straight answers', d: 'Honest pricing and a clear yes or no on what will work.' },
  { icon: PackageCheck, t: 'One partner', d: 'From shipping carton to sticker, handled in one place.' },
];

const work = [
  { image: 'custom-wedding-box', t: 'Printed wedding gift box' },
  { image: 'rigid-drawer-box', t: 'Drawer box with dividers' },
  { image: 'paper-bag', t: 'Branded paper bag' },
  { image: 'foil-ornate-box', t: 'Ornate rigid box' },
];

export default function AboutPage() {
  const wa = whatsappLink() || '/contact';
  return (
    <main>
      {/* Hero — dark */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="container-x grid items-center gap-14 py-16 sm:py-24 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <Eyebrow light>About ALL PACK</Eyebrow>
            <h1 className="mt-5 text-[clamp(2.5rem,4.8vw,3.9rem)] font-semibold leading-[1.05] tracking-[-.035em] text-white">More than 25 years of packaging that works as hard as your product</h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-cream/70 sm:text-lg">ALL PACK is a Lahore packaging and printing company. For over a quarter of a century we have helped businesses protect what they make, present it with pride and get it to their customers in one piece.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={quoteLink()} target="_blank" rel="noopener noreferrer" className="btn-dark"><WhatsAppIcon size={18} /> Get a quote on WhatsApp</a>
              <Link href="/products" className="btn border-[1.5px] border-white/40 text-white hover:border-white hover:bg-white/5">See what we make</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 rounded-xl border border-white/10 bg-white/[.05] p-8">
              <p className="text-[72px] font-semibold leading-none tracking-[-.05em] text-white sm:text-[96px]"><span data-count="25">25</span><span className="text-cyan">+</span></p>
              <p className="mt-2 text-[15px] font-semibold text-cream/75">Years in packaging and print</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[.05] p-6"><p className="text-4xl font-semibold text-white">22</p><p className="mt-1 text-[14px] text-cream/65">Packaging formats</p></div>
            <div className="rounded-xl border border-white/10 bg-white/[.05] p-6"><p className="text-4xl font-semibold text-white">9</p><p className="mt-1 text-[14px] text-cream/65">Industries served</p></div>
          </div>
        </div>
      </section>

      {/* Story — light */}
      <section className="section bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow n={1}>Our story</Eyebrow>
            <h2 className="h-section mt-5">Built on quality, trust and customers who keep coming back</h2>
          </div>
          <div className="space-y-5 text-[17px] leading-[1.8] text-muted">
            <p>For more than 25 years, ALL PACK has been part of how Lahore’s businesses reach their customers. Bakeries, restaurants, pharmaceutical companies, retailers and online brands have trusted us with the one thing every product needs and every customer sees first: its packaging.</p>
            <p>We have grown alongside the businesses we serve. As they moved from local shops to nationwide delivery, from plain cartons to branded boxes, and from simple bags to premium gift packaging, we grew our range with them. Today that range covers 22 packaging formats, from heavy-duty shipping cartons to rigid gift boxes, printed bags and custom stickers.</p>
            <p>What has not changed is how we work. We listen to what the product needs, recommend what will genuinely work, quote clearly and deliver what we promised. That is why so many of our customers have stayed with us for years, and why so many new ones come to us by recommendation.</p>
          </div>
        </div>
      </section>

      {/* Impact — dark */}
      <section className="section bg-ink text-white">
        <div className="container-x">
          <Eyebrow n={2} light>Why it matters</Eyebrow>
          <h2 className="h-section mt-5 max-w-3xl !text-white">Good packaging quietly does four jobs for your business</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {impact.map((x, i) => (
              <div key={x.t} className={`rounded-xl border border-white/10 bg-white/[.04] p-7 ${i % 2 ? 'lg:translate-y-6' : ''}`}>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand"><x.icon size={22} aria-hidden="true" /></span>
                <h3 className="mt-6 text-xl font-semibold text-white">{x.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-cream/65">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries — light */}
      <section className="section bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow n={3}>Who we work with</Eyebrow>
            <h2 className="h-section mt-5">Trusted across industries</h2>
            <p className="mt-5 text-[17px] leading-[1.8] text-muted">Every industry asks something different of its packaging. Food needs to be safe and travel well. Medicine needs exact, approved print. E-commerce needs to survive the courier. Gifts need to feel special the moment they are held. Years of solving these problems is what we bring to every new order.</p>
            <div className="mt-8 border-t border-line pt-6">
              <ClientStrip label="Clients include" />
            </div>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {industries.map(i => (
              <li key={i.slug} className="bg-white">
                <Link href={`/industries/${i.slug}`} className="group flex h-full items-start justify-between gap-4 p-6 hover:bg-paper-deep">
                  <span><span className="block font-semibold group-hover:text-brand">{i.name}</span><span className="mt-1 block text-[14px] leading-relaxed text-muted">{i.short}</span></span>
                  <ArrowRight size={17} className="mt-1 shrink-0 text-brand opacity-0 transition group-hover:opacity-100" />
                </Link>
              </li>
            ))}
            <li className="bg-brand">
              <Link href="/contact" className="group flex h-full items-start justify-between gap-4 p-6 text-white">
                <span><span className="block font-semibold">Don&apos;t see your industry?</span><span className="mt-1 block text-[14px] leading-relaxed text-cream/85">Tell us what you make and we will suggest the right pack.</span></span>
                <ArrowRight size={17} className="mt-1 shrink-0 transition group-hover:translate-x-1" />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Values + work — dark */}
      <section className="section bg-ink text-white">
        <div className="container-x">
          <Eyebrow n={4} light>How we work</Eyebrow>
          <h2 className="h-section mt-5 !text-white">The standards behind every order</h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.t} className={`border-t-2 pt-6 ${i % 2 ? 'border-cyan' : 'border-brand'}`}>
                <v.icon size={22} className="text-cyan" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-white">{v.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-cream/65">{v.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {work.map(w => (
              <figure key={w.t} className="overflow-hidden rounded-xl bg-white">
                <img src={img(w.image)} alt={`${w.t} made by ALL PACK`} loading="lazy" className="aspect-square w-full object-cover" />
                <figcaption className="bg-ink-2 px-4 py-3 text-[14px] font-semibold text-cream/85">{w.t}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — light */}
      <section className="bg-white py-20">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-8 rounded-xl bg-brand p-10 sm:p-14 lg:flex-row lg:items-center">
            <div>
              <h2 className="h-section !text-white">Work with a team that has done this for 25 years</h2>
              <p className="mt-3 text-[16px] text-cream/85">Tell us what you are packing. We will tell you what will work, and what it will cost.</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a href={quoteLink()} target="_blank" rel="noopener noreferrer" className="btn-white"><WhatsAppIcon size={18} /> Get a quote on WhatsApp</a>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn border-[1.5px] border-white text-white hover:bg-white/10"><WhatsAppIcon size={17} /> {COMPANY.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
