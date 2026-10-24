import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
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
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/renders/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000' }] },
      { source: '/api/:path*', headers: [{ key: 'Cache-Control', value: 'no-store' }, { key: 'X-Robots-Tag', value: 'noindex' }] },
    ];
  },
  async redirects() {
    return [
      { source: '/journal', destination: '/insights', permanent: true },
      { source: '/journal/:slug', destination: '/insights/:slug', permanent: true },
      { source: '/home', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
