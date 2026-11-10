import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY, mapsLink, phoneLink, whatsappLink } from '@/lib/company';
import { categories, categorySlug } from '@/lib/products';

const company = [['About', '/about'], ['Industries', '/industries'], ['Gallery', '/gallery'], ['Guides', '/insights'], ['FAQ', '/faq'], ['Contact', '/contact']];

export function Footer() {
  const call = phoneLink();
  const wa = whatsappLink();
  const socials = ([['Instagram', COMPANY.instagram], ['Facebook', COMPANY.facebook], ['LinkedIn', COMPANY.linkedin]] as const).filter(([, l]) => l);
  const head = 'mb-4 text-[13px] font-bold uppercase tracking-[.14em] text-white';
  const item = 'text-[15px] text-cream/65 transition-colors hover:text-white';
  return (
    <footer className="bg-ink text-cream">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-cream/65">Custom boxes, bags, labels and printed packaging, made to your size in Lahore and delivered across Pakistan.</p>
          {socials.length > 0 && <div className="mt-6 flex gap-5 text-sm">{socials.map(([n, l]) => <a key={n} href={l} target="_blank" rel="noopener noreferrer" className="text-cream/70 hover:text-white">{n}</a>)}</div>}
        </div>
        <div>
          <h2 className={head}>Shop</h2>
          <ul className="space-y-2.5">
            <li><Link href="/products" className={item}>All products</Link></li>
            {categories.slice(0, 5).map(c => <li key={c}><Link href={`/products?category=${categorySlug(c)}`} className={item}>{c}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className={head}>Company</h2>
          <ul className="space-y-2.5">{company.map(([n, u]) => <li key={u}><Link href={u} className={item}>{n}</Link></li>)}</ul>
        </div>
        <div>
          <h2 className={head}>Get in touch</h2>
          <address className="grid gap-3 not-italic">
            {call && <a href={call} className="text-2xl font-semibold text-white hover:text-cyan">{COMPANY.phone}</a>}
            {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className={item}>WhatsApp us</a>}
            <a href={`mailto:${COMPANY.email}`} className={`${item} break-all`}>{COMPANY.email}</a>
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className={`${item} leading-relaxed`}>
              {COMPANY.address} <ArrowUpRight size={14} className="inline align-[-2px] text-cyan" />
            </a>
          </address>
        </div>
      </div>
      <div className="container-x">
        <div className="flex flex-col justify-between gap-3 border-t border-white/10 py-7 pb-24 text-[13px] text-cream/50 sm:flex-row sm:pb-7">
          <p>© {new Date().getFullYear()} ALL PACK · The Packaging Experts · Lahore, Pakistan</p>
          <div className="flex gap-5"><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/faq" className="hover:text-white">FAQ</Link><Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link></div>
        </div>
      </div>
    </footer>
  );
}
