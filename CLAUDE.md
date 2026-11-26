# ALL PACK website — working notes for Claude

## Workflow (cloud, no local machine needed)
- When the owner asks for a change: edit the code, run `npm run typecheck`, commit, and push straight to `main`.
- Cloudflare Workers Builds is connected to this repo (production branch `main`). Every push to `main` builds and deploys automatically; there is no manual deploy step.
- Build command: `npx opennextjs-cloudflare build` · Deploy command: `npx opennextjs-cloudflare deploy` (set in the Cloudflare dashboard, not in this repo).
- Live site: https://allpackpk.com (also www.allpackpk.com), served by the Worker `all-pack-website`.
- Do not commit secrets. Runtime variables (e.g. `RESEND_API_KEY`) live in Cloudflare → Workers → all-pack-website → Settings.

## Site conventions
- Phone numbers: Lahore +92 321 8444590, Boston +1 313 729 1534 (`usPhone`/`usWhatsapp` in company.ts, editable in admin); WhatsApp and email only (no "Call" option). Boston address shown only as "Boston, Massachusetts". Offices: Boston, Massachusetts, USA and Lahore, Pakistan (address shown only as "Lahore, Pakistan").
- Quote CTAs go to /contact (enquiry form, stored in the admin inbox) plus WhatsApp and email.
- Keep the homepage lean; guides, industries and box styles live on their own pages.
- Images: studio renders in `public/renders/` and owner-supplied photos in `public/photos/` (Nov 2026 redesign). Do not use stock photos (Unsplash, Pexels) or images taken from other companies' websites.
- Redesign (Nov 2026, Printful-inspired but original): Plus Jakarta Sans, logo navy #0A208C / blue #2B43F0 / cyan #22C3EE. Components in `src/components/ap/`, page content in `src/data/home.ts`, styles under the `.ap` classes at the end of `globals.css`. Pages: /, /products, /industries, /finishes, /how-it-works, /blog, /about, /offices, /contact, /privacy, /terms, /shipping. Do not mention machinery/presses. No Printful/merch content until the owner adds affiliate material.
- One Products page (`/products#section-id`) and one Industries page; no per-product or per-industry pages. Product sections live in `CATALOG` in `src/data/home.ts`; items without a photo are hidden until one is added.
- Meta titles and descriptions live in `src/data/seo.ts`; run `npm run seo:check` after editing them.
- Copy must be formal and specific: no invented figures, no counts of presses.

## Images and caching
- Never hotlink third-party images (the GetServices.ai badge icon is inlined in `Footer.tsx`). Keep images in `public/` as WebP, sized for display.
- Cache headers for files in `public/` live in `public/_headers` (Cloudflare static assets); `next.config.ts` headers do not apply to them. If you replace an image's content, give it a new filename so cached copies don't linger.

## Admin panel (`/admin`)
- Owner-only panel at https://allpackpk.com/admin. Tabs: Inquiries, Contact details, Page text, Homepage slides, Products, New arrivals, Industries, Ordering steps, Homepage FAQs, How it works FAQs, Clients, Blog, Search (SEO), Images.
- **Standing rule from the owner: keep the admin in step with the website.** Whenever you add or change a page, section, list or figure on the site, make it editable in the same change: page text/images → a field in `src/data/copy.ts` read via `getSite().copy`; lists → a key in `Collections` (`src/lib/site.ts`, also `COLLECTION_KEYS`), its default in `src/data/home.ts`, and a tab in `src/components/admin/schema.ts`; new SEO pages → `src/data/seo.ts` and `PAGE_NAMES` in `src/components/admin/Panels.tsx`. Remove admin fields for anything taken off the site.
- Storage is Cloudflare D1 (binding `DB`, database `all-pack-cms`, declared in `wrangler.jsonc`; tables are created automatically on first use in `src/lib/db.ts`). Without the binding the public site still works from the built-in defaults.
- Secrets (Cloudflare → Workers → all-pack-website → Settings → Variables and secrets): `ADMIN_USERNAME`, `ADMIN_PASSWORD`; optional `ADMIN_SESSION_SECRET`. Never commit them; locally put them in `.dev.vars` (git-ignored).
- Content model: the files in `src/data/` and `src/lib/company.ts` are the **defaults**; whatever the owner saves in the admin is stored as overrides in D1 and merged by `getSite()` in `src/lib/site.ts`. Pages read from `getSite()`, never from the data files directly (fixed design content such as finishes, materials, artwork specs and homepage mosaic still comes from `src/data/home.ts`). Editable page text/images are listed in `src/data/copy.ts`; editable lists are described in `src/components/admin/schema.ts`.
- To make new page text editable: add a field to `src/data/copy.ts` and read `copy['your.key']` from `getSite()` in the page.
- Public pages live in `src/app/(site)/`; `/admin` and `/api` sit outside it so they have no site header/footer. Public pages are rendered per request (`force-dynamic`).
- Enquiry form: `src/components/EnquiryForm.tsx` -> `POST /api/enquiry` (honeypot, minimum fill time, 5 per hour per visitor). Uploaded pictures are served from `/media/<id>` (stored in D1, resized in the browser).
- Local test: put the secrets in `.dev.vars`, run `npx opennextjs-cloudflare build` then `npx opennextjs-cloudflare preview` (local D1).
