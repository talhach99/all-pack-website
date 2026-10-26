'use client';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, Mail, Menu, Phone, ShoppingBag, X } from 'lucide-react';
import { categories, categoryCover, categorySlug, photo, products } from '@/lib/products';
import { industries } from '@/data/industries';
import { COMPANY, phoneLink, whatsappLink } from '@/lib/company';
import { useInquiry } from './Providers';
import { Logo } from './Logo';
import { WhatsAppIcon } from './FloatingContact';

type Panel = 'products' | 'industries' | null;
const links = [
  { text: '3D Studio', href: '/studio' },
  { text: 'Gallery', href: '/gallery' },
  { text: 'About', href: '/about' },
  { text: 'Contact', href: '/contact' },
];

export function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const inquiry = useInquiry();
  const call = phoneLink();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f(); window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  useEffect(() => { setMenu(false); setPanel(null); }, [path]);
  useEffect(() => {
    document.documentElement.style.overflow = menu ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [menu]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setPanel(null); setMenu(false); } };
    document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey);
  }, []);

  const open = (p: Panel) => { clearTimeout(timer.current); setPanel(p); };
  const close = () => { timer.current = setTimeout(() => setPanel(null), 140); };
  const active = (href: string) => path.startsWith(href);
  const navCls = (on: boolean) => `relative flex items-center gap-1 px-3 py-2 text-[14.5px] font-medium transition-colors ${on ? 'text-ink' : 'text-ink/70 hover:text-ink'}`;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-cream">Skip to content</a>

      {/* utility bar */}
      <div className="relative z-[51] hidden bg-ink text-[12.5px] text-cream/75 md:block">
        <div className="container-x flex h-10 items-center justify-between gap-6">
          <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brass-light" aria-hidden="true" />Custom packaging &amp; printing, made to order in Lahore. Free, no-obligation quotes.</p>
          <div className="flex items-center gap-6">
            {call && <a href={call} className="inline-flex items-center gap-1.5 hover:text-cream"><Phone size={13} /> {COMPANY.phone}</a>}
            <a href={whatsappLink() || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-cream"><WhatsAppIcon size={13} /> WhatsApp</a>
            <a href={`mailto:${COMPANY.email}`} className="hidden items-center gap-1.5 hover:text-cream lg:inline-flex"><Mail size={13} /> {COMPANY.email}</a>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 border-b transition-[background,box-shadow] duration-500 ${scrolled || panel || menu ? 'border-line bg-paper/95 shadow-[0_10px_30px_-24px_rgba(13,18,32,.35)] backdrop-blur-xl' : 'border-transparent bg-paper'}`} onMouseLeave={close}>
        <div className="container-x flex h-[76px] items-center justify-between gap-6">
          <Logo />
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            <button type="button" className={navCls(active('/products') || panel === 'products')} aria-expanded={panel === 'products'} onMouseEnter={() => open('products')} onFocus={() => open('products')} onClick={() => setPanel(p => (p === 'products' ? null : 'products'))}>
              Products <ChevronDown size={14} className={`transition-transform ${panel === 'products' ? 'rotate-180' : ''}`} />
            </button>
            <button type="button" className={navCls(active('/industries') || panel === 'industries')} aria-expanded={panel === 'industries'} onMouseEnter={() => open('industries')} onFocus={() => open('industries')} onClick={() => setPanel(p => (p === 'industries' ? null : 'industries'))}>
              Industries <ChevronDown size={14} className={`transition-transform ${panel === 'industries' ? 'rotate-180' : ''}`} />
            </button>
            {links.map(x => <Link key={x.href} href={x.href} onMouseEnter={() => setPanel(null)} className={navCls(active(x.href))}>{x.text}</Link>)}
          </nav>
          <div className="flex items-center gap-1.5">
            <button type="button" onClick={inquiry.open} className="relative grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-paper-deep" aria-label={`Open quote list (${inquiry.items.length} items)`}>
              <ShoppingBag size={20} />
              {inquiry.items.length > 0 && <span className="absolute right-1 top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brass px-1 text-[10px] font-bold text-ink">{inquiry.items.length}</span>}
            </button>
            <Link href="/quote" className="btn-dark btn-sm ml-1 hidden !min-h-11 !px-5 sm:inline-flex">Request a quote <ArrowRight size={15} /></Link>
            <button className="grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden" onClick={() => setMenu(v => !v)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>
              {menu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {panel && (
            <motion.div
              key={panel} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .22 }}
              onMouseEnter={() => open(panel)} onMouseLeave={close}
              className="absolute inset-x-0 top-full hidden border-b border-line bg-paper shadow-lift lg:block"
            >
              {panel === 'products' ? (
                <div className="container-x grid grid-cols-[1fr_300px] gap-10 py-8">
                  <div className="grid grid-cols-4 gap-x-4 gap-y-6">
                    {categories.map(cat => (
                      <Link key={cat} href={`/products?category=${categorySlug(cat)}`} className="group">
                        <div className="mb-3 aspect-[5/4] overflow-hidden rounded-xl bg-paper-deep">
                          <img src={photo(categoryCover[cat], true)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <p className="font-display text-[15.5px] leading-tight group-hover:text-brass-dark">{cat}</p>
                        <p className="mt-0.5 text-xs text-muted">{products.filter(p => p.category === cat).length} products</p>
                      </Link>
                    ))}
                    <Link href="/products" className="group flex flex-col justify-between rounded-xl bg-ink p-5 text-cream">
                      <p className="text-sm text-cream/60">The full catalogue</p>
                      <p className="font-display text-2xl leading-tight">All {products.length} products <ArrowRight className="mt-2 transition-transform group-hover:translate-x-1" size={20} /></p>
                    </Link>
                  </div>
                  <MegaAside />
                </div>
              ) : (
                <div className="container-x grid grid-cols-[1fr_300px] gap-10 py-8">
                  <div className="grid grid-cols-3 gap-x-8 gap-y-1">
                    {industries.map(ind => (
                      <Link key={ind.slug} href={`/industries/${ind.slug}`} className="group flex items-center gap-4 rounded-xl p-2.5 transition-colors hover:bg-paper-deep">
                        <span className="h-14 w-[70px] shrink-0 overflow-hidden rounded-lg bg-paper-deep"><img src={photo(ind.image, true)} alt="" loading="lazy" className="h-full w-full object-cover" /></span>
                        <span><span className="block font-display text-[15.5px] leading-tight">{ind.name}</span><span className="mt-0.5 line-clamp-1 block text-xs text-muted">{ind.short}</span></span>
                      </Link>
                    ))}
                  </div>
                  <MegaAside />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 top-[76px] z-40 overflow-y-auto bg-ink text-cream lg:hidden" data-lenis-prevent>
            <nav aria-label="Mobile" className="container-x flex min-h-full flex-col py-6">
              {[{ text: 'Products', href: '/products' }, { text: 'Industries', href: '/industries' }, ...links, { text: 'FAQ', href: '/faq' }].map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .03 * i }}>
                  <Link href={n.href} className="flex items-center justify-between border-b border-cream/10 py-4 font-display text-[2rem] font-light">{n.text} <ArrowUpRight size={22} className="text-brass-light" /></Link>
                </motion.div>
              ))}
              <div className="mt-auto grid gap-3 pt-8">
                <Link href="/quote" className="btn-white">Request a free quote <ArrowRight size={16} /></Link>
                <div className="grid grid-cols-2 gap-3">
                  {call && <a href={call} className="btn-outline-light"><Phone size={16} /> Call</a>}
                  <a href={whatsappLink() || '#'} target="_blank" rel="noopener noreferrer" className="btn-outline-light"><WhatsAppIcon size={16} /> WhatsApp</a>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MegaAside() {
  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-ink-soft p-6 text-cream">
      <img src={photo('fin_foil', true)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" loading="lazy" />
      <div className="relative">
        <p className="kicker !text-brass-light">Not sure what you need?</p>
        <p className="mt-3 font-display text-2xl leading-tight">Send a photo and rough size. We&apos;ll recommend the right pack.</p>
      </div>
      <div className="relative mt-6 flex flex-wrap gap-2">
        <Link href="/quote" className="btn-white btn-sm">Get a quote <ArrowRight size={15} /></Link>
        <Link href="/studio" className="btn-sm btn border border-cream/25 text-cream hover:border-cream">3D Studio</Link>
      </div>
    </div>
  );
}
