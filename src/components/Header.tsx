'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Mail, Menu, Search, X } from 'lucide-react';
import { emailLink, quoteLink } from '@/lib/company';
import { families } from '@/data/catalog';
import { Logo } from './Logo';
import { WhatsAppIcon } from './FloatingContact';

const NAV = [
  { text: 'Home', href: '/' },
  { text: 'Products', href: '/products' },
  { text: 'Industries', href: '/industries' },
  { text: 'Why ALL PACK', href: '/why-all-pack' },
  { text: 'Guides', href: '/insights' },
  { text: 'FAQs', href: '/faq' },
  { text: 'About', href: '/about' },
  { text: 'Contact', href: '/contact' },
];

/** Search across the product range; a pick jumps to that format on the Products page. */
function ProductSearch({ className = '', id }: { className?: string; id: string }) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const hits = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return families;
    return families.filter(f => [f.name, f.short, f.label, ...f.specs.flatMap(s => s.items)].join(' ').toLowerCase().includes(t));
  }, [q]);
  useEffect(() => {
    const off = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', off);
    return () => document.removeEventListener('mousedown', off);
  }, []);
  const go = (slug: string) => { setOpen(false); setQ(''); router.push(`/products#${slug}`); };
  return (
    <div ref={box} className={`relative ${className}`}>
      <form role="search" onSubmit={e => { e.preventDefault(); if (hits[0]) go(hits[0].slug); }} className="flex h-12 items-center gap-3 rounded-full border border-white/15 bg-white/[.04] px-5 transition-colors focus-within:border-white/35 hover:border-white/25">
        <Search size={18} strokeWidth={1.75} className="shrink-0 text-white/60" aria-hidden="true" />
        <label htmlFor={id} className="sr-only">Search packaging</label>
        <input id={id} value={q} onChange={e => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }} placeholder="Search cartons, boxes, bags or labels" autoComplete="off" className="w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/50" />
      </form>
      {open && (
        <ul className="absolute inset-x-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-line bg-white py-2 text-ink shadow-lift">
          {hits.length ? hits.map(f => (
            <li key={f.slug}>
              <button type="button" onClick={() => go(f.slug)} className="flex w-full items-center justify-between gap-4 px-5 py-2.5 text-left hover:bg-mist">
                <span><span className="block text-[15px] font-semibold">{f.name}</span><span className="block text-[13px] text-muted">{f.short}</span></span>
                <ArrowRight size={16} strokeWidth={1.75} className="shrink-0 text-muted" />
              </button>
            </li>
          )) : <li className="px-5 py-3 text-[14px] text-muted">No match. <Link href="/contact" className="font-semibold text-brand">Ask us about it</Link>.</li>}
        </ul>
      )}
    </div>
  );
}

export function Header() {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [hash, setHash] = useState('');
  const quote = quoteLink();

  useEffect(() => { setMenu(false); setHash(window.location.hash); }, [path]);
  useEffect(() => {
    const f = () => setHash(window.location.hash);
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, []);
  // Once the top row has scrolled away, the menu bar turns white.
  useEffect(() => {
    const f = () => setStuck(window.scrollY > 88);
    f(); window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  useEffect(() => { document.documentElement.style.overflow = menu ? 'hidden' : ''; return () => { document.documentElement.style.overflow = ''; }; }, [menu]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  const active = (href: string) => {
    if (href.includes('#')) { const [p, h] = href.split('#'); return (path === (p || '/')) && hash === `#${h}`; }
    if (href === '/') return path === '/' && hash !== '#why';
    return path === href || path.startsWith(`${href}/`);
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white">Skip to content</a>

      <header className="site-header sticky top-0 z-50 border-b border-white/10 bg-[#0E1440] text-white lg:relative lg:top-auto">
        <div className="container-x flex h-[76px] items-center gap-6 sm:h-[88px] lg:gap-10">
          <Logo light />
          <ProductSearch id="site-search" className="mx-auto hidden w-full max-w-[520px] md:block" />
          <div className="ml-auto flex shrink-0 items-center gap-3 md:ml-0">
            <Link href="/contact" className="btn-outline-light btn-sm hidden xl:inline-flex">Contact us</Link>
            <a href={quote} target="_blank" rel="noopener noreferrer" className="btn btn-sm hidden bg-rule text-white hover:bg-[#1793C6] sm:inline-flex">Request a quote <ArrowRight size={16} strokeWidth={1.75} /></a>
            <button className="grid h-10 w-10 place-items-center rounded-lg text-white hover:bg-white/10 lg:hidden" onClick={() => setMenu(v => !v)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>{menu ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}</button>
          </div>
        </div>
      </header>
      <nav aria-label="Primary" className={`sticky top-0 z-50 hidden border-b transition-[background-color,box-shadow,border-color] duration-200 lg:block ${stuck ? 'border-line bg-white shadow-[0_8px_24px_rgba(20,27,77,.08)]' : 'border-white/10 bg-[#0E1440]'}`}>
        <ul className="container-x flex h-14 items-center justify-center gap-10">
          {NAV.map(n => {
            const on = active(n.href);
            const tone = stuck ? (on ? 'text-ink' : 'text-ink-soft hover:text-ink') : (on ? 'text-white' : 'text-white/70 hover:text-white');
            return (
              <li key={n.href} className="h-full">
                <Link href={n.href} onClick={() => setHash(n.href.includes('#') ? `#${n.href.split('#')[1]}` : '')} aria-current={on ? 'page' : undefined} className={`relative flex h-full items-center text-[15px] font-medium transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:rounded-t-full after:bg-rule after:transition-transform after:duration-200 ${tone} ${on ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}>{n.text}</Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {menu && (
        <div className="fixed inset-0 top-[76px] z-40 overflow-y-auto bg-white sm:top-[88px] lg:hidden">
          <nav aria-label="Mobile" className="container-x flex min-h-full flex-col py-4">
            <div className="rounded-[28px] bg-navy p-1 md:hidden"><ProductSearch id="mobile-search" /></div>
            {NAV.map(n => (
              <Link key={n.href} href={n.href} className="flex items-center justify-between border-b border-line py-4 text-[20px] font-medium">{n.text} <ArrowRight size={18} strokeWidth={1.5} className="text-muted" /></Link>
            ))}
            <div className="mt-auto grid gap-3 pt-8">
              <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-primary"><WhatsAppIcon size={18} /> Request a quote on WhatsApp</a>
              <a href={emailLink()} className="btn-outline"><Mail size={18} strokeWidth={1.5} /> Email your brief</a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
