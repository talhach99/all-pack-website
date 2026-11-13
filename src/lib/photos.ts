/**
 * Site photography, hand-picked from free Unsplash and Pexels libraries (both free for
 * commercial use, no attribution required) and hotlinked from their CDNs, which the CSP allows.
 * Names without a match fall back to the local photo in /public/photos.
 *
 * Values: an Unsplash id ('photo-…') or a Pexels path ('px:ID/file').
 */
export function stockUrl(ref: string, w = 1600) {
  if (ref.startsWith('px:')) return `https://images.pexels.com/photos/${ref.slice(3)}?auto=compress&cs=tinysrgb&w=${w}`;
  return `https://images.unsplash.com/${ref}?auto=format&fit=crop&w=${w}&q=80`;
}

/** Home and capability photos. */
export const STOCK = {
  pressDelivery: 'px:9550363/pexels-photo-9550363.jpeg', // printed carton sheets leaving an offset press
  pressFeeder: 'px:19316517/pexels-photo-19316517/free-photo-of-machinery-in-factory.png',
  gto52: 'photo-1729944950511-e9c71556cfd4', // a Heidelberg GTO 52 — shamin kmrzmn, Unsplash
  offsetRollers: 'px:19837529/pexels-photo-19837529/free-photo-of-gray-industrial-wall.jpeg',
  finishing: 'photo-1676474508989-40ddb421e426', // finishing machine — Unsplash
  checkingSheets: 'px:19843566/pexels-photo-19843566/free-photo-of-man-looking-at-new-printed-papers.jpeg',
  colourCheck: 'photo-1715154470884-1c2be0b0129f', // loupe on a colour chart — Jakub Żerdzicki, Unsplash
  pantone: 'photo-1739146051825-0a1e54e6f1c6',
  kraftStack: 'px:17260158/pexels-photo-17260158/free-photo-of-stack-of-cardboard-boxes.jpeg',
} as const;

const MAP: Record<string, string> = {
  // products, keyed by product model
  shipping: 'px:6169055/pexels-photo-6169055.jpeg',
  mailer: 'px:17260157/pexels-photo-17260157/free-photo-of-close-up-of-cardboard-boxes-and-lids.jpeg',
  gift: 'px:4284289/pexels-photo-4284289.jpeg',
  carton: 'px:9594420/pexels-photo-9594420.jpeg',
  printed: STOCK.kraftStack,
  pizza: 'photo-1605960224189-e0010ea15ca0',
  burger: 'px:2469096/pexels-photo-2469096.jpeg',
  cake: 'px:15807279/pexels-photo-15807279/free-photo-of-boxes-with-cakes-on-handrail.jpeg',
  takeaway: 'px:6969882/pexels-photo-6969882.jpeg',
  cup: 'photo-1598908314732-07113901949e',
  bag: 'px:6956906/pexels-photo-6956906.jpeg',
  pouch: 'px:16100293/pexels-photo-16100293/free-photo-of-minimalist-design-of-packaging.jpeg',
  roll: 'photo-1659167221626-d327b9760e99',
  label: 'photo-1773525912464-d2640e7aff9c',
  tissue: 'px:5556294/pexels-photo-5556294.jpeg',
  bottle: 'photo-1608571423902-eed4a5ad8108',
  jewellery: 'px:29873658/pexels-photo-29873658/free-photo-of-elegant-gemstone-brooches-in-luxury-green-box.jpeg',
  shoe: 'px:4271570/pexels-photo-4271570.jpeg',
  cargo: 'px:5156696/pexels-photo-5156696.jpeg',
  // industries
  ind_ecommerce: 'px:9603487/pexels-photo-9603487.jpeg',
  ind_restaurants: 'px:4628431/pexels-photo-4628431.jpeg',
  ind_bakeries: 'px:23025153/pexels-photo-23025153/free-photo-of-man-hands-holding-box-of-cookies.jpeg',
  ind_cafes: 'photo-1598908314732-07113901949e',
  ind_beauty: 'photo-1608571423902-eed4a5ad8108',
  ind_pharma: 'px:9227775/pexels-photo-9227775.jpeg',
  ind_fashion: 'px:5556294/pexels-photo-5556294.jpeg',
  ind_jewellery: 'px:29873658/pexels-photo-29873658/free-photo-of-elegant-gemstone-brooches-in-luxury-green-box.jpeg',
  // box styles (old /images/home names)
  'mailer-boxes': 'px:17260157/pexels-photo-17260157/free-photo-of-close-up-of-cardboard-boxes-and-lids.jpeg',
  'rigid-drawer-box': 'px:4284289/pexels-photo-4284289.jpeg',
  'shipping-carton': 'px:6169055/pexels-photo-6169055.jpeg',
  'folding-carton': 'px:9594420/pexels-photo-9594420.jpeg',
  'food-boxes': 'px:6969882/pexels-photo-6969882.jpeg',
  'bakery-box': 'px:15807279/pexels-photo-15807279/free-photo-of-boxes-with-cakes-on-handrail.jpeg',
  'paper-bag': 'px:6956906/pexels-photo-6956906.jpeg',
  stickers: 'photo-1773525912464-d2640e7aff9c',
};

export const hasStock = (name: string) => name in MAP;

/** URL for a named photo: stock when mapped, else the local file. */
export function photoUrl(name: string, small = false, dir: 'photos' | 'images/home' = 'photos') {
  const ref = MAP[name];
  if (ref) return stockUrl(ref, small ? 800 : 1600);
  return dir === 'photos' ? `/photos/${name}${small ? '-800' : ''}.webp` : `/images/home/${name}.webp`;
}
