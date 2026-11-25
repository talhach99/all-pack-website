/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { getSite } from '@/lib/site';

const COLS: { h: string; links: [string, string][] }[] = [
  { h: 'Explore', links: [['Home', '/'], ['Products', '/products'], ['Industries', '/industries'], ['Get a quote', '/contact']] },
  { h: 'Products', links: [['Folding cartons', '/products#folding'], ['Mailer boxes', '/products#mailer'], ['Pouches', '/products#pouches'], ['Stationery', '/products#stationery'], ['All products', '/products']] },
  { h: 'Company', links: [['About ALL PACK', '/about'], ['Our offices', '/#offices'], ['Blog', '/blog'], ['Contact', '/contact']] },
  { h: 'Help', links: [['How it works', '/how-it-works'], ['Finishes', '/finishes'], ['FAQ', '/how-it-works#faq'], ['Shipping', '/shipping']] },
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
      {/* Powered by GetServices.ai badge */}
      <div className="ap-wrap mt-10 flex justify-center">
        <a
          href="https://getservices.ai/"
          target="_blank"
          rel="noopener"
          title="AI automation and AEO by GetServices.ai"
          className="inline-flex items-center gap-2 rounded-lg border border-[#1a73e8] bg-white px-3 py-[3px] font-[Arial,sans-serif] text-[13px] font-semibold text-[#1a73e8] no-underline transition hover:shadow-md"
        >
          <img src={GETSERVICES_ICON} alt="GetServices.ai logo" width={28} height={28} decoding="sync" className="block h-7 w-7" />
          <span>Powered by <strong>GetServices.ai</strong></span>
        </a>
      </div>
      <div className="ap-wrap mt-6 flex flex-wrap justify-between gap-3 border-t border-[#E3E5EA] pt-6 text-[13px] text-[#5C6272]">
        <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
        <span className="flex gap-4"><Link href="/privacy" className="ap-ul">Privacy</Link><Link href="/terms" className="ap-ul">Terms</Link><Link href="/shipping" className="ap-ul">Shipping</Link></span>
      </div>
    </footer>
  );
}

/** GetServices.ai icon (56px WebP, ~2 KB) inlined so it renders with the page instead of waiting on getservices.ai. */
const GETSERVICES_ICON = 'data:image/webp;base64,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';
