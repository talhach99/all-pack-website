/** Describes the editable lists (products, industries, clients, guides …) so one generic form can edit them all. */
export type Field = {
  k: string; label: string; t: 'text' | 'long' | 'image' | 'lines' | 'select' | 'bool' | 'array' | 'group' | 'blocks';
  hint?: string; options?: [string, string][]; fields?: Field[]; item?: string; max?: number;
};
export type CollectionDef = { key: string; title: string; intro: string; itemName: string; titleOf: string; fields: Field[] };

const imageHint = 'Pick from the Images library or upload a new picture.';

export const COLLECTIONS: CollectionDef[] = [
  {
    key: 'families', title: 'Products', itemName: 'product', titleOf: 'name',
    intro: 'The packaging formats shown on the Products page, the homepage and the footer. Use the arrows to change the order.',
    fields: [
      { k: 'name', label: 'Product name', t: 'text' },
      { k: 'label', label: 'Small label above the name', t: 'text', hint: 'For example Premium or Food service.' },
      { k: 'short', label: 'One-line summary', t: 'text' },
      { k: 'description', label: 'Description', t: 'long' },
      { k: 'image', label: 'Picture', t: 'image', hint: imageHint },
      { k: 'alt', label: 'Picture description (for search engines and screen readers)', t: 'text' },
      { k: 'specs', label: 'Specification rows', t: 'array', item: 'row', fields: [{ k: 'title', label: 'Row title (for example Styles)', t: 'text' }, { k: 'items', label: 'Items (one per line)', t: 'lines' }] },
    ],
  },
  {
    key: 'sectors', title: 'Industries', itemName: 'industry', titleOf: 'name',
    intro: 'The sectors shown on the Industries page. The homepage shows four of them.',
    fields: [
      { k: 'name', label: 'Industry name', t: 'text' },
      { k: 'summary', label: 'Short summary', t: 'long' },
      { k: 'detail', label: 'Detail paragraph', t: 'long' },
      { k: 'formats', label: 'Formats we produce (one per line)', t: 'lines', hint: 'Use product names exactly as written in Products so they link and show the right picture.' },
      { k: 'clients', label: 'Clients in this industry (one per line)', t: 'lines' },
    ],
  },
  {
    key: 'clients', title: 'Clients', itemName: 'client', titleOf: 'name',
    intro: 'Logos in the sliding strip on the homepage and About page.',
    fields: [
      { k: 'name', label: 'Client name', t: 'text' },
      { k: 'logo', label: 'Logo', t: 'image', hint: 'A logo on a white or transparent background looks best.' },
      { k: 'wide', label: 'Wide logo (shown slightly smaller so it fits the tile)', t: 'bool' },
    ],
  },
  {
    key: 'faqs', title: 'FAQs', itemName: 'question', titleOf: 'q',
    intro: 'Questions on the FAQ page. They also feed Google’s FAQ data.',
    fields: [{ k: 'q', label: 'Question', t: 'text' }, { k: 'a', label: 'Answer', t: 'long' }],
  },
  {
    key: 'machines', title: 'Machines', itemName: 'machine', titleOf: 'name',
    intro: 'The presses and finishing line shown in “Our presses and finishing line”.',
    fields: [
      { k: 'name', label: 'Name', t: 'text' }, { k: 'type', label: 'Type', t: 'text' }, { k: 'text', label: 'Description', t: 'long' },
      { k: 'best', label: 'Best for (one per line)', t: 'lines' }, { k: 'image', label: 'Photo', t: 'image', hint: imageHint },
    ],
  },
  {
    key: 'process', title: 'Process steps', itemName: 'step', titleOf: 'title',
    intro: 'The four production steps shown on the homepage and Why ALL PACK page.',
    fields: [{ k: 'step', label: 'Step name (for example Prepress)', t: 'text' }, { k: 'title', label: 'Title', t: 'text' }, { k: 'text', label: 'Text', t: 'long' }],
  },
  {
    key: 'reasons', title: 'Why-us cards', itemName: 'card', titleOf: 'title',
    intro: 'The four proof points in “Why brands trust ALL PACK”.',
    fields: [
      { k: 'badge', label: 'Badge', t: 'select', options: [['iso', 'ISO certificate'], ['halal', 'Halal certificate'], ['25+', '“25+” number'], ['factory', 'Factory icon']] },
      { k: 'title', label: 'Title', t: 'text' }, { k: 'text', label: 'Text', t: 'long' },
    ],
  },
  {
    key: 'principles', title: 'Principles', itemName: 'principle', titleOf: 'title',
    intro: 'The four principles on the Why ALL PACK page.',
    fields: [{ k: 'title', label: 'Title', t: 'text' }, { k: 'text', label: 'Text', t: 'long' }],
  },
  {
    key: 'articles', title: 'Guides', itemName: 'guide', titleOf: 'title',
    intro: 'The packaging guides (blog). Each guide has its own address, made from its title. Dates update automatically when you change a guide.',
    fields: [
      { k: 'title', label: 'Title (heading of the guide)', t: 'text' },
      { k: 'category', label: 'Category', t: 'text' },
      { k: 'excerpt', label: 'Short excerpt (shown on the guides list)', t: 'long' },
      { k: 'summary', label: 'Summary (the direct answer shown first)', t: 'long' },
      { k: 'keywords', label: 'Keywords (one per line)', t: 'lines' },
      { k: 'hero', label: 'Main picture', t: 'group', fields: [{ k: 'src', label: 'Picture', t: 'image', hint: imageHint }, { k: 'alt', label: 'Picture description', t: 'text' }] },
      { k: 'sections', label: 'Sections', t: 'array', item: 'section', fields: [{ k: 'heading', label: 'Section heading', t: 'text' }, { k: 'body', label: 'Content', t: 'blocks' }] },
      { k: 'faqs', label: 'Questions at the end', t: 'array', item: 'question', fields: [{ k: 'q', label: 'Question', t: 'text' }, { k: 'a', label: 'Answer', t: 'long' }] },
      { k: 'related', label: 'Related guides (one guide address per line)', t: 'lines', hint: 'The address is the part after /insights/.' },
    ],
  },
];

export const newItem = (fields: Field[]): Record<string, unknown> => {
  const o: Record<string, unknown> = {};
  for (const f of fields) o[f.k] = f.t === 'array' || f.t === 'lines' || f.t === 'blocks' ? [] : f.t === 'bool' ? false : f.t === 'group' ? newItem(f.fields!) : f.t === 'select' ? f.options![0][0] : '';
  return o;
};
