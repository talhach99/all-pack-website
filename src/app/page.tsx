import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Cake, Coffee, Gem, Leaf, Phone, Pizza, Shirt, ShoppingBag, Sparkles } from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { Marquee } from '@/components/home/Marquee';
import { Collections } from '@/components/home/Collections';
import { Process } from '@/components/home/Process';
import { Finishes } from '@/components/home/Finishes';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { FaqAccordion } from '@/components/FaqAccordion';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { products, categories } from '@/lib/products';
import { COMPANY, phoneLink, whatsappLink } from '@/lib/company';

const industries = [
  { icon: ShoppingBag, name: 'E-commerce', text: 'Mailers that survive the courier and delight on arrival.' },
  { icon: Pizza, name: 'Restaurants', text: 'Pizza, burger and takeaway packs that travel well.' },
  { icon: Cake, name: 'Bakeries', text: 'Cake and pastry boxes worthy of what is inside.' },
  { icon: Coffee, name: 'Cafés', text: 'Cups, sleeves and bags carrying your brand down the street.' },
  { icon: Sparkles, name: 'Beauty', text: 'Cartons and rigid boxes for shelf-ready cosmetics.' },
  { icon: Shirt, name: 'Fashion', text: 'Shoe boxes, bags and tissue for a boutique feel.' },
  { icon: Gem, name: 'Jewellery', text: 'Small-format presentation boxes with real presence.' },
  { icon: Leaf, name: 'Agriculture', text: 'Vented produce cartons built for the supply chain.' },
];

const values = [
  { k: 'Made to measure', v: 'Every box sized around your product, not the other way round.' },
  { k: 'One partner', v: `${products.length} formats across ${categories.length} collections, from carton to sticker.` },
  { k: 'Clear quotes', v: 'Specification, price and lead time confirmed before anything is printed.' },
  { k: 'Real people', v: 'Talk directly to the team on phone or WhatsApp, not a ticket queue.' },
];

export default function Home() {
  const featured = products.filter(p => p.featured).slice(0, 6);
  const wa = whatsappLink() || '#';
  const call = phoneLink();
  return (
    <main>
      <Hero />
      <Marquee />

      {/* Why ALL PACK */}
      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="kicker">Why ALL PACK</p>
            <h2 className="h-section mt-6">Packaging is the first thing your customer <span className="accent">touches.</span></h2>
            <p className="lead mt-7 max-w-[52ch]">We help brands of every size turn a plain container into part of the product: protective where it matters, beautiful where it&apos;s seen, and priced honestly from the start.</p>
          </Reveal>
          <div className="grid border-t border-line sm:grid-cols-2">
            {values.map((x, i) => (
              <Reveal key={x.k} delay={(i % 2) * .08} className={`border-b border-line py-10 ${i % 2 ? 'sm:border-l sm:pl-8' : 'sm:pr-8'}`}>
                <span className="font-serif text-[15px] italic text-brass">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 font-display text-[1.9rem] font-normal leading-tight">{x.k}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{x.v}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Collections />

      {/* Most requested */}
      <section className="section">
        <div className="container-x">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
            <Reveal>
              <p className="kicker">Most requested</p>
              <h2 className="h-section mt-6 max-w-[14ch]">Popular with growing <span className="accent">brands.</span></h2>
            </Reveal>
            <Reveal delay={.1} className="max-w-[40ch]">
              <p className="lead">Starting points our customers ask about most. Every one can be resized, re-materialled and printed your way.</p>
              <Link href="/products" className="mt-5 inline-flex items-center gap-2 border-b border-ink pb-1 text-[15px] font-semibold transition-colors hover:border-brass hover:text-brass">Browse the catalogue <ArrowRight size={15} /></Link>
            </Reveal>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {featured.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * .07} className="h-full"><ProductCard product={p} /></Reveal>)}
          </div>
        </div>
      </section>

      <Finishes />

      <Process />

      {/* Industries */}
      <section className="dark-section grain section">
        <div className="container-x">
          <Reveal className="mb-16">
            <p className="kicker">Industries</p>
            <h2 className="h-section mt-6 max-w-[14ch]">Built for the way you <span className="accent">sell.</span></h2>
          </Reveal>
          <div className="grid border-l border-t border-cream/10 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((x, i) => (
              <Reveal key={x.name} delay={(i % 4) * .06} className="border-b border-r border-cream/10 p-8 transition-colors duration-500 hover:bg-cream/[.04]">
                <x.icon size={28} strokeWidth={1.3} className="text-brass-light" />
                <h3 className="mt-10 font-display text-[1.6rem] font-normal text-cream sm:mt-12">{x.name}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-cream/55">{x.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="kicker">Questions</p>
            <h2 className="h-section mt-6">Good to <span className="accent">know.</span></h2>
            <p className="lead mt-6 max-w-sm">Can&apos;t find your answer? Message us on WhatsApp and talk to a real person.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-dark"><WhatsAppIcon size={18} /> Ask on WhatsApp</a>
              <Link href="/faq" className="btn-light">All FAQs</Link>
            </div>
          </Reveal>
          <Reveal delay={.1}><FaqAccordion limit={5} /></Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="dark-section grain section relative overflow-hidden text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[1100px] w-[1100px] -translate-x-1/2 -translate-y-[40%] rounded-full bg-[radial-gradient(closest-side,rgba(212,176,122,.16),transparent_70%)]" aria-hidden="true" />
        <div className="container-x relative">
          <Reveal>
            <p className="kicker">Have a product that deserves better packaging?</p>
            <h2 className="h-display mx-auto mt-7 max-w-[13ch]">Let&apos;s make your next box <span className="accent">unforgettable.</span></h2>
            <p className="lead mx-auto mt-7 max-w-[56ch]">Send us a brief in two minutes. We&apos;ll come back with a specification and a clear, no-obligation quote.</p>
            <div className="mt-11 flex flex-wrap justify-center gap-3">
              <Link href="/quote" className="btn-white">Get a free quote <ArrowRight size={16} /></Link>
              <Link href="/contact" className="btn-outline-light">Contact us</Link>
            </div>
          </Reveal>
          <Reveal delay={.1} className="mt-20 grid border-t border-cream/10 text-left sm:mt-24 md:grid-cols-3">
            <CtaLink href="/quote" small="Start your quote" big="Two-minute brief" icon={<ArrowUpRight size={18} />} />
            {call && <CtaLink href={call} small="Call us" big={COMPANY.phone} icon={<Phone size={18} />} border />}
            <CtaLink href={wa} small="Chat on WhatsApp" big="Talk to a real person" icon={<WhatsAppIcon size={18} />} border external />
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function CtaLink({ href, small, big, icon, border, external }: { href: string; small: string; big: string; icon: React.ReactNode; border?: boolean; external?: boolean }) {
  const cls = `flex items-center justify-between gap-4 px-2 py-7 transition-colors hover:bg-cream/[.04] sm:px-7 ${border ? 'border-t border-cream/10 md:border-l md:border-t-0' : ''}`;
  const inner = (
    <>
      <span><span className="block text-[11px] font-bold uppercase tracking-[.2em] text-cream/50">{small}</span><span className="mt-1.5 block font-display text-xl text-cream">{big}</span></span>
      <span className="text-brass-light">{icon}</span>
    </>
  );
  return external || !href.startsWith('/')
    ? <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inner}</a>
    : <Link href={href} className={cls}>{inner}</Link>;
}
