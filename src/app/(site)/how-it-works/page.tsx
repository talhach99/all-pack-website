import type { Metadata } from 'next';
import Link from 'next/link';
import { getSite, pageMeta } from '@/lib/site';
import { STEPS, ARTWORK, REGIONS, HOW_FAQ } from '@/data/home';
import { PageHero } from '@/components/PageHero';
import { FaqAccordion } from '@/components/FaqAccordion';

export async function generateMetadata(): Promise<Metadata> { return pageMeta('how', '/how-it-works'); }

export default async function HowItWorksPage() {
  const { links } = await getSite();
  const wa = links.whatsappLink();
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: HOW_FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  return (
    <main className="ap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <PageHero kicker="How it works" title="How ordering with ALL PACK works." description="From your first message to boxes at your door: here is exactly what happens, what we need from you and how long it takes." />

      <section className="px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px]">
          <span className="ap-kicker">The process</span><h2 className="mb-10 mt-3 text-[36px] leading-[1.05] sm:text-[44px]">Four steps, one dedicated contact</h2>
          <div className="flex flex-col gap-4">
            {STEPS.map(s => (
              <div key={s.n} className="ap-lift ap-rv grid gap-7 rounded-3xl border border-[#E6E8EE] bg-white p-8 md:grid-cols-3">
                <div className="flex flex-col gap-2.5"><span className="text-[44px] font-extrabold leading-none tracking-tight text-[#2B43F0]">{s.n}</span><h3 className="text-[24px]">{s.title}</h3><span className="self-start rounded-full bg-[#ECEFFD] px-3 py-1.5 text-[13px] font-extrabold text-[#0A208C]">{s.time}</span></div>
                <div><p className="mb-2.5 text-[13px] font-extrabold tracking-[.08em] text-[#8A93A8]">YOU SEND</p><ul className="flex flex-col gap-2">{s.send.map(x => <li key={x} className="flex gap-2 text-[15px]"><span className="text-[#2B43F0]">•</span>{x}</li>)}</ul></div>
                <div><p className="mb-2.5 text-[13px] font-extrabold tracking-[.08em] text-[#8A93A8]">YOU GET</p><ul className="flex flex-col gap-2">{s.get.map(x => <li key={x} className="flex gap-2 text-[15px]"><span className="text-[#16A34A]">✓</span>{x}</li>)}</ul></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="artwork" className="scroll-mt-24 bg-[#F4F5F8] px-5 py-20 sm:py-28">
        <div className="ap-rv mx-auto grid max-w-[1200px] gap-5 lg:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-3xl bg-white p-8 sm:p-10">
            <span className="ap-kicker">Sizing guide</span><h3 className="text-[30px]">How to measure your box</h3>
            <svg viewBox="0 0 360 230" className="mx-auto w-full max-w-[420px]" role="img" aria-label="Box showing length, width and height">
              <polygon points="80,90 240,90 290,55 130,55" fill="#ECEFFD" stroke="#0A208C" strokeWidth="2" /><polygon points="240,90 290,55 290,165 240,200" fill="#D5DBFA" stroke="#0A208C" strokeWidth="2" /><rect x="80" y="90" width="160" height="110" fill="#FFFFFF" stroke="#0A208C" strokeWidth="2" />
              <text x="160" y="222" textAnchor="middle" fontSize="13" fontWeight="800" fill="#2B43F0">Length (L)</text><text x="298" y="78" fontSize="13" fontWeight="800" fill="#2B43F0">Width (W)</text><text x="72" y="150" textAnchor="end" fontSize="13" fontWeight="800" fill="#2B43F0">Height (H)</text>
            </svg>
            <ul className="flex flex-col gap-2.5 text-[15px] leading-[1.6] text-[#4A5060]"><li>• Measure the <b>inside</b> of the box in inches (or millimetres in Pakistan): Length × Width × Height.</li><li>• Add a little space for inserts or padding.</li><li>• Not sure? Send us your product and we will size it for you.</li></ul>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl bg-white p-8 sm:p-10">
            <span className="ap-kicker">Artwork guide</span><h3 className="text-[30px]">Getting your files print-ready</h3>
            <dl className="border-t border-[#E6E8EE]">{ARTWORK.map(([k, v]) => <div key={k} className="flex justify-between gap-4 border-b border-[#E6E8EE] py-3.5 text-[15px]"><dt className="text-[#5C6272]">{k}</dt><dd className="text-right font-extrabold">{v}</dd></div>)}</dl>
            <Link href="/contact" className="ap-btn ap-dark self-start">Request dieline templates</Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:py-28">
        <div className="ap-rv mx-auto max-w-[1200px]">
          <span className="ap-kicker">Ordering details</span><h2 className="mb-10 mt-3 text-[36px] leading-[1.05] sm:text-[44px]">Lead times, minimums and payment</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {REGIONS.map(r => (
              <div key={r.name} className={`flex flex-col gap-5 rounded-3xl p-8 sm:p-10 ${r.dark ? 'bg-[#0A208C] text-white' : 'bg-[#F4F5F8]'}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className={`text-[32px] ${r.dark ? '!text-white' : ''}`}>{r.name}</h3><span className="text-[14px] opacity-80">{r.office}</span></div>
                <dl className={`border-t ${r.dark ? 'border-white/20' : 'border-[#DADDE4]'}`}>{r.rows.map(([k, v]) => <div key={k} className={`flex justify-between gap-4 border-b py-3.5 text-[15px] ${r.dark ? 'border-white/20' : 'border-[#DADDE4]'}`}><dt className="opacity-80">{k}</dt><dd className="text-right font-extrabold">{v}</dd></div>)}</dl>
                <div><p className="mb-2.5 text-[13px] font-extrabold tracking-[.08em] opacity-80">PAYMENT METHODS</p><div className="flex flex-wrap gap-2">{r.pay.map(p => <span key={p} className={`rounded-lg px-3.5 py-2 text-[14px] font-extrabold ${r.dark ? 'bg-white text-[#0A208C]' : 'bg-white text-[#0B0D12]'}`}>{p}</span>)}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 px-5 pb-20 sm:pb-28">
        <div className="ap-rv mx-auto max-w-[860px]"><h2 className="mb-8 text-center text-[36px] sm:text-[40px]">Frequently asked questions</h2><FaqAccordion faqs={HOW_FAQ} /></div>
      </section>

      <section className="px-5 pb-20 sm:pb-28">
        <div className="ap-rv mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-7 rounded-[24px] bg-[#0A208C] p-7 text-white sm:rounded-[28px] sm:p-16">
          <div className="max-w-[620px]"><h2 className="text-[36px] leading-[1.05] !text-white sm:text-[44px]">Ready to start?</h2><p className="mt-3 text-[17px] leading-[1.6] text-[#C8D0F5]">Send your specs today and get a clear quote from our Boston or Lahore team.</p></div>
          <div className="flex flex-wrap gap-2.5"><Link href="/contact" className="ap-btn ap-white font-extrabold text-[#0A208C]">Start your quote</Link>{wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="ap-btn ap-ghost-light">WhatsApp us</a>}</div>
        </div>
      </section>
    </main>
  );
}
