/** Industries ALL PACK designs and produces packaging for. Product slugs refer to src/data/products.json. */
export type Industry = {
  slug: string; name: string; short: string; headline: string; intro: string;
  needs: { t: string; d: string }[]; products: string[]; image: string;
};

export const industries: Industry[] = [
  {
    slug: 'e-commerce', name: 'E-commerce', short: 'Mailers that survive the courier and delight on arrival.',
    headline: 'Packaging that survives the courier and makes the unboxing.',
    intro: 'Online orders get one chance to make a first impression, and it happens on a doorstep. We build mailers and shippers that protect in transit and feel like part of the brand when they are opened.',
    needs: [
      { t: 'Right-sized to cut damage', d: 'Boxes sized around your product move less in transit and use less void fill.' },
      { t: 'Printed inside and out', d: 'An outside that identifies you, an inside that rewards the customer for opening it.' },
      { t: 'Everything for the packing table', d: 'Mailers, poly bags, branded tape, tissue and thank-you stickers from one supplier.' },
    ],
    products: ['ecommerce-mailer-boxes', 'corrugated-shipping-boxes', 'poly-mailers', 'packaging-tape', 'tissue-wrapping', 'labels-stickers', 'protective-wrap'],
    image: 'ind_ecommerce',
  },
  {
    slug: 'restaurants', name: 'Restaurants', short: 'Pizza, burger and takeaway packs that travel well.',
    headline: 'Takeaway packaging that arrives the way it left the kitchen.',
    intro: 'Delivery and takeaway put your food in someone else’s hands. The right board, coating and closure keep it hot, intact and recognisably yours from the pass to the table.',
    needs: [
      { t: 'Food-appropriate materials', d: 'Tell us what goes inside and we recommend a suitable board and coating, subject to your specification.' },
      { t: 'Built for stacking and carrying', d: 'Corrugated pizza boxes, locking clamshells and handled containers that travel well.' },
      { t: 'Your brand on every order', d: 'Printed lids, sleeves, bags and stickers that turn delivery into advertising.' },
    ],
    products: ['pizza-boxes', 'burger-boxes', 'takeaway-containers', 'paper-cups-sleeves', 'kraft-shopping-bags', 'labels-stickers'],
    image: 'ind_restaurants',
  },
  {
    slug: 'bakeries', name: 'Bakeries', short: 'Cake and pastry boxes worthy of what is inside.',
    headline: 'Boxes as carefully made as what goes inside them.',
    intro: 'Cakes, pastries and celebration orders deserve packaging that protects delicate decoration and looks good on the counter, in the car and on the table.',
    needs: [
      { t: 'Windows that sell', d: 'Window cake boxes let the product do the talking while keeping it covered.' },
      { t: 'Sized to the bake', d: 'From single slices to tiered cakes, boxes made to your dimensions.' },
      { t: 'A consistent counter', d: 'Matching boxes, bags and stickers so every order looks like the same brand.' },
    ],
    products: ['cake-boxes', 'folding-cartons', 'kraft-shopping-bags', 'labels-stickers', 'custom-printed-boxes'],
    image: 'ind_bakeries',
  },
  {
    slug: 'cafes', name: 'Cafés', short: 'Cups, sleeves and bags carrying your brand down the street.',
    headline: 'Cups, sleeves and bags that carry your café down the street.',
    intro: 'A branded cup is the most-seen piece of packaging a café owns. We print cups, sleeves, coffee pouches and carry bags that make every order a little advertisement.',
    needs: [
      { t: 'Printed cups and sleeves', d: 'Cupstock and kraft sleeves printed in your colours, subject to specification.' },
      { t: 'Retail coffee and tea', d: 'Stand-up pouches with zips for beans, grounds and loose-leaf tea.' },
      { t: 'Takeaway made simple', d: 'Bags, stickers and containers that match the rest of the counter.' },
    ],
    products: ['paper-cups-sleeves', 'standup-pouches', 'kraft-shopping-bags', 'labels-stickers', 'takeaway-containers'],
    image: 'ind_cafes',
  },
  {
    slug: 'beauty', name: 'Beauty & Personal Care', short: 'Cartons and rigid boxes for shelf-ready cosmetics.',
    headline: 'Shelf-ready cartons for products people choose with their eyes.',
    intro: 'In beauty, the carton is part of the product. We produce folding cartons, rigid gift sets and labels with the print quality and finishes that belong on a shelf.',
    needs: [
      { t: 'Finishes that feel premium', d: 'Foil, soft-touch and spot effects on cartons and rigid boxes.' },
      { t: 'Ranges that match', d: 'Consistent colour and structure across every size in a line.' },
      { t: 'Gift-ready sets', d: 'Rigid boxes and inserts for launches, seasonal sets and PR.' },
    ],
    products: ['folding-cartons', 'bottles-jars', 'rigid-gift-boxes', 'labels-stickers', 'custom-printed-boxes'],
    image: 'ind_beauty',
  },
  {
    slug: 'pharmaceutical', name: 'Pharmaceutical', short: 'Cartons, labels and shippers printed to approved artwork.',
    headline: 'Cartons and labels printed to your approved artwork and specification.',
    intro: 'Healthcare packaging has to be right before it can be beautiful. We print cartons, labels and outer shippers to the artwork and specification you approve, and confirm every detail before production.',
    needs: [
      { t: 'Artwork-led production', d: 'We print exactly what you approve, with a clear proof and specification before anything runs.' },
      { t: 'Cartons and labels', d: 'Folding cartons and labels sized to your packs, in the quantities you need.' },
      { t: 'Outer shippers', d: 'Corrugated cartons for storage and distribution, printed with your marks.' },
    ],
    products: ['folding-cartons', 'labels-stickers', 'corrugated-shipping-boxes', 'cargo-storage-boxes'],
    image: 'ind_pharma',
  },
  {
    slug: 'fashion', name: 'Fashion & Footwear', short: 'Shoe boxes, bags and tissue for a boutique feel.',
    headline: 'A boutique feel, from the shoe box to the shopping bag.',
    intro: 'Fashion customers notice the details. Two-piece shoe boxes, printed tissue, handled bags and mailers that make online orders feel like an in-store purchase.',
    needs: [
      { t: 'The boutique moment', d: 'Rigid and two-piece boxes with printed tissue and seal stickers.' },
      { t: 'Bags people keep', d: 'Paper bags with rope or ribbon handles, in kraft or full colour.' },
      { t: 'Online orders too', d: 'Mailer boxes and poly mailers that carry the same brand to the door.' },
    ],
    products: ['shoe-boxes', 'kraft-shopping-bags', 'tissue-wrapping', 'ecommerce-mailer-boxes', 'poly-mailers'],
    image: 'ind_fashion',
  },
  {
    slug: 'jewellery', name: 'Jewellery', short: 'Small-format presentation boxes with real presence.',
    headline: 'Small boxes with the presence of a much bigger one.',
    intro: 'Jewellery packaging is opened slowly and kept for years. We make presentation boxes, inserts and outer boxes that are as considered as the piece inside.',
    needs: [
      { t: 'Presentation inserts', d: 'Cushions, slots and flocked inserts that hold rings, earrings and pendants.' },
      { t: 'Wrapped rigid boxes', d: 'Textured papers, foil stamping and soft-touch in small formats.' },
      { t: 'Matching outers', d: 'Gift boxes, bags and tissue so the whole set is consistent.' },
    ],
    products: ['jewellery-boxes', 'rigid-gift-boxes', 'kraft-shopping-bags', 'tissue-wrapping'],
    image: 'ind_jewellery',
  },
  {
    slug: 'agriculture', name: 'Agriculture & Produce', short: 'Vented produce cartons built for the supply chain.',
    headline: 'Produce cartons built for the field, the truck and the shelf.',
    intro: 'Fresh produce needs packaging that breathes, stacks and survives the supply chain. We make vented trays, cartons and heavy-duty shippers printed with your mark.',
    needs: [
      { t: 'Strength where it counts', d: 'Board grades chosen for stacking, humidity and the distance travelled.' },
      { t: 'Ventilation and handling', d: 'Vent holes and hand-holes specified for your produce.' },
      { t: 'Clear marking', d: 'Simple one or two-colour print for brand, grade and origin.' },
    ],
    products: ['fruit-produce-boxes', 'cargo-storage-boxes', 'corrugated-shipping-boxes', 'packaging-tape'],
    image: 'ind_agriculture',
  },
];
export const findIndustry = (slug: string) => industries.find(i => i.slug === slug);
