# ALL PACK website — working notes for Claude

## Workflow (cloud, no local machine needed)
- When the owner asks for a change: edit the code, run `npm run typecheck`, commit, and push straight to `main`.
- Cloudflare Workers Builds is connected to this repo (production branch `main`). Every push to `main` builds and deploys automatically; there is no manual deploy step.
- Build command: `npx opennextjs-cloudflare build` · Deploy command: `npx opennextjs-cloudflare deploy` (set in the Cloudflare dashboard, not in this repo).
- Live site: https://allpackpk.com (also www.allpackpk.com), served by the Worker `all-pack-website`.
- Do not commit secrets. Runtime variables (e.g. `RESEND_API_KEY`) live in Cloudflare → Workers → all-pack-website → Settings.

## Site conventions
- Phone numbers shown in +92 format; address shown as "Royal Park, Lakshmi Chowk, Lahore".
- No separate quote page in the owner's plan: quote CTAs go to WhatsApp and email.
- Keep the homepage lean; guides, industries and box styles live on their own pages.
- Product images are the studio renders in `public/renders/` (source: `scripts/renders/`). Do not use stock photos (Unsplash, Pexels) or the owner's earlier client/product photos.
- One Products page (`/products#slug`) and one Industries page; no per-product or per-industry pages. Product data lives in `src/data/catalog.ts`.
- Meta titles and descriptions live in `src/data/seo.ts`; run `npm run seo:check` after editing them.
- Copy must be formal and specific: no invented figures, no counts of presses.

## Images and caching
- Never hotlink third-party images (the GetServices.ai badge icon is inlined in `Footer.tsx`). Keep images in `public/` as WebP, sized for display.
- Cache headers for files in `public/` live in `public/_headers` (Cloudflare static assets); `next.config.ts` headers do not apply to them. If you replace an image's content, give it a new filename so cached copies don't linger.
