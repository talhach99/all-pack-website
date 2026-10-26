import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Eye, Handshake, Ruler, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Photo } from '@/components/Photo';
import { ClientStrip } from '@/components/ClientStrip';
import { COMPANY, mapsLink } from '@/lib/company';
import { categories, categoryBlurb, categorySlug, products } from '@/lib/products';

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
      <PageHero kicker="About ALL PACK" title={<>The packaging experts, <span className="accent">from Lahore.</span></>} description="We design and produce custom packaging and print for businesses that know presentation matters, from first-time founders to established brands." image="gift" imageAlt="Navy and cream rigid gift boxes with gold foil by ALL PACK" />

      <section className="container-x"><div className="border-y border-line py-8"><ClientStrip /></div></section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="kicker">Our story</p>
            <h2 className="h-section mt-6">Packaging is part of the <span className="accent">product.</span></h2>
            <div className="mt-10 aspect-[4/3] overflow-hidden rounded-[20px]"><Photo name="fin_kraft" alt="Close-up of a printed kraft shipping box" sizes="(min-width:1024px) 45vw, 100vw" /></div>
          </Reveal>
          <Reveal delay={.1} className="space-y-6 text-lg leading-relaxed text-muted lg:pt-24">
            <p>Every package does two jobs: it keeps a product safe and it tells people who made it. Get both right and a plain box becomes a reason to buy, to share, and to buy again.</p>
            <p>That is what ALL PACK is about. We work with you on structure, material, print and finish, explain the options in plain language, and produce packaging that looks as good in your customer&apos;s hands as it does on screen.</p>
            <p>Whether you need a few hundred mailers for a launch or regular runs of cartons, cups and labels, we keep the process simple: a clear brief, a clear quote, and packaging you are proud to send.</p>
            <dl className="grid grid-cols-3 gap-6 border-t border-line pt-8 text-ink">
              {[[String(products.length), 'Packaging formats'], [String(categories.length), 'Collections'], ['1', 'Partner for all of it']].map(([n, l]) => <div key={l}><dd className="font-display text-4xl font-light">{n}</dd><dt className="mt-1 text-sm text-muted">{l}</dt></div>)}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="dark-section grain section">
        <div className="container-x">
          <Reveal className="mb-14 max-w-2xl"><p className="kicker">What we believe</p><h2 className="h-section mt-6">Four principles behind <span className="accent">every box.</span></h2></Reveal>
          <div className="grid gap-px overflow-hidden rounded-[20px] border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((x, i) => (
              <Reveal key={x.t} delay={i * .05} className="bg-ink p-8">
                <x.icon size={24} strokeWidth={1.4} className="text-brass-light" />
                <h3 className="mt-10 font-display text-[1.6rem] text-cream">{x.t}</h3>
                <p className="mt-3 leading-relaxed text-cream/60">{x.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="kicker">What we make</p><h2 className="h-section mt-6">Seven collections, <span className="accent">one partner.</span></h2></div><Link href="/products" className="btn-light">Browse products <ArrowRight size={16} /></Link></Reveal>
          <ul className="divide-y divide-line border-y border-line">
            {categories.map(c => (
              <li key={c}><Link href={`/products?category=${categorySlug(c)}`} className="group grid items-center gap-2 py-6 sm:grid-cols-[1fr_1.4fr_auto] sm:gap-8"><span className="font-display text-2xl group-hover:text-brass-dark">{c}</span><span className="text-muted">{categoryBlurb[c]}</span><ArrowRight size={18} className="hidden transition-transform group-hover:translate-x-1 sm:block" /></Link></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x pb-[clamp(5.5rem,11vw,9.5rem)]">
        <div className="grid overflow-hidden rounded-[28px] bg-ink text-cream lg:grid-cols-2">
          <div className="p-8 sm:p-14">
            <p className="kicker !text-brass-light">Visit us</p>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-light">Come and talk packaging.</h2>
            <p className="mt-5 max-w-md text-cream/65">{COMPANY.address}</p>
            <p className="mt-2 max-w-md text-sm text-cream/45">Please call or WhatsApp ahead so the right person is there to meet you.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Link href="/contact" className="btn-white">Contact us <ArrowRight size={16} /></Link><a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn-outline-light">Open in Maps</a></div>
          </div>
          <div className="relative min-h-[300px]"><Photo name="shipping" alt="ALL PACK printed corrugated shipping box" sizes="(min-width:1024px) 50vw, 100vw" /></div>
        </div>
      </section>
    </main>
  );
}
