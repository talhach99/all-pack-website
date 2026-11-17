import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
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
      to('/journal', '/insights'),
      to('/journal/:slug', '/insights/:slug'),
      to('/home', '/'),
      to('/gallery', '/products'),
      to('/quote', '/contact'),
      // Product and industry detail pages were merged into single pages (Nov 2026).
      to('/products/corrugated-shipping-boxes', '/products#corrugated-shipping-boxes'),
      to('/products/cargo-storage-boxes', '/products#corrugated-shipping-boxes'),
      to('/products/protective-wrap', '/products#corrugated-shipping-boxes'),
      to('/products/fruit-produce-boxes', '/products#corrugated-shipping-boxes'),
      to('/products/ecommerce-mailer-boxes', '/products#mailer-boxes'),
      to('/products/poly-mailers', '/products#mailer-boxes'),
      to('/products/folding-cartons', '/products#folding-cartons'),
      to('/products/custom-printed-boxes', '/products#folding-cartons'),
      to('/products/bottles-jars', '/products#folding-cartons'),
      to('/products/shoe-boxes', '/products#rigid-gift-boxes'),
      to('/products/rigid-gift-boxes', '/products#rigid-gift-boxes'),
      to('/products/jewellery-boxes', '/products#rigid-gift-boxes'),
      to('/products/pizza-boxes', '/products#food-boxes'),
      to('/products/burger-boxes', '/products#food-boxes'),
      to('/products/cake-boxes', '/products#food-boxes'),
      to('/products/takeaway-containers', '/products#food-boxes'),
      to('/products/kraft-shopping-bags', '/products#paper-bags'),
      to('/products/labels-stickers', '/products#labels-stickers'),
      to('/products/:slug', '/products'),
      to('/industries/pharmaceutical', '/industries#pharmaceutical'),
      to('/industries/bakeries', '/industries#food-and-bakery'),
      to('/industries/restaurants', '/industries#restaurants'),
      to('/industries/cafes', '/industries#restaurants'),
      to('/industries/beauty', '/industries#cosmetics'),
      to('/industries/e-commerce', '/industries#e-commerce'),
      to('/industries/fashion', '/industries#e-commerce'),
      to('/industries/jewellery', '/industries#e-commerce'),
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
