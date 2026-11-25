import Link from 'next/link';

/** Inner page header: light mist band with breadcrumb, large title and lead text (Nov 2026 redesign). */
export function PageHero({ kicker, title, description, children, crumbs }: {
  kicker: string; title: React.ReactNode; description?: React.ReactNode; children?: React.ReactNode; crumbs?: { text: string; href?: string }[]; aside?: React.ReactNode;
}) {
  return (
    <section className="ap bg-[#F4F5F8] px-5 pb-20 pt-20">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-5">
        <nav aria-label="Breadcrumb" className="ap-rise flex flex-wrap gap-1.5 text-[14px] text-[#5C6272]">
          <Link href="/" className="ap-ul">Home</Link>
          {(crumbs || [{ text: kicker }]).map(c => (
            <span key={c.text} className="flex gap-1.5"><span aria-hidden="true">/</span>{c.href ? <Link href={c.href} className="ap-ul">{c.text}</Link> : <span aria-current="page">{c.text}</span>}</span>
          ))}
        </nav>
        <h1 className="ap-rise ap-d1 max-w-[880px] text-[42px] leading-[.98] sm:text-[60px] lg:text-[72px]">{title}</h1>
        {description && <p className="ap-rise ap-d2 max-w-[660px] text-[19px] leading-[1.6] text-[#4A5060]">{description}</p>}
        {children && <div className="ap-rise ap-d3 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
