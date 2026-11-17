# ALL PACK — The Packaging Experts

Website for ALL PACK, a packaging and printing company in Lahore, Pakistan. Live at https://allpackpk.com.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Framer Motion · Lenis · Cloudflare Workers via OpenNext.

## Pages

| Route | Content |
|---|---|
| `/` | Hero, client logos, product range, manufacturing capability, industries, reasons, contact |
| `/products` | All eight packaging formats on one page (`/products#<slug>`) |
| `/industries` | Sectors served, on one page (`/industries#<slug>`) |
| `/why-all-pack` | Certifications, in-house production, working principles, buyer FAQs |
| `/about`, `/contact`, `/faq`, `/insights`, `/insights/[slug]`, `/privacy`, `/terms` | Supporting pages |

Old `/products/*`, `/industries/*`, `/quote` and `/journal` URLs redirect permanently (see `next.config.ts`).
Quotations go to WhatsApp and email; the site has no server-side form handling and stores no visitor data.

## Data

- Products, sectors, process and machines: `src/data/catalog.ts`
- Meta titles and descriptions: `src/data/seo.ts` (run `npm run seo:check` after editing)
- Company details and contact links: `src/lib/company.ts`
- Product images: studio renders in `public/renders/` (source in `scripts/renders/`)

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck && npm run seo:check && npm run build
```

## Deploy

Every push to `main` is built and deployed by Cloudflare Workers Builds
(`npx opennextjs-cloudflare build` / `npx opennextjs-cloudflare deploy`). Runtime variables live in the
Cloudflare dashboard; see `.env.example` for the public ones. Security headers and CSP are set in `next.config.ts`.
