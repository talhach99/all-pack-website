/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { getSite, pageMeta } from '@/lib/site';
import { PageHero } from '@/components/PageHero';

export async function generateMetadata(): Promise<Metadata> { return pageMeta('about', '/about'); }

const VALUES = [
  { t: 'Quality on every run', d: 'ISO 9001 processes and a proof before anything prints.' },
  { t: 'Clear communication', d: 'One dedicated contact and straight answers on price and timing.' },
  { t: 'Built to fit', d: 'Every structure starts from your product, not a template.' },
  { t: 'Local in two markets', d: 'Support from Boston for the USA and Lahore for Pakistan.' },
];

export default async function AboutPage() {
  const { copy: t, clients } = await getSite();
  const logos = clients.filter(c => c.logo);
  return (
    <main className="ap">
      <PageHero kicker="About" title={<>Packaging made with care, <span className="text-[#7F8CFF]">from Lahore to Boston.</span></>} description="ALL PACK designs and prints custom packaging for pharmaceutical, food and consumer brands, with teams in the USA and Pakistan." stats={[['25+', 'Years in printing'], ['ISO 9001', 'Certified quality'], ['2', 'Offices, USA and Pakistan']]} images={[{ src: '/photos/hero2-sm.webp', alt: 'Custom printed packaging', label: 'Our work', cover: true }, { src: '/photos/off-corr-sm.webp', alt: 'Printed corrugated boxes', label: 'Shipping boxes' }, { src: '/photos/tees-sm.webp', alt: 'Printed tees', label: 'DTF apparel', cover: true }]} />

      <section className="px-5 py-20 sm:py-28">
        <div className="ap-rv mx-auto flex max-w-[1200px] flex-wrap items-center gap-14">
          <div className="h-[460px] flex-[1_1_440px] overflow-hidden rounded-[28px]"><img src="/photos/hero2-md.webp" alt="ALL PACK printed products in a studio" width={1200} height={800} className="h-full w-full object-cover" /></div>
          <div className="flex flex-[1_1_440px] flex-col gap-4">
            <span className="ap-kicker">Our story</span>
            <h2 className="text-[36px] leading-[1.05] sm:text-[44px]">Built on more than 25 years of printing and packaging.</h2>
            <p className="text-[17px] leading-[1.7] text-[#4A5060]">{t['about.lead']}</p>
            <p className="text-[17px] leading-[1.7] text-[#4A5060]">Today our Lahore team handles production while our Boston office supports brands across the United States, so every customer gets local service and the same quality standard.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F5F8] px-5 py-20 sm:py-28">
        <div className="ap-rv mx-auto max-w-[1200px]">
          <span className="ap-kicker">What we stand for</span><h2 className="mb-10 mt-3 text-[36px] leading-[1.05] sm:text-[44px]">How we work</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, k) => <div key={v.t} className="ap-lift flex flex-col gap-2.5 rounded-[20px] bg-white p-7"><span className="text-[13px] font-extrabold text-[#2B43F0]">0{k + 1}</span><h3 className="text-[20px]">{v.t}</h3><p className="text-[15px] leading-[1.6] text-[#5C6272]">{v.d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:py-28">
        <dl className="ap-rv mx-auto grid max-w-[1200px] gap-px overflow-hidden rounded-[20px] border border-[#E6E8EE] bg-[#E6E8EE] sm:grid-cols-2 lg:grid-cols-4">
          {[['25+', 'Years in printing and packaging'], ['ISO 9001', 'Certified quality management'], ['Halal', 'Certified for food and pharma'], ['2', 'Offices: Boston and Lahore']].map(([k, v]) => <div key={k} className="bg-white p-8"><dd className="text-[40px] font-extrabold tracking-tight">{k}</dd><dt className="mt-1 text-[15px] text-[#5C6272]">{v}</dt></div>)}
        </dl>
        <div className="mx-auto mt-16 max-w-[1200px]">
          <p className="mb-6 text-center text-[15px] font-bold text-[#5C6272]">Trusted by pharmaceutical, healthcare and food brands</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">{logos.map(c => <div key={c.name} className="grid h-20 place-items-center rounded-2xl border border-[#EDEEF1] bg-white p-3"><img src={c.logo} alt={c.name} width={120} height={48} loading="lazy" className="max-h-12 w-auto object-contain" /></div>)}</div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:pb-28">
        <div className="ap-rv mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-7 rounded-[24px] bg-[#0A208C] p-7 text-white sm:rounded-[28px] sm:p-16">
          <div className="max-w-[620px]"><h2 className="text-[36px] leading-[1.05] !text-white sm:text-[44px]">Let’s build your next box.</h2><p className="mt-3 text-[17px] text-[#C8D0F5]">Tell us about your product and we will take it from there.</p></div>
          <Link href="/contact" className="ap-btn ap-white font-extrabold text-[#0A208C]">Contact us</Link>
        </div>
      </section>
    </main>
  );
}
