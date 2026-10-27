import Link from 'next/link';
import { ArrowRight, Boxes, FileCheck2, MessagesSquare, PackageCheck, PencilRuler, Phone, Printer, Ruler, Send } from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { Reveal } from '@/components/Reveal';
import { FaqAccordion } from '@/components/FaqAccordion';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { Photo } from '@/components/Photo';
import { products, categories } from '@/lib/products';
import { industries } from '@/data/industries';
import { CLIENTS, COMPANY, phoneLink, whatsappLink } from '@/lib/company';

const usps = [
  { icon: Ruler, t: 'Made to measure', d: 'Sized around your product' },
  { icon: Printer, t: 'Full-colour print', d: 'Foil, soft-touch & more' },
  { icon: FileCheck2, t: 'Clear quotes', d: 'Price & lead time up front' },
  { icon: MessagesSquare, t: 'Real people', d: 'Phone & WhatsApp support' },
];
const steps = [
  { icon: Send, t: 'Share your brief', d: 'Tell us what you are packing, the quantity and the feeling you want. A photo and rough size is enough to start.' },
  { icon: PencilRuler, t: 'We engineer the pack', d: 'We recommend structure, board and finish, then send a clear specification and quotation for approval.' },
  { icon: Printer, t: 'Print & finish', d: 'Once artwork is approved, your packaging moves into print, finishing, cutting and assembly.' },
  { icon: PackageCheck, t: 'Ready for your product', d: 'Your finished order is packed and handed over, ready for your product and your customers.' },
];
const finishes = [
  { img: 'fin_foil', name: 'Foil stamping', text: 'Metallic gold, silver or coloured foil on logos and details.' },
  { img: 'fin_soft', name: 'Soft-touch lamination', text: 'A velvety, tactile coating customers notice instantly.' },
  { img: 'fin_print', name: 'Full-colour & gloss', text: 'Rich colour and shine that makes bold graphics pop.' },
  { img: 'fin_kraft', name: 'Natural kraft', text: 'Earthy and honest, perfect with a one-colour print.' },
];
const why = [
  { icon: Ruler, t: 'Save cost & waste', d: 'Right-sized packs protect better, ship cheaper and use less void fill.' },
  { icon: Boxes, t: 'Everything in one place', d: `${products.length} formats across ${categories.length} collections, from shipping carton to sticker.` },
  { icon: FileCheck2, t: 'No surprises', d: 'Specification, price and lead time confirmed before anything is printed.' },
  { icon: MessagesSquare, t: 'Talk to a real person', d: 'Direct line to the team on phone or WhatsApp, not a ticket queue.' },
];

function SectionTitle({ title, sub, action }: { title: React.ReactNode; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div><h2 className="h-section">{title}</h2>{sub && <p className="mt-3 max-w-2xl text-[16.5px] text-muted">{sub}</p>}</div>
      {action}
    </div>
  );
}

export default function Home() {
  const call = phoneLink();
  const wa = whatsappLink() || '#';
  return (
    <main>
      <Hero />

      {/* USP bar */}
      <section className="border-b border-line bg-white">
        <div className="container-x grid grid-cols-2 gap-y-6 py-7 lg:grid-cols-4">
          {usps.map(u => (
            <div key={u.t} className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand"><u.icon size={21} /></span>
              <span><span className="block text-[15px] font-bold">{u.t}</span><span className="block text-[13.5px] text-muted">{u.d}</span></span>
            </div>
          ))}
        </div>
      </section>

      {/* catalogue */}
      <section className="bg-paper-light py-20 sm:py-24" id="catalogue">
        <div className="container-x">
          <SectionTitle title="One-stop shop for custom printed packaging" sub="Everything your business needs in one place. Pick a style to see sizes, materials and finishes." action={<Link href="/products" className="btn-light shrink-0">Browse full catalogue</Link>} />
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * .04}>
                <Link href={`/products/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-shadow duration-300 hover:shadow-card">
                  <div className="aspect-[5/4] overflow-hidden bg-paper-deep"><Photo name={p.model} alt={`${p.name} by ALL PACK`} sizes="(min-width:1024px) 25vw, 50vw" className="transition-transform duration-700 group-hover:scale-105" /></div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="text-[16px] font-bold leading-snug group-hover:text-brand sm:text-[17px]">{p.name}</h3>
                    <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-muted sm:text-[14px]">{p.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* industries */}
      <section className="bg-white py-20 sm:py-24" id="industries">
        <div className="container-x">
          <SectionTitle title="Shop by industry" sub="Packaging recommendations built around how your business sells." action={<Link href="/industries" className="btn-light shrink-0">All industries</Link>} />
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 3) * .05}>
                <Link href={`/industries/${ind.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-xl">
                  <Photo name={ind.image} alt={`Packaging for ${ind.name}`} sizes="(min-width:1024px) 33vw, 50vw" className="transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
                    <h3 className="text-[17px] font-extrabold sm:text-[21px]">{ind.name}</h3>
                    <p className="mt-1 hidden text-sm text-white/80 sm:block">{ind.short}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="bg-paper-light py-20 sm:py-24" id="how-it-works">
        <div className="container-x">
          <div className="mx-auto mb-14 max-w-2xl text-center"><h2 className="h-section">How it works</h2><p className="mt-3 text-[16.5px] text-muted">From idea to box in four simple steps. A clear specification and a clear price before anything is printed.</p></div>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * .06} className="relative rounded-xl border border-line bg-white p-7">
                <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-xl bg-brand text-white"><s.icon size={22} /></span><span className="text-4xl font-extrabold text-paper-deep">0{i + 1}</span></div>
                <h3 className="mt-6 text-[18px] font-bold">{s.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.d}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-10 text-center"><Link href="/quote" className="btn-dark">Start your quote <ArrowRight size={16} /></Link></div>
        </div>
      </section>

      {/* finishes */}
      <section className="bg-white py-20 sm:py-24" id="finishes">
        <div className="container-x">
          <SectionTitle title="Print & finishing options" sub="Finishes change how your packaging looks, feels and photographs. Matte, gloss, soft-touch, foil or natural kraft." />
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {finishes.map(f => (
              <figure key={f.name} className="overflow-hidden rounded-xl border border-line">
                <div className="aspect-square overflow-hidden"><Photo name={f.img} alt={`${f.name} close-up`} sizes="(min-width:1024px) 25vw, 50vw" /></div>
                <figcaption className="p-4 sm:p-5"><h3 className="text-[16px] font-bold">{f.name}</h3><p className="mt-1 text-[13.5px] leading-relaxed text-muted">{f.text}</p></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* why */}
      <section className="bg-white pb-20 sm:pb-24">
        <div className="container-x">
          <div className="rounded-2xl bg-paper-deep p-8 sm:p-12">
            <h2 className="h-section text-center">Why brands choose ALL PACK</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {why.map(w => (
                <div key={w.t}><span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-brand shadow-sm"><w.icon size={22} /></span><h3 className="mt-5 text-[17px] font-bold">{w.t}</h3><p className="mt-2 text-[14.5px] leading-relaxed text-muted">{w.d}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* trusted by */}
      <section className="border-y border-line bg-white py-10">
        <div className="container-x text-center">
          <p className="text-[12px] font-bold uppercase tracking-[.18em] text-muted">Trusted by businesses across Pakistan</p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-14 gap-y-4">
            {CLIENTS.map(c => <li key={c} className="text-[22px] font-extrabold tracking-[-.01em] text-ink/45">{c}</li>)}
          </ul>
        </div>
      </section>

      {/* manufacturer */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="aspect-[5/4] overflow-hidden rounded-2xl"><Photo name="cargo" alt="Stacked corrugated shipping boxes on a pallet, printed by ALL PACK" sizes="(min-width:1024px) 50vw, 100vw" /></div>
          <div>
            <h2 className="h-section">Your packaging manufacturer in Lahore</h2>
            <p className="mt-4 text-[16.5px] leading-relaxed text-muted">ALL PACK helps brands of every size turn a plain container into part of the product: protective where it matters, beautiful where it&apos;s seen, and priced honestly from the start. From the courier box to the sticker that seals it, we handle structure, print and finishing in one place.</p>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-line py-6">
              {[[String(products.length), 'Packaging formats'], [String(categories.length), 'Collections'], [String(industries.length), 'Industries served']].map(([n, l]) => <div key={l}><dd className="text-3xl font-extrabold text-brand">{n}</dd><dt className="mt-1 text-sm text-muted">{l}</dt></div>)}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/about" className="btn-light">About ALL PACK</Link><Link href="/studio" className="btn-light">Design in 3D Studio</Link></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper-light py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="h-section">Frequently asked questions</h2>
            <p className="mt-4 text-[16.5px] text-muted">Can&apos;t find your answer? Message us on WhatsApp and talk to a real person.</p>
            <div className="mt-7 flex flex-wrap gap-3"><a href={wa} target="_blank" rel="noopener noreferrer" className="btn-dark"><WhatsAppIcon size={18} /> Ask on WhatsApp</a><Link href="/faq" className="btn-light">All FAQs</Link></div>
          </div>
          <FaqAccordion limit={5} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand text-white">
        <div className="container-x flex flex-col items-start justify-between gap-8 py-16 lg:flex-row lg:items-center">
          <div><h2 className="text-[clamp(1.9rem,3.4vw,2.8rem)] font-extrabold leading-tight tracking-[-.03em]">Ready to create your custom packaging?</h2><p className="mt-3 text-[17px] text-white/75">Send a brief in two minutes and get a clear, no-obligation quote.</p></div>
          <div className="flex flex-wrap gap-3">
            <Link href="/quote" className="btn bg-white text-brand hover:bg-paper-deep">Request a Quote <ArrowRight size={16} /></Link>
            {call && <a href={call} className="btn border-2 border-white/40 text-white hover:border-white"><Phone size={16} /> {COMPANY.phone}</a>}
          </div>
        </div>
      </section>
    </main>
  );
}
