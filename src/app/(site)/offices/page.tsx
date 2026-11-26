import type { Metadata } from 'next';
import Link from 'next/link';
import { getSite, pageMeta } from '@/lib/site';
import { PageHero, heroTitle } from '@/components/PageHero';
import { OfficeCards, OfficeFlow } from '@/components/ap/Offices';

export async function generateMetadata(): Promise<Metadata> { return pageMeta('offices', '/offices'); }

export default async function OfficesPage() {
  const { copy: t, company, links } = await getSite();
  const wa = links.whatsappLink(), waUS = links.whatsappUS();
  const contact = { wa, waUS, usPhone: company.usPhone, pkPhone: company.phone, email: company.email };

  const directory = [
    { city: 'Lahore, Pakistan', role: t['offices.lahore.role'], tag: t['offices.lahore.badge'], wa, phone: company.phone, hq: true },
    { city: 'Boston, Massachusetts', role: t['offices.boston.role'], tag: t['offices.boston.badge'], wa: waUS, phone: company.usPhone, hq: false },
  ];

  const compare: [string, string, string][] = [
    ['Office type', 'Headquarters', 'US office'],
    ['Customers served', 'Brands across Pakistan', 'Brands across the United States'],
    ['What the team handles', 'Production, quality control, sales and delivery', 'Quotes, account management, artwork support and delivery'],
    ['Quotes in', 'Pakistani rupees (PKR)', 'US dollars (USD)'],
    ['Payment', 'Bank transfer', 'Visa, Mastercard, American Express, PayPal, Stripe'],
    ['Time zone', 'Pakistan Standard Time (UTC+5)', 'Eastern Time (ET)'],
  ];

  return (
    <main className="ap">
      <PageHero
        kicker="Offices"
        title={heroTitle(t, 'offices')}
        description={t['hero.offices.lead']}
        stats={[['Lahore', 'Headquarters'], ['Boston', 'US office'], ['ISO 9001', 'One quality system']]}
        aside={
          <div className="rounded-[24px] border border-[#E2DCCD] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(11,13,18,.35)] sm:p-8">
            <p className="text-[12px] font-extrabold uppercase tracking-[.12em] text-[#6E685C]">Office directory</p>
            <ul className="mt-5 divide-y divide-[#EDEEF1]">
              {directory.map(d => (
                <li key={d.city} className="flex flex-wrap items-center justify-between gap-4 py-5 first:pt-0 last:pb-0">
                  <div>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[.08em] ${d.hq ? 'bg-[#0A208C] text-white' : 'bg-[#ECEFFD] text-[#0A208C]'}`}>{d.tag}</span>
                    <p className="mt-2.5 text-[20px] font-extrabold tracking-tight">{d.city}</p>
                    <p className="text-[14px] text-[#5C6272]">{d.role}</p>
                  </div>
                  {d.wa && <a href={d.wa} target="_blank" rel="noopener noreferrer" className="ap-ul text-[14px] font-bold text-[#0A208C]">WhatsApp {d.phone}</a>}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <section className="px-5 py-20 sm:py-28">
        <div className="ap-rv mx-auto max-w-[1200px]">
          <div className="mx-auto mb-12 max-w-[720px] text-center">
            <span className="ap-kicker">{t['offices.kicker']}</span>
            <h2 className="mt-3 text-[36px] leading-[1.04] sm:text-[48px]">{t['offices.title']}</h2>
            <p className="mt-4 text-[17px] leading-[1.65] text-[#4A5060]">{t['offices.lead']}</p>
          </div>
          <OfficeCards t={t} c={contact} />
        </div>
      </section>

      <section className="bg-[#F4F5F8] px-5 py-20 sm:py-28">
        <div className="ap-rv mx-auto max-w-[1200px]">
          <span className="ap-kicker">Which office to contact</span>
          <h2 className="mb-10 mt-3 text-[36px] leading-[1.05] sm:text-[44px]">The right team for your market</h2>
          <div className="overflow-x-auto rounded-[20px] border border-[#E3E6ED] bg-white">
            <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-[#E3E6ED]">
                  <th scope="col" className="w-[26%] p-5 text-[13px] font-extrabold uppercase tracking-[.08em] text-[#7A8091] sm:px-7"><span className="sr-only">Detail</span></th>
                  <th scope="col" className="p-5 sm:px-7"><span className="block text-[20px] font-extrabold tracking-tight">Lahore</span><span className="text-[13px] font-semibold text-[#5C6272]">Punjab, Pakistan</span></th>
                  <th scope="col" className="p-5 sm:px-7"><span className="block text-[20px] font-extrabold tracking-tight">Boston</span><span className="text-[13px] font-semibold text-[#5C6272]">Massachusetts, USA</span></th>
                </tr>
              </thead>
              <tbody>
                {compare.map(([k, a, b]) => (
                  <tr key={k} className="border-b border-[#EDEEF1] last:border-0">
                    <th scope="row" className="p-5 text-[14px] font-bold text-[#5C6272] sm:px-7">{k}</th>
                    <td className="p-5 font-semibold sm:px-7">{a}</td>
                    <td className="p-5 font-semibold sm:px-7">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:py-28">
        <div className="ap-rv mx-auto max-w-[1200px]">
          <span className="ap-kicker">One process</span>
          <h2 className="mb-12 mt-3 text-[36px] leading-[1.05] sm:text-[44px]">{t['offices.flow.title']}</h2>
          <OfficeFlow t={t} />
          <dl className="mt-16 grid gap-px overflow-hidden rounded-[20px] border border-[#E3E6ED] bg-[#E3E6ED] sm:grid-cols-3">
            {[['25+ years', 'In printing and packaging'], ['ISO 9001', 'Certified quality management'], ['Halal', 'Certified for food and pharma']].map(([k, v]) => (
              <div key={k} className="bg-white p-7"><dd className="text-[28px] font-extrabold tracking-tight">{k}</dd><dt className="mt-1 text-[15px] text-[#5C6272]">{v}</dt></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-5 pb-20 sm:pb-28">
        <div className="ap-rv mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-7 rounded-[24px] bg-[#0A208C] p-7 text-white sm:rounded-[28px] sm:p-16">
          <div className="max-w-[620px]"><h2 className="text-[36px] leading-[1.05] !text-white sm:text-[44px]">Talk to the office nearest you.</h2><p className="mt-3 text-[17px] text-[#C8D0F5]">Send your product size and quantity, and the right team will reply within one business day.</p></div>
          <Link href="/contact" className="ap-btn ap-white font-extrabold text-[#0A208C]">Get a quote</Link>
        </div>
      </section>
    </main>
  );
}
