/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Eye, Handshake, Ruler, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { COMPANY, mapsLink } from '@/lib/company';
import { categories, products } from '@/lib/products';

export const metadata: Metadata = { title: 'About Us', description: 'ALL PACK is a packaging and printing company in Lahore helping brands turn plain containers into part of the product.', alternates: { canonical: '/about' } };

const principles = [
  { icon: Ruler, t: 'Fit first', d: 'A box that fits properly protects better, ships cheaper and looks more expensive. We size around your product.' },
  { icon: Eye, t: 'Design that sells', d: 'Print, colour and finish chosen to make your brand recognisable on a shelf, in a feed and on a doorstep.' },
  { icon: ShieldCheck, t: 'Built to protect', d: 'The right board grade and construction for how your product is stored, stacked and shipped.' },
  { icon: Handshake, t: 'Straight answers', d: 'Clear specifications, honest pricing and a real person on the phone when you need one.' },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero kicker="About ALL PACK" title={<>The packaging experts, <span className="accent">from Lahore.</span></>} description="We design and produce custom packaging and print for businesses that know presentation matters, from first-time founders to established brands." />
      <section className="container-x">
        <Reveal><div className="tile overflow-hidden rounded-5xl border border-line"><img src="/renders/hero.webp" alt="ALL PACK packaging range" className="mx-auto w-full max-w-5xl" /></div></Reveal>
        <div className="mt-px grid gap-px overflow-hidden rounded-4xl border border-line bg-line sm:grid-cols-3">
          {[[`${products.length}`, 'Packaging formats'], [`${categories.length}`, 'Product collections'], ['1', 'Partner for all of it']].map(([n, l]) => (
            <div key={l} className="bg-white p-8"><p className="font-display text-5xl font-semibold tracking-tight">{n}</p><p className="mt-2 text-muted">{l}</p></div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="kicker mb-5">Our story</p>
            <h2 className="h-section">Packaging is part of the <span className="accent">product.</span></h2>
          </Reveal>
          <Reveal delay={.1} className="space-y-5 text-lg leading-relaxed text-muted">
            <p>Every package does two jobs: it keeps a product safe and it tells people who made it. Get both right and a plain box becomes a reason to buy, to share, and to buy again.</p>
            <p>That is what ALL PACK is about. We work with you on structure, material, print and finish, explain the options in plain language, and produce packaging that looks as good in your customer&apos;s hands as it does on screen.</p>
            <p>Whether you need a few hundred mailers for a launch or regular runs of cartons, cups and labels, we keep the process simple: a clear brief, a clear quote, and packaging you are proud to send.</p>
          </Reveal>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-x">
          <Reveal className="mb-14 max-w-2xl"><p className="kicker mb-5">What we believe</p><h2 className="h-section">Four principles behind <span className="accent">every box.</span></h2></Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((x, i) => (
              <Reveal key={x.t} delay={i * .05} className="rounded-4xl border border-line bg-paper p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-white"><x.icon size={21} /></span>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight">{x.t}</h3>
                <p className="mt-3 leading-relaxed text-muted">{x.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-x grid items-center gap-10 rounded-5xl bg-ink p-8 text-white sm:p-14 lg:grid-cols-2">
          <div>
            <p className="kicker mb-5 !text-sky-light">Visit us</p>
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Come and talk packaging.</h2>
            <p className="mt-5 max-w-md text-white/70">{COMPANY.address}</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/contact" className="btn-white">Contact us <ArrowRight size={16} /></Link><a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn border border-white/20 text-white hover:bg-white/10">Open in Maps</a></div>
          </div>
          <img src="/renders/gift.webp" alt="" aria-hidden="true" className="mx-auto w-full max-w-md" loading="lazy" />
        </div>
      </section>
    </main>
  );
}
