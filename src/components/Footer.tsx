import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { CertBadge } from './Certifications';
import { getSite } from '@/lib/site';
import { WhatsAppIcon } from './FloatingContact';

const company: [string, string][] = [['About ALL PACK', '/about'], ['Why ALL PACK', '/why-all-pack'], ['Industries', '/industries'], ['Packaging guides', '/insights'], ['FAQ', '/faq'], ['Contact', '/contact']];

export async function Footer() {
  const { company: COMPANY, links, families, copy } = await getSite();
  const mapsLink = links.mapsLink;
  const wa = links.whatsappLink();
  const socials = ([['Instagram', COMPANY.instagram], ['Facebook', COMPANY.facebook], ['LinkedIn', COMPANY.linkedin]] as const).filter(([, l]) => l);
  const head = 'mb-5 font-display text-[15px] font-semibold text-white';
  const item = 'text-[15px] text-cyan transition-colors hover:text-white';
  return (
    <footer className="bg-navy text-cyan">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-12 py-16 sm:gap-12 sm:py-20 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div className="col-span-2 sm:col-span-1">
          <Logo light src={copy['site.logo']} />
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed">{copy['footer.blurb']}</p>
          <div className="mt-7 flex items-center gap-3"><CertBadge id="iso" size={46} /><CertBadge id="halal" size={46} /><span className="text-[13px] leading-snug">ISO 9001:2015<br />Halal certified</span></div>
          {socials.length > 0 && <div className="mt-6 flex gap-5 text-sm">{socials.map(([n, l]) => <a key={n} href={l} target="_blank" rel="noopener noreferrer" className={item}>{n}</a>)}</div>}
        </div>
        <div>
          <h2 className={head}>Products</h2>
          <ul className="space-y-2.5">{families.map(f => <li key={f.slug}><Link href={`/products#${f.slug}`} className={item}>{f.name}</Link></li>)}</ul>
        </div>
        <div>
          <h2 className={head}>Company</h2>
          <ul className="space-y-2.5">{company.map(([n, u]) => <li key={u}><Link href={u} className={item}>{n}</Link></li>)}</ul>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <h2 className={head}>Head office</h2>
          <address className="grid gap-3.5 not-italic">
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className={`${item} flex gap-3 leading-relaxed`}><MapPin size={18} strokeWidth={1.6} className="mt-0.5 shrink-0" /><span>{COMPANY.address}</span></a>
            {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className={`${item} flex items-center gap-3 tabular-nums`}><WhatsAppIcon size={18} /> {COMPANY.phone}</a>}
            <a href={`mailto:${COMPANY.email}`} className={`${item} flex items-center gap-3 [overflow-wrap:anywhere]`}><Mail size={18} strokeWidth={1.6} className="shrink-0" /> {COMPANY.email}</a>
            {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex w-fit items-center gap-2 text-[15px] font-semibold text-white hover:text-brand-light">Chat on WhatsApp <ArrowUpRight size={16} strokeWidth={1.6} /></a>}
          </address>
        </div>
      </div>
      {/* Powered by GetServices.ai badge */}
      <div className="py-3 text-center lg:mt-10">
        <a
          href="https://getservices.ai/?utm_source=client-site&utm_medium=footer-badge"
          title="AI automation and AEO by GetServices.ai"
          className="inline-flex items-center gap-2 rounded-lg border border-[#1a73e8] bg-white px-3 py-[3px] font-[Arial,sans-serif] text-[13px] font-semibold text-[#1a73e8] no-underline"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={GETSERVICES_ICON} alt="GetServices.ai logo" width={28} height={28} decoding="sync" className="block h-7 w-7" />
          <span>Powered by <strong>GetServices.ai</strong></span>
        </a>
      </div>
      <div className="container-x">
        <div className="flex flex-col justify-between gap-3 border-t border-white/10 py-7 pb-20 text-[13px] sm:flex-row sm:pb-7">
          <p>© {new Date().getFullYear()} {copy['footer.copyright']}</p>
          <div className="flex gap-5"><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/terms" className="hover:text-white">Terms</Link><Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link></div>
        </div>
      </div>
    </footer>
  );
}

/** GetServices.ai icon (56px WebP, ~2 KB) inlined so it renders with the page instead of waiting on getservices.ai. */
const GETSERVICES_ICON = 'data:image/webp;base64,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';
