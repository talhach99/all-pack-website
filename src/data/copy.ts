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

  f('Industries page', 'hero.industries.title', 'Banner heading', 'Packaging for every industry'),
  f('Industries page', 'hero.industries.accent', 'Banner heading: words in navy (shown after the heading)', 'we serve.'),
  f('Industries page', 'hero.industries.lead', 'Banner text', 'From regulated pharmaceutical lines to e-commerce brands, we build each category\'s requirements into your packaging, from the first sample to the full run.', 'long'),

  f('Finishes page', 'hero.finishes.title', 'Banner heading', 'Finishes that make your packaging'),
  f('Finishes page', 'hero.finishes.accent', 'Banner heading: words in navy (shown after the heading)', 'feel premium.'),
  f('Finishes page', 'hero.finishes.lead', 'Banner text', 'Choose the coating, effect and material that suit your product, and see how each one changes the look and feel of your box.', 'long'),

  f('How it works page', 'hero.how.title', 'Banner heading', 'How ordering with ALL PACK'),
  f('How it works page', 'hero.how.accent', 'Banner heading: words in navy (shown after the heading)', 'works.'),
  f('How it works page', 'hero.how.lead', 'Banner text', 'From your first message to boxes at your door: here is exactly what happens, what we need from you and how long it takes.', 'long'),
  f('How it works page', 'how.usa.min', 'USA: minimum order', 'From 500 units'),
  f('How it works page', 'how.usa.production', 'USA: production time', '12 to 15 business days'),
  f('How it works page', 'how.usa.shipping', 'USA: shipping to the US', '5 to 8 business days'),
  f('How it works page', 'how.pk.min', 'Pakistan: minimum order', 'From 1,000 units'),
  f('How it works page', 'how.pk.production', 'Pakistan: production time', '10 to 12 business days'),
  f('How it works page', 'how.pk.delivery', 'Pakistan: delivery time', '2 to 4 business days'),

  f('About page', 'hero.about.title', 'Banner heading', 'Packaging made with care,'),
  f('About page', 'hero.about.accent', 'Banner heading: words in navy (shown after the heading)', 'from Lahore to Boston.'),
  f('About page', 'hero.about.lead', 'Banner text', 'ALL PACK designs and prints custom packaging for pharmaceutical, food and consumer brands, with teams in the USA and Pakistan.', 'long'),
  f('About page', 'about.story.title', '“Our story”: heading', 'Built on more than 25 years of printing and packaging.'),
  f('About page', 'about.lead', '“Our story”: paragraph 1', 'ALL PACK is a packaging and printing company producing cartons, rigid boxes, corrugated packaging, paper bags and labels for brands in the USA and Pakistan. Printing, finishing and converting are carried out under an ISO 9001:2015 certified quality system.', 'long'),
  f('About page', 'about.story.p2', '“Our story”: paragraph 2', 'Today our Lahore team handles production while our Boston office supports brands across the United States, so every customer gets local service and the same quality standard.', 'long'),
  f('About page', 'about.story.image', '“Our story”: picture', '/photos/hero2-md.webp', 'image'),

  f('Offices (homepage and Offices page)', 'offices.kicker', 'Small label above the heading', 'Our offices'),
  f('Offices (homepage and Offices page)', 'offices.title', 'Heading', 'Headquartered in Lahore. Serving the USA from Boston.'),
  f('Offices (homepage and Offices page)', 'offices.lead', 'Intro text', 'ALL PACK operates from two offices under one quality system. Our Lahore headquarters runs production and serves brands across Pakistan, while our Boston office manages US accounts, from the first quote to delivery.', 'long'),
  f('Offices (homepage and Offices page)', 'offices.lahore.badge', 'Lahore: badge', 'Headquarters'),
  f('Offices (homepage and Offices page)', 'offices.lahore.role', 'Lahore: role', 'Headquarters and production'),
  f('Offices (homepage and Offices page)', 'offices.lahore.text', 'Lahore: description', 'Home to our production, finishing and quality teams for more than 25 years. Every ALL PACK order is printed and inspected here.', 'long'),
  f('Offices (homepage and Offices page)', 'offices.lahore.points', 'Lahore: checklist (one item per line)', 'Printing, finishing and converting\nQuality control under ISO 9001\nSales and delivery across Pakistan\nPayment by bank transfer', 'long'),
  f('Offices (homepage and Offices page)', 'offices.boston.badge', 'Boston: badge', 'US office'),
  f('Offices (homepage and Offices page)', 'offices.boston.role', 'Boston: role', 'US sales and client service'),
  f('Offices (homepage and Offices page)', 'offices.boston.text', 'Boston: description', 'Your point of contact in the United States, working in Eastern Time with quotes in US dollars and support from brief to delivery.', 'long'),
  f('Offices (homepage and Offices page)', 'offices.boston.points', 'Boston: checklist (one item per line)', 'Dedicated account management for US brands\nArtwork support and proof approval\nDelivery to your door, warehouse or 3PL\nVisa, Mastercard, American Express, PayPal and Stripe', 'long'),
  f('Offices (homepage and Offices page)', 'offices.flow.title', 'Steps: heading', 'How our offices work together'),
  f('Offices (homepage and Offices page)', 'offices.step1.title', 'Step 1: title', 'Work with your local office'),
  f('Offices (homepage and Offices page)', 'offices.step1.text', 'Step 1: text', 'US brands work with our Boston team in Eastern Time. Brands in Pakistan work directly with Lahore.', 'long'),
  f('Offices (homepage and Offices page)', 'offices.step2.title', 'Step 2: title', 'Produced at our headquarters'),
  f('Offices (homepage and Offices page)', 'offices.step2.text', 'Step 2: text', 'Every order is printed, finished and inspected in Lahore under one ISO 9001 quality system.', 'long'),
  f('Offices (homepage and Offices page)', 'offices.step3.title', 'Step 3: title', 'Delivered where you need it'),
  f('Offices (homepage and Offices page)', 'offices.step3.text', 'Step 3: text', 'Shipped to your door, warehouse or 3PL in the USA, or delivered anywhere in Pakistan.', 'long'),

  f('Offices page', 'hero.offices.title', 'Banner heading', 'Two offices.'),
  f('Offices page', 'hero.offices.accent', 'Banner heading: words in navy (shown after the heading)', 'One standard of quality.'),
  f('Offices page', 'hero.offices.lead', 'Banner text', 'ALL PACK is headquartered in Lahore, Pakistan, with a US office in Boston, Massachusetts. Wherever you are, you work with a local team and receive the same packaging.', 'long'),

  f('Contact page', 'hero.contact.title', 'Banner heading', 'Let’s talk about'),
  f('Contact page', 'hero.contact.accent', 'Banner heading: words in navy (shown after the heading)', 'your packaging.'),
  f('Contact page', 'hero.contact.lead', 'Banner text', 'Send us your specs, ask a question or request samples. Our Boston and Lahore teams reply within one business day.', 'long'),

  f('Blog page', 'hero.blog.title', 'Banner heading', 'Packaging guides, ideas'),
  f('Blog page', 'hero.blog.accent', 'Banner heading: words in navy (shown after the heading)', 'and know-how.'),
  f('Blog page', 'hero.blog.lead', 'Banner text', 'Guides on box styles, materials, finishes and costs, written for brands ordering custom packaging in the USA and Pakistan.', 'long'),

  f('Footer and site', 'site.description', 'Business description (search engines)', 'ALL PACK makes custom printed packaging, labels and DTF apparel for brands in the USA and Pakistan, with offices in Boston, Massachusetts and Lahore, Pakistan.', 'long'),
  f('Footer and site', 'site.ogImage', 'Share picture (WhatsApp, Facebook, Google)', '/og-image.png', 'image', 'Shown when your site link is shared. Use a wide picture, about 1200 × 630.'),
  f('Footer and site', 'site.logoDark', 'Logo (header and footer)', '/brand/allpack-logo.webp', 'image'),
  f('Footer and site', 'site.logo', 'Logo on dark backgrounds (spare)', '/brand/allpack-logo-light.webp', 'image'),
];

export const COPY_DEFAULTS: Record<string, string> = Object.fromEntries(COPY.map(c => [c.key, c.def]));
