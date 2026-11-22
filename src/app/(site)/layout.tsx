import { SiteChrome } from '@/components/SiteChrome';

// Content comes from the admin panel's database, so pages are built for each request.
export const dynamic = 'force-dynamic';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
