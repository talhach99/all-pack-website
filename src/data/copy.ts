/**
 * Every piece of page text and every page image the owner can change in the admin panel (Pages tab).
 * The default is what the site shows until a value is saved; clearing a saved value restores the default.
 * `long` = multi-line text, `image` = picture from the media library.
 */
export type CopyField = { key: string; label: string; group: string; type: 'text' | 'long' | 'image'; def: string; hint?: string };

const f = (group: string, key: string, label: string, def: string, type: CopyField['type'] = 'text', hint?: string): CopyField => ({ key, label, group, type, def, hint });

export const COPY: CopyField[] = [
  f('Announcement bar', 'site.announcement', 'Announcement text', '', 'text', 'Leave empty to hide the bar. Shown at the very top of every page.'),
  f('Announcement bar', 'site.announcement.link', 'Announcement link (optional)', '', 'text', 'For example /contact or https://wa.me/…'),

  f('Home: hero', 'home.eyebrow', 'Small line above the heading', 'Printing & packaging · Lahore · 25+ years'),
  f('Home: hero', 'home.title', 'Heading (first part)', 'Packaging that sells'),
  f('Home: hero', 'home.title2', 'Heading (highlighted part)', 'before it’s opened'),
  f('Home: hero', 'home.lead', 'Introduction', 'Custom printed cartons, rigid boxes, mailers, paper bags and labels, printed on Heidelberg offset presses and finished under one roof in Lahore.', 'long'),
  f('Home: hero', 'home.cta1', 'Main button text', 'Request a quote'),
  f('Home: hero', 'home.cta2', 'Second button text', 'View products'),
  f('Home: hero', 'home.heroImage', 'Hero picture', '/renders/packaging-range.webp', 'image', 'The large product picture under the heading.'),
  f('Home: hero', 'home.heroAlt', 'Hero picture description (for search and screen readers)', 'ALL PACK printed cosmetic packaging: lipstick carton, serum boxes, drawer box and rigid gift boxes'),
  f('Home: hero', 'home.note1.step', 'Callout 1: label', '01 / Structure'), f('Home: hero', 'home.note1.title', 'Callout 1: title', 'Drawer and rigid boxes'), f('Home: hero', 'home.note1.sub', 'Callout 1: detail', 'Built to your product size'),
  f('Home: hero', 'home.note2.step', 'Callout 2: label', '02 / Finish'), f('Home: hero', 'home.note2.title', 'Callout 2: title', 'Foil stamping'), f('Home: hero', 'home.note2.sub', 'Callout 2: detail', 'Gold, silver and holographic'),
  f('Home: hero', 'home.note3.step', 'Callout 3: label', '03 / Finish'), f('Home: hero', 'home.note3.title', 'Callout 3: title', 'Soft-touch lamination'), f('Home: hero', 'home.note3.sub', 'Callout 3: detail', 'Velvet matte surface'),
  f('Home: hero', 'home.trust1', 'Trust line 1', 'ISO 9001:2015 certified'), f('Home: hero', 'home.trust2', 'Trust line 2', 'Halal certified'),
  f('Home: hero', 'home.trust3', 'Trust line 3', 'In-house Heidelberg offset'), f('Home: hero', 'home.trust4', 'Trust line 4', 'Delivery across Pakistan'),

  f('Home: sections', 'home.clients.label', 'Clients strip label', 'Brands that print with ALL PACK'),
  f('Home: sections', 'home.products.kicker', 'Product range: small heading', 'Product range'),
  f('Home: sections', 'home.products.title', 'Product range: heading', 'Eight formats, one production standard'),
  f('Home: sections', 'home.products.sub', 'Product range: introduction', 'Each format is made to your dimensions, board and artwork, then printed, finished and inspected in our Lahore facility.', 'long'),
  f('Home: sections', 'home.mfg.kicker', 'Manufacturing: small heading', 'Manufacturing capabilities'),
  f('Home: sections', 'home.mfg.title', 'Manufacturing: heading', 'Our presses and finishing line'),
  f('Home: sections', 'home.mfg.sub', 'Manufacturing: introduction', 'Offset printing and a complete finishing line under one roof in Lahore, so colour, cut and delivery date remain under our control.', 'long'),
  f('Home: sections', 'home.ind.kicker', 'Industries: small heading', 'Industries'),
  f('Home: sections', 'home.ind.title', 'Industries: heading', 'Packaging for sectors where accuracy matters'),
  f('Home: sections', 'home.ind.sub', 'Industries: introduction', 'Each sector asks something different of its packaging: approved regulatory text, consistent colour across frequent reorders, or impact on a crowded shelf.', 'long'),
  f('Home: sections', 'home.why.kicker', 'Why ALL PACK: small heading', 'Why ALL PACK'),
  f('Home: sections', 'home.why.title', 'Why ALL PACK: heading', 'Why brands trust ALL PACK'),
  f('Home: sections', 'home.why.sub', 'Why ALL PACK: introduction', 'Certified processes, our own presses and a client list built over more than 25 years.', 'long'),
  f('Home: sections', 'home.quote.kicker', 'Quote block: small heading', 'Request a quotation'),
  f('Home: sections', 'home.quote.title', 'Quote block: heading', 'Tell us what you need to pack'),
  f('Home: sections', 'home.quote.lead', 'Quote block: text', 'Share the product dimensions, quantity and artwork. We reply within 24 hours with a specification and price.', 'long'),

  f('Home: sections', 'home.quote.enquiry', 'Quote block: enquiry button text', 'Send an enquiry'),

  f('About page', 'about.title', 'Heading', 'Over 25 years of printing packaging in Lahore'),
  f('About page', 'about.lead', 'Introduction', 'ALL PACK is a packaging and printing company producing cartons, rigid boxes, corrugated packaging, paper bags and labels for brands across Pakistan. Printing, finishing and converting are carried out in our own facility, under an ISO 9001:2015 certified quality system.', 'long'),
  f('About page', 'about.stat.label', 'Large figure caption', 'Years in packaging and print'),
  f('About page', 'about.who.title', '“Who we are”: heading', 'A production partner, not a print broker'),
  f('About page', 'about.who.p1', '“Who we are”: paragraph 1', 'For more than 25 years ALL PACK has produced the packaging that Pakistani brands put in front of their customers: medicine cartons that must carry approved text without error, bakery wrappers that are reordered every week, and gift boxes that have to look right the moment they are opened.', 'long'),
  f('About page', 'about.who.p2', '“Who we are”: paragraph 2', 'Every order is printed on our own Heidelberg offset presses and finished in the same facility. Because no step is handed to a subcontractor, we control the colour, the cut and the delivery date, and we answer for all three.', 'long'),
  f('About page', 'about.who.p3', '“Who we are”: paragraph 3', 'Our clients include pharmaceutical manufacturers, national bakery and confectionery brands, hospitals and restaurant groups. Many have printed with us for years, and the standard they expect is the standard we apply to every new order.', 'long'),
  f('About page', 'about.facility.title', 'Facility section: heading', 'Printing, finishing and converting under one roof'),
  f('About page', 'about.cert.title', 'Certifications section: heading', 'Certified, and trusted by the brands we print for'),

  f('Why ALL PACK page', 'why.title', 'Heading (first part)', 'Why brands keep their packaging'),
  f('Why ALL PACK page', 'why.title2', 'Heading (highlighted part)', 'with ALL PACK'),
  f('Why ALL PACK page', 'why.lead', 'Introduction', 'Certified processes, our own presses and more than 25 years in production. Every order runs against a written specification and a signed proof.', 'long'),

  f('Products page', 'products.title', 'Heading (first part)', 'Custom packaging, specified and'),
  f('Products page', 'products.title2', 'Heading (highlighted part)', 'printed in Lahore'),
  f('Products page', 'products.lead', 'Introduction', 'Eight formats, each made to your dimensions, board grade and artwork, then printed and finished in our own facility. Choose a format below for its styles, board and finishes.', 'long'),
  f('Products page', 'products.advice.title', 'Bottom banner: heading', 'Unsure which format suits your product?'),
  f('Products page', 'products.advice.text', 'Bottom banner: text', 'Send a photograph and the product dimensions. We will recommend a structure, board grade and finish, and quote for it.', 'long'),

  f('Industries page', 'industries.title', 'Heading (first part)', 'Packaging for the sectors'),
  f('Industries page', 'industries.title2', 'Heading (highlighted part)', 'we know best'),
  f('Industries page', 'industries.lead', 'Introduction', 'Regulated text, food-grade board, shelf impact or courier strength. Each sector asks something different of its packaging, and we produce for all of them every week.', 'long'),

  f('Contact page', 'contact.title', 'Heading', 'Request a packaging quotation'),
  f('Contact page', 'contact.lead', 'Introduction', 'Send your product dimensions, quantity and artwork by WhatsApp, email or the form below. We reply within 24 hours with a specification and price.', 'long'),
  f('Contact page', 'contact.form.title', 'Enquiry form: heading', 'Send us your enquiry'),
  f('Contact page', 'contact.form.text', 'Enquiry form: text', 'Leave your details and your question. We will contact you on WhatsApp or by email.', 'long'),
  f('Contact page', 'contact.visit', 'Visit note', 'Visits are welcome by appointment. Message us on WhatsApp ahead so the right person is available to meet you.', 'long'),

  f('FAQ page', 'faq.title', 'Heading', 'Ordering custom packaging, explained'),
  f('FAQ page', 'faq.lead', 'Introduction', 'Order quantities, sizes, artwork, proofs, finishes and delivery: the questions we are asked most often before an order is placed.', 'long'),
  f('Guides page', 'insights.title', 'Heading', 'Packaging guides from the press floor'),
  f('Guides page', 'insights.lead', 'Introduction', 'In-depth guides on custom box types, what printed packaging costs in Pakistan, and how pharmaceutical cartons are specified and printed.', 'long'),

  f('Footer and site', 'footer.blurb', 'Footer description', 'Custom printed packaging for pharmaceutical, food and retail brands, produced in Lahore and delivered across Pakistan.', 'long'),
  f('Footer and site', 'footer.copyright', 'Copyright line', 'ALL PACK. The Packaging Experts, Lahore.'),
  f('Footer and site', 'site.description', 'Business description (search engines)', 'Packaging and printing company in Lahore producing custom printed cartons, rigid boxes, mailer boxes, paper bags and labels.', 'long'),
  f('Footer and site', 'site.ogImage', 'Share picture (WhatsApp, Facebook, Google)', '/og-image.png', 'image', 'Shown when your site link is shared. Use a wide picture, about 1200 × 630.'),
  f('Footer and site', 'site.logo', 'Logo (on dark background)', '/brand/allpack-logo-light.webp', 'image'),
  f('Footer and site', 'site.logoDark', 'Logo (on light background)', '/brand/allpack-logo.webp', 'image'),
];

export const COPY_DEFAULTS: Record<string, string> = Object.fromEntries(COPY.map(c => [c.key, c.def]));
