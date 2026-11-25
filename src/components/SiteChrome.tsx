import Link from 'next/link';
import { Header } from './ap/Header';
import { Footer } from './ap/Footer';
import { FloatingContact } from './FloatingContact';
import { Motion } from './Motion';
import { Analytics } from './Analytics';
import { getSite } from '@/lib/site';

/** Header, announcement bar, footer and floating WhatsApp button around every public page. */
export async function SiteChrome({ children }: { children: React.ReactNode }) {
  const { company, links, copy } = await getSite();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
    slogan: company.tagline,
    description: copy['site.description'],
    areaServed: ['United States', 'Pakistan'],
    email: company.email,
    telephone: links.phoneLink()?.slice(4),
    url: company.siteUrl,
    image: `${company.siteUrl}${copy['site.ogImage']}`,
    logo: `${company.siteUrl}/brand/allpack-logo.png`,
    address: [{ '@type': 'PostalAddress', addressLocality: 'Boston', addressRegion: 'MA', addressCountry: 'US' }, { '@type': 'PostalAddress', addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' }],
    sameAs: [company.instagram, company.facebook, company.linkedin].filter(Boolean),
  };
  const note = copy['site.announcement'], noteHref = copy['site.announcement.link'];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      {note && (
        <div className="bg-rule px-4 py-2 text-center text-[14px] font-medium text-white">
          {noteHref ? <Link href={noteHref} className="underline-offset-4 hover:underline">{note}</Link> : note}
        </div>
      )}
      <Header logo={copy['site.logo']} />
      <div id="main">{children}</div>
      <Footer />
      <FloatingContact href={links.whatsappLink()} />
      <Motion />
      <Analytics />
    </>
  );
}
