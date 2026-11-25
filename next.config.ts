import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://images.pexels.com",
  "font-src 'self' data:",
  "connect-src 'self' https://cloudflareinsights.com",
  'frame-src https://www.google.com https://maps.google.com',
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Images are pre-optimised WebP renders; skip the runtime optimiser (not available on Cloudflare Workers by default).
  images: { unoptimized: true },
  experimental: { optimizePackageImports: ['lucide-react', 'framer-motion'] },
  async redirects() {
    const to = (from: string, dest: string) => ({ source: from, destination: dest, permanent: true });
    return [
      // Original three guides were replaced (Nov 2026); send their old URLs to the closest new guide.
      to('/why-all-pack', '/about'),
      to('/faq', '/how-it-works#faq'),
      to('/insights/choose-the-right-shipping-box', '/blog/custom-packaging-boxes-lahore'),
      to('/insights/kraft-vs-white-cardboard', '/blog/custom-packaging-boxes-lahore'),
      to('/insights/prepare-packaging-artwork', '/blog/custom-box-printing-cost-pakistan'),
      to('/insights', '/blog'),
      to('/insights/:slug', '/blog/:slug'),
      to('/journal', '/blog'),
      to('/journal/:slug', '/blog/:slug'),
      to('/home', '/'),
      to('/gallery', '/products'),
      to('/quote', '/contact'),
      // Product and industry detail pages were merged into single pages (Nov 2026).
      to('/products/corrugated-shipping-boxes', '/products#shipping'),
      to('/products/cargo-storage-boxes', '/products#shipping'),
      to('/products/protective-wrap', '/products#shipping'),
      to('/products/fruit-produce-boxes', '/products#shipping'),
      to('/products/ecommerce-mailer-boxes', '/products#mailer'),
      to('/products/poly-mailers', '/products#mailer'),
      to('/products/folding-cartons', '/products#folding'),
      to('/products/custom-printed-boxes', '/products#folding'),
      to('/products/bottles-jars', '/products#folding'),
      to('/products/shoe-boxes', '/products#rigid'),
      to('/products/rigid-gift-boxes', '/products#rigid'),
      to('/products/jewellery-boxes', '/products#rigid'),
      to('/products/pizza-boxes', '/products#food'),
      to('/products/burger-boxes', '/products#food'),
      to('/products/cake-boxes', '/products#food'),
      to('/products/takeaway-containers', '/products#food'),
      to('/products/kraft-shopping-bags', '/products#bags'),
      to('/products/labels-stickers', '/products#labels'),
      to('/products/:slug', '/products'),
      to('/industries/pharmaceutical', '/industries#pharma'),
      to('/industries/bakeries', '/industries#food'),
      to('/industries/restaurants', '/industries#food'),
      to('/industries/cafes', '/industries#food'),
      to('/industries/beauty', '/industries#beauty'),
      to('/industries/e-commerce', '/industries#ecommerce'),
      to('/industries/fashion', '/industries#ecommerce'),
      to('/industries/jewellery', '/industries#ecommerce'),
      to('/industries/:slug', '/industries'),
    ];
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/renders/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000' }] },
    ];
  },
};

export default nextConfig;
