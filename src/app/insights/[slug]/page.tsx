import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { articles, getArticle } from '@/data/articles';
import { COMPANY } from '@/lib/company';

export function generateStaticParams() { return articles.map(a => ({ slug: a.slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const a = getArticle(slug);
  return a ? { title: a.title, description: a.excerpt, alternates: { canonical: `/insights/${slug}` }, openGraph: { type: 'article' } } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const a = getArticle(slug);
  if (!a) notFound();
  const schema = { '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.excerpt, publisher: { '@type': 'Organization', name: COMPANY.name }, mainEntityOfPage: `${COMPANY.siteUrl}/insights/${a.slug}` };
  return (
    <main className="pb-28 pt-32 sm:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <article className="container-x max-w-3xl">
        <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink"><ArrowLeft size={16} /> All insights</Link>
        <p className="kicker mb-5 mt-10">{a.category} · {a.readMinutes} min read</p>
        <h1 className="font-display text-[clamp(2.3rem,5vw,4rem)] font-semibold leading-[1.04] tracking-[-.04em]">{a.title}</h1>
        <p className="lead mt-6">{a.excerpt}</p>
        <div className="prose-ap mt-12 border-t border-line pt-4">
          {a.sections.map(s => <section key={s.heading}><h2>{s.heading}</h2>{s.body.map((p, i) => <p key={i}>{p}</p>)}</section>)}
        </div>
        <div className="mt-16 rounded-4xl bg-ink p-10 text-white">
          <h2 className="font-display text-2xl font-semibold">Need help choosing packaging?</h2>
          <p className="mt-2 text-white/70">Tell us what you&apos;re making and we&apos;ll recommend the right format.</p>
          <Link href="/quote" className="btn-white mt-6">Get a free quote <ArrowRight size={16} /></Link>
        </div>
      </article>
    </main>
  );
}
