'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Mail, Menu, Phone, ShoppingBag, X } from 'lucide-react';
import { categories, categorySlug, products } from '@/lib/products';
import { industries } from '@/data/industries';
import { COMPANY, emailLink, phoneLink, quoteLink } from '@/lib/company';
import { useInquiry } from './Providers';
import { Logo } from './Logo';
import { WhatsAppIcon } from './FloatingContact';

type Panel = 'products' | 'industries' | null;
const links = [
  { text: 'Gallery', href: '/gallery' },
  { text: 'Guides', href: '/insights' },
  { text: 'About', href: '/about' },
  { text: 'Contact', href: '/contact' },
];

export function Header() {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const inquiry = useInquiry();
  const call = phoneLink();
  const quote = quoteLink();

  useEffect(() => { setMenu(false); setPanel(null); }, [path]);
  useEffect(() => { document.documentElement.style.overflow = menu ? 'hidden' : ''; return () => { document.documentElement.style.overflow = ''; }; }, [menu]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setPanel(null); setMenu(false); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  const open = (p: Panel) => { clearTimeout(timer.current); setPanel(p); };
  const close = () => { timer.current = setTimeout(() => setPanel(null), 140); };
  const navCls = (on: boolean) => `flex h-9 items-center gap-1 rounded-lg px-3 text-[15px] transition-colors ${on ? 'bg-soft text-ink' : 'text-secondary hover:bg-soft hover:text-ink'}`;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white">Skip to content</a>

      <div className="hidden border-b border-line bg-mist text-[11px] uppercase tracking-[.24em] text-secondary lg:block">
        <div className="container-x flex h-9 items-center justify-between">
          <span>More than 25 years of packaging experience</span>
          <span className="flex items-center gap-6 normal-case tracking-normal text-[13px]">
            {call && <a href={call} className="font-mono tabular-nums hover:text-brand">{COMPANY.phone}</a>}
            <a href={emailLink()} className="hover:text-brand">{COMPANY.email}</a>
          </span>
        </div>
      </div>

      <header className="site-header sticky top-0 z-50 border-b border-line bg-white/95 text-ink backdrop-blur" onMouseLeave={close}>
        <div className="container-x flex h-[72px] items-center gap-6">
          <Logo />
          <nav aria-label="Primary" className="mx-auto hidden items-center gap-1 lg:flex">
            {[
              { kind: 'link' as const, text: 'Home', href: '/' },
              { kind: 'panel' as const, text: 'Shop', panel: 'products' as Panel, on: path.startsWith('/products') },
              { kind: 'panel' as const, text: 'Industries', panel: 'industries' as Panel, on: path.startsWith('/industries') },
              ...links.map(l => ({ kind: 'link' as const, ...l })),
            ].map(item => (
              <span key={item.text} className="flex items-center">
                {item.kind === 'panel' ? (
                  <Link href={item.panel === 'products' ? '/products' : '/industries'} className={navCls(!!item.on || panel === item.panel)} aria-haspopup="true" aria-expanded={panel === item.panel} onMouseEnter={() => open(item.panel)} onFocus={() => open(item.panel)}>{item.text} <ChevronDown size={16} strokeWidth={1.5} className="text-muted" /></Link>
                ) : (
                  <Link href={item.href} onMouseEnter={() => setPanel(null)} className={navCls(path === item.href)}>{item.text}</Link>
                )}
              </span>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <button type="button" onClick={inquiry.open} className="flex h-9 items-center gap-2 rounded-lg px-3 text-secondary transition-colors hover:bg-soft hover:text-ink" aria-label={`Open quote list (${inquiry.items.length} items)`}>
              <ShoppingBag size={18} strokeWidth={1.5} />
              {inquiry.items.length > 0 && <span className="font-mono text-[12px] tabular-nums text-ink">{inquiry.items.length}</span>}
            </button>
            <a href={quote} target="_blank" rel="noopener noreferrer" className="hidden h-10 items-center gap-2 rounded-full bg-brand px-5 text-[14px] font-medium text-white transition-colors hover:bg-brand-dark sm:inline-flex">Request a quote <ArrowRight size={16} strokeWidth={1.75} /></a>
            <button className="grid h-9 w-9 place-items-center rounded-lg text-ink hover:bg-soft lg:hidden" onClick={() => setMenu(v => !v)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>{menu ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}</button>
          </div>
        </div>

        <AnimatePresence>
          {panel && (
            <motion.div key={panel} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: .18, ease: [.22, 1, .36, 1] }} onMouseEnter={() => open(panel)} onMouseLeave={close} className="absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-lift lg:block">
              {panel === 'products' ? (
                <div className="container-x grid grid-cols-[1fr_256px] gap-10 py-8">
                  <div className="grid grid-cols-4 gap-x-8 gap-y-8">
                    {categories.map(cat => (
                      <div key={cat}>
                        <Link href={`/products?category=${categorySlug(cat)}`} className="text-[14px] font-medium text-ink hover:text-brand">{cat}</Link>
                        <ul className="mt-3 space-y-2">
                          {products.filter(p => p.category === cat).map(p => <li key={p.slug}><Link href={`/products/${p.slug}`} className="text-[14px] text-secondary hover:text-brand">{p.name}</Link></li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Link href="/products" className="group flex flex-col justify-end rounded-xl bg-mist p-6 text-ink transition-colors hover:bg-soft">
                    <span className="meta">Catalogue</span>
                    <span className="mt-2 text-xl font-medium leading-tight">See all {products.length} packaging formats</span>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-secondary group-hover:text-brand">Browse <ArrowRight size={16} strokeWidth={1.5} /></span>
                  </Link>
                </div>
              ) : (
                <div className="container-x grid grid-cols-3 gap-x-6 gap-y-1 py-8">
                  {industries.map(ind => (
                    <Link key={ind.slug} href={`/industries/${ind.slug}`} className="group rounded-lg p-3 transition-colors hover:bg-mist">
                      <span className="block text-[15px] font-medium leading-tight">{ind.name}</span>
                      <span className="mt-1 line-clamp-1 block text-[13px] text-muted">{ind.short}</span>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 top-[72px] z-40 overflow-y-auto bg-white lg:hidden" data-lenis-prevent>
            <nav aria-label="Mobile" className="container-x flex min-h-full flex-col py-5">
              {[{ text: 'Shop all products', href: '/products' }, { text: 'Industries', href: '/industries' }, ...links, { text: 'FAQ', href: '/faq' }].map(n => (
                <Link key={n.href + n.text} href={n.href} className="flex items-center justify-between border-b border-line py-4 text-xl font-medium">{n.text} <ArrowRight size={18} strokeWidth={1.5} className="text-muted" /></Link>
              ))}
              <div className="mt-auto grid gap-3 pt-8">
                <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-dark"><WhatsAppIcon size={18} /> Get a quote on WhatsApp</a>
                <div className="grid grid-cols-2 gap-3">
                  {call && <a href={call} className="btn-light"><Phone size={18} strokeWidth={1.5} /> Call</a>}
                  <a href={emailLink()} className="btn-light"><Mail size={18} strokeWidth={1.5} /> Email</a>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
