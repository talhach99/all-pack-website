/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Factory, Mail, MapPin, ShieldCheck, Truck } from 'lucide-react';
import { getSite, pageMeta } from '@/lib/site';
import { Machines } from '@/components/Machines';
import { HeroVisual } from '@/components/HeroVisual';
import { Reasons } from '@/components/Reasons';
import { ArrowLink, Eyebrow, SectionHead } from '@/components/Section';
import { ClientLogos } from '@/components/ClientStrip';
import { WhatsAppIcon } from '@/components/FloatingContact';

export async function generateMetadata(): Promise<Metadata> { return pageMeta('home', '/'); }

const TRUST_ICONS = [ShieldCheck, BadgeCheck, Factory, Truck];


export default async function Home() {
  const { company: COMPANY, links, copy: t, families, process, sectors } = await getSite();
  const { emailLink, mapsLink, quoteLink } = links;
  const trust = [1, 2, 3, 4].map(n => ({ icon: TRUST_ICONS[n - 1], text: t[`home.trust${n}`] }));
  const notes = [1, 2, 3].map(n => ({ step: t[`home.note${n}.step`], title: t[`home.note${n}.title`], sub: t[`home.note${n}.sub`] }));
  const quote = quoteLink();
  const picked = sectors.filter(s => ['pharmaceutical', 'food-and-bakery', 'confectionery', 'restaurants'].includes(s.slug));
  const homeSectors = picked.length === 4 ? picked : sectors.slice(0, 4);
  return (
    <main>
      {/* Hero: spotlight stage on deep teal-blue, products centred with print-proof annotations */}
      <section className="hero-spot relative isolate overflow-hidden">
        <div className="hero-in container-x relative z-10 pt-12 text-center sm:pt-14">
          <p className="eyebrow justify-center !text-[#7FD3F0]">{t['home.eyebrow']}</p>
          <h1 className="mx-auto mt-6 max-w-[920px] font-display text-[clamp(2.5rem,5.6vw,4.9rem)] font-semibold leading-[.98] tracking-[-.04em] !text-white">{t['home.title']} <span className="text-[#8FC2F2]">{t['home.title2']}</span></h1>
          <p className="mx-auto mt-5 max-w-[620px] text-[17px] leading-[1.6] text-cyan sm:text-[18px]">{t['home.lead']}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={quote} target="_blank" rel="noopener noreferrer" className="btn bg-rule text-white hover:bg-[#1793C6]"><WhatsAppIcon size={18} /> {t['home.cta1']}</a>
            <Link href="/products" className="btn-outline-light">{t['home.cta2']} <ArrowRight size={16} strokeWidth={1.75} /></Link>
          </div>
        </div>
        <div className="relative mx-auto mt-8 w-full max-w-[820px] px-5 sm:mt-2 lg:mt-0 lg:-mb-10 min-[1150px]:max-w-[700px] min-[1400px]:max-w-[820px]">
          <span aria-hidden="true" className="hero-ring absolute bottom-[4%] left-1/2 h-[24%] w-[105%] -translate-x-1/2 rounded-[50%]" />
          <HeroVisual image={t['home.heroImage']} alt={t['home.heroAlt']} notes={notes} />
        </div>
        <ul className="container-x relative z-10 flex flex-wrap justify-center gap-x-7 gap-y-2 pb-10 pt-6 text-[14px] font-semibold text-cream min-[1150px]:hidden">
          {trust.map(({ icon: Icon, text }) => <li key={text} className="flex items-center gap-2"><Icon size={15} strokeWidth={1.75} className="text-rule" /> {text}</li>)}
        </ul>
      </section>

      {/* Clients */}
      <section aria-label="Our clients" className="border-b border-line py-12 sm:py-14">
        <p className="meta mb-7 text-center">{t['home.clients.label']}</p>
        <ClientLogos />
      </section>

      {/* Product range */}
      <section className="section">
        <div className="container-x">
          <SectionHead kicker={t['home.products.kicker']} title={t['home.products.title']} sub={t['home.products.sub']} />
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {families.map((f, i) => (
              <li key={f.slug}>
                <Link href={`/products#${f.slug}`} className="lift-card group block">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-card transition-colors group-hover:bg-soft">
                    <img src={f.image} alt={f.alt} loading="lazy" className="absolute inset-0 h-full w-full object-contain p-3 sm:p-4" />
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
          <SectionHead light kicker={t['home.mfg.kicker']} title={t['home.mfg.title']} sub={t['home.mfg.sub']} />
          <Machines />
          <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {process.map((p, i) => (
              <li key={p.step} className="draw-line relative pt-7">
                <p className="font-mono text-[12px] text-brand-light">{String(i + 1).padStart(2, '0')} / {p.step}</p>
                <h3 className="mt-4 text-[21px] !text-white">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-cyan">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Industries */}
      <section className="section">
        <div className="container-x">
          <SectionHead kicker={t['home.ind.kicker']} title={t['home.ind.title']} sub={t['home.ind.sub']} />
          <div className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {homeSectors.map((s, i) => (
              <Link key={s.slug} href={`/industries#${s.slug}`} className={`group border-b border-line py-8 sm:px-7 lg:border-b-0 ${i % 2 === 0 ? 'sm:pl-0' : ''} ${i < 3 ? 'lg:border-r' : ''} ${i === 0 ? 'lg:pl-0' : 'lg:pl-7'}`}>
                <p className="meta">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 text-[22px] group-hover:text-brand">{s.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-secondary">{s.summary}</p>
                <p className="mt-5 text-[13px] leading-relaxed text-muted">{s.formats.join(' · ')}</p>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center"><ArrowLink href="/industries">All industries we serve</ArrowLink></div>
        </div>
      </section>

      {/* Why ALL PACK */}
      <section className="section bg-navy">
        <div className="container-x">
          <SectionHead light kicker={t['home.why.kicker']} title={t['home.why.title']} sub={t['home.why.sub']} />
          <Reasons />
          <div className="mt-12 text-center"><ArrowLink href="/why-all-pack" className="!text-white hover:!text-brand-light">Read why brands choose ALL PACK</ArrowLink></div>
        </div>
      </section>

      {/* Quote */}
      <section className="section border-t border-line">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>{t['home.quote.kicker']}</Eyebrow>
            <h2 className="h-section mt-5">{t['home.quote.title']}</h2>
            <p className="lead mt-5 max-w-lg">{t['home.quote.lead']}</p>
            <div className="mt-8 grid gap-3 sm:mt-9 sm:flex sm:flex-row">
              <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-primary"><WhatsAppIcon size={18} /> Chat on WhatsApp</a>
              <a href={emailLink()} className="btn-outline"><Mail size={17} strokeWidth={1.75} /> Email your brief</a>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              { label: 'WhatsApp', value: COMPANY.phone, href: quote, ext: true, icon: WhatsAppIcon },
              { label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}`, icon: Mail },
              { label: 'Visit', value: COMPANY.address, href: mapsLink, ext: true, icon: MapPin },
            ].map(c => (
              <li key={c.label} className={c.label === 'Visit' ? 'sm:col-span-2' : undefined}>
                <a href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="card flex h-full min-w-0 flex-col p-5 transition-colors sm:p-6 hover:border-[#C9CFDC]">
                  <span className="meta flex items-center gap-2"><c.icon size={14} strokeWidth={1.75} /> {c.label}</span>
                  <span className={`mt-2 font-semibold leading-snug [overflow-wrap:anywhere] sm:mt-3 ${c.label === 'Email' ? 'text-[15px]' : 'text-[16px]'}`}>{c.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
