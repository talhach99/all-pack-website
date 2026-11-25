/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { getSite } from '@/lib/site';

const COLS: { h: string; links: [string, string][] }[] = [
  { h: 'Explore', links: [['Home', '/'], ['Products', '/products'], ['Industries', '/industries'], ['Get a quote', '/contact']] },
  { h: 'Products', links: [['Folding cartons', '/products#folding'], ['Mailer boxes', '/products#mailer'], ['Pouches', '/products#pouches'], ['Stationery', '/products#stationery'], ['All products', '/products']] },
  { h: 'Company', links: [['About ALL PACK', '/about'], ['Our offices', '/#offices'], ['Blog', '/blog'], ['Contact', '/contact']] },
  { h: 'Help', links: [['How it works', '/how-it-works'], ['Finishes', '/finishes'], ['Industries', '/industries'], ['FAQ', '/how-it-works#faq']] },
];

export async function Footer() {
  const { company, links, copy } = await getSite();
  const wa = links.whatsappLink();
  const waUS = links.whatsappUS();
  return (
    <footer className="ap bg-[#F6F7F9] pb-8 pt-16">
      <div className="ap-wrap grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <img src={copy['site.logoDark']} alt={company.name} width={160} height={48} className="h-10 w-auto self-start" />
          <p className="text-[14px] leading-[1.8] text-[#5C6272]">
            <span className="font-bold text-[#0B0D12]">{company.usAddress}, USA</span><br />
            {waUS && <><a href={waUS} target="_blank" rel="noopener noreferrer" className="ap-ul">WhatsApp {company.usPhone}</a><br /></>}
            <span className="mt-2 inline-block font-bold text-[#0B0D12]">Lahore, Pakistan</span><br />
            {wa && <><a href={wa} target="_blank" rel="noopener noreferrer" className="ap-ul">WhatsApp {company.phone}</a><br /></>}
            <a href={links.emailLink()} className="ap-ul">{company.email}</a>
          </p>
        </div>
        {COLS.map(c => (
          <div key={c.h} className="flex flex-col gap-2.5">
            <span className="text-[14px] font-extrabold">{c.h}</span>
            {c.links.map(([t, h]) => <Link key={t} href={h} className="ap-ul self-start text-[14px] text-[#5C6272] hover:text-[#0B0D12]">{t}</Link>)}
          </div>
        ))}
      </div>
      <div className="ap-wrap mt-12 flex flex-wrap justify-between gap-3 border-t border-[#E3E5EA] pt-6 text-[13px] text-[#5C6272]">
        <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
        <span className="flex gap-4"><Link href="/privacy" className="ap-ul">Privacy</Link><Link href="/terms" className="ap-ul">Terms</Link><Link href="/shipping" className="ap-ul">Shipping</Link></span>
      </div>
    </footer>
  );
}
