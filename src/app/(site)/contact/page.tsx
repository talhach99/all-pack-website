import type { Metadata } from 'next';
import { getSite, pageMeta } from '@/lib/site';
import { PageHero, HeroCard, heroTitle } from '@/components/PageHero';
import { EnquiryForm } from '@/components/EnquiryForm';
import { Clock } from '@/components/ap/Clock';

export async function generateMetadata(): Promise<Metadata> { return pageMeta('contact', '/contact'); }

export default async function ContactPage() {
  const { company, links, copy: t } = await getSite();
  const wa = links.whatsappLink();
  const waUS = links.whatsappUS();
  const lines = [
    { flag: 'USA', city: 'Boston, Massachusetts', tz: 'America/New_York', phone: company.usPhone, href: waUS },
    { flag: 'Pakistan', city: 'Lahore, Pakistan', tz: 'Asia/Karachi', phone: company.phone, href: wa },
  ];
  return (
    <main className="ap">
      <PageHero kicker="Contact" title={heroTitle(t, 'contact')} description={t['hero.contact.lead']} aside={
        <HeroCard className="flex flex-col gap-3">
          <p className="text-[12px] font-extrabold uppercase tracking-[.1em] text-[#0A208C]">Message us on WhatsApp</p>
          {lines.map(l => l.href && (
            <a key={l.flag} href={l.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 rounded-2xl border border-[#ECE7DB] bg-[#FBFAF6] p-4 transition hover:border-[#0B0D12]">
              <span><span className="block text-[13px] font-bold text-[#6E685C]">{l.flag} · {l.city}</span><span className="mt-0.5 block text-[20px] font-extrabold tabular-nums">{l.phone}</span></span>
              <span className="text-right text-[13px] text-[#6E685C]"><Clock tz={l.tz} /><span className="mt-1 block font-bold text-[#0A208C] transition group-hover:translate-x-0.5">Chat →</span></span>
            </a>
          ))}
          <a href={links.emailLink()} className="mt-1 text-[15px] text-[#4F4A40]">Or email <span className="ap-ul font-bold text-[#0B0D12] [overflow-wrap:anywhere]">{company.email}</span></a>
        </HeroCard>
      }>
        <a href="#quote" className="ap-btn ap-dark">Request a quote</a>
      </PageHero>
      <section className="px-5 py-16 sm:py-24">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-start gap-8">
          <div id="quote" className="min-w-0 flex-[999_1_560px] scroll-mt-28 rounded-[28px] border border-[#E6E8EE] p-7 sm:p-11">
            <h2 className="text-[32px]">Request a quote</h2>
            <p className="mb-7 mt-2 text-[15px] text-[#5C6272]">Tell us the product, size, quantity, finish and where it ships. We will take care of the rest.</p>
            <EnquiryForm />
          </div>
          <aside className="flex flex-[1_1_340px] flex-col gap-4">
            <div className="flex flex-col gap-3 rounded-3xl bg-[#0A208C] p-7 text-white">
              <span className="text-[13px] font-extrabold tracking-[.08em] text-[#22C3EE]">FASTEST REPLY · WHATSAPP</span>
              {lines.map(l => l.href && <a key={l.flag} href={l.href} target="_blank" rel="noopener noreferrer" className="ap-lift flex items-center justify-between gap-3 rounded-2xl bg-white/[.08] px-4 py-3"><span className="text-[14px] text-[#C8D0F5]">{l.flag}</span><span className="text-[17px] font-extrabold tabular-nums">{l.phone}</span></a>)}
            </div>
            <a href={links.emailLink()} className="ap-lift flex flex-col gap-1.5 rounded-3xl bg-[#F4F5F8] p-7">
              <span className="ap-kicker">Email</span><span className="text-[20px] font-extrabold [overflow-wrap:anywhere]">{company.email}</span><span className="text-[15px] text-[#5C6272]">For quotes, artwork and samples</span>
            </a>
            <div className="flex flex-col gap-4 rounded-3xl border border-[#E6E8EE] p-7">
              <span className="ap-kicker">Offices</span>
              <div className="flex justify-between gap-3"><div><p className="text-[18px] font-extrabold">Boston</p><p className="text-[14px] text-[#5C6272]">{company.usAddress.replace(/^Boston,?\s*/, '') || 'Massachusetts'}, USA</p></div><span className="text-[15px] font-bold"><Clock tz="America/New_York" /></span></div>
              <div className="h-px bg-[#E6E8EE]" />
              <div className="flex justify-between gap-3"><div><p className="text-[18px] font-extrabold">Lahore</p><p className="text-[14px] text-[#5C6272]">Punjab, Pakistan</p></div><span className="text-[15px] font-bold"><Clock tz="Asia/Karachi" /></span></div>
            </div>
            <div className="rounded-3xl bg-[#ECEFFD] p-7">
              <span className="ap-kicker">For an accurate quote</span>
              <ul className="mt-3 flex flex-col gap-2 text-[15px]">{['The product and its weight', 'Size (length × width × height)', 'Quantity per design', 'Artwork or logo, if available', 'Delivery country and date'].map(x => <li key={x} className="flex gap-2"><span className="text-[#2B43F0]">•</span>{x}</li>)}</ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
