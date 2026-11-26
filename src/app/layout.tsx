import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '@fontsource-variable/plus-jakarta-sans/wght.css';
import './globals.css';
import { getSite } from '@/lib/site';

// Latin Plus Jakarta Sans, preloaded with a size-matched fallback so text appears at once without a layout shift.
// The fontsource CSS above still covers rarer characters (latin-ext etc.), downloaded only when a page needs them.
const jakarta = localFont({
  src: '../../node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2',
  weight: '200 800', style: 'normal', display: 'swap', variable: '--font-jakarta', preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'], adjustFontFallback: 'Arial',
});

export async function generateMetadata(): Promise<Metadata> {
  const { company, copy, seoFor } = await getSite();
  const home = seoFor('home');
  const og = copy['site.ogImage'];
  return {
    metadataBase: new URL(company.siteUrl),
    title: { default: home.title, template: '%s | ' + company.name },
    description: home.description,
    applicationName: company.name,
    alternates: { canonical: '/' },
    openGraph: { title: home.title, description: home.description, type: 'website', locale: 'en_US', siteName: company.name, images: [{ url: og, alt: company.name }] },
    twitter: { card: 'summary_large_image', images: [og] },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}

export const dynamic = 'force-dynamic';

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#FFFFFF' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <head>
        {/* Hide reveal-on-scroll content only when JS runs; un-hide after 4s if the reveal script never starts. */}
        <script dangerouslySetInnerHTML={{ __html: "(function(d){d.classList.add('rv-js');setTimeout(function(){if(!window.__rv)d.classList.remove('rv-js')},4000)})(document.documentElement)" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
