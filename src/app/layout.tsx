import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/plus-jakarta-sans/wght.css';
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/inter-tight/wght.css';
import '@fontsource-variable/jetbrains-mono/wght.css';
import './globals.css';
import { getSite } from '@/lib/site';

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
