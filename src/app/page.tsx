/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Factory, Mail, MapPin, Phone, ShieldCheck, Truck } from 'lucide-react';
import { PAGE_SEO, seoTitle } from '@/data/seo';
import { families, presses, process, sectors } from '@/data/catalog';
import { COMPANY, emailLink, mapsLink, phoneLink, quoteLink } from '@/lib/company';
import { ArrowLink, Eyebrow, SectionHead } from '@/components/Section';
import { ClientLogos } from '@/components/ClientStrip';
import { CertBadge } from '@/components/Certifications';
import { WhatsAppIcon } from '@/components/FloatingContact';

export const metadata: Metadata = { title: seoTitle(PAGE_SEO.home), description: PAGE_SEO.home.description, alternates: { canonical: '/' } };

const trust = [
  { icon: ShieldCheck, text: 'ISO 9001:2015 certified' },
  { icon: BadgeCheck, text: 'Halal certified' },
  { icon: Factory, text: 'In-house Heidelberg offset' },
  { icon: Truck, text: 'Delivery across Pakistan' },
];

const reasons = [
  { badge: 'iso' as const, title: 'Certified quality management', text: 'ISO 9001:2015 certified. Every order follows a documented process, from the artwork check to final inspection.' },
  { badge: 'halal' as const, title: 'Halal certified', text: 'Certified for food and consumer packaging, as food, bakery and FMCG brands require of their suppliers.' },
  { badge: '25+', title: '25+ years in production', text: 'More than a quarter of a century producing packaging in Lahore for pharmaceutical, food and retail brands.' },
  { badge: 'factory', title: 'One facility, no outsourcing', text: 'Printing, finishing and converting take place under one roof, so quality and delivery dates stay in our hands.' },
];

export default function Home() {
  const quote = quoteLink();
  const call = phoneLink();
  const homeSectors = sectors.filter(s => ['pharmaceutical', 'food-and-bakery', 'confectionery', 'restaurants'].includes(s.slug));
  return (
    <main>
      {/* Hero */}
      <section className="border-b border-line bg-mist">
        <div className="container-x grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_.85fr] lg:gap-14 lg:py-24">
          <div className="anim-up">
            <Eyebrow>Packaging printers · Lahore</Eyebrow>
            <h1 className="h-display mt-6">Custom printed packaging, produced in Lahore <span className="text-brand">to your specification.</span></h1>
            <p className="lead mt-7 max-w-xl">Cartons, rigid boxes, mailers, paper bags and labels, printed on Heidelberg offset presses and finished under one roof. For more than 25 years, pharmaceutical, food and retail brands across Pakistan have relied on ALL PACK for accurate colour and on-time delivery.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-primary"><WhatsAppIcon size={18} /> Request a quote on WhatsApp</a>
              <Link href="/products" className="btn-outline">View the product range</Link>
            </div>
            <p className="meta mt-6">We reply to every enquiry within 24 hours</p>
          </div>
          <div className="anim-up d2">
            <img src="/renders/packaging-range.webp" alt="ALL PACK printed packaging: a paper bag, folding carton, rigid gift box, pharmaceutical carton and corrugated shipping boxes" width={1100} height={841} fetchPriority="high" className="mx-auto w-full max-w-[620px]" />
          </div>
        </div>
        <ul className="grid grid-cols-2 border-t border-line bg-white lg:grid-cols-4">
          {trust.map(({ icon: Icon, text }, i) => (
            <li key={text} className={`flex items-center justify-center gap-3 px-4 py-5 text-[14px] font-semibold sm:text-[15px] ${i % 2 === 0 ? 'border-r' : 'lg:border-r'} ${i < 2 ? 'border-b lg:border-b-0' : ''} border-line last:border-r-0`}>
              <Icon size={18} strokeWidth={1.75} className="shrink-0 text-brand" /> {text}
            </li>
          ))}
        </ul>
      </section>

      {/* Clients */}
      <section aria-label="Our clients" className="border-b border-line py-12 sm:py-14">
        <p className="meta mb-7 text-center">Brands that print with ALL PACK</p>
        <ClientLogos />
      </section>

      {/* Product range */}
      <section className="section">
        <div className="container-x">
          <SectionHead kicker="Product range" title="Eight formats. One production standard." sub="Each format is made to your dimensions, board and artwork, then printed, finished and inspected in our Lahore facility." />
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {families.map((f, i) => (
              <li key={f.slug}>
                <Link href={`/products#${f.slug}`} className="group block">
                  <div className="flex aspect-square items-center justify-center rounded-2xl bg-card p-5 transition-colors group-hover:bg-soft sm:p-8">
                    <img src={f.image} alt={f.alt} loading="lazy" className="max-h-full w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <h3 className="text-[17px] leading-snug sm:text-[19px]">{f.name}</h3>
                    <span className="meta hidden sm:inline">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="mt-1 text-[14px] text-muted">{f.short}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-14 text-center"><Link href="/products" className="btn-outline">See specifications for every format <ArrowRight size={16} strokeWidth={1.75} /></Link></div>
        </div>
      </section>

      {/* Manufacturing */}
      <section id="capabilities" className="section dark-section">
        <div className="container-x">
          <SectionHead light kicker="Manufacturing" title="From approved artwork to delivered packaging." sub="Prepress, printing, finishing and inspection take place under one roof, so colour, cut and delivery date remain under our control." />
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {process.map((p, i) => (
              <li key={p.step} className="border-t border-white/15 pt-7">
                <p className="font-mono text-[12.5px] text-brand-light">{String(i + 1).padStart(2, '0')} / {p.step}</p>
                <h3 className="mt-4 text-[21px] !text-white">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-cyan">{p.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-16 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-3">
            {presses.map(m => (
              <div key={m.name}>
                <p className="font-display text-[20px] font-semibold text-white">{m.name}</p>
                <p className="mt-1 text-[14px] text-cyan">{m.use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section">
        <div className="container-x">
          <SectionHead kicker="Industries" title="Packaging for sectors where accuracy matters." sub="Each sector asks something different of its packaging: approved regulatory text, consistent colour across frequent reorders, or impact on a crowded shelf." />
          <div className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {homeSectors.map((s, i) => (
              <Link key={s.slug} href={`/industries#${s.slug}`} className={`group border-b border-line py-8 sm:px-7 lg:border-b-0 ${i % 2 === 0 ? 'sm:pl-0' : ''} ${i < 3 ? 'lg:border-r' : ''} ${i === 0 ? 'lg:pl-0' : 'lg:pl-7'}`}>
                <p className="meta">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 text-[22px] group-hover:text-brand">{s.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-secondary">{s.summary}</p>
                {s.clients.length > 0 && <p className="mt-5 text-[13px] leading-relaxed text-muted">{s.clients.join(' · ')}</p>}
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center"><ArrowLink href="/industries">All industries we serve</ArrowLink></div>
        </div>
      </section>

      {/* Why ALL PACK */}
      <section className="section border-t border-line bg-mist">
        <div className="container-x">
          <SectionHead kicker="Why ALL PACK" title="Why brands trust ALL PACK." sub="Certified processes, our own presses and a client list built over more than 25 years." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(r => (
              <div key={r.title} className="card p-7">
                {r.badge === 'iso' || r.badge === 'halal' ? <CertBadge id={r.badge} size={56} /> : <span className="grid h-14 w-14 place-items-center rounded-full bg-navy font-display text-[16px] font-bold text-white">{r.badge === '25+' ? '25+' : <Factory size={22} strokeWidth={1.75} />}</span>}
                <h3 className="mt-6 text-[19px]">{r.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-secondary">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section border-t border-line">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>Request a quotation</Eyebrow>
            <h2 className="h-section mt-5">Tell us what you need to pack.</h2>
            <p className="lead mt-5 max-w-lg">Share the product dimensions, quantity and artwork. We reply within 24 hours with a specification and price.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-primary"><WhatsAppIcon size={18} /> Chat on WhatsApp</a>
              <a href={emailLink()} className="btn-outline"><Mail size={17} strokeWidth={1.75} /> Email your brief</a>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              { label: 'WhatsApp', value: COMPANY.phone, href: quote, ext: true, icon: WhatsAppIcon },
              { label: 'Call', value: COMPANY.phone, href: call || undefined, icon: Phone },
              { label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}`, icon: Mail },
              { label: 'Visit', value: COMPANY.address, href: mapsLink, ext: true, icon: MapPin },
            ].map(c => (
              <li key={c.label}>
                <a href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="card flex h-full flex-col p-6 transition-colors hover:border-[#C9CFDC]">
                  <span className="meta flex items-center gap-2"><c.icon size={14} strokeWidth={1.75} /> {c.label}</span>
                  <span className={`mt-3 font-semibold leading-snug ${c.label === 'Email' ? 'text-[15px]' : 'text-[16px]'}`}>{c.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
