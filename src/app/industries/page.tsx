/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PAGE_SEO, seoTitle } from '@/data/seo';
import { families, sectors } from '@/data/catalog';
import { quoteLink } from '@/lib/company';
import { PageHero } from '@/components/PageHero';
import { WhatsAppIcon } from '@/components/FloatingContact';

export const metadata: Metadata = { title: seoTitle(PAGE_SEO.industries), description: PAGE_SEO.industries.description, alternates: { canonical: '/industries' } };

const formatLink = (name: string) => families.find(f => f.name === name || name.startsWith(f.name.split(' ')[0]));

export default function IndustriesPage() {
  return (
    <main>
      <PageHero
        kicker="Industries"
        title={<>Packaging for the sectors <span className="text-[#8FC2F2]">we know best</span></>}
        description="Regulated text, food-grade board, shelf impact or courier strength. Each sector asks something different of its packaging, and we produce for all of them every week."
        aside={
          <ol className="border-b border-white/10">
            {sectors.map((s, i) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="group grid grid-cols-[40px_1fr_auto] items-center gap-4 border-t border-white/10 py-3 transition-colors hover:bg-white/[.03]">
                  <span className="font-mono text-[12px] text-[#7FD3F0]">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="block font-display text-[18px] font-medium tracking-[-.01em] text-white">{s.name}</span>
                    <span className="mt-0.5 block text-[13px] text-[#9AA5CC]">{s.formats.join(' · ')}</span>
                  </span>
                  <ArrowRight size={16} strokeWidth={1.5} className="text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                </a>
              </li>
            ))}
          </ol>
        }
      >
        <a href={quoteLink('Hello ALL PACK, I would like to discuss packaging for my industry.')} target="_blank" rel="noopener noreferrer" className="btn-primary"><WhatsAppIcon size={18} /> Discuss your packaging</a>
        <Link href="/products" className="btn-outline">View products</Link>
      </PageHero>
      <div className="container-x pb-8">
        {sectors.map((s, i) => {
          const hero = formatLink(s.formats[0]);
          return (
            <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-h`} className="grid gap-10 border-b border-line py-16 last:border-0 sm:py-20 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
              <div>
                <p className="meta">{String(i + 1).padStart(2, '0')}</p>
                <h2 id={`${s.slug}-h`} className="mt-4 text-[clamp(2rem,3.2vw,2.6rem)] leading-[1.08]">{s.name}</h2>
                <p className="mt-4 text-[19px] font-medium leading-snug text-ink-soft">{s.summary}</p>
                <p className="lead mt-4">{s.detail}</p>
                <a href={quoteLink(`Hello ALL PACK, I would like a quotation for ${s.name.toLowerCase()} packaging.`)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8"><WhatsAppIcon size={18} /> Discuss your packaging</a>
              </div>
              <div className="flex flex-col gap-4">
                {hero && <div className="flex aspect-[16/10] items-center justify-center rounded-3xl bg-card p-8"><img src={hero.image} alt={hero.alt} loading="lazy" className="max-h-full w-auto object-contain" /></div>}
                <div className="card p-6">
                  <p className="text-[14px] font-semibold">Formats we produce</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {s.formats.map(f => { const fam = formatLink(f); return <li key={f}>{fam ? <Link href={`/products#${fam.slug}`} className="chip hover:border-navy hover:text-navy">{f}</Link> : <span className="chip">{f}</span>}</li>; })}
                  </ul>
                  {s.clients.length > 0 && <>
                    <p className="mt-6 text-[14px] font-semibold">Clients in this sector</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-secondary">{s.clients.join(' · ')}</p>
                  </>}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
