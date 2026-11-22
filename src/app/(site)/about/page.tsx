import type { Metadata } from 'next';
import Link from 'next/link';
import { getSite, pageMeta } from '@/lib/site';
import { Machines } from '@/components/Machines';
import { Eyebrow, SectionHead } from '@/components/Section';
import { ClientLogos } from '@/components/ClientStrip';
import { Certifications } from '@/components/Certifications';
import { WhatsAppIcon } from '@/components/FloatingContact';

export async function generateMetadata(): Promise<Metadata> { return pageMeta('about', '/about'); }


export default async function AboutPage() {
  const { copy: t, links } = await getSite();
  const { quoteLink } = links;
  return (
    <main>
      <section className="page-hero">
        <div className="container-x grid items-center gap-12 pb-14 pt-10 sm:pb-16 sm:pt-14 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
          <div className="anim-up">
            <Eyebrow light>About ALL PACK</Eyebrow>
            <h1 className="h-page mt-5">{t['about.title']}</h1>
            <p className="lead mt-6 max-w-2xl">{t['about.lead']}</p>
            <a href={quoteLink()} target="_blank" rel="noopener noreferrer" className="btn-primary mt-9"><WhatsAppIcon size={18} /> Request a quote</a>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line">
            <div className="col-span-2 bg-white p-8"><dd className="font-display text-[72px] font-semibold leading-none tracking-[-.04em] text-navy sm:text-[88px]"><span data-count="25" data-suffix="+">25+</span></dd><dt className="mt-3 text-[14px] text-muted">{t['about.stat.label']}</dt></div>
            <div className="bg-white p-6"><dd className="font-display text-[34px] font-semibold leading-none text-navy">ISO</dd><dt className="mt-2 text-[13px] text-muted">9001:2015 certified</dt></div>
            <div className="bg-white p-6"><dd className="font-display text-[34px] font-semibold leading-none text-navy">Halal</dd><dt className="mt-2 text-[13px] text-muted">Certified packaging</dt></div>
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="h-section mt-5">{t['about.who.title']}</h2>
          </div>
          <div className="space-y-5 text-[17px] leading-[1.8] text-secondary">
            {[1, 2, 3].map(n => <p key={n}>{t[`about.who.p${n}`]}</p>)}
          </div>
        </div>
      </section>


      <section className="section dark-section">
        <div className="container-x">
          <SectionHead light kicker="Our facility" title={t['about.facility.title']} sub="Our own presses and finishing line, so colour, cut and delivery date stay under our control." />
          <Machines />
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead kicker="Certifications and clients" title={t['about.cert.title']} sub="Our certifications cover the documented quality process and food-contact packaging that our clients’ own audits require." />
          <div className="mx-auto max-w-3xl"><Certifications /></div>
          <p className="meta mt-16 text-center">Brands that print with ALL PACK</p>
          <ClientLogos className="mt-6" />
          <p className="mx-auto mt-14 max-w-2xl text-center text-[15px] text-secondary">We print for pharmaceutical, food and bakery, confectionery, cosmetics, food service, healthcare and e-commerce brands. <Link href="/industries" className="font-semibold text-brand hover:underline">See the industries we serve</Link>.</p>
        </div>
      </section>
    </main>
  );
}
