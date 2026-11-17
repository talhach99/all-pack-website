'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, Mail, Menu, Phone, X } from 'lucide-react';
import { COMPANY, emailLink, phoneLink, quoteLink } from '@/lib/company';
import { Logo } from './Logo';
import { WhatsAppIcon } from './FloatingContact';

const NAV = [
  { text: 'Products', href: '/products' },
  { text: 'Industries', href: '/industries' },
  { text: 'About', href: '/about' },
  { text: 'Guides', href: '/insights' },
  { text: 'Contact', href: '/contact' },
];

export function Header() {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const call = phoneLink();
  const quote = quoteLink();

  useEffect(() => { setMenu(false); }, [path]);
  useEffect(() => { document.documentElement.style.overflow = menu ? 'hidden' : ''; return () => { document.documentElement.style.overflow = ''; }; }, [menu]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  const active = (href: string) => path === href || path.startsWith(`${href}/`);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white">Skip to content</a>

      <div className="hidden border-b border-white/[.06] bg-[#0A0F33] text-[12.5px] tracking-[.01em] text-[#9AA5CC] md:block">
        <div className="container-x flex h-9 items-center justify-between">
          <span>Printing and packaging in Lahore for over 25 years · ISO 9001 and Halal certified</span>
          <span className="flex items-center gap-5">
            {call && <a href={call} className="flex items-center gap-2 tabular-nums hover:text-white"><Phone size={14} strokeWidth={1.75} /> {COMPANY.phone}</a>}
            <a href={emailLink()} className="flex items-center gap-2 hover:text-white"><Mail size={14} strokeWidth={1.75} /> {COMPANY.email}</a>
          </span>
        </div>
      </div>

      <header className="site-header sticky top-0 z-50 border-b border-white/10 bg-[#0E1440]/95 backdrop-blur-md">
        <div className="container-x flex h-[76px] items-center gap-10 sm:h-[84px]">
          <Logo light />
          <nav aria-label="Primary" className="hidden flex-1 items-center gap-9 lg:flex">
            {NAV.map(n => (
              <Link key={n.href} href={n.href} aria-current={active(n.href) ? 'page' : undefined} className={`relative py-2 text-[14.5px] font-medium tracking-[.01em] transition-colors after:absolute after:inset-x-0 after:-bottom-[2px] after:h-[2px] after:rounded-full after:bg-rule after:transition-transform after:duration-200 ${active(n.href) ? 'text-white after:scale-x-100' : 'text-white/70 after:scale-x-0 hover:text-white hover:after:scale-x-100'}`}>{n.text}</Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-white btn-sm hidden sm:inline-flex">Request a quote <ArrowRight size={16} strokeWidth={1.75} /></a>
            <button className="grid h-10 w-10 place-items-center rounded-lg text-white hover:bg-white/10 lg:hidden" onClick={() => setMenu(v => !v)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>{menu ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}</button>
          </div>
        </div>
      </header>

      {menu && (
        <div className="fixed inset-0 top-[76px] z-40 overflow-y-auto bg-white sm:top-[84px] lg:hidden">
          <nav aria-label="Mobile" className="container-x flex min-h-full flex-col py-4">
            {[{ text: 'Home', href: '/' }, ...NAV, { text: 'FAQ', href: '/faq' }].map(n => (
              <Link key={n.href} href={n.href} className="flex items-center justify-between border-b border-line py-4 text-[20px] font-medium">{n.text} <ArrowRight size={18} strokeWidth={1.5} className="text-muted" /></Link>
            ))}
            <div className="mt-auto grid gap-3 pt-8">
              <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-primary"><WhatsAppIcon size={18} /> Request a quote on WhatsApp</a>
              <div className="grid grid-cols-2 gap-3">
                {call && <a href={call} className="btn-outline"><Phone size={18} strokeWidth={1.5} /> Call</a>}
                <a href={emailLink()} className="btn-outline"><Mail size={18} strokeWidth={1.5} /> Email</a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
