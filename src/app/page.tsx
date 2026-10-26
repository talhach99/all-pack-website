import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Boxes, FileCheck2, MessagesSquare, Phone, Ruler } from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { Process } from '@/components/home/Process';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { FaqAccordion } from '@/components/FaqAccordion';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { ClientStrip } from '@/components/ClientStrip';
import { Photo } from '@/components/Photo';
import { products, categories, categoryBlurb, categoryCover, categorySlug } from '@/lib/products';
import { industries } from '@/data/industries';
import { COMPANY, phoneLink, whatsappLink } from '@/lib/company';

const values = [
  { icon: Ruler, k: 'Made to measure', v: 'Every box sized around your product, not the other way round.' },
  { icon: Boxes, k: 'One partner', v: `${products.length} formats across ${categories.length} collections, from carton to sticker.` },
  { icon: FileCheck2, k: 'Clear quotes', v: 'Specification, price and lead time confirmed before anything is printed.' },
  { icon: MessagesSquare, k: 'Real people', v: 'Talk directly to the team on phone or WhatsApp, not a ticket queue.' },
];

const finishes = [
  { img: 'fin_foil', name: 'Foil stamping', text: 'Metallic gold, silver or coloured foil on logos and details for an unmistakably premium cue.' },
  { img: 'fin_soft', name: 'Soft-touch', text: 'A velvety, tactile coating that customers notice the moment they pick the box up.' },
  { img: 'fin_print', name: 'Full-colour & gloss', text: 'Rich, saturated colour and a reflective shine that makes photography and bold graphics pop.' },
  { img: 'fin_kraft', name: 'Natural kraft', text: 'Honest, earthy and recyclable-looking. Perfect with a single-colour print for a crafted feel.' },
];

export default function Home() {
  const featured = products.filter(p => p.featured).slice(0, 6);
  const wa = whatsappLink() || '#';
  const call = phoneLink();
  return (
    <main>
      <Hero />

      {/* trust + facts */}
      <section className="border-b border-line bg-paper">
        <div className="container-x flex flex-col justify-between gap-8 py-9 lg:flex-row lg:items-center">
          <ClientStrip />
          <dl className="flex gap-10 text-sm">
            {[[String(products.length), 'Packaging formats'], [String(categories.length).padStart(2, '0'), 'Collections'], ['1', 'Partner for all of it']].map(([n, l]) => (
              <div key={l}><dt className="sr-only">{l}</dt><dd className="font-display text-3xl font-light leading-none">{n}</dd><p className="mt-1.5 text-muted">{l}</p></div>
            ))}
          </dl>
        </div>
      </section>

      {/* collections */}
      <section className="section" id="collections">
        <div className="container-x">
          <SectionHeading kicker="Shop by collection" title={<>Every format your brand <span className="accent">needs.</span></>} description="Seven collections, one partner. From the courier box to the sticker that seals it.">
            <Link href="/products" className="btn-light">All {products.length} products <ArrowRight size={16} /></Link>
          </SectionHeading>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <Reveal key={cat} delay={(i % 4) * .06}>
                <Link href={`/products?category=${categorySlug(cat)}`} className="group block">
                  <div className="relative aspect-[5/4] overflow-hidden rounded-[18px]">
                    <Photo name={categoryCover[cat]} alt={`${cat} packaging by ALL PACK`} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]" />
                    <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-paper/90 opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100"><ArrowUpRight size={17} /></span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-[1.35rem] leading-tight group-hover:text-brass-dark">{cat}</h3>
                    <span className="shrink-0 text-xs font-semibold text-muted">{products.filter(p => p.category === cat).length} products</span>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-[14.5px] leading-relaxed text-muted">{categoryBlurb[cat]}</p>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={.18}>
              <Link href="/studio" className="group relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-[18px] bg-ink p-6 text-cream">
                <div className="pointer-events-none absolute inset-0 opacity-[.06] [background-image:linear-gradient(to_right,#EFE9DD_1px,transparent_1px),linear-gradient(to_bottom,#EFE9DD_1px,transparent_1px)] [background-size:36px_36px]" aria-hidden="true" />
                <p className="kicker relative !text-brass-light">3D Studio</p>
                <p className="relative font-display text-[1.7rem] leading-tight">Design your own box in 3D, then send it to us.</p>
                <span className="relative inline-flex items-center gap-2 text-sm font-semibold text-brass-light">Open the studio <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* featured */}
      <section className="section bg-paper-light pt-0 sm:pt-0">
        <div className="container-x border-t border-line pt-[clamp(5rem,9vw,8rem)]">
          <SectionHeading kicker="Most requested" title={<>Popular with growing <span className="accent">brands.</span></>} description="Starting points our customers ask about most. Every one can be resized, re-materialled and printed your way.">
            <Link href="/products" className="inline-flex items-center gap-2 border-b border-ink pb-1 text-[15px] font-semibold transition-colors hover:border-brass hover:text-brass-dark">Browse the catalogue <ArrowRight size={15} /></Link>
          </SectionHeading>
          <div className="grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * .07} className="h-full"><ProductCard product={p} /></Reveal>)}
          </div>
        </div>
      </section>

      {/* why */}
      <section className="dark-section grain section">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal>
            <p className="kicker">Why ALL PACK</p>
            <h2 className="h-section mt-6">Packaging is the first thing your customer <span className="accent">touches.</span></h2>
            <p className="lead mt-7 max-w-[52ch]">We help brands of every size turn a plain container into part of the product: protective where it matters, beautiful where it&apos;s seen, and priced honestly from the start.</p>
            <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2">
              {values.map(x => (
                <div key={x.k}>
                  <x.icon size={22} strokeWidth={1.4} className="text-brass-light" />
                  <h3 className="mt-4 font-display text-[1.45rem] text-cream">{x.k}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-cream/60">{x.v}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={.1}>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-[24px]"><Photo name="mailer" alt="An open ALL PACK mailer box with printed interior, tissue paper and a thank-you card" sizes="(min-width: 1024px) 45vw, 100vw" className="object-[50%_50%]" /></div>
              <div className="absolute -bottom-8 -left-4 w-[46%] overflow-hidden rounded-[18px] border-4 border-ink shadow-lift sm:-left-10"><div className="aspect-square"><Photo name="fin_foil" alt="Close-up of gold foil stamping on a navy rigid box" sizes="25vw" /></div></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* finishes */}
      <section className="section" id="finishes">
        <div className="container-x">
          <SectionHeading kicker="Print & finishing" title={<>The finish is what they <span className="accent">feel.</span></>} description="Finishes change how your packaging looks, feels and photographs. Matte, gloss, soft-touch, foil or natural kraft: we'll help you choose." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {finishes.map((f, i) => (
              <Reveal key={f.name} delay={i * .06}>
                <figure className="group">
                  <div className="aspect-[4/5] overflow-hidden rounded-[18px]"><Photo name={f.img} alt={`${f.name} close-up`} sizes="(min-width: 1024px) 25vw, 50vw" className="transition-transform duration-[1.4s] group-hover:scale-[1.06]" /></div>
                  <figcaption className="mt-5">
                    <h3 className="font-display text-[1.45rem]">{f.name}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.text}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* industries */}
      <section className="section bg-paper-deep" id="industries">
        <div className="container-x">
          <SectionHeading kicker="Industries" title={<>Built for the way you <span className="accent">sell.</span></>} description="From bakeries to pharmaceutical brands, we know what each kind of product needs from its packaging.">
            <Link href="/industries" className="btn-light">All industries <ArrowRight size={16} /></Link>
          </SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 3) * .06}>
                <Link href={`/industries/${ind.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-[18px]">
                  <Photo name={ind.image} alt={`Packaging for ${ind.name}`} sizes="(min-width: 1024px) 33vw, 50vw" className="transition-transform duration-[1.4s] group-hover:scale-[1.05]" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,18,32,0)_45%,rgba(13,18,32,.78)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-cream">
                    <div><h3 className="font-display text-[1.6rem] leading-tight">{ind.name}</h3><p className="mt-1 max-w-[34ch] text-sm text-cream/75">{ind.short}</p></div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cream/30 transition-all group-hover:border-cream group-hover:bg-cream group-hover:text-ink"><ArrowUpRight size={17} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Process />

      {/* studio */}
      <section className="container-x pb-[clamp(5.5rem,11vw,9.5rem)]">
        <Reveal>
          <div className="relative grid overflow-hidden rounded-[28px] bg-ink text-cream lg:grid-cols-2">
            <div className="relative z-[1] p-8 sm:p-14">
              <p className="kicker !text-brass-light">ALL PACK 3D Studio</p>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-light leading-[1.04]">Design your box. Spin it in <em className="text-brass-light">3D.</em></h2>
              <p className="mt-5 max-w-[46ch] text-cream/65">Pick a style, set the dimensions, choose colour and finish, and watch it come to life. Then send the spec to us with one click.</p>
              <Link href="/studio" className="btn-white mt-9">Open the studio <ArrowRight size={16} /></Link>
              <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-cream/10 pt-6 text-sm">
                {[['Style', 'Mailer box'], ['Size', '25 × 18 × 10 cm'], ['Finish', 'Soft-touch']].map(([k, v]) => <div key={k}><dt className="text-cream/45">{k}</dt><dd className="mt-1 font-semibold">{v}</dd></div>)}
              </dl>
            </div>
            <div className="relative min-h-[320px]"><Photo name="fin_soft" alt="Navy soft-touch mailer box with foil logo" sizes="(min-width: 1024px) 50vw, 100vw" /><div className="absolute inset-0 bg-[linear-gradient(90deg,#0D1220_0%,rgba(13,18,32,0)_35%)] max-lg:bg-[linear-gradient(180deg,#0D1220_0%,rgba(13,18,32,0)_35%)]" /></div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="section border-t border-line bg-paper-light">
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

      {/* closing CTA */}
      <section className="relative isolate overflow-hidden bg-ink text-cream">
        <div className="absolute inset-0 -z-10 opacity-40"><Photo name="ind_ecommerce" alt="" sizes="100vw" /></div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(13,18,32,.75),rgba(13,18,32,.95))]" />
        <div className="container-x py-[clamp(6rem,12vw,10rem)] text-center">
          <Reveal>
            <p className="kicker">Have a product that deserves better packaging?</p>
            <h2 className="mx-auto mt-7 max-w-[14ch] font-display text-[clamp(2.8rem,6.8vw,6.2rem)] font-light leading-[1] text-cream">Let&apos;s make your next box <em className="text-brass-light">unforgettable.</em></h2>
            <p className="mx-auto mt-7 max-w-[56ch] text-lg text-cream/65">Send us a brief in two minutes. We&apos;ll come back with a specification and a clear, no-obligation quote.</p>
            <div className="mt-11 flex flex-wrap justify-center gap-3">
              <Link href="/quote" className="btn-white">Get a free quote <ArrowRight size={16} /></Link>
              {call && <a href={call} className="btn-outline-light"><Phone size={16} /> {COMPANY.phone}</a>}
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-outline-light"><WhatsAppIcon size={16} /> WhatsApp</a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
