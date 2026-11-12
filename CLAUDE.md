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
- Real photos preferred over AI-generated ones.
