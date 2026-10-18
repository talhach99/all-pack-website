# ALL PACK — Go-Live Checklist

## 1. Verify the brand
- [ ] Approve logo master file and letterhead-derived branding
- [ ] Confirm current Lahore office and map pin
- [ ] Approve official WhatsApp, phone and social media links
- [ ] Review and approve all copy and 22 product concept entries

## 2. Developer setup
- [ ] Run `npm install` with internet connection
- [ ] Run `npm run typecheck` and `npm run build`
- [ ] Launch `npm run dev`; review browser console for errors
- [ ] Add `.env.local` and confirmed phone/social values (never put API keys in NEXT_PUBLIC variables)
- [ ] Provision Resend with a verified sender domain
- [ ] Submit quotes with and without artwork; check actual mailbox receipt
- [ ] Implement/enable host WAF and Redis throttling before wide public traffic

## 3. Launch
- [ ] Push repository to GitHub
- [ ] Connect repo to Vercel (or Next.js-compatible Netlify deployment)
- [ ] Configure environment values in hosting dashboard
- [ ] Use actual live URL for `NEXT_PUBLIC_SITE_URL` and redeploy
- [ ] Test product links, filters, modal, basket, 3D studio, FAQ, map, WhatsApp
- [ ] Check 360/768/1024/1440px and reduced-motion preference
- [ ] Test form keyboard access and 4MB file validation
- [ ] Check source domain and sitemap.xml, robots.txt, product schema, Open Graph previews
- [ ] Measure Lighthouse and optimize based on real report; 90+ is a performance target, not yet verified

## 4. Future content
- [ ] Supply real staff and factory photos; add with owner permission
- [ ] Supply true testimonials and customer logos with permission
- [ ] Replace all sample price formulae with verified cost rules or hide them
- [ ] Integrate a newsletter management provider if campaigns are to be sent
- [ ] Review privacy information and local legal obligations before collecting customer data at scale

## Updated direct contacts

- Phone: 0321-8444590 — website `tel:+923218444590`
- WhatsApp: https://wa.me/923218444590 — test account activation and desktop/mobile behavior.
- Letterhead-based logo redraw: `public/logo.svg`, dark-mode variant `public/logo-dark.svg`; photo reference `docs/brand-reference-letterhead.jpeg`
