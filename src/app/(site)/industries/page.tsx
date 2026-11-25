/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMeta } from '@/lib/site';
import { INDUSTRIES } from '@/data/home';
import { heroChip, PageHero } from '@/components/PageHero';

export async function generateMetadata(): Promise<Metadata> { return pageMeta('industries', '/industries'); }

export default function IndustriesPage() {
  return (
    <main className="ap">
      <PageHero kicker="Industries" title={<>Packaging for every industry <span className="ap-accent">we serve.</span></>} description="From regulated pharmaceutical lines to e-commerce brands, we build each category's requirements into your packaging, from the first sample to the full run." images={[{ src: '/photos/off-pharma-sm.webp', alt: 'Printed pharmaceutical cartons', label: 'Pharmaceutical' }, { src: '/photos/off-food-sm.webp', alt: 'Printed food boxes', label: 'Food & beverage' }, { src: '/photos/pouch1-sm.webp', alt: 'Printed stand-up pouch', label: 'Retail' }]}>
        {INDUSTRIES.map((i, k) => <a key={i.id} href={`#${i.id}`} className={k === 0 ? `${heroChip} !border-[#0B0D12] bg-[#0B0D12] text-white` : heroChip}>{i.name}</a>)}
      </PageHero>

      <section className="px-5 pb-10 pt-16 sm:pt-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[600px]"><span className="ap-kicker">Industries</span><h2 className="mt-3 text-[36px] leading-[1.05] sm:text-[48px]">Built for the industry you&apos;re in</h2></div>
            <p className="max-w-[380px] text-[16px] leading-[1.65] text-[#5C6272]">Every category has its own requirements. We design them into your packaging from the first sample.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map(i => (
              <a key={i.id} href={`#${i.id}`} className="ap-card ap-lift ap-rv flex flex-col overflow-hidden rounded-[20px] border border-[#E6E8EE] bg-white">
                <div className="h-[230px] overflow-hidden" style={{ background: i.bg }}><img src={i.src} alt={`${i.name} packaging by ALL PACK`} width={600} height={460} loading="lazy" className={`ap-img h-full w-full ${i.fit === 'contain' ? 'object-contain p-6' : 'object-cover'}`} /></div>
                <div className="flex flex-col gap-2 p-6">
                  <div className="flex items-center justify-between gap-3"><h3 className="text-[20px]">{i.name}</h3><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F4F5F8] text-[#2B43F0]">→</span></div>
                  <p className="text-[14px] leading-[1.6] text-[#5C6272]">{i.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:pb-28 pt-10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6">
          {INDUSTRIES.map((i, k) => (
            <div key={i.id} id={i.id} className={`ap-rv flex scroll-mt-28 flex-wrap overflow-hidden rounded-[28px] bg-[#F4F5F8] ${k % 2 ? 'flex-row-reverse' : ''}`}>
              <div className="flex min-h-[340px] flex-[1_1_420px] items-center justify-center overflow-hidden" style={{ background: i.bg }}><img src={i.src} alt={`${i.name} packaging by ALL PACK`} width={700} height={520} loading="lazy" className={`h-full max-h-[460px] w-full ${i.fit === 'contain' ? 'object-contain p-8' : 'object-cover'}`} /></div>
              <div className="flex flex-[1_1_420px] flex-col justify-center gap-4 p-8 sm:p-14">
                <span className="ap-kicker">{i.kicker}</span>
                <h2 className="text-[34px] leading-[1.05] sm:text-[40px]">{i.name}</h2>
                <p className="text-[16px] leading-[1.65] text-[#4A5060]">{i.long}</p>
                <ul className="flex flex-col gap-2.5">{i.points.map(p => <li key={p} className="flex gap-2.5 text-[15px] font-semibold"><span className="text-[#2B43F0]">✓</span>{p}</li>)}</ul>
                <div className="flex flex-wrap gap-2">{i.products.map(p => <span key={p} className="rounded-full border border-[#E0E3EA] bg-white px-3 py-1.5 text-[13px] font-bold">{p}</span>)}</div>
                <Link href="/contact" className="ap-btn ap-dark mt-1 self-start">Get a quote for {i.short} <span className="ap-go">›</span></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20 sm:pb-28">
        <div className="ap-rv mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-7 rounded-[24px] bg-[#0A208C] p-7 text-white sm:rounded-[28px] sm:p-16">
          <div className="max-w-[620px]"><h2 className="text-[36px] leading-[1.05] !text-white sm:text-[44px]">Don&apos;t see your industry?</h2><p className="mt-3 text-[17px] leading-[1.6] text-[#C8D0F5]">Tell us what you make. We will recommend a structure and material that fits.</p></div>
          <Link href="/contact" className="ap-btn ap-white font-extrabold text-[#0A208C]">Talk to our team</Link>
        </div>
      </section>
    </main>
  );
}
