import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { articles, getArticle } from '@/data/articles';
import { COMPANY, quoteLink } from '@/lib/company';
import { WhatsAppIcon } from '@/components/FloatingContact';

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
      <header className="page-hero pb-14 pt-8 sm:pb-16">
        <div className="container-x max-w-3xl">
          <Link href="/insights" className="inline-flex items-center gap-2 text-[14px] text-muted hover:text-ink"><ArrowLeft size={16} strokeWidth={1.5} /> All guides</Link>
          <p className="meta mt-10">{a.category} · {a.readMinutes} min read</p>
          <h1 className="mt-3 text-[clamp(2.25rem,4.4vw,3.25rem)] font-medium leading-[1.08] tracking-[-.03em] text-ink">{a.title}</h1>
          <p className="mt-6 text-[17px] leading-relaxed text-secondary">{a.excerpt}</p>
        </div>
      </header>
      <article className="container-x max-w-3xl pb-28 pt-6">
        <div className="prose-ap mt-12 border-t border-line pt-4">
          {a.sections.map(s => <section key={s.heading}><h2>{s.heading}</h2>{s.body.map((p, i) => <p key={i}>{p}</p>)}</section>)}
        </div>
        <div className="mt-16 rounded-2xl border border-line bg-mist p-8 sm:p-10">
          <h2 className="text-[26px] font-medium">Need help choosing packaging?</h2>
          <p className="mt-2 text-secondary">Tell us what you&apos;re making and we&apos;ll recommend the right format.</p>
          <a href={quoteLink()} target="_blank" rel="noopener noreferrer" className="btn-dark mt-6"><WhatsAppIcon size={18} /> Get a quote on WhatsApp</a>
        </div>
      </article>
    </main>
  );
}
