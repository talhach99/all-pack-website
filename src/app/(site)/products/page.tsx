/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { getSite, pageMeta } from '@/lib/site';
import { type CatalogItem } from '@/data/home';
import { Arrivals } from '@/components/ap/Arrivals';

export async function generateMetadata(): Promise<Metadata> { return pageMeta('products', '/products'); }

function Thumb({ item, eager }: { item: CatalogItem; eager?: boolean }) {
  if (!item.src) return null;
  const contain = item.fit === 'contain';
  return (
    <div className={`aspect-square overflow-hidden rounded-[20px] border border-[#ECEEF3] ${contain ? 'bg-[#F7F8FA]' : 'bg-white'}`}>
      <img src={item.src} alt={`ALL PACK ${item.name}`} width={480} height={480} loading={eager ? 'eager' : 'lazy'} className={`ap-img h-full w-full ${contain ? 'object-contain p-4' : 'object-cover'}`} />
    </div>
  );
}

export default async function ProductsPage() {
  const { catalog: CATALOG, newArrivals: NEW_ARRIVALS } = await getSite();
  return (
    <main className="ap px-5 pb-20 sm:pb-28 pt-12">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-start gap-14">
        <aside className="sticky top-24 hidden max-w-[250px] flex-[1_1_220px] flex-col lg:flex">
          <a href="#shopby" className="py-2 text-[15px] font-bold transition-colors hover:text-[#2B43F0]">Shop by category</a>
          <a href="#new" className="py-2 text-[15px] font-bold transition-colors hover:text-[#2B43F0]">New products</a>
          <div className="my-4 h-px bg-[#E6E9F2]" />
          <span className="py-2 text-[15px] font-extrabold">All products</span>
          {CATALOG.map(s => <a key={s.id} href={`#${s.id}`} className="py-2 text-[15px] font-semibold text-[#3B4256] transition-[color,padding] hover:pl-1.5 hover:text-[#2B43F0]">{s.title}</a>)}
        </aside>

        <div className="min-w-0 flex-[999_1_640px]">
          <h1 id="shopby" className="ap-rise scroll-mt-28 text-[32px]">Shop by</h1>
          <nav aria-label="Categories" className="mt-3 flex flex-wrap gap-2 lg:hidden">
            {CATALOG.map(s => <a key={s.id} href={`#${s.id}`} className="rounded-full border border-[#DADDE4] px-3.5 py-2 text-[14px] font-semibold">{s.title}</a>)}
          </nav>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 xl:grid-cols-4">
            {CATALOG.map((s, i) => {
              const first = s.items.find(x => x.src)!;
              return (
                <a key={s.id} href={`#${s.id}`} className="ap-card ap-rise flex flex-col gap-3" style={{ animationDelay: `${i * .04}s` }}>
                  <Thumb item={first} eager={i < 8} />
                  <span className="px-1 text-[15px] font-extrabold">{s.title}</span>
                </a>
              );
            })}
          </div>

          <Arrivals items={NEW_ARRIVALS} />

          {CATALOG.map(s => (
            <section key={s.id} id={s.id} className="mt-24 scroll-mt-28" aria-labelledby={`h-${s.id}`}>
              {s.banner ? (
                <div className="ap-rv relative mb-7 h-[240px] overflow-hidden rounded-3xl">
                  <img src={s.banner} alt="" width={1400} height={480} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[rgba(7,11,31,.72)] to-transparent" />
                  <div className="absolute bottom-8 left-9 max-w-[420px] text-white"><h2 id={`h-${s.id}`} className="text-[32px] !text-white">{s.title}</h2><p className="mt-1.5 text-[15px] text-[#DDE3F5]">{s.desc}</p></div>
                </div>
              ) : (
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                  <div className="max-w-[560px]"><h2 id={`h-${s.id}`} className="text-[30px]">{s.title}</h2><p className="mt-2 text-[15px] leading-[1.55] text-[#3B4256]">{s.desc}</p></div>
                  <Link href="/contact" className="text-[15px] font-bold text-[#2B43F0]">Get a quote →</Link>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                {s.items.filter(it => it.src).map(it => (
                  <Link key={it.name} href={`/contact?product=${encodeURIComponent(it.name)}`} className="ap-card flex flex-col gap-2">
                    <Thumb item={it} />
                    <span className="px-1 pt-1 text-[15px] font-extrabold">{it.name}</span>
                    <span className="px-1 text-[13px] font-semibold text-[#2B43F0]">Request a quote →</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
