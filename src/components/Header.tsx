'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Phone, ShoppingBag, X } from 'lucide-react';
import { categories, categoryCover, categorySlug, products } from '@/lib/products';
import { COMPANY, phoneLink, whatsappLink } from '@/lib/company';
import { useInquiry } from './Providers';
import { Logo } from './Logo';

const nav = [
  { text: 'Studio', href: '/studio' },
  { text: 'Gallery', href: '/gallery' },
  { text: 'About', href: '/about' },
  { text: 'Insights', href: '/insights' },
  { text: 'Contact', href: '/contact' },
];

export function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mega, setMega] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const inquiry = useInquiry();
  const call = phoneLink();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    f(); window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  useEffect(() => { setMenu(false); setMega(false); }, [path]);
  useEffect(() => {
    document.documentElement.style.overflow = menu ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [menu]);

  const openMega = () => { clearTimeout(closeTimer.current); setMega(true); };
  const closeMega = () => { closeTimer.current = setTimeout(() => setMega(false), 120); };
  const active = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || menu ? 'border-b border-line/70 bg-white/80 backdrop-blur-xl backdrop-saturate-150' : 'border-b border-transparent'}`}>
        <div className={`container-x flex items-center justify-between gap-6 transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
          <Logo />
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            <div className="relative" onMouseEnter={openMega} onMouseLeave={closeMega}>
              <Link
                href="/products" aria-expanded={mega} onFocus={openMega}
                className={`flex items-center gap-1 rounded-full px-4 py-2 text-[14.5px] font-medium transition-colors hover:bg-soft ${active('/products') ? 'text-brand' : 'text-ink/80 hover:text-ink'}`}
              >
                Products <ChevronDown size={14} className={`transition-transform ${mega ? 'rotate-180' : ''}`} />
              </Link>
            </div>
            {nav.map(x => (
              <Link key={x.href} href={x.href} className={`rounded-full px-4 py-2 text-[14.5px] font-medium transition-colors hover:bg-soft ${active(x.href) ? 'text-brand' : 'text-ink/80 hover:text-ink'}`}>{x.text}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-1.5">
            {call && <a href={call} className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-ink/80 hover:bg-soft hover:text-ink xl:inline-flex"><Phone size={16} /> {COMPANY.phone}</a>}
            <button type="button" onClick={inquiry.open} className="relative grid h-11 w-11 place-items-center rounded-full hover:bg-soft" aria-label={`Open quote list (${inquiry.items.length} items)`}>
              <ShoppingBag size={20} />
              {inquiry.items.length > 0 && <span className="absolute right-1 top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">{inquiry.items.length}</span>}
            </button>
            <Link href="/quote" className="btn-dark btn-sm hidden sm:inline-flex">Get a quote <ArrowUpRight size={15} /></Link>
            <button className="grid h-11 w-11 place-items-center rounded-full hover:bg-soft lg:hidden" onClick={() => setMenu(v => !v)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>
              {menu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mega && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }}
              onMouseEnter={openMega} onMouseLeave={closeMega}
              className="absolute inset-x-0 top-full hidden border-b border-line bg-white/95 shadow-lift backdrop-blur-xl lg:block"
            >
              <div className="container-x grid grid-cols-[1fr_300px] gap-10 py-8">
                <div className="grid grid-cols-4 gap-3">
                  {categories.map(cat => (
                    <Link key={cat} href={`/products?category=${categorySlug(cat)}`} className="group rounded-2xl p-2 transition-colors hover:bg-soft">
                      <div className="tile mb-3 aspect-[4/3] overflow-hidden rounded-xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`/renders/${categoryCover[cat]}.webp`} alt="" loading="lazy" className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <p className="px-1 text-sm font-semibold">{cat}</p>
                      <p className="px-1 text-xs text-muted">{products.filter(p => p.category === cat).length} products</p>
                    </Link>
                  ))}
                  <Link href="/products" className="group flex flex-col justify-between rounded-2xl bg-ink p-5 text-white">
                    <p className="text-sm text-white/60">Everything we make</p>
                    <p className="font-display text-2xl font-semibold leading-tight">View all {products.length} products <ArrowRight className="mt-2 transition-transform group-hover:translate-x-1" size={20} /></p>
                  </Link>
                </div>
                <div className="flex flex-col justify-between rounded-3xl bg-mist p-6">
                  <div>
                    <p className="kicker">3D Studio</p>
                    <p className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight">Design your box in 3D, then send it to us.</p>
                  </div>
                  <Link href="/studio" className="btn-brand btn-sm mt-6 self-start">Open the studio <ArrowRight size={15} /></Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 top-16 z-40 overflow-y-auto bg-white lg:hidden" data-lenis-prevent
          >
            <nav aria-label="Mobile" className="container-x flex min-h-full flex-col py-6">
              {[{ text: 'Products', href: '/products' }, ...nav, { text: 'FAQ', href: '/faq' }].map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .03 * i }}>
                  <Link href={n.href} className="flex items-center justify-between border-b border-line py-4 font-display text-3xl font-semibold tracking-tight">
                    {n.text} <ArrowUpRight size={22} className="text-muted" />
                  </Link>
                </motion.div>
              ))}
              <div className="mt-auto grid gap-3 pt-8">
                <Link href="/quote" className="btn-dark">Get a free quote <ArrowRight size={16} /></Link>
                <div className="grid grid-cols-2 gap-3">
                  {call && <a href={call} className="btn-light"><Phone size={16} /> Call</a>}
                  <a href={whatsappLink() || '#'} target="_blank" rel="noopener noreferrer" className="btn-light">WhatsApp</a>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
