/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { getSite, seoTitleOf } from '@/lib/site';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check, Clock, Lightbulb, Mail } from 'lucide-react';
import { readMinutes, slugify, wordCount, type Block } from '@/data/articles';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ArticleToc } from '@/components/ArticleToc';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const { articles, company: COMPANY, seoFor } = await getSite(); const a = articles.find(x => x.slug === slug);
  if (!a) return {};
  const s0 = seoFor(`article:${slug}`); const seo = s0.title ? s0 : { title: a.title, description: a.excerpt };
  const url = `/blog/${slug}`;
  return {
    title: seoTitleOf(seo), description: seo.description, keywords: a.keywords,
    authors: [{ name: COMPANY.name, url: COMPANY.siteUrl }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article', url, title: a.title, description: seo.description, siteName: COMPANY.name, locale: a.market === 'us' ? 'en_US' : 'en_PK',
      publishedTime: a.publishedAt, modifiedTime: a.updatedAt, authors: [COMPANY.name], tags: a.keywords,
      images: [{ url: a.hero.src, width: a.hero.width, height: a.hero.height, alt: a.hero.alt }],
    },
    twitter: { card: 'summary_large_image', title: a.title, description: seo.description, images: [a.hero.src] },
  };
}

const fmtDate = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** Renders [text](/path) links and **bold** inline; internal links use the router. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return <>{parts.map((p, i) => {
    const b = p.match(/^\*\*([^*]+)\*\*$/);
    if (b) return <strong key={i}>{b[1]}</strong>;
    const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return p;
    return m[2].startsWith('/') ? <Link key={i} href={m[2]} className="font-semibold text-[#2B43F0] underline decoration-[#2B43F0]/30 underline-offset-4 hover:decoration-[#2B43F0]">{m[1]}</Link>
      : <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#2B43F0] underline decoration-[#2B43F0]/30 underline-offset-4 hover:decoration-[#2B43F0]">{m[1]}</a>;
  })}</>;
}

function BlockView({ b }: { b: Block }) {
  if (typeof b === 'string') return <p><Rich text={b} /></p>;
  if ('ul' in b) return <ul>{b.ul.map((i, k) => <li key={k}><Rich text={i} /></li>)}</ul>;
  if ('ol' in b) return <ol>{b.ol.map((i, k) => <li key={k}><Rich text={i} /></li>)}</ol>;
  if ('tip' in b) return (
    <aside className="art-tip">
      <span className="art-tip-icon" aria-hidden="true"><Lightbulb size={18} strokeWidth={2} /></span>
      <div><p className="art-tip-title">{b.tip.title}</p><p className="art-tip-text"><Rich text={b.tip.text} /></p></div>
    </aside>
  );
  if ('quote' in b) return <blockquote className="art-quote"><p>{b.quote}</p></blockquote>;
  if ('steps' in b) return (
    <ol className="art-steps">
      {b.steps.map((st, k) => <li key={k}><span className="art-step-n">{String(k + 1).padStart(2, '0')}</span><p className="art-step-t">{st.title}</p><p className="art-step-d">{st.text}</p></li>)}
    </ol>
  );
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
    <figure className="my-10 overflow-hidden rounded-3xl border border-line bg-[#F6F3EC]">
      <div className="relative aspect-[16/10]"><img src={b.img.src} alt={b.img.alt} width={b.img.width} height={b.img.height} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain p-6 sm:p-10" /></div>
      <figcaption className="border-t border-line bg-white px-5 py-3 text-[14px] leading-snug text-muted">{b.img.caption}</figcaption>
    </figure>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const { articles, company: COMPANY, links, seoFor } = await getSite(); const getArticle = (s: string) => articles.find(x => x.slug === s); const a = getArticle(slug);
  if (!a) notFound();
  const us = a.market === 'us';
  const s0 = seoFor(`article:${slug}`); const seo = s0.title ? s0 : { title: a.title, description: a.excerpt };
  const url = `${COMPANY.siteUrl}/blog/${a.slug}`;
  const mins = readMinutes(a);
  const related = (a.related ?? []).map(getArticle).filter((x): x is NonNullable<typeof x> => !!x);
  const msg = `Hello ALL PACK, I read your guide "${a.title}" and would like a quotation.`;
  const wa = (us ? links.whatsappUS(msg) : null) ?? links.whatsappLink(msg);
  const mail = `mailto:${COMPANY.email}?subject=${encodeURIComponent(`Quotation request: ${a.title}`)}`;
  const office = us ? 'Boston office · Eastern Time · quotes in USD' : 'Lahore office · quotes in PKR';
  const toc = [...a.sections.map(s => ({ id: slugify(s.heading), text: s.heading })), ...(a.faqs.length ? [{ id: 'faq', text: 'Frequently asked questions' }] : [])];
  const mid = a.sections.length >= 6 ? Math.floor(a.sections.length / 2) : -1;
  const takeaways = (a.takeaways ?? []).filter(Boolean);
  const org = {
    '@type': 'Organization', '@id': `${COMPANY.siteUrl}/#organization`, name: COMPANY.name, url: COMPANY.siteUrl,
    logo: { '@type': 'ImageObject', url: `${COMPANY.siteUrl}/brand/allpack-logo.png` },
    location: [
      { '@type': 'Place', name: 'ALL PACK Boston office', address: { '@type': 'PostalAddress', addressLocality: 'Boston', addressRegion: 'MA', addressCountry: 'US' } },
      { '@type': 'Place', name: 'ALL PACK Lahore office', address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' } },
    ],
  };
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article', '@id': `${url}#article`, mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        headline: a.title, description: seo.description, abstract: a.summary, keywords: a.keywords.join(', '),
        articleSection: a.category, inLanguage: us ? 'en-US' : 'en-PK', wordCount: wordCount(a),
        datePublished: a.publishedAt, dateModified: a.updatedAt,
        image: { '@type': 'ImageObject', url: `${COMPANY.siteUrl}${a.hero.src}`, width: a.hero.width, height: a.hero.height },
        author: org, publisher: org, isPartOf: { '@type': 'Blog', name: 'ALL PACK packaging guides', url: `${COMPANY.siteUrl}/blog` },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#short-answer', '#key-takeaways'] },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: COMPANY.siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${COMPANY.siteUrl}/blog` },
          { '@type': 'ListItem', position: 3, name: a.title, item: url },
        ],
      },
      ...(a.faqs.length ? [{ '@type': 'FAQPage', mainEntity: a.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
    ],
  };
  const ctaButtons = (
    <div className="mt-6 flex flex-wrap gap-3">
      {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="ap-btn ap-blue"><WhatsAppIcon size={18} /> Request a quote on WhatsApp</a>}
      <a href={mail} className="ap-btn ap-ghost"><Mail size={17} strokeWidth={1.8} /> Email us</a>
      <Link href="/contact" className="ap-btn ap-ghost">Enquiry form <span className="ap-go">→</span></Link>
    </div>
  );
  return (
    <main className="ap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <header className="bg-[#F6F3EC] px-5 pb-14 pt-10 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-[880px] text-center">
          <nav aria-label="Breadcrumb" className="ap-rise flex flex-wrap items-center justify-center gap-1.5 text-[14px] text-[#6E685C]">
            <Link href="/" className="ap-ul">Home</Link><span aria-hidden="true">/</span>
            <Link href="/blog" className="ap-ul">Blog</Link><span aria-hidden="true">/</span>
            <span aria-current="page" className="text-[#0B0D12]">{a.category}</span>
          </nav>
          <span className="ap-rise mt-7 inline-flex items-center gap-2 rounded-full border border-[#D9D3C5] bg-white px-4 py-1.5 text-[12px] font-extrabold uppercase tracking-[.14em] text-[#0A208C]">{a.category}</span>
          <h1 className="ap-rise ap-d1 mx-auto mt-5 max-w-[860px] text-[34px] leading-[1.08] tracking-[-.035em] sm:text-[48px] lg:text-[56px]">{a.title}</h1>
          <p className="ap-rise ap-d2 mx-auto mt-5 max-w-[680px] text-[17px] leading-[1.6] text-[#4F4A40] sm:text-[19px]">{a.excerpt}</p>
          <div className="ap-rise ap-d3 mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px] text-[#6E685C]">
            <span className="font-semibold text-[#0B0D12]">By the {COMPANY.name} Packaging Team</span>
            <span className="inline-flex items-center gap-1.5"><Clock size={15} strokeWidth={1.8} /> {mins} min read</span>
            <span>Updated <time dateTime={a.updatedAt}>{fmtDate(a.updatedAt)}</time></span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-5">
        <figure className="mx-auto -mt-2 max-w-[1040px] overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_30px_60px_-40px_rgba(60,45,20,.35)] sm:-mt-6">
          <div className={`relative aspect-[16/10] ${a.hero.cover ? 'sm:aspect-[16/9]' : 'sm:aspect-[16/8]'}`}><img src={a.hero.src} alt={a.hero.alt} width={a.hero.width} height={a.hero.height} fetchPriority="high" decoding="async" className={`absolute inset-0 h-full w-full ${a.hero.cover ? 'object-cover' : 'object-contain p-6 sm:p-12'}`} /></div>
        </figure>

        <div className="mx-auto mt-12 grid max-w-[1120px] gap-12 pb-24 lg:mt-16 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1 [scrollbar-width:thin]">
              <p className="mb-4 text-[12px] font-extrabold uppercase tracking-[.14em] text-[#0A208C]">On this page</p>
              <ArticleToc items={toc} />
              <div className="mt-8 rounded-2xl bg-[#0E1440] p-5 text-white">
                <p className="text-[15px] font-bold leading-snug">Need a quotation?</p>
                <p className="mt-1.5 text-[13px] leading-snug text-white/70">{office}</p>
                {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="ap-btn ap-blue mt-4 w-full !min-h-[42px] !px-4 !text-[14px]"><WhatsAppIcon size={16} /> WhatsApp</a>}
              </div>
            </div>
          </aside>

          <article className="min-w-0 max-w-[740px]">
            <aside id="short-answer" aria-label="Short answer" className="rounded-2xl border-l-4 border-[#2B43F0] bg-[#F5F7FA] p-6 sm:p-7">
              <p className="text-[12px] font-extrabold uppercase tracking-[.14em] text-[#2B43F0]">Short answer</p>
              <p className="mt-2 text-[18px] font-medium leading-[1.6] text-[#10142E]">{a.summary}</p>
            </aside>

            {takeaways.length > 0 && (
              <section id="key-takeaways" aria-labelledby="kt-h" className="mt-6 rounded-2xl border border-line bg-white p-6 sm:p-7">
                <h2 id="kt-h" className="text-[20px]">Key takeaways</h2>
                <ul className="mt-4 grid gap-3">
                  {takeaways.map(t => <li key={t} className="flex gap-3 text-[16px] leading-[1.6] text-secondary"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#EEF1FA] text-[#2B43F0]"><Check size={14} strokeWidth={2.5} /></span><span>{t}</span></li>)}
                </ul>
              </section>
            )}

            <details className="mt-6 rounded-2xl border border-line bg-white p-5 lg:hidden">
              <summary className="cursor-pointer text-[15px] font-bold">In this guide ({toc.length} sections)</summary>
              <ol className="mt-4 grid list-decimal gap-2 pl-5 text-[15px] text-secondary">
                {toc.map(t => <li key={t.id}><a href={`#${t.id}`} className="underline decoration-line underline-offset-4 hover:text-[#2B43F0]">{t.text}</a></li>)}
              </ol>
            </details>

            <div className="prose-ap mt-12">
              {a.sections.map((s, si) => (
                <div key={s.heading}>
                  <section id={slugify(s.heading)} className="scroll-mt-28">
                    <h2>{s.heading}</h2>
                    {s.body.map((b, i) => <BlockView key={i} b={b} />)}
                  </section>
                  {si === mid - 1 && (
                    <aside className="not-prose my-12 overflow-hidden rounded-3xl bg-[#0E1440] p-7 text-white sm:p-9">
                      <p className="text-[12px] font-extrabold uppercase tracking-[.14em] text-[#7FD3F0]">Talk to a packaging specialist</p>
                      <p className="mt-3 text-[24px] font-extrabold leading-tight tracking-[-.02em] text-white">Get an itemized quotation for your exact box.</p>
                      <p className="mt-2 text-[15px] leading-relaxed text-white/70">Send your product size, quantity and finishes. We reply with a structure, board and finish recommendation, plus price and lead time in writing. {office}.</p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="ap-btn ap-blue"><WhatsAppIcon size={18} /> Request a quote</a>}
                        <a href={mail} className="ap-btn ap-ghost-light"><Mail size={17} strokeWidth={1.8} /> Email us</a>
                      </div>
                    </aside>
                  )}
                </div>
              ))}
            </div>

            {a.faqs.length > 0 && (
              <section id="faq" aria-labelledby="faq-h" className="mt-16 scroll-mt-28">
                <h2 id="faq-h" className="mb-6 text-2xl sm:text-[28px]">Frequently asked questions</h2>
                <FaqAccordion faqs={a.faqs} />
              </section>
            )}

            <div className="mt-16 rounded-3xl border border-line bg-[#F6F3EC] p-8 sm:p-10">
              <p className="text-[12px] font-extrabold uppercase tracking-[.14em] text-[#0A208C]">{us ? 'Boston, Massachusetts · Lahore, Pakistan' : 'Lahore, Pakistan · Boston, Massachusetts'}</p>
              <h2 className="mt-3 text-[26px] sm:text-[30px]">Ready to plan your packaging?</h2>
              <p className="mt-2 max-w-[560px] text-[16px] leading-relaxed text-[#4F4A40]">Tell us about your product and we will recommend a structure, board and finish, then confirm the price and lead time in writing. Every order starts with a free digital proof.</p>
              {ctaButtons}
            </div>

            {related.length > 0 && (
              <section aria-labelledby="related-h" className="mt-16">
                <h2 id="related-h" className="text-[24px]">Keep reading</h2>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {related.map(r => (
                    <li key={r.slug}>
                      <Link href={`/blog/${r.slug}`} className="ap-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
                        <div className="relative aspect-[16/9] border-b border-line bg-[#F6F3EC]"><img src={r.hero.src} alt="" width={r.hero.width} height={r.hero.height} loading="lazy" decoding="async" className={`absolute inset-0 h-full w-full ${r.hero.cover ? 'object-cover' : 'object-contain p-5'}`} /></div>
                        <div className="flex flex-1 flex-col p-5">
                          <p className="text-[12px] font-bold uppercase tracking-[.1em] text-[#6E685C]">{r.category} · {readMinutes(r)} min read</p>
                          <p className="mt-2 flex-1 text-[17px] font-bold leading-snug group-hover:text-[#2B43F0]">{r.title}</p>
                          <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-bold text-[#2B43F0]">Read the guide <ArrowUpRight size={15} /></span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        </div>
      </div>
    </main>
  );
}
