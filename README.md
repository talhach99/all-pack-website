# ALL PACK — The Packaging Experts

Website for ALL PACK, a custom packaging & printing company in Lahore, Pakistan.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Framer Motion · React Three Fiber (3D Studio) · Lenis · Zod 4 · Resend (email) · Cloudflare Workers via OpenNext.

## Pages

| Route | What it does |
|---|---|
| `/` | Home: hero, collections bento, featured products, finishes preview, studio teaser, process, industries, FAQ |
| `/products` | Catalogue with collection tabs, search, material & industry filters (`?category=<slug>`) |
| `/products/[slug]` | Product detail with specs, quote list, WhatsApp link, related products, JSON-LD |
| `/studio` | Real-time 3D box designer (style, size, board, colour, finish, your own logo) → sends spec with the quote form |
| `/quote` | Quote form (products, quantity, size, city, artwork upload). Falls back to pre-filled WhatsApp/email if sending fails |
| `/gallery`, `/about`, `/insights`, `/faq`, `/contact`, `/privacy` | Supporting pages (old `/journal` URLs redirect to `/insights`) |
| `/api/quote`, `/api/newsletter` | Server routes that email submissions through Resend |

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
npm run typecheck && npm run build
```

## Environment variables

See `.env.example`. To make the quote form deliver email, set **`RESEND_API_KEY`** and **`RESEND_FROM_EMAIL`** (a sender on a domain you have verified in Resend) in your hosting dashboard (Cloudflare → Workers → Settings → Variables). Until then, the form tells visitors to send the same details on WhatsApp/email with one tap, so no enquiry is lost.

`NEXT_PUBLIC_SITE_URL` defaults to `https://www.allpack.com.pk` and is used for canonical URLs, sitemap and social previews. Set it to your live domain.

## Security

- Same-origin checks (Origin + Sec-Fetch-Site) on all form endpoints
- Rate limiting (Upstash Redis if configured, in-memory fallback)
- Honeypot + minimum fill-time bot traps
- Uploaded artwork verified by file signature (PNG/JPG/PDF only, 4 MB max); request size capped
- HTML-escaped emails, sanitised subject lines, Zod validation
- Security headers: CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy

## Editing content

- Contact details: `src/lib/company.ts`
- Products: `src/data/products.json` (the `model` field picks the image in `public/renders/`)
- FAQ: `src/data/faqs.ts` · Articles: `src/data/articles.ts`
- Colours & fonts: `tailwind.config.ts`, `src/app/globals.css`

### Product images

`public/renders/*.webp` are 3D renders generated from code in `scripts/render/`. To regenerate (needs Playwright + Chromium): `node scripts/render/render.mjs` or `node scripts/render/render.mjs mailer gift`. To use real photos instead, replace the matching `.webp` file (same name, ~1200×900, transparent or light background).

## Deploy (Cloudflare)

```bash
npx opennextjs-cloudflare build && npx wrangler deploy
```
