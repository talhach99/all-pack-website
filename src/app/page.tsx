/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Award, Boxes, Clock, Mail, Users } from 'lucide-react';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { ClientLogos } from '@/components/ClientStrip';
import { ClientWork } from '@/components/ClientWork';
import { CLIENTS, emailLink, quoteLink } from '@/lib/company';
import { findProduct, productThumb, products } from '@/lib/products';

export const metadata: Metadata = {
  title: { absolute: 'ALL PACK — Custom Packaging & Printing in Lahore' },
  description: 'Printed cartons, rigid boxes, mailers, corrugated boxes, bags and labels, made to your size in Lahore and delivered across Pakistan. 25+ years of packaging experience.',
  alternates: { canonical: '/' },
};

const home = (name: string) => `/images/home/${name}.webp`;
const work = (name: string) => `/work/${name}.webp`;

/** Hero collage: real packs printed for ALL PACK clients. */
const heroCols = [
  [
    { src: work('citi-queen-cake-mango'), alt: 'Citi Queen Cake Mango carton printed by ALL PACK', fit: 'cover', ratio: 'aspect-[4/5]' },
    { src: work('hoest-drops'), alt: 'Hoest Drops carton printed by ALL PACK', fit: 'contain', ratio: 'aspect-square' },
  ],
  [
    { src: work('bunnys-queen-cake'), alt: "Bunny's Queen Cake carton printed by ALL PACK", fit: 'contain', ratio: 'aspect-square' },
    { src: work('sun-bread-wrapper'), alt: 'Sun Bread wrapper printed by ALL PACK', fit: 'cover', ratio: 'aspect-[3/4]' },
  ],
  [
    { src: work('hoest-eclair'), alt: 'Hoest Eclair milk toffee window carton printed by ALL PACK', fit: 'cover', ratio: 'aspect-[4/5]' },
    { src: work('sun-cake-rusk-label'), alt: 'Sun Cake Rusk label printed by ALL PACK', fit: 'contain', ratio: 'aspect-[4/3]' },
  ],
] as const;

const ticker = [
  'More than 25 years in packaging',
  'Full-colour offset printing',
  'Foil, emboss and soft-touch finishes',
  'Pharmaceutical cartons and labels',
  'Made to your exact size',
  'Delivered across Pakistan',
];

const stats = [
  { label: 'Heritage', icon: Award, n: '25', suffix: '+', d: 'Years of printing and packaging experience in Lahore' },
  { label: 'Clients', icon: Users, n: String(CLIENTS.length), suffix: '+', d: 'Pharma, food, healthcare and retail brands served' },
  { label: 'Formats', icon: Boxes, n: String(products.length), suffix: '', d: 'Packaging formats, from shipping cartons to labels' },
  { label: 'Response', icon: Clock, n: '24', suffix: 'h', d: 'Quote reply on WhatsApp or email' },
];

const dots = ['bg-brand', 'bg-[#E0464B]', 'bg-[#E8B23A]', 'bg-[#2FA36B]'];
const featured = ['custom-printed-boxes', 'rigid-gift-boxes', 'folding-cartons', 'ecommerce-mailer-boxes', 'corrugated-shipping-boxes', 'cake-boxes', 'kraft-shopping-bags', 'labels-stickers']
  .map(findProduct)
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

const capabilities = [
  { t: 'Full-colour offset printing', d: 'Sharp CMYK and spot-colour print on board and paper, matched to your approved artwork.', image: home('full-colour-cartons') },
  { t: 'Foil stamping and embossing', d: 'Gold, silver and coloured foils with raised or debossed detail for logos and patterns.', image: home('foil-ornate-box') },
  { t: 'Lamination and soft-touch', d: 'Gloss, matte and velvety soft-touch coatings that protect the print and feel premium.', image: home('soft-touch-box') },
  { t: 'Die-cutting and folding cartons', d: 'Custom dielines, windows and inserts, cut and glued to fit your product exactly.', image: work('citi-cake-rusk') },
  { t: 'Rigid box making', d: 'Wrapped rigid boxes, drawers and magnetic lids for gifts and premium retail.', image: home('rigid-drawer-box') },
  { t: 'Corrugated and shipping boxes', d: 'Strong single and double wall cartons for courier, storage and industrial use.', image: home('shipping-cartons') },
];

const industryCards = [
  { slug: 'pharmaceutical', name: 'Pharmaceutical packaging', label: 'Healthcare', image: work('aloram-carton'), contain: true },
  { slug: 'bakeries', name: 'Bakery and confectionery', label: 'Food', image: work('citi-queen-cake-mango') },
  { slug: 'restaurants', name: 'Restaurant and takeaway', label: 'Food service', image: '/photos/ind_restaurants-800.webp' },
  { slug: 'e-commerce', name: 'E-commerce and shipping', label: 'Retail', image: '/photos/ind_ecommerce-800.webp' },
  { slug: 'beauty', name: 'Beauty and personal care', label: 'Consumer goods', image: '/photos/ind_beauty-800.webp' },
];

const pad = (i: number) => String(i + 1).padStart(2, '0');

export default function Home() {
  const quote = quoteLink();

  return (
    <main>
      {/* 1 · Hero */}
      <section className="relative isolate overflow-hidden border-b border-line bg-[linear-gradient(115deg,#F4F6FD_0%,#E6EBFB_55%,#D9E0F8_100%)]">
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[.35] [background-image:linear-gradient(rgba(43,74,252,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(43,74,252,.08)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(90deg,transparent,#000_60%)]" />
        <div className="container-x grid items-center gap-12 py-14 sm:py-20 lg:min-h-[640px] lg:grid-cols-[1.02fr_1fr] lg:gap-14 lg:py-16">
          <div className="anim-up">
            <p className="kicker">25+ years of packaging excellence</p>
            <h1 className="mt-6 font-display text-[clamp(2.6rem,5.4vw,4.5rem)] leading-[1.05] tracking-[-.02em] text-ink">Packaging and print for brands that lead</h1>
            <p className="mt-6 max-w-[34rem] text-[18px] leading-[1.65] text-secondary">ALL PACK prints cartons, rigid boxes, corrugated shippers, bags and labels, made to your size and finish in Lahore and delivered across Pakistan.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-dark h-[52px] px-7">Request a quote <ArrowRight size={18} strokeWidth={1.75} /></a>
              <Link href="/products" className="btn-light h-[52px] bg-white/70 px-7">Explore products</Link>
            </div>
            <p className="mt-5 text-[14px] text-muted">Reply within one business day</p>
          </div>

          <div className="anim-up d2 grid grid-cols-3 items-start gap-3 sm:gap-4" aria-label="Packaging printed by ALL PACK">
            {heroCols.map((col, ci) => (
              <div key={ci} className={`grid gap-3 sm:gap-4 ${ci === 1 ? 'mt-10 sm:mt-16' : ci === 2 ? 'mt-4 sm:mt-6' : ''}`}>
                {col.map((im, i) => (
                  <div key={im.src} className={`relative overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-18px_rgba(29,54,204,.35)] ring-1 ring-black/5 ${im.ratio}`}>
                    <img src={im.src} alt={im.alt} className={`absolute inset-0 h-full w-full ${im.fit === 'cover' ? 'object-cover' : 'object-contain p-3'}`} {...(ci === 0 && i === 0 ? { fetchPriority: 'high' as const } : { loading: 'eager' as const })} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 · Trust ticker */}
      <section className="ticker overflow-hidden border-b border-line bg-white py-4" aria-label="Why ALL PACK">
        <div className="flex [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          <div className="marquee-track flex w-max">
            {[0, 1].map(half => (
              <ul key={half} aria-hidden={half === 1 || undefined} className="flex shrink-0 items-center">
                {[...ticker, ...ticker].map((t, i) => (
                  <li key={`${t}-${i}`} className="flex items-center whitespace-nowrap text-[12px] uppercase tracking-[.22em] text-secondary">
                    <span className="mx-7 text-[9px] text-brand" aria-hidden="true">◆</span>{t}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · By the numbers */}
      <section className="section bg-mist">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="kicker">By the numbers</p>
              <h2 className="h-section mt-4">Built on experience. Trusted across industries.</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-secondary">A quarter century of printing in Lahore, a client list that runs from pharmaceutical companies to bakeries, and a team that answers the same day.</p>
            </div>
            <Link href="/about" className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-ink hover:text-brand">More about us <ArrowUpRight size={16} strokeWidth={1.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className="rv flex flex-col rounded-2xl border border-line bg-white p-4 sm:p-7" style={{ ['--rv-d' as string]: `${i * 60}ms` }}>
                <dt className="flex items-center justify-between">
                  <span className="flex items-center gap-2 num-label"><span className={`h-1.5 w-1.5 rounded-full ${dots[i]}`} />/ {pad(i)} {s.label}</span>
                  <s.icon size={16} strokeWidth={1.5} className="hidden text-muted sm:block" aria-hidden="true" />
                </dt>
                <dd className="mt-6 font-display text-[44px] sm:mt-8 sm:text-[56px] leading-none tracking-[-.02em] text-ink tabular-nums">{s.n}<span className="text-[26px] text-brand sm:text-[32px]">{s.suffix}</span></dd>
                <dd className="mt-4 text-[14px] leading-relaxed text-secondary">{s.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 4 · Products */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="kicker">Our products</p>
              <h2 className="h-section mt-4">Packaging for every product, printed in every colour.</h2>
            </div>
            <Link href="/products" className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-ink hover:text-brand">View all products <ArrowUpRight size={16} strokeWidth={1.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {featured.map((p, i) => (
              <li key={p.slug} className="rv" style={{ ['--rv-d' as string]: `${(i % 4) * 50}ms` }}>
                <Link href={`/products/${p.slug}`} className="group block">
                  <span className="num-label">{pad(i)}</span>
                  <div className="mt-2 overflow-hidden rounded-2xl border border-line bg-mist transition-colors group-hover:border-brand/40">
                    <div className="aspect-square overflow-hidden">
                      <img src={productThumb(p)} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                    </div>
                    <div className="flex items-center justify-between gap-2 border-t border-line bg-white px-4 py-3.5">
                      <span className="flex items-center gap-2.5 text-[15px] font-medium text-ink"><span className={`h-2 w-2 shrink-0 rounded-full ${dots[i % 4]}`} />{p.name}</span>
                      <ArrowRight size={16} strokeWidth={1.5} className="shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-brand" />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 · Capabilities, swipeable */}
      <section className="section overflow-hidden bg-mist">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="kicker">What we do in house</p>
              <h2 className="h-section mt-4">Our printing and finishing capabilities</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-secondary">From print to die-cut to the finished box, every step is handled by one team, so colour, fit and delivery stay consistent from first sample to full run.</p>
            </div>
            <p className="num-label hidden sm:block">Swipe to explore →</p>
          </div>
        </div>
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:gap-5 sm:px-8 lg:px-[max(2.5rem,calc((100vw_-_1280px)/2_+_2.5rem))]" data-lenis-prevent>
          {capabilities.map((c, i) => (
            <article key={c.t} className="w-[78vw] max-w-[340px] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-white">
              <div className="relative aspect-[4/3] overflow-hidden bg-soft">
                <img src={c.image} alt={c.t} loading="lazy" className="h-full w-full object-cover" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[11px] tracking-[.18em] text-ink backdrop-blur">/ {pad(i)}</span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-[22px] leading-snug text-ink">{c.t}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-secondary">{c.d}</p>
              </div>
            </article>
          ))}
          <span className="w-1 shrink-0" aria-hidden="true" />
        </div>
      </section>

      {/* 6 · Industries */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="kicker">Industries we serve</p>
              <h2 className="h-section mt-4">Packaging made for every industry</h2>
            </div>
            <Link href="/industries" className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-ink hover:text-brand">View all industries <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" /></Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {industryCards.map((ind, i) => (
              <Link key={ind.slug} href={`/industries/${ind.slug}`} className={`rv group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl ${ind.contain ? 'bg-[#E6EBFB]' : 'bg-soft'} p-5`} style={{ ['--rv-d' as string]: `${i * 50}ms` }}>
                <img src={ind.image} alt="" loading="lazy" className={`absolute inset-0 -z-10 h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.05] ${ind.contain ? 'object-contain p-6 pb-24 mix-blend-multiply' : 'object-cover'}`} />
                <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                <span className="font-display text-[19px] leading-tight text-white">{ind.name}</span>
                <span className="mt-2 text-[11px] uppercase tracking-[.2em] text-white/70">{ind.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · Client work */}
      <section className="section bg-mist">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-12">
            <div className="max-w-2xl">
              <p className="kicker">Client work</p>
              <h2 className="h-section mt-4">Printed for our clients</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-secondary">Cartons, wrappers and labels we have printed for bakeries, confectioners and pharmaceutical companies.</p>
            </div>
            <Link href="/gallery" className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-ink hover:text-brand">See the gallery <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" /></Link>
          </div>
          <ClientWork />
        </div>
      </section>

      {/* 8 · Trusted by */}
      <section className="section border-t border-line bg-white">
        <div className="container-x text-center">
          <p className="kicker kicker-center justify-center">Trusted by</p>
          <h2 className="h-section mx-auto mt-4 max-w-3xl"><span className="text-brand">Trusted by experts.</span> Chosen by leading brands.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-secondary">Pharmaceutical companies, bakeries, hospitals and food brands across Pakistan rely on ALL PACK for their printed packaging.</p>
        </div>
        <ClientLogos className="mt-12" />
      </section>

      {/* 9 · Closing call to action */}
      <section className="section border-t border-line bg-[linear-gradient(115deg,#F4F6FD_0%,#E6EBFB_100%)]">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <p className="kicker">Start your project</p>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,4.8vw,4rem)] leading-[1.05] tracking-[-.02em] text-ink">Let&rsquo;s package what you make.</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-secondary">From a short run to large-scale supply, tell us what you are packing and how many you need. We will recommend the right board, box style and finish, with a clear price.</p>
          </div>
          <div className="flex flex-col gap-3 sm:max-w-sm lg:ml-auto lg:w-full">
            <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-dark h-14 text-[16px]"><WhatsAppIcon size={18} /> Request a quote on WhatsApp</a>
            <a href={emailLink()} className="btn-light h-14 bg-white text-[16px]"><Mail size={18} strokeWidth={1.5} /> Email your brief</a>
            <p className="mt-1 text-center text-[13px] text-muted">Reply within one business day, on either channel.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
