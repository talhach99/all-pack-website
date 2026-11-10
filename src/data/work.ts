/** Packaging ALL PACK has printed for clients (artwork and photos supplied by the owner). */
export type Work = {
  image: string;
  brand: string;
  product: string;
  format: string;
  /** cover: photo with its own setting fills the frame; contain: cut-out pack sits on the card */
  fit: 'cover' | 'contain';
  /** focal point when cropped, e.g. '50% 40%' */
  focus?: string;
};

export const clientWork: Work[] = [
  { image: 'citi-queen-cake-mango', brand: 'Citi', product: 'Queen Cake Mango', format: 'Printed carton', fit: 'cover' },
  { image: 'bunnys-queen-cake', brand: "Bunny's", product: 'Queen Cake', format: 'Printed carton', fit: 'contain' },
  { image: 'hoest-eclair', brand: 'Hoest', product: 'Eclair Milk Toffee', format: 'Window carton', fit: 'cover' },
  { image: 'sun-bread-wrapper', brand: 'Sun Bread', product: 'White Bread', format: 'Printed bread wrapper', fit: 'cover', focus: '50% 48%' },
  { image: 'citi-cake-rusk', brand: 'Citi Bread', product: 'Supreme Cake Rusk', format: 'Window carton', fit: 'cover' },
  { image: 'hoest-drops', brand: 'Hoest', product: 'Drops', format: 'Printed carton', fit: 'contain' },
  { image: 'aloram-carton', brand: 'Aloram', product: '0.25 mg tablets', format: 'Pharmaceutical carton', fit: 'contain' },
  { image: 'artinil-k-gel-carton', brand: 'Artinil-K Gel', product: '20 g tube', format: 'Pharmaceutical carton', fit: 'contain' },
  { image: 'sun-cake-rusk-label', brand: 'Sun', product: 'Cake Rusk', format: 'Printed label', fit: 'contain' },
  { image: 'sun-biscuits-label', brand: 'Sun', product: 'Biscuits', format: 'Printed label', fit: 'contain' },
];

export const workImage = (name: string) => `/work/${name}.webp`;
