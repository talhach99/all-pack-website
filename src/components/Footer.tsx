import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY, mapsLink, phoneLink, whatsappLink } from '@/lib/company';
import { categories, categorySlug } from '@/lib/products';

const company = [['About us', '/about'], ['Capabilities', '/#capabilities'], ['Industries', '/industries'], ['Our work', '/gallery'], ['Guides', '/insights'], ['FAQ', '/faq'], ['Contact', '/contact']];

export function Footer() {
  const call = phoneLink();
  const wa = whatsappLink();
  const socials = ([['Instagram', COMPANY.instagram], ['Facebook', COMPANY.facebook], ['LinkedIn', COMPANY.linkedin]] as const).filter(([, l]) => l);
  const head = 'mb-5 text-[15px] font-semibold text-white';
  const item = 'text-[15px] text-[#9AA3B2] transition-colors hover:text-white';
  return (
    <footer className="border-t border-[#1A2C57] bg-navy-deep text-[#9AA3B2]">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed">Printers and packaging makers in Lahore for more than 25 years. Cartons, rigid boxes, corrugated, bags and labels, delivered across Pakistan.</p>
          {socials.length > 0 && <div className="mt-6 flex gap-5 text-sm">{socials.map(([n, l]) => <a key={n} href={l} target="_blank" rel="noopener noreferrer" className={item}>{n}</a>)}</div>}
        </div>
        <div>
          <h2 className={head}>Company</h2>
          <ul className="space-y-2.5">{company.map(([n, u]) => <li key={u}><Link href={u} className={item}>{n}</Link></li>)}</ul>
        </div>
        <div>
          <h2 className={head}>Products</h2>
          <ul className="space-y-2.5">
            <li><Link href="/products" className={item}>All products</Link></li>
            {categories.slice(0, 6).map(c => <li key={c}><Link href={`/products?category=${categorySlug(c)}`} className={item}>{c}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className={head}>Head office</h2>
          <address className="grid gap-3.5 not-italic">
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className={`${item} flex gap-3 leading-relaxed`}>
              <MapPin size={18} strokeWidth={1.6} className="mt-0.5 shrink-0" /> <span>{COMPANY.address} <ArrowUpRight size={14} strokeWidth={1.6} className="inline align-[-2px]" /></span>
            </a>
            {call && <a href={call} className={`${item} flex items-center gap-3 tabular-nums`}><Phone size={18} strokeWidth={1.6} className="shrink-0" /> {COMPANY.phone}</a>}
            <a href={`mailto:${COMPANY.email}`} className={`${item} flex items-center gap-3 break-all`}><Mail size={18} strokeWidth={1.6} className="shrink-0" /> {COMPANY.email}</a>
            {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex w-fit items-center gap-2 text-[15px] font-semibold text-brand-light hover:text-white">Chat on WhatsApp <ArrowUpRight size={16} strokeWidth={1.6} /></a>}
          </address>
        </div>
      </div>
      <div className="container-x">
        <div className="flex flex-col justify-between gap-3 border-t border-[#1A2C57] py-7 pb-24 text-[13px] sm:flex-row sm:pb-7">
          <p>© {new Date().getFullYear()} ALL PACK · The Packaging Experts · Lahore</p>
          <div className="flex gap-5"><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/faq" className="hover:text-white">FAQ</Link><Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link></div>
        </div>
      </div>
    </footer>
  );
}
