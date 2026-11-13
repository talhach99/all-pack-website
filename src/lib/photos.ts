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
  cleanPlant: 'photo-1651525670033-279c26cc2347', // pallet of printed cartons in a clean, bright plant
  pressFeeder: 'px:19316517/pexels-photo-19316517/free-photo-of-machinery-in-factory.png',
  gto52: 'photo-1729944950511-e9c71556cfd4', // a Heidelberg GTO 52 — shamin kmrzmn, Unsplash
  offsetRollers: 'px:19837529/pexels-photo-19837529/free-photo-of-gray-industrial-wall.jpeg',
  finishing: 'photo-1676474508989-40ddb421e426', // finishing machine — Unsplash
  checkingSheets: 'px:19843566/pexels-photo-19843566/free-photo-of-man-looking-at-new-printed-papers.jpeg',
  colourCheck: 'photo-1715154470884-1c2be0b0129f', // loupe on a colour chart — Jakub Żerdzicki, Unsplash
  pantone: 'photo-1739146051825-0a1e54e6f1c6',
  kraftStack: 'px:17260158/pexels-photo-17260158/free-photo-of-stack-of-cardboard-boxes.jpeg',
  // packaging showcase (Unsplash) — stand-ins until the owner's own job photos arrive
  printedCartons: 'photo-1617825295690-28ae56c56135',
  pharmaCarton: 'photo-1762328494330-6bed4db5e7f9',
  serumCarton: 'photo-1648712788983-11311123c622',
  windowBox: 'photo-1771333297902-1a05063aec2e',
  cupcakeBox: 'photo-1771016833994-400a164912ac',
  cosmeticCartons: 'photo-1633793566189-8e9fe6f817fc',
  foilGiftBox: 'photo-1772925450192-8c79e42f458e',
  foilCard: 'photo-1765483469974-3f544df12caf',
  softTouch: 'photo-1597979732130-9d2ad18df38b',
  drawerBox: 'photo-1595246135406-803418233494',
  gableBox: 'photo-1626253934161-08cfea22e968',
  printedTape: 'photo-1585221330389-24fb30535ec7',
  printedKraft: 'photo-1556227996-370b60576b84',
  kraftLids: 'photo-1686632979221-62fab48a9028',
  plainCarton: 'photo-1631010231888-777b6285ef84',
  tapedShippers: 'photo-1766040923580-16ad32fae8b4',
  polyMailer: 'photo-1617909516764-0507fdb74882',
  produceCrate: 'photo-1635341083777-5f93a755e916',
  harvest: 'photo-1535379453347-1ffd615e2e08',
  pressRun: 'photo-1503694978374-8a2fa686963a',
  loupe: 'photo-1510511336377-1a9caa095849',
  pressHall: 'photo-1693031630146-568e2f72db0e',
} as const;

const MAP: Record<string, string> = {
  // products, keyed by product model
  shipping: 'px:6169055/pexels-photo-6169055.jpeg',
  mailer: 'px:17260157/pexels-photo-17260157/free-photo-of-close-up-of-cardboard-boxes-and-lids.jpeg',
  gift: 'px:4284289/pexels-photo-4284289.jpeg',
  carton: 'px:9594420/pexels-photo-9594420.jpeg',
  printed: STOCK.kraftStack,
  pizza: 'photo-1615887087343-6a32f45f27a4',
  pizza_stack: 'photo-1693165074774-1901a0da6839',
  pizza_print: 'photo-1775595711683-fe34d973e48b',
  pizza_open: 'photo-1759197402953-d0b3b2ff02c1',
  burger: 'photo-1783068988440-f6ecb5414b15',
  burger_hand: 'photo-1611005705440-0f3997394be7',
  burger_pair: 'photo-1671538174996-0ee4572830df',
  fries: 'photo-1716973208261-46f8ee456c43',
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
  // previously local-only
  tape: STOCK.printedTape,
  mailerbag: STOCK.polyMailer,
  produce: STOCK.produceCrate,
  ind_agriculture: STOCK.harvest,
  fin_foil: STOCK.foilGiftBox,
  fin_kraft: STOCK.printedKraft,
  fin_soft: STOCK.softTouch,
  fin_print: STOCK.printedCartons,
};

export const hasStock = (name: string) => name in MAP;

/** URL for a named photo: stock when mapped, else the local file. */
export function photoUrl(name: string, small = false, dir: 'photos' | 'images/home' = 'photos') {
  const ref = MAP[name];
  if (ref) return stockUrl(ref, small ? 800 : 1600);
  return dir === 'photos' ? `/photos/${name}${small ? '-800' : ''}.webp` : `/images/home/${name}.webp`;
}
