import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { LogoMark, Logo } from './Logo';
import { NewsletterForm } from './NewsletterForm';
import { COMPANY, mapsLink, phoneLink, whatsappLink } from '@/lib/company';
import { categories, categorySlug } from '@/lib/products';

const company = [['About', '/about'], ['3D Studio', '/studio'], ['Gallery', '/gallery'], ['Insights', '/insights'], ['FAQ', '/faq'], ['Contact', '/contact'], ['Request a quote', '/quote']];

export function Footer() {
  const call = phoneLink();
  const socials = ([['Instagram', COMPANY.instagram], ['Facebook', COMPANY.facebook], ['LinkedIn', COMPANY.linkedin]] as const).filter(([, l]) => l);
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="container-x relative pt-20">
        <div className="grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="max-w-xl font-display text-[clamp(2.2rem,4.5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-.04em]">
              Have a product that deserves <span className="font-serif font-normal italic text-sky-light">better packaging?</span>
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/quote" className="btn-white">Start your quote <ArrowUpRight size={16} /></Link>
              <a href={whatsappLink() || '#'} target="_blank" rel="noopener noreferrer" className="btn border border-white/20 text-white hover:bg-white/10">Chat on WhatsApp</a>
            </div>
          </div>
          <div className="lg:pl-10">
            <p className="text-sm font-semibold">Packaging ideas, occasionally.</p>
            <p className="mt-1 text-sm text-white/60">New finishes, formats and launches. No spam.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">Custom boxes, bags, labels and printed packaging, designed and produced for brands that care about the details.</p>
            {socials.length > 0 && <div className="mt-6 flex gap-4 text-sm">{socials.map(([n, l]) => <a key={n} href={l} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">{n}</a>)}</div>}
          </div>
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[.18em] text-white/50">Products</h3>
            <ul className="space-y-3 text-sm">{categories.map(c => <li key={c}><Link href={`/products?category=${categorySlug(c)}`} className="text-white/75 transition-colors hover:text-white">{c}</Link></li>)}</ul>
          </div>
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[.18em] text-white/50">Company</h3>
            <ul className="space-y-3 text-sm">{company.map(([n, u]) => <li key={u}><Link href={u} className="text-white/75 transition-colors hover:text-white">{n}</Link></li>)}</ul>
          </div>
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[.18em] text-white/50">Get in touch</h3>
            <ul className="space-y-4 text-sm">
              {call && <li><a href={call} className="flex items-center gap-3 text-white/75 hover:text-white"><Phone size={16} className="shrink-0 text-sky-light" /> {COMPANY.phone}</a></li>}
              <li><a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 break-all text-white/75 hover:text-white"><Mail size={16} className="shrink-0 text-sky-light" /> {COMPANY.email}</a></li>
              <li><a href={mapsLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 leading-relaxed text-white/75 hover:text-white"><MapPin size={16} className="mt-1 shrink-0 text-sky-light" /> {COMPANY.address}</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="pointer-events-none relative select-none overflow-hidden" aria-hidden="true">
        <div className="container-x flex items-end gap-[2vw]">
          <LogoMark light className="mb-[1.2vw] h-[12vw] w-[12vw] opacity-[.08]" />
          <p className="font-display text-[18.5vw] font-bold leading-[.8] tracking-[-.05em] text-white/[.06]">ALL PACK</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col justify-between gap-3 py-6 pb-24 text-xs text-white/50 sm:flex-row sm:pb-6">
          <p>© {new Date().getFullYear()} ALL PACK — The Packaging Experts. Lahore, Pakistan.</p>
          <div className="flex gap-5"><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/faq" className="hover:text-white">FAQ</Link><Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link></div>
        </div>
      </div>
    </footer>
  );
}
