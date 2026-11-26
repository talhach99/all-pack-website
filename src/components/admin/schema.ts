/** Describes the editable lists (products, industries, clients, guides …) so one generic form can edit them all. */
export type Field = {
  k: string; label: string; t: 'text' | 'long' | 'image' | 'lines' | 'select' | 'bool' | 'array' | 'group' | 'blocks';
  hint?: string; options?: [string, string][]; fields?: Field[]; item?: string; max?: number;
};
export type CollectionDef = { key: string; title: string; intro: string; itemName: string; titleOf: string; fields: Field[] };

const imageHint = 'Pick from the Images library or upload a new picture.';
const FIT: Field = { k: 'fit', label: 'How the picture sits in its tile', t: 'select', options: [['contain', 'Whole product on white (product photos)'], ['cover', 'Photo fills the tile (lifestyle photos)']] };

export const COLLECTIONS: CollectionDef[] = [
  {
    key: 'heroSlides', title: 'Homepage slides', itemName: 'slide', titleOf: 'title',
    intro: 'The three large slides at the top of the homepage. They change every 6 seconds; the order here is the order on the site.',
    fields: [
      { k: 'kicker', label: 'Small line above the heading', t: 'text' },
      { k: 'title', label: 'Heading', t: 'text' },
      { k: 'text', label: 'Text under the heading', t: 'long' },
      { k: 'cta', label: 'Button text', t: 'text' },
      { k: 'href', label: 'Button link', t: 'text', hint: 'For example /products, /contact or /products#mailer' },
      { k: 'image', label: 'Picture', t: 'image', hint: 'A wide photo, at least 1600 pixels across.' },
      { k: 'alt', label: 'Picture description (for search engines and screen readers)', t: 'text' },
      { k: 'tab', label: 'Short name under the slide (for example Premium packaging)', t: 'text' },
      { k: 'cutout', label: 'Picture has a transparent background (show it on a light cream card)', t: 'bool' },
      { k: 'bg', label: 'Background color behind the slide', t: 'text', hint: 'A color code such as #EDE6DC. Leave empty for the default.' },
    ],
  },
  {
    key: 'strip', title: 'Homepage: sliding row', itemName: 'picture', titleOf: 'label',
    intro: 'The row of product pictures that slides across the homepage, under “Custom packaging that fits your brand”. Tall pictures (about 4:5) look best.',
    fields: [{ k: 'label', label: 'Label on the picture', t: 'text' }, { k: 'src', label: 'Picture', t: 'image', hint: imageHint }],
  },
  {
    key: 'mosaic', title: 'Homepage: product tiles', itemName: 'tile', titleOf: 'name',
    intro: 'The grid of product tiles in the “Packaging for every product” section of the homepage. Each tile links to the Products page.',
    fields: [
      { k: 'name', label: 'Product name (label on the tile)', t: 'text' },
      { k: 'src', label: 'Picture', t: 'image', hint: imageHint },
      FIT,
      { k: 'white', label: 'White tile with a thin border (instead of light grey)', t: 'bool' },
    ],
  },
  {
    key: 'printRows', title: 'Homepage: pouches, DTF and offset', itemName: 'section', titleOf: 'title',
    intro: 'The “Three ways to print your brand” sections on the homepage: Pouches, DTF printing and Offset printing, each with its own pictures.',
    fields: [
      { k: 'kicker', label: 'Small label (for example 01 · Flexible packaging)', t: 'text' },
      { k: 'title', label: 'Heading', t: 'text' },
      { k: 'text', label: 'Text under the heading', t: 'long' },
      { k: 'link', label: 'Link text (goes to the contact page)', t: 'text', hint: 'For example Get pouch pricing' },
      { k: 'bg', label: 'Background color', t: 'text', hint: 'A color code such as #F4F5F8.' },
      { k: 'cards', label: 'Cards with pictures', t: 'array', item: 'card', fields: [
        { k: 'name', label: 'Card title', t: 'text' },
        { k: 'src', label: 'Picture', t: 'image', hint: imageHint },
        { k: 'desc', label: 'Short description (optional, shown on larger screens)', t: 'long' },
        FIT,
      ] },
    ],
  },
  {
    key: 'benefits', title: 'Homepage: benefits', itemName: 'benefit', titleOf: 'title',
    intro: 'The three white cards (Made to your spec, Better prices at volume, Delivered on schedule) under the sliding row on the homepage.',
    fields: [
      { k: 'title', label: 'Title', t: 'text' },
      { k: 'text', label: 'Text', t: 'long' },
      { k: 'icon', label: 'Icon', t: 'select', options: [['box', 'Box'], ['tag', 'Price tag'], ['truck', 'Delivery truck']] },
    ],
  },
  {
    key: 'catalog', title: 'Products', itemName: 'product section', titleOf: 'title',
    intro: 'The sections of the Products page (Folding cartons, Mailer boxes …) and the products inside each. A product without a picture stays hidden until you add one, so you can prepare it in advance.',
    fields: [
      { k: 'title', label: 'Section name', t: 'text' },
      { k: 'desc', label: 'One-line description', t: 'text' },
      { k: 'banner', label: 'Wide banner picture above the products (optional)', t: 'image', hint: 'Leave empty for no banner. A wide photo, at least 1400 pixels across.' },
      { k: 'items', label: 'Products in this section', t: 'array', item: 'product', fields: [
        { k: 'name', label: 'Product name', t: 'text' },
        { k: 'src', label: 'Picture', t: 'image', hint: imageHint },
        { k: 'fit', label: 'How the picture sits in its tile', t: 'select', options: [['contain', 'Whole product on white (product photos)'], ['cover', 'Photo fills the tile (lifestyle photos)']] },
      ] },
    ],
  },
  {
    key: 'newArrivals', title: 'New arrivals', itemName: 'product', titleOf: 'name',
    intro: 'The “New arrivals” carousel near the top of the Products page.',
    fields: [{ k: 'name', label: 'Product name', t: 'text' }, { k: 'src', label: 'Picture', t: 'image', hint: imageHint }, { k: 'fit', label: 'How the picture sits in its tile', t: 'select', options: [['contain', 'Whole product on white (product photos)'], ['cover', 'Photo fills the tile (lifestyle photos)']] }],
  },
  {
    key: 'industries', title: 'Industries', itemName: 'industry', titleOf: 'name',
    intro: 'The industries on the Industries page: the buttons at the top, the cards and the detailed sections.',
    fields: [
      { k: 'name', label: 'Industry name', t: 'text' },
      { k: 'kicker', label: 'Small heading on its section', t: 'text' },
      { k: 'desc', label: 'Card text (one sentence)', t: 'long' },
      { k: 'long', label: 'Section paragraph', t: 'long' },
      { k: 'points', label: 'Key points (one per line)', t: 'lines' },
      { k: 'products', label: 'Products for this industry (one per line)', t: 'lines' },
      { k: 'short', label: 'Short name used in buttons (for example pharma packaging)', t: 'text' },
      { k: 'src', label: 'Picture', t: 'image', hint: imageHint },
      { k: 'fit', label: 'How the picture sits in its tile', t: 'select', options: [['contain', 'Whole product on white (product photos)'], ['cover', 'Photo fills the tile (lifestyle photos)']] },
    ],
  },
  {
    key: 'materials', title: 'Finishes: materials', itemName: 'material', titleOf: 'name',
    intro: 'The “Choose your board and film” cards on the Finishes page.',
    fields: [
      { k: 'name', label: 'Material name', t: 'text' },
      { k: 'desc', label: 'Description', t: 'long' },
      { k: 'src', label: 'Picture', t: 'image', hint: imageHint },
      FIT,
      { k: 'bg', label: 'Background color behind the picture', t: 'text', hint: 'A color code such as #FFFFFF.' },
    ],
  },
  {
    key: 'steps', title: 'Ordering steps', itemName: 'step', titleOf: 'title',
    intro: 'The steps on the How it works page, also shown in its top banner.',
    fields: [
      { k: 'n', label: 'Number (for example 01)', t: 'text' },
      { k: 'title', label: 'Step name', t: 'text' },
      { k: 'time', label: 'How long it takes', t: 'text', hint: 'For example 1 to 2 business days' },
      { k: 'send', label: 'What the customer sends (one per line)', t: 'lines' },
      { k: 'get', label: 'What the customer gets (one per line)', t: 'lines' },
    ],
  },
  {
    key: 'homeFaqs', title: 'Homepage FAQs', itemName: 'question', titleOf: 'q',
    intro: 'Questions in the FAQ section at the bottom of the homepage.',
    fields: [{ k: 'q', label: 'Question', t: 'text' }, { k: 'a', label: 'Answer', t: 'long' }],
  },
  {
    key: 'howFaqs', title: 'How it works FAQs', itemName: 'question', titleOf: 'q',
    intro: 'Questions on the How it works page. They also feed Google’s FAQ data for that page.',
    fields: [{ k: 'q', label: 'Question', t: 'text' }, { k: 'a', label: 'Answer', t: 'long' }],
  },
  {
    key: 'clients', title: 'Clients', itemName: 'client', titleOf: 'name',
    intro: 'Logos in the “Trusted by” strip on the homepage and the About page.',
    fields: [
      { k: 'name', label: 'Client name', t: 'text' },
      { k: 'logo', label: 'Logo', t: 'image', hint: 'A logo on a white or transparent background looks best.' },
      { k: 'wide', label: 'Wide logo (shown slightly smaller so it fits the tile)', t: 'bool' },
    ],
  },
  {
    key: 'articles', title: 'Blog', itemName: 'article', titleOf: 'title',
    intro: 'Blog articles. Each article has its own address (/blog/…), made from its title. Dates update automatically when you change an article.',
    fields: [
      { k: 'title', label: 'Title (heading of the article)', t: 'text' },
      { k: 'category', label: 'Category', t: 'text' },
      { k: 'excerpt', label: 'Short excerpt (shown on the blog list)', t: 'long' },
      { k: 'summary', label: 'Summary (the direct answer shown first)', t: 'long' },
      { k: 'takeaways', label: 'Key takeaways (one per line, shown in a box at the top)', t: 'lines' },
      { k: 'market', label: 'Which office the quote buttons go to', t: 'select', options: [['pk', 'Lahore (Pakistan buyers)'], ['us', 'Boston (US buyers)']] },
      { k: 'keywords', label: 'Keywords (one per line)', t: 'lines' },
      { k: 'hero', label: 'Main picture', t: 'group', fields: [{ k: 'src', label: 'Picture', t: 'image', hint: imageHint }, { k: 'alt', label: 'Picture description', t: 'text' }, { k: 'cover', label: 'Full photo (fills the frame, no white border)', t: 'bool' }] },
      { k: 'sections', label: 'Sections', t: 'array', item: 'section', fields: [{ k: 'heading', label: 'Section heading', t: 'text' }, { k: 'body', label: 'Content', t: 'blocks' }] },
      { k: 'faqs', label: 'Questions at the end', t: 'array', item: 'question', fields: [{ k: 'q', label: 'Question', t: 'text' }, { k: 'a', label: 'Answer', t: 'long' }] },
      { k: 'related', label: 'Related articles (one article address per line)', t: 'lines', hint: 'The address is the part after /blog/.' },
    ],
  },
];

export const newItem = (fields: Field[]): Record<string, unknown> => {
  const o: Record<string, unknown> = {};
  for (const f of fields) o[f.k] = f.t === 'array' || f.t === 'lines' || f.t === 'blocks' ? [] : f.t === 'bool' ? false : f.t === 'group' ? newItem(f.fields!) : f.t === 'select' ? f.options![0][0] : '';
  return o;
};
