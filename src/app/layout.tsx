import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/manrope/wght.css';
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/fraunces/opsz-italic.css';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingContact } from '@/components/FloatingContact';
import { COMPANY, phoneLink } from '@/lib/company';

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.siteUrl),
  title: { default: 'ALL PACK — Custom Packaging & Printing in Lahore', template: '%s · ALL PACK' },
  description: 'Custom printed boxes, mailers, rigid gift boxes, food packaging, bags, pouches and labels. ALL PACK — The Packaging Experts, Lahore, Pakistan.',
  applicationName: 'ALL PACK',
  keywords: ['custom packaging Lahore', 'printed boxes Pakistan', 'mailer boxes', 'rigid gift boxes', 'pizza boxes', 'packaging company Lahore'],
  alternates: { canonical: '/' },
  openGraph: { title: 'ALL PACK — The Packaging Experts', description: 'Packaging that sells before it’s opened. Custom boxes, bags, labels and print from Lahore.', type: 'website', locale: 'en_PK', siteName: 'ALL PACK', images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ALL PACK — The Packaging Experts' }] },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#F4EFE6' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: COMPANY.name,
    slogan: COMPANY.tagline,
    description: 'Custom packaging and printing company in Lahore, Pakistan.',
    email: COMPANY.email,
    telephone: phoneLink()?.slice(4),
    url: COMPANY.siteUrl,
    image: `${COMPANY.siteUrl}/og-image.png`,
    logo: `${COMPANY.siteUrl}/logo.svg`,
    address: { '@type': 'PostalAddress', streetAddress: COMPANY.street, addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' },
    sameAs: [COMPANY.instagram, COMPANY.facebook, COMPANY.linkedin].filter(Boolean),
  };
  return (
    <html lang="en-PK">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
        <Providers>
          <Header />
          <div id="main">{children}</div>
          <Footer />
          <FloatingContact />
        </Providers>
      </body>
    </html>
  );
}
