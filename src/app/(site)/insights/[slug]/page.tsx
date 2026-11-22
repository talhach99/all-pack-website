/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { getSite, seoTitleOf } from '@/lib/site';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { readMinutes, slugify, wordCount, type Block } from '@/data/articles';
import { WhatsAppIcon } from '@/components/FloatingContact';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const { articles, company: COMPANY, seoFor } = await getSite(); const a = articles.find(x => x.slug === slug);
  if (!a) return {};
  const s0 = seoFor(`article:${slug}`); const seo = s0.title ? s0 : { title: a.title, description: a.excerpt };
  const url = `/insights/${slug}`;
  return {
    title: seoTitleOf(seo), description: seo.description, keywords: a.keywords,
    authors: [{ name: COMPANY.name, url: COMPANY.siteUrl }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article', url, title: a.title, description: seo.description, siteName: COMPANY.name, locale: 'en_PK',
      publishedTime: a.publishedAt, modifiedTime: a.updatedAt, authors: [COMPANY.name], tags: a.keywords,
      images: [{ url: a.hero.src, width: a.hero.width, height: a.hero.height, alt: a.hero.alt }],
    },
    twitter: { card: 'summary_large_image', title: a.title, description: seo.description, images: [a.hero.src] },
  };
}

const fmtDate = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Renders [text](/path) inline links; internal links use the router. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return <>{parts.map((p, i) => {
    const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return p;
    return m[2].startsWith('/') ? <Link key={i} href={m[2]} className="font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">{m[1]}</Link>
      : <a key={i} href={m[2]} className="font-medium text-brand underline underline-offset-4">{m[1]}</a>;
  })}</>;
}

function BlockView({ b }: { b: Block }) {
  if (typeof b === 'string') return <p><Rich text={b} /></p>;
  if ('ul' in b) return <ul>{b.ul.map((i, k) => <li key={k}><Rich text={i} /></li>)}</ul>;
  if ('ol' in b) return <ol>{b.ol.map((i, k) => <li key={k}><Rich text={i} /></li>)}</ol>;
  if ('table' in b) return (
    <div className="table-wrap">
      <table>
        {b.table.caption && <caption>{b.table.caption}</caption>}
        <thead><tr>{b.table.head.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
        <tbody>{b.table.rows.map((r, i) => <tr key={i}>{r.map((c, j) => j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j} data-label={b.table.head[j]}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
  return (
    <figure className="my-8 overflow-hidden rounded-3xl border border-line bg-card">
      <div className="relative aspect-[16/10]"><img src={b.img.src} alt={b.img.alt} width={b.img.width} height={b.img.height} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain p-6 sm:p-10" /></div>
      <figcaption className="border-t border-line bg-white px-5 py-3 text-[14px] leading-snug text-muted">{b.img.caption}</figcaption>
    </figure>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const { articles, company: COMPANY, links, seoFor } = await getSite(); const getArticle = (s: string) => articles.find(x => x.slug === s); const { quoteLink } = links; const a = getArticle(slug);
  if (!a) notFound();
  const s0 = seoFor(`article:${slug}`); const seo = s0.title ? s0 : { title: a.title, description: a.excerpt };
  const url = `${COMPANY.siteUrl}/insights/${a.slug}`;
  const mins = readMinutes(a);
  const related = a.related.map(getArticle).filter((x): x is NonNullable<typeof x> => !!x);
  const org = { '@type': 'Organization', '@id': `${COMPANY.siteUrl}/#organization`, name: COMPANY.name, url: COMPANY.siteUrl, logo: { '@type': 'ImageObject', url: `${COMPANY.siteUrl}/brand/allpack-logo.png` } };
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article', '@id': `${url}#article`, mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        headline: a.title, description: seo.description, abstract: a.summary, keywords: a.keywords.join(', '),
        articleSection: a.category, inLanguage: 'en-PK', wordCount: wordCount(a),
        datePublished: a.publishedAt, dateModified: a.updatedAt,
        image: { '@type': 'ImageObject', url: `${COMPANY.siteUrl}${a.hero.src}`, width: a.hero.width, height: a.hero.height },
        author: org, publisher: org, isPartOf: { '@type': 'Blog', name: 'ALL PACK packaging guides', url: `${COMPANY.siteUrl}/insights` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: COMPANY.siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${COMPANY.siteUrl}/insights` },
          { '@type': 'ListItem', position: 3, name: a.title, item: url },
        ],
      },
      { '@type': 'FAQPage', mainEntity: a.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <header className="page-hero pb-12 pt-8 sm:pb-14">
        <div className="container-x max-w-3xl">
          <nav aria-label="Breadcrumb">
            <Link href="/insights" className="inline-flex items-center gap-2 text-[14px] text-white/70 hover:text-white"><ArrowLeft size={16} strokeWidth={1.5} /> All guides</Link>
          </nav>
          <p className="meta mt-10">{a.category} · {mins} min read</p>
          <h1 className="mt-3 text-[clamp(2rem,4.2vw,3.1rem)] font-medium leading-[1.1] tracking-[-.03em] text-ink">{a.title}</h1>
          <p className="mt-5 text-[14px] text-secondary">By {COMPANY.name}, Lahore · Published <time dateTime={a.publishedAt}>{fmtDate(a.publishedAt)}</time> · Updated <time dateTime={a.updatedAt}>{fmtDate(a.updatedAt)}</time></p>
        </div>
      </header>

      <article className="container-x max-w-3xl pb-24 pt-10 sm:pt-14">
        <figure className="-mt-2 mb-10 overflow-hidden rounded-3xl border border-line bg-card">
          <div className="relative aspect-[16/10] sm:aspect-[16/9]"><img src={a.hero.src} alt={a.hero.alt} width={a.hero.width} height={a.hero.height} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-contain p-6 sm:p-10" /></div>
        </figure>

        <aside aria-label="Short answer" className="rounded-2xl border border-line bg-mist p-6 sm:p-7">
          <p className="meta">Short answer</p>
          <p className="mt-2 text-[18px] font-medium leading-snug text-ink-soft">{a.summary}</p>
        </aside>

        <nav aria-label="In this guide" className="mt-8">
          <p className="text-[14px] font-semibold text-ink">In this guide</p>
          <ol className="mt-3 grid gap-x-8 gap-y-2 text-[15px] sm:grid-cols-2">
            {a.sections.map(s => <li key={s.heading}><a href={`#${slugify(s.heading)}`} className="text-secondary underline decoration-line underline-offset-4 hover:text-brand">{s.heading}</a></li>)}
            <li><a href="#faq" className="text-secondary underline decoration-line underline-offset-4 hover:text-brand">Frequently asked questions</a></li>
          </ol>
        </nav>

        <div className="prose-ap mt-12">
          {a.sections.map(s => (
            <section key={s.heading} id={slugify(s.heading)} className="scroll-mt-28">
              <h2>{s.heading}</h2>
              {s.body.map((b, i) => <BlockView key={i} b={b} />)}
            </section>
          ))}
          <section id="faq" className="scroll-mt-28">
            <h2>Frequently asked questions</h2>
            <dl className="faq-list">
              {a.faqs.map(f => <div key={f.q}><dt>{f.q}</dt><dd>{f.a}</dd></div>)}
            </dl>
          </section>
        </div>

        <div className="mt-14 rounded-3xl border border-line bg-mist p-8 sm:p-10">
          <h2 className="text-[26px]">Need advice on your packaging?</h2>
          <p className="mt-2 text-secondary">Tell us about your product and we will recommend a structure, board and finish, then confirm the price and lead time in writing.</p>
          <a href={quoteLink(`Hello ALL PACK, I read your guide "${a.title}" and would like a quotation.`)} target="_blank" rel="noopener noreferrer" className="btn-dark mt-6"><WhatsAppIcon size={18} /> Request a quote on WhatsApp</a>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-h" className="mt-14">
            <h2 id="related-h" className="text-[22px]">Keep reading</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map(r => (
                <li key={r.slug}>
                  <Link href={`/insights/${r.slug}`} className="group card flex h-full flex-col p-6 transition-colors hover:border-[#C9CFDC]">
                    <p className="meta">{r.category}</p>
                    <p className="mt-2 text-[18px] font-medium leading-snug group-hover:text-brand">{r.title}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-brand">Read the guide <ArrowUpRight size={15} /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}
