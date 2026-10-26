import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { NewsletterForm } from './NewsletterForm';
import { COMPANY, mapsLink, phoneLink } from '@/lib/company';
import { categories, categorySlug } from '@/lib/products';
import { industries } from '@/data/industries';

const company = [['About', '/about'], ['3D Studio', '/studio'], ['Gallery', '/gallery'], ['Insights', '/insights'], ['FAQ', '/faq'], ['Contact', '/contact'], ['Request a quote', '/quote']];

export function Footer() {
  const call = phoneLink();
  const socials = ([['Instagram', COMPANY.instagram], ['Facebook', COMPANY.facebook], ['LinkedIn', COMPANY.linkedin]] as const).filter(([, l]) => l);
  return (
    <footer className="relative overflow-hidden bg-ink-deep text-cream">
      <div className="container-x relative pt-20 sm:pt-24">
        <div className="grid items-end gap-10 border-b border-cream/10 pb-16 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-[clamp(2rem,3.4vw,2.8rem)] font-light leading-tight text-cream">
              Packaging ideas, <span className="font-serif italic text-brass-light">occasionally.</span>
            </h2>
            <p className="mt-3 text-[15px] text-cream/55">New finishes, formats and launches. No spam.</p>
          </div>
          <NewsletterForm />
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_.8fr_1.3fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-cream/55">Custom boxes, bags, labels and printed packaging, designed and produced for brands that care about the details.</p>
            {socials.length > 0 && <div className="mt-6 flex gap-5 text-sm">{socials.map(([n, l]) => <a key={n} href={l} target="_blank" rel="noopener noreferrer" className="text-cream/70 hover:text-cream">{n}</a>)}</div>}
          </div>
          <div>
            <h3 className="mb-5 font-sans text-[11px] font-bold uppercase tracking-[.22em] text-brass-light">Products</h3>
            <ul className="space-y-3 text-[15px]">{categories.map(c => <li key={c}><Link href={`/products?category=${categorySlug(c)}`} className="text-cream/60 transition-colors hover:text-cream">{c}</Link></li>)}</ul>
          </div>
          <div>
            <h3 className="mb-5 font-sans text-[11px] font-bold uppercase tracking-[.22em] text-brass-light">Industries</h3>
            <ul className="space-y-3 text-[15px]">{industries.map(i => <li key={i.slug}><Link href={`/industries/${i.slug}`} className="text-cream/60 transition-colors hover:text-cream">{i.name}</Link></li>)}</ul>
          </div>
          <div>
            <h3 className="mb-5 font-sans text-[11px] font-bold uppercase tracking-[.22em] text-brass-light">Company</h3>
            <ul className="space-y-3 text-[15px]">{company.map(([n, u]) => <li key={u}><Link href={u} className="text-cream/60 transition-colors hover:text-cream">{n}</Link></li>)}</ul>
          </div>
          <div>
            <h3 className="mb-5 font-sans text-[11px] font-bold uppercase tracking-[.22em] text-brass-light">Get in touch</h3>
            <address className="grid gap-4 not-italic">
              {call && <a href={call} className="font-display text-2xl text-cream transition-colors hover:text-brass-light">{COMPANY.phone}</a>}
              <a href={`mailto:${COMPANY.email}`} className="break-all text-[15px] text-cream hover:text-brass-light">{COMPANY.email}</a>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="group text-[15px] leading-relaxed text-cream/55 hover:text-cream">
                {COMPANY.address} <ArrowUpRight size={14} className="inline align-[-2px] text-brass-light" />
              </a>
            </address>
          </div>
        </div>
      </div>
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <p className="outline-text whitespace-nowrap text-center font-display text-[17vw] font-light leading-[.85] tracking-[-.02em] text-cream/20">ALL PACK</p>
      </div>
      <div className="container-x">
        <div className="flex flex-col justify-between gap-3 border-t border-cream/10 py-7 pb-24 text-[13px] text-cream/50 sm:flex-row sm:pb-7">
          <p>© {new Date().getFullYear()} ALL PACK — The Packaging Experts. Lahore, Pakistan.</p>
          <div className="flex gap-5"><Link href="/privacy" className="hover:text-cream">Privacy</Link><Link href="/faq" className="hover:text-cream">FAQ</Link><Link href="/sitemap.xml" className="hover:text-cream">Sitemap</Link></div>
        </div>
      </div>
    </footer>
  );
}
