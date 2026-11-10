import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Eyebrow } from '@/components/Section';
import { articles, getArticle } from '@/data/articles';
import { COMPANY } from '@/lib/company';

export function generateStaticParams() { return articles.map(a => ({ slug: a.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const a = getArticle(slug);
  return a ? { title: a.title, description: a.excerpt, alternates: { canonical: `/insights/${slug}` }, openGraph: { type: 'article' } } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const a = getArticle(slug);
  if (!a) notFound();
  const schema = { '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.excerpt, publisher: { '@type': 'Organization', name: COMPANY.name }, mainEntityOfPage: `${COMPANY.siteUrl}/insights/${a.slug}` };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <header className="bg-ink pb-16 pt-10 text-white sm:pb-20">
        <div className="container-x max-w-3xl">
          <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-medium text-cream/60 hover:text-white"><ArrowLeft size={16} /> All guides</Link>
          <div className="mt-10"><Eyebrow light>{a.category} · {a.readMinutes} min read</Eyebrow></div>
          <h1 className="mt-6 text-[clamp(2.3rem,4.6vw,3.6rem)] font-semibold leading-[1.06] tracking-[-.03em] text-white">{a.title}</h1>
          <p className="mt-6 text-[17px] leading-relaxed text-cream/70">{a.excerpt}</p>
        </div>
      </header>
      <article className="container-x max-w-3xl pb-28 pt-6">
        <div className="prose-ap mt-12 border-t border-line pt-4">
          {a.sections.map(s => <section key={s.heading}><h2>{s.heading}</h2>{s.body.map((p, i) => <p key={i}>{p}</p>)}</section>)}
        </div>
        <div className="mt-16 rounded-[24px] bg-ink p-10 text-cream">
          <h2 className="text-3xl font-semibold text-white">Need help choosing packaging?</h2>
          <p className="mt-2 text-cream/65">Tell us what you&apos;re making and we&apos;ll recommend the right format.</p>
          <Link href="/quote" className="btn-white mt-6">Get a free quote <ArrowRight size={16} /></Link>
        </div>
      </article>
    </main>
  );
}
