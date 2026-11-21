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
        <input id={id} value={q} onChange={e => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }} placeholder="Search boxes, cartons or labels" autoComplete="off" className="w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/50" />
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
  // Once the top row has scrolled away, the menu bar picks up the logo and a quote button.
  useEffect(() => {
    const f = () => setStuck(window.scrollY > 88);
    f(); window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  // Lock the page behind the open menu and hide the floating WhatsApp button so it can't cover the menu's own buttons.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('menu-open', menu);
    return () => root.classList.remove('menu-open');
  }, [menu]);
  // Close the menu if the screen grows past the mobile breakpoint (e.g. rotating a tablet).
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const f = () => { if (mq.matches) setMenu(false); };
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);
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
          <Logo light priority />
          <ProductSearch id="site-search" className="mx-auto hidden w-full max-w-[520px] md:block" />
          <div className="ml-auto flex shrink-0 items-center gap-3 md:ml-0">
            <Link href="/contact" className="btn-outline-light btn-sm hidden xl:inline-flex">Contact us</Link>
            <a href={quote} target="_blank" rel="noopener noreferrer" className="btn btn-sm hidden bg-rule text-white hover:bg-[#1793C6] sm:inline-flex">Request a quote <ArrowRight size={16} strokeWidth={1.75} /></a>
            <button className="-mr-2 grid h-11 w-11 place-items-center rounded-lg text-white hover:bg-white/10 lg:hidden" onClick={() => setMenu(v => !v)} aria-label="Open menu" aria-expanded={menu} aria-controls="mobile-menu"><Menu size={24} strokeWidth={1.5} /></button>
          </div>
        </div>
      </header>
      <nav aria-label="Primary" className={`sticky top-0 z-50 hidden border-b border-white/10 bg-[#0E1440] transition-shadow duration-200 lg:block ${stuck ? 'shadow-[0_8px_24px_rgba(8,12,40,.35)]' : ''}`}>
        <div className="container-x grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-6">
          <div className={`transition-[opacity,transform] duration-200 ${stuck ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'}`} aria-hidden={!stuck}>
            <Logo light tabIndex={stuck ? undefined : -1} imgClassName="h-8 w-auto" />
          </div>
          <ul className={`flex h-full items-center justify-center ${stuck ? 'gap-6 xl:gap-9' : 'gap-10'}`}>
            {NAV.map(n => {
              const on = active(n.href);
              const tone = on ? 'text-white' : 'text-white/70 hover:text-white';
              return (
                <li key={n.href} className="h-full">
                  <Link href={n.href} onClick={() => setHash(n.href.includes('#') ? `#${n.href.split('#')[1]}` : '')} aria-current={on ? 'page' : undefined} className={`relative flex h-full items-center whitespace-nowrap text-[15px] font-medium transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:rounded-t-full after:bg-rule after:transition-transform after:duration-200 ${tone} ${on ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}>{n.text}</Link>
                </li>
              );
            })}
          </ul>
          <div className={`flex justify-end transition-opacity duration-200 ${stuck ? 'opacity-100' : 'pointer-events-none opacity-0'}`} aria-hidden={!stuck}>
            <a href={quote} target="_blank" rel="noopener noreferrer" tabIndex={stuck ? undefined : -1} className="btn btn-sm hidden bg-rule text-white hover:bg-[#1793C6] xl:inline-flex">Request a quote <ArrowRight size={16} strokeWidth={1.75} /></a>
          </div>
        </div>
      </nav>

      {menu && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu" className="menu-sheet fixed inset-0 z-[80] flex flex-col bg-white lg:hidden">
          <div className="shrink-0 bg-[#0E1440] text-white">
            <div className="container-x flex h-[76px] items-center justify-between sm:h-[88px]">
              <Logo light />
              <button className="grid h-11 w-11 place-items-center rounded-lg text-white hover:bg-white/10" onClick={() => setMenu(false)} aria-label="Close menu"><X size={24} strokeWidth={1.5} /></button>
            </div>
            <div className="container-x pb-5 md:hidden"><ProductSearch id="mobile-search" /></div>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain">
            <ul className="container-x py-2">
              {NAV.map(n => {
                const on = active(n.href);
                return (
                  <li key={n.href} className="border-b border-line last:border-b-0">
                    <Link href={n.href} onClick={() => setMenu(false)} aria-current={on ? 'page' : undefined} className={`flex min-h-[56px] items-center justify-between gap-4 text-[17px] font-semibold ${on ? 'text-brand' : 'text-ink'}`}>
                      <span className="flex items-center gap-3">{on && <span className="h-5 w-[3px] rounded-full bg-rule" aria-hidden="true" />}{n.text}</span>
                      <ArrowRight size={18} strokeWidth={1.5} className={on ? 'text-brand' : 'text-muted'} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="shrink-0 border-t border-line bg-white pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
            <div className="container-x grid gap-3">
              <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-primary w-full"><WhatsAppIcon size={18} /> Request a quote on WhatsApp</a>
              <a href={emailLink()} className="btn-outline w-full"><Mail size={18} strokeWidth={1.5} /> Email your brief</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
