/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Cake, Coffee, Gem, Leaf, Pizza, Shirt, ShoppingBag, Sparkles, Truck } from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { Marquee } from '@/components/home/Marquee';
import { Collections } from '@/components/home/Collections';
import { Process } from '@/components/home/Process';
import { Finishes } from '@/components/home/Finishes';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { FaqAccordion } from '@/components/FaqAccordion';
import { products, categories } from '@/lib/products';
import { whatsappLink } from '@/lib/company';

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
  return (
    <main>
      <Hero />
      <Marquee />

      <section className="section pb-0">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="kicker mb-5">Why ALL PACK</p>
            <h2 className="h-section">Packaging is the first thing your customer <span className="accent">touches.</span></h2>
          </Reveal>
          <Reveal delay={.1}><p className="lead max-w-xl lg:pb-2">We help brands of every size turn a plain container into part of the product: protective where it matters, beautiful where it&apos;s seen, and priced honestly from the start.</p></Reveal>
        </div>
        <div className="container-x mt-14"><div className="grid gap-px overflow-hidden rounded-4xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {values.map((x, i) => (
            <Reveal key={x.k} delay={i * .05} className="bg-white p-7 sm:p-8">
              <p className="font-display text-2xl font-semibold tracking-tight">{x.k}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{x.v}</p>
            </Reveal>
          ))}
        </div></div>
      </section>

      <Collections />

      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading kicker="Most requested" title={<>Popular with <span className="accent">growing</span> brands.</>} description="Starting points our customers ask about most. Every one can be resized, re-materialled and printed your way.">
            <Link href="/products" className="btn-dark">Browse the catalogue <ArrowRight size={16} /></Link>
          </SectionHeading>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * .06}><ProductCard product={p} /></Reveal>)}
          </div>
        </div>
      </section>

      <Finishes />

      <section className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-5xl bg-ink px-7 py-14 text-white sm:px-14 sm:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_50%,rgba(58,127,192,.45),transparent)]" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-0 opacity-[.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px]" aria-hidden="true" />
            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="kicker mb-5 !text-sky-light">ALL PACK 3D Studio</p>
                <h2 className="font-display text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1.02] tracking-[-.04em]">Design your box. <span className="font-serif font-normal italic text-sky-light">Spin it in 3D.</span></h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">Pick a style, set the dimensions, choose colour and finish, and watch it come to life. Then send the spec to us with one click.</p>
                <Link href="/studio" className="btn-white mt-9">Open the studio <ArrowUpRight size={17} /></Link>
              </div>
              <div className="relative">
                <img src="/renders/mailer.webp" alt="Navy branded mailer box with printed interior" loading="lazy" className="relative z-[1] mx-auto w-full max-w-[560px] drop-shadow-[0_40px_60px_rgba(0,0,0,.35)]" />
                <div className="absolute bottom-6 left-0 z-[2] hidden rounded-2xl border border-white/15 bg-white/10 p-4 text-sm backdrop-blur-xl sm:block">
                  <p className="text-white/60">Mailer box · 25 × 18 × 10 cm</p>
                  <p className="mt-1 font-semibold">Navy · Soft-touch · Printed inside</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <Process />

      <section className="section">
        <div className="container-x">
          <SectionHeading kicker="Industries" title={<>Built for the way <span className="accent">you</span> sell.</>} center />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((x, i) => (
              <Reveal key={x.name} delay={(i % 4) * .05}>
                <div className="group h-full rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mist text-brand transition-colors group-hover:bg-brand group-hover:text-white"><x.icon size={22} /></span>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{x.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{x.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <p className="kicker mb-5">Questions</p>
            <h2 className="h-section">Good to <span className="accent">know.</span></h2>
            <p className="lead mt-6 max-w-sm">Can&apos;t find your answer? Message us on WhatsApp and talk to a real person.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsappLink() || '#'} target="_blank" rel="noopener noreferrer" className="btn-dark">Ask on WhatsApp</a>
              <Link href="/faq" className="btn-light">All FAQs</Link>
            </div>
          </Reveal>
          <Reveal delay={.1}><FaqAccordion limit={5} /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-5xl border border-line bg-[radial-gradient(100%_120%_at_0%_0%,#fff,#EAF1FB)] px-7 py-14 sm:px-14 sm:py-20">
              <img src="/renders/shipping.webp" alt="" aria-hidden="true" loading="lazy" className="pointer-events-none absolute -bottom-6 -right-10 hidden w-[46%] max-w-[560px] lg:block" />
              <div className="relative max-w-2xl">
                <Truck className="mb-6 text-sky" size={28} />
                <h2 className="h-section">Let&apos;s make your next box <span className="accent">unforgettable.</span></h2>
                <p className="lead mt-6 max-w-lg">Send us a brief in two minutes. We&apos;ll come back with a specification and a clear, no-obligation quote.</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link href="/quote" className="btn-dark">Get a free quote <ArrowRight size={17} /></Link>
                  <Link href="/contact" className="btn-light">Contact us</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
