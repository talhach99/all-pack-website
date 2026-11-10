'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Mail, ShoppingBag, Trash2, X } from 'lucide-react';
import { emailLink, quoteLink } from '@/lib/company';
import { productThumb, products } from '@/lib/products';

type Inquiry = { items: string[]; add: (slug: string, openDrawer?: boolean) => void; remove: (slug: string) => void; clear: () => void; open: () => void; has: (slug: string) => boolean };
const InquiryContext = createContext<Inquiry | null>(null);
export function useInquiry() {
  const v = useContext(InquiryContext);
  if (!v) throw new Error('Inquiry provider unavailable');
  return v;
}
const KEY = 'allpack-inquiry-v2';

/** The quote list travels as a plain message to WhatsApp or email. */
function listMessage(slugs: string[]): string {
  const names = slugs.map(s => products.find(p => p.slug === s)?.name).filter(Boolean);
  return `Hello ALL PACK, I would like a quotation for:\n${names.map(n => `- ${n}`).join('\n')}\n\nQuantity and size: `;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [drawer, setDrawer] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '[]');
      if (Array.isArray(saved)) setItems(saved.filter((x): x is string => typeof x === 'string' && products.some(p => p.slug === x)).slice(0, 30));
    } catch { /* storage unavailable */ }
    setHydrated(true);
  }, []);
  useEffect(() => { if (hydrated) try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore */ } }, [items, hydrated]);

  useEffect(() => { setDrawer(false); }, [pathname]);
  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrawer(false); };
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.documentElement.style.overflow = ''; };
  }, [drawer]);

  const add = useCallback((slug: string, openDrawer = true) => { setItems(v => (v.includes(slug) ? v : [...v, slug])); if (openDrawer) setDrawer(true); }, []);
  const remove = useCallback((slug: string) => setItems(v => v.filter(s => s !== slug)), []);
  const clear = useCallback(() => setItems([]), []);
  const value = useMemo<Inquiry>(() => ({ items, add, remove, clear, open: () => setDrawer(true), has: (s: string) => items.includes(s) }), [items, add, remove, clear]);

  return (
    <InquiryContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div className="fixed inset-0 z-[90] bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)} aria-hidden="true" />
            <motion.aside
              role="dialog" aria-modal="true" aria-label="Your quote list" data-lenis-prevent
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: .3, ease: [.22, 1, .36, 1] }}
              className="fixed inset-y-0 right-0 z-[91] flex w-full max-w-[440px] flex-col bg-white shadow-lift"
            >
              <div className="flex items-center justify-between border-b border-line px-6 py-5">
                <div>
                  <p className="text-[13px] text-muted">Your quote list</p>
                  <h2 className="mt-1 text-2xl font-medium">{items.length} {items.length === 1 ? 'product' : 'products'}</h2>
                </div>
                <button className="grid h-9 w-9 place-items-center rounded-lg text-secondary hover:bg-soft hover:text-ink" onClick={() => setDrawer(false)} aria-label="Close quote list"><X size={20} strokeWidth={1.5} /></button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-5">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                    <ShoppingBag size={24} strokeWidth={1.5} className="text-muted" />
                    <h3 className="text-xl font-medium">Nothing here yet</h3>
                    <p className="max-w-xs text-sm text-muted">Add the products you&apos;re interested in and request one combined quote.</p>
                    <Link href="/products" className="btn-light btn-sm mt-3">Browse products <ArrowRight size={16} strokeWidth={1.5} /></Link>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {items.map(slug => {
                      const p = products.find(v => v.slug === slug);
                      if (!p) return null;
                      return (
                        <li key={slug} className="flex items-center gap-4 rounded-xl border border-line p-2">
                          <div className="h-16 w-20 shrink-0 overflow-hidden rounded-[6px] bg-mist">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={productThumb(p)} alt="" className="h-full w-full object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium">{p.name}</p>
                            <p className="mt-0.5 text-xs text-muted">{p.category}</p>
                          </div>
                          <button aria-label={`Remove ${p.name}`} onClick={() => remove(slug)} className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-soft hover:text-ink"><Trash2 size={16} strokeWidth={1.5} /></button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              {items.length > 0 && (
                <div className="space-y-3 border-t border-line p-6">
                  <a href={quoteLink(listMessage(items))} target="_blank" rel="noopener noreferrer" className="btn-dark w-full">Send list on WhatsApp <ArrowRight size={16} strokeWidth={1.5} /></a>
                  <a href={emailLink('Packaging quote request', listMessage(items))} className="btn-light w-full"><Mail size={16} strokeWidth={1.5} /> Email the list</a>
                  <button className="btn-ghost btn-sm w-full text-muted" onClick={clear}>Clear list</button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </InquiryContext.Provider>
  );
}
