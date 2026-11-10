'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Phone, ShoppingBag, X } from 'lucide-react';
import { categories, categorySlug, products } from '@/lib/products';
import { industries } from '@/data/industries';
import { phoneLink, whatsappLink } from '@/lib/company';
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
  const wa = whatsappLink();

  useEffect(() => { setMenu(false); setPanel(null); }, [path]);
  useEffect(() => { document.documentElement.style.overflow = menu ? 'hidden' : ''; return () => { document.documentElement.style.overflow = ''; }; }, [menu]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setPanel(null); setMenu(false); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  const open = (p: Panel) => { clearTimeout(timer.current); setPanel(p); };
  const close = () => { timer.current = setTimeout(() => setPanel(null), 140); };
  const navCls = (on: boolean) => `relative flex h-9 items-center gap-1 px-4 text-[15px] font-medium transition-colors after:absolute after:-bottom-3 after:left-4 after:right-4 after:h-0.5 after:rounded-full after:bg-brand after:transition-opacity ${on ? 'text-white after:opacity-100' : 'text-white/70 after:opacity-0 hover:text-white'}`;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white">Skip to content</a>

      <header className="site-header sticky top-0 z-50 border-b border-white/10 bg-ink/95 text-white backdrop-blur" onMouseLeave={close}>
        <div className="container-x flex h-[84px] items-center gap-6">
          <Logo light />
          <nav aria-label="Primary" className="mx-auto hidden items-center lg:flex">
            {[
              { kind: 'link' as const, text: 'Home', href: '/' },
              { kind: 'panel' as const, text: 'Shop', panel: 'products' as Panel, on: path.startsWith('/products') },
              { kind: 'panel' as const, text: 'Industries', panel: 'industries' as Panel, on: path.startsWith('/industries') },
              ...links.map(l => ({ kind: 'link' as const, ...l })),
            ].map((item, i) => (
              <span key={item.text} className={`flex items-center ${i ? 'border-l border-white/15' : ''}`}>
                {item.kind === 'panel' ? (
                  <Link href={item.panel === 'products' ? '/products' : '/industries'} className={navCls(!!item.on || panel === item.panel)} aria-haspopup="true" aria-expanded={panel === item.panel} onMouseEnter={() => open(item.panel)} onFocus={() => open(item.panel)}>{item.text} <ChevronDown size={14} className="opacity-70" /></Link>
                ) : (
                  <Link href={item.href} onMouseEnter={() => setPanel(null)} className={navCls(path === item.href)}>{item.text}</Link>
                )}
              </span>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
            <button type="button" onClick={inquiry.open} className="relative grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white hover:border-white/50" aria-label={`Open quote list (${inquiry.items.length} items)`}>
              <ShoppingBag size={18} />
              {inquiry.items.length > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-cyan px-1 text-[10px] font-bold text-ink">{inquiry.items.length}</span>}
            </button>
            <Link href="/quote" className="group hidden items-center gap-3 rounded-full border border-brand bg-brand/15 py-1.5 pl-5 pr-1.5 text-[15px] font-semibold text-white transition hover:bg-brand/30 sm:inline-flex">
              Get a free quote
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand transition-transform group-hover:translate-x-0.5"><ArrowRight size={17} /></span>
            </Link>
            <button className="grid h-11 w-11 place-items-center rounded-full border border-white/15 lg:hidden" onClick={() => setMenu(v => !v)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>{menu ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>

        <AnimatePresence>
          {panel && (
            <motion.div key={panel} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: .18 }} onMouseEnter={() => open(panel)} onMouseLeave={close} className="absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-lift lg:block">
              {panel === 'products' ? (
                <div className="container-x grid grid-cols-[1fr_260px] gap-10 py-9">
                  <div className="grid grid-cols-4 gap-x-8 gap-y-7">
                    {categories.map(cat => (
                      <div key={cat}>
                        <Link href={`/products?category=${categorySlug(cat)}`} className="text-[12.5px] font-semibold uppercase tracking-[.1em] text-ink hover:text-brand">{cat}</Link>
                        <ul className="mt-2.5 space-y-1.5">
                          {products.filter(p => p.category === cat).map(p => <li key={p.slug}><Link href={`/products/${p.slug}`} className="text-[14px] text-muted hover:text-brand">{p.name}</Link></li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Link href="/products" className="group flex flex-col justify-end rounded-xl bg-ink p-6 text-white">
                    <span className="text-[12px] font-bold uppercase tracking-[.16em] text-cyan">Catalogue</span>
                    <span className="mt-2 text-xl font-semibold leading-tight">See all {products.length} packaging formats</span>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-cream/80 group-hover:text-white">Browse <ArrowRight size={14} /></span>
                  </Link>
                </div>
              ) : (
                <div className="container-x grid grid-cols-3 gap-x-6 gap-y-1 py-9">
                  {industries.map(ind => (
                    <Link key={ind.slug} href={`/industries/${ind.slug}`} className="group rounded-xl p-3 hover:bg-paper-deep">
                      <span className="block text-[15px] font-bold leading-tight group-hover:text-brand">{ind.name}</span>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 top-[84px] z-40 overflow-y-auto bg-white lg:hidden" data-lenis-prevent>
            <nav aria-label="Mobile" className="container-x flex min-h-full flex-col py-5">
              {[{ text: 'Shop all products', href: '/products' }, { text: 'Industries', href: '/industries' }, ...links, { text: 'FAQ', href: '/faq' }].map(n => (
                <Link key={n.href + n.text} href={n.href} className="flex items-center justify-between border-b border-line py-4 text-xl font-bold">{n.text} <ArrowUpRight size={20} className="text-brand" /></Link>
              ))}
              <div className="mt-auto grid gap-3 pt-8">
                <Link href="/quote" className="btn-dark">Request a free quote <ArrowRight size={16} /></Link>
                <div className="grid grid-cols-2 gap-3">
                  {call && <a href={call} className="btn-light"><Phone size={16} /> Call</a>}
                  <a href={wa || '#'} target="_blank" rel="noopener noreferrer" className="btn-light"><WhatsAppIcon size={16} /> WhatsApp</a>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
