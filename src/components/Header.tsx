'use client';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Phone, ShoppingBag, X } from 'lucide-react';
import { categories, categorySlug, photo, products } from '@/lib/products';
import { industries } from '@/data/industries';
import { COMPANY, phoneLink, whatsappLink } from '@/lib/company';
import { useInquiry } from './Providers';
import { Logo } from './Logo';
import { WhatsAppIcon } from './FloatingContact';
import { ProductSearch } from './ProductSearch';

type Panel = 'products' | 'industries' | null;
const links = [
  { text: 'How it works', href: '/#how-it-works' },
  { text: 'Why ALL PACK', href: '/about' },
  { text: '3D Studio', href: '/studio' },
  { text: 'Gallery', href: '/gallery' },
  { text: 'Contact', href: '/contact' },
];

export function Header() {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const inquiry = useInquiry();
  const call = phoneLink();

  useEffect(() => { setMenu(false); setPanel(null); }, [path]);
  useEffect(() => { document.documentElement.style.overflow = menu ? 'hidden' : ''; return () => { document.documentElement.style.overflow = ''; }; }, [menu]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setPanel(null); setMenu(false); } };
    document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey);
  }, []);
  const open = (p: Panel) => { clearTimeout(timer.current); setPanel(p); };
  const close = () => { timer.current = setTimeout(() => setPanel(null), 140); };
  const navCls = (on: boolean) => `flex h-12 items-center gap-1 border-b-2 px-1 text-[14.5px] font-semibold transition-colors ${on ? 'border-brand text-ink' : 'border-transparent text-ink/75 hover:text-ink'}`;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white">Skip to content</a>

      {/* announcement */}
      <div className="bg-ink text-center text-[12.5px] font-medium text-white/85">
        <div className="container-x flex h-9 items-center justify-center gap-2">Custom printed packaging, made to order in Lahore · <Link href="/quote" className="font-bold text-brass-light hover:underline">Get a free quote →</Link></div>
      </div>

      <header className="sticky top-0 z-50 border-b border-line bg-white" onMouseLeave={close}>
        {/* row 1 */}
        <div className="container-x flex h-[74px] items-center gap-6">
          <Logo />
          <ProductSearch className="hidden max-w-md flex-1 md:block" />
          <div className="ml-auto flex items-center gap-2">
            {call && (
              <a href={call} className="mr-2 hidden text-right leading-tight xl:block">
                <span className="block text-[11.5px] font-semibold text-muted">Call us · Mon–Sat</span>
                <span className="block text-[17px] font-extrabold text-brand">{COMPANY.phone}</span>
              </a>
            )}
            <a href={whatsappLink() || '#'} target="_blank" rel="noopener noreferrer" className="hidden h-11 items-center gap-2 rounded-lg border border-line px-3 text-sm font-semibold hover:border-ink lg:inline-flex"><span className="text-[#1F9D55]"><WhatsAppIcon size={18} /></span> WhatsApp</a>
            <button type="button" onClick={inquiry.open} className="relative grid h-11 w-11 place-items-center rounded-lg border border-line hover:border-ink" aria-label={`Open quote list (${inquiry.items.length} items)`}>
              <ShoppingBag size={19} />
              {inquiry.items.length > 0 && <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">{inquiry.items.length}</span>}
            </button>
            <Link href="/quote" className="btn-dark btn-sm hidden !min-h-11 !px-5 sm:inline-flex">Request a Quote</Link>
            <button className="grid h-11 w-11 place-items-center rounded-lg border border-line lg:hidden" onClick={() => setMenu(v => !v)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>{menu ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
        {/* row 2 */}
        <nav aria-label="Primary" className="hidden border-t border-line lg:block">
          <div className="container-x flex items-center gap-8">
            <button type="button" className={navCls(path.startsWith('/products') || panel === 'products')} aria-expanded={panel === 'products'} onMouseEnter={() => open('products')} onFocus={() => open('products')} onClick={() => setPanel(p => (p === 'products' ? null : 'products'))}>Products <ChevronDown size={14} /></button>
            <button type="button" className={navCls(path.startsWith('/industries') || panel === 'industries')} aria-expanded={panel === 'industries'} onMouseEnter={() => open('industries')} onFocus={() => open('industries')} onClick={() => setPanel(p => (p === 'industries' ? null : 'industries'))}>Industries <ChevronDown size={14} /></button>
            {links.map(x => <Link key={x.href} href={x.href} onMouseEnter={() => setPanel(null)} className={navCls(path === x.href)}>{x.text}</Link>)}
            <Link href="/products" className="ml-auto text-[14px] font-bold text-brand hover:underline">Browse all {products.length} products →</Link>
          </div>
        </nav>

        <AnimatePresence>
          {panel && (
            <motion.div key={panel} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: .18 }} onMouseEnter={() => open(panel)} onMouseLeave={close} className="absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-lift lg:block">
              {panel === 'products' ? (
                <div className="container-x grid grid-cols-[1fr_280px] gap-10 py-8">
                  <div className="grid grid-cols-4 gap-x-8 gap-y-7">
                    {categories.map(cat => (
                      <div key={cat}>
                        <Link href={`/products?category=${categorySlug(cat)}`} className="text-[13px] font-extrabold uppercase tracking-[.08em] text-ink hover:text-brand">{cat}</Link>
                        <ul className="mt-2.5 space-y-1.5">
                          {products.filter(p => p.category === cat).map(p => <li key={p.slug}><Link href={`/products/${p.slug}`} className="text-[14px] text-muted hover:text-brand">{p.name}</Link></li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Link href="/products" className="group relative flex flex-col justify-end overflow-hidden rounded-xl p-5 text-white">
                    <img src={photo('hero', false).replace('.webp', '-1200.webp')} alt="" className="absolute inset-0 h-full w-full object-cover object-[70%]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-ink/0" />
                    <p className="relative text-lg font-extrabold leading-tight">View the full catalogue</p>
                    <p className="relative mt-1 inline-flex items-center gap-1 text-sm font-semibold text-white/80">{products.length} products <ArrowRight size={14} /></p>
                  </Link>
                </div>
              ) : (
                <div className="container-x grid grid-cols-3 gap-x-6 gap-y-2 py-8">
                  {industries.map(ind => (
                    <Link key={ind.slug} href={`/industries/${ind.slug}`} className="group flex items-center gap-4 rounded-xl p-2.5 hover:bg-paper-deep">
                      <span className="h-14 w-[70px] shrink-0 overflow-hidden rounded-lg bg-paper-deep"><img src={photo(ind.image, true)} alt="" loading="lazy" className="h-full w-full object-cover" /></span>
                      <span><span className="block text-[15px] font-bold leading-tight group-hover:text-brand">{ind.name}</span><span className="mt-0.5 line-clamp-1 block text-xs text-muted">{ind.short}</span></span>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 top-[110px] z-40 overflow-y-auto bg-white lg:hidden" data-lenis-prevent>
            <nav aria-label="Mobile" className="container-x flex min-h-full flex-col py-5">
              <ProductSearch className="mb-4 md:hidden" />
              {[{ text: 'All products', href: '/products' }, { text: 'Industries', href: '/industries' }, ...links, { text: 'FAQ', href: '/faq' }].map(n => (
                <Link key={n.href} href={n.href} className="flex items-center justify-between border-b border-line py-4 text-xl font-bold">{n.text} <ArrowUpRight size={20} className="text-brand" /></Link>
              ))}
              <div className="mt-auto grid gap-3 pt-8">
                <Link href="/quote" className="btn-dark">Request a free quote <ArrowRight size={16} /></Link>
                <div className="grid grid-cols-2 gap-3">
                  {call && <a href={call} className="btn-light"><Phone size={16} /> Call</a>}
                  <a href={whatsappLink() || '#'} target="_blank" rel="noopener noreferrer" className="btn-light"><WhatsAppIcon size={16} /> WhatsApp</a>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
