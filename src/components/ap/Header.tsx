'use client';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Clock } from './Clock';

export const NAV = [
  { text: 'Products', href: '/products' },
  { text: 'Industries', href: '/industries' },
  { text: 'Finishes', href: '/finishes' },
  { text: 'How it works', href: '/how-it-works' },
  { text: 'Blog', href: '/blog' },
  { text: 'Offices', href: '/#offices' },
];

/** Top line with both offices' local times, then a frosted header that stays at the top. */
export function Header({ logo }: { logo: string }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  const active = (href: string) => href !== '/#offices' && (path === href || path.startsWith(href + '/'));
  return (
    <>
      <div className="ap border-b border-[#EDEEF1] bg-white px-5 py-2 text-[13px] text-[#5C6272]">
        <div className="ap-wrap flex flex-wrap justify-between gap-2 !px-0">
          <span>Offices in Boston, USA and Lahore, Pakistan</span>
          <span className="hidden sm:inline">Boston <Clock tz="America/New_York" /> · Lahore <Clock tz="Asia/Karachi" /></span>
        </div>
      </div>
      <header className="ap sticky top-0 z-40 border-b border-[#EDEEF1] bg-white/[.88] backdrop-blur-xl">
        <div className="ap-wrap flex h-[76px] items-center gap-8">
          <Link href="/" aria-label="ALL PACK home" className="shrink-0"><img src={logo} alt="ALL PACK — The Packaging Experts" width={150} height={46} className="h-9 w-auto" /></Link>
          <nav aria-label="Main" className="hidden flex-1 items-center gap-7 lg:flex">
            {NAV.map(n => (
              <Link key={n.href} href={n.href} className={`ap-ul text-[15px] font-semibold ${active(n.href) ? 'text-[#2B43F0]' : ''}`}>{n.text}</Link>
            ))}
          </nav>
          <div className="ml-auto hidden items-center gap-6 lg:flex">
            <Link href="/contact" className={`ap-ul text-[15px] font-semibold ${active('/contact') ? 'text-[#2B43F0]' : ''}`}>Contact</Link>
            <Link href="/contact" className="ap-btn ap-dark !min-h-[44px] !rounded-full !px-5 text-[14px]">Get a quote</Link>
          </div>
          <button type="button" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'} className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-[#E0E3EA] lg:hidden">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-[#EDEEF1] bg-white px-5 pb-8 pt-4 lg:hidden">
            <ul className="grid gap-1">
              {[...NAV, { text: 'About', href: '/about' }, { text: 'Contact', href: '/contact' }].map(n => (
                <li key={n.href}><Link href={n.href} className="block rounded-xl px-3 py-3 text-[17px] font-semibold hover:bg-[#F4F5F8]">{n.text}</Link></li>
              ))}
            </ul>
            <Link href="/contact" className="ap-btn ap-blue mt-4 w-full">Get a quote</Link>
          </nav>
        )}
      </header>
    </>
  );
}
