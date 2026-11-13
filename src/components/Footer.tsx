import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY, mapsLink, phoneLink, whatsappLink } from '@/lib/company';
import { categories, categorySlug } from '@/lib/products';

const explore = [['Home', '/'], ['About us', '/about'], ['Products', '/products'], ['Industries', '/industries'], ['Gallery', '/gallery'], ['Guides', '/insights'], ['FAQ', '/faq'], ['Contact', '/contact']];

export function Footer() {
  const call = phoneLink();
  const wa = whatsappLink();
  const socials = ([['Instagram', COMPANY.instagram], ['Facebook', COMPANY.facebook], ['LinkedIn', COMPANY.linkedin]] as const).filter(([, l]) => l);
  const head = 'mb-5 text-[11px] font-medium uppercase tracking-[.24em] text-brand-dark';
  const item = 'text-[15px] text-secondary transition-colors hover:text-brand';
  return (
    <footer className="border-t border-line bg-white text-ink">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-[1.4fr_.9fr_1.1fr_1.3fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs font-display text-[19px] leading-snug text-ink">The Packaging Experts.</p>
          <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-secondary">Custom boxes, cartons, bags and labels, printed in Lahore for more than 25 years and delivered across Pakistan.</p>
          {socials.length > 0 && <div className="mt-6 flex gap-5 text-sm">{socials.map(([n, l]) => <a key={n} href={l} target="_blank" rel="noopener noreferrer" className={item}>{n}</a>)}</div>}
        </div>
        <div>
          <h2 className={head}>Explore</h2>
          <ul className="space-y-2.5">{explore.map(([n, u]) => <li key={u}><Link href={u} className={item}>{n}</Link></li>)}</ul>
        </div>
        <div>
          <h2 className={head}>Products</h2>
          <ul className="space-y-2.5">
            <li><Link href="/products" className={item}>All products</Link></li>
            {categories.map(c => <li key={c}><Link href={`/products?category=${categorySlug(c)}`} className={item}>{c}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className={head}>Head office</h2>
          <address className="grid gap-3 not-italic">
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className={`${item} leading-relaxed`}>
              {COMPANY.address} <ArrowUpRight size={16} strokeWidth={1.5} className="inline align-[-3px] text-muted" />
            </a>
            {call && <a href={call} className="font-mono text-[17px] tabular-nums text-ink hover:text-brand">{COMPANY.phone}</a>}
            {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className={item}>WhatsApp us</a>}
            <a href={`mailto:${COMPANY.email}`} className={`${item} break-all`}>{COMPANY.email}</a>
          </address>
        </div>
      </div>
      <div className="border-t border-line bg-mist">
        <div className="container-x flex flex-col justify-between gap-3 py-6 pb-24 text-[13px] text-muted sm:flex-row sm:pb-6">
          <p>© {new Date().getFullYear()} ALL PACK · The Packaging Experts · Lahore, Pakistan</p>
          <div className="flex gap-5"><Link href="/privacy" className="hover:text-brand">Privacy</Link><Link href="/faq" className="hover:text-brand">FAQ</Link><Link href="/sitemap.xml" className="hover:text-brand">Sitemap</Link></div>
        </div>
      </div>
    </footer>
  );
}
