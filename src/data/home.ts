/**
 * Homepage content. Photos are free Unsplash images, hotlinked as Unsplash asks
 * (images.unsplash.com is allowed in the CSP). Machine photos are stand-ins until
 * the owner's own photos of the presses are added.
 */
import { STOCK, stockUrl } from '@/lib/photos';

export const unsplash = (ref: string, w = 1600) => stockUrl(ref, w);


export const tickerPoints = [
  'More than 25 years of printing',
  'In-house Heidelberg offset printing',
  'Printed to approved artwork',
  'Die-cutting, lamination and gluing',
  'Trusted by pharma and food brands',
  'Clear quotes before print',
  'Delivery across Pakistan',
];

/** What we print, grouped the way buyers think about it. Formats link to their product pages. */
export const sectors = [
  {
    name: 'Pharmaceutical',
    d: 'Cartons, inserts and labels printed to your approved artwork, with the exact text and colour your regulator signed off.',
    img: stockUrl(STOCK.pharmaCarton, 900), contain: false,
    formats: [['Folding cartons', '/products/folding-cartons'], ['Labels and stickers', '/products/labels-stickers'], ['Corrugated shippers', '/products/corrugated-shipping-boxes']],
    href: '/industries/pharmaceutical',
  },
  {
    name: 'Food and bakery',
    d: 'Cake, rusk and confectionery cartons, window boxes and bread wrappers for bakeries and food brands.',
    img: stockUrl(STOCK.windowBox, 900), contain: false,
    formats: [['Cake and bakery boxes', '/products/cake-boxes'], ['Folding cartons', '/products/folding-cartons'], ['Takeaway containers', '/products/takeaway-containers']],
    href: '/industries/bakeries',
  },
  {
    name: 'Retail and e-commerce',
    d: 'Rigid gift boxes, printed mailers, paper bags and shipping cartons for brands that sell in shops and online.',
    img: stockUrl(STOCK.kraftStack, 900), contain: false,
    formats: [['Rigid gift boxes', '/products/rigid-gift-boxes'], ['E-commerce mailers', '/products/ecommerce-mailer-boxes'], ['Paper bags', '/products/kraft-shopping-bags']],
    href: '/industries/e-commerce',
  },
];

export const machines = [
  { name: 'Heidelberg 4-colour offset', type: 'Four-colour sheetfed offset', d: 'All four process colours in a single pass, for sharp, consistent colour across long carton runs.', best: ['Pharma cartons', 'Food cartons', 'Retail packaging'], img: STOCK.pressFeeder },
  { name: 'Heidelberg GTO 52', type: 'Small-format offset', d: 'A precise small-format press for labels, inserts, leaflets and shorter runs that still need offset quality.', best: ['Labels', 'Leaflets and inserts', 'Short runs'], img: STOCK.gto52 },
  { name: 'Solna 125', type: 'Offset press', d: 'A workhorse offset press that adds capacity for larger orders and keeps delivery dates on schedule.', best: ['Volume runs', 'Wrappers', 'Cartons'], img: STOCK.offsetRollers },
  { name: 'Finishing line', type: 'Post-press', d: 'Die-cutting, creasing, lamination, varnish and gluing, so every sheet leaves as a finished box.', best: ['Die-cutting and creasing', 'Lamination and varnish', 'Folding and gluing'], img: STOCK.finishing },
];

export const steps = [
  { t: 'Send your brief', d: 'Product, size and quantity on WhatsApp or email. A photo or an old box is enough to start.' },
  { t: 'Proof and price', d: 'We suggest the board, structure and finish, and confirm the price and delivery date in writing.' },
  { t: 'Print and finish', d: 'Printed on our own presses, then die-cut, laminated and glued.' },
  { t: 'Delivered', d: 'Checked against the proof, packed by quantity and delivered across Pakistan.' },
];

export const reasons = [
  { t: 'Machines in house', d: 'Printing and finishing under one roof, so colour, quality and dates stay in our hands.' },
  { t: 'Printed to approved artwork', d: 'Pharmaceutical and food clients rely on exact text, colour and batch-to-batch consistency.' },
  { t: 'One supplier', d: 'From the label to the shipping carton, one team and one point of contact.' },
  { t: 'Straight answers', d: 'A clear yes or no on what will work, and a price before anything is printed.' },
];
