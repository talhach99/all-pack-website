import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { WhatsAppIcon } from './FloatingContact';
import { COMPANY, mapsLink, phoneLink, quoteLink } from '@/lib/company';
import { categories, categorySlug } from '@/lib/products';

const company = [['About', '/about'], ['Industries', '/industries'], ['Gallery', '/gallery'], ['Guides', '/insights'], ['FAQ', '/faq'], ['Contact', '/contact']];

export function Footer() {
  const call = phoneLink();
  const socials = ([['Instagram', COMPANY.instagram], ['Facebook', COMPANY.facebook], ['LinkedIn', COMPANY.linkedin]] as const).filter(([, l]) => l);
  const head = 'mb-4 font-mono text-[12px] uppercase tracking-[.08em] text-cyan';
  const item = 'text-[15px] text-cream/75 transition-colors hover:text-white';
  return (
    <footer className="bg-graphite-page text-cream">
      <div aria-hidden="true" className="cmyk-bar" />
      <div className="container-x grid gap-10 border-b border-white/10 py-14 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <p className="max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.02] tracking-[-.035em] text-white">Got a product? We&rsquo;ll print the box.</p>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <a href={quoteLink()} target="_blank" rel="noopener noreferrer" className="btn-brand"><WhatsAppIcon size={18} /> Get a quote</a>
          {call && <a href={call} className="btn-outline-light font-mono tabular-nums">{COMPANY.phone}</a>}
        </div>
      </div>
      <div className="container-x grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-cyan">Printers and packaging makers in Lahore for more than 25 years. Cartons, rigid boxes, corrugated, bags and labels, delivered across Pakistan.</p>
          {socials.length > 0 && <div className="mt-6 flex gap-5 text-sm">{socials.map(([n, l]) => <a key={n} href={l} target="_blank" rel="noopener noreferrer" className={item}>{n}</a>)}</div>}
        </div>
        <div>
          <h2 className={head}>Products</h2>
          <ul className="space-y-2">
            <li><Link href="/products" className={item}>All products</Link></li>
            {categories.slice(0, 6).map(c => <li key={c}><Link href={`/products?category=${categorySlug(c)}`} className={item}>{c}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className={head}>Company</h2>
          <ul className="space-y-2">{company.map(([n, u]) => <li key={u}><Link href={u} className={item}>{n}</Link></li>)}</ul>
        </div>
        <div>
          <h2 className={head}>Visit or write</h2>
          <address className="grid gap-3 not-italic">
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className={`${item} leading-relaxed`}>
              {COMPANY.address} <ArrowUpRight size={16} strokeWidth={1.5} className="inline align-[-3px] text-cyan" />
            </a>
            <a href={`mailto:${COMPANY.email}`} className={`${item} break-all`}>{COMPANY.email}</a>
          </address>
        </div>
      </div>
      <div className="container-x">
        <div className="flex flex-col justify-between gap-3 border-t border-white/10 py-7 pb-24 text-[13px] text-cyan sm:flex-row sm:pb-7">
          <p>© {new Date().getFullYear()} ALL PACK · The Packaging Experts · Lahore</p>
          <div className="flex gap-5"><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/faq" className="hover:text-white">FAQ</Link><Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link></div>
        </div>
      </div>
    </footer>
  );
}
