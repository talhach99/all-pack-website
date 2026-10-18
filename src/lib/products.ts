import data from "@/data/products.json";
export type Product = {
  slug: string;
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  materials: string[];
  sizes: string[];
  customization: string[];
  moq: string;
  uses: string[];
  hue: string;
  model: string;
  featured?: boolean;
};
export const products = data as Product[];
export const categories = [...new Set(products.map(p => p.category))];
export const materialFilters = [...new Set(products.flatMap(p => p.materials))];
export const useFilters = [...new Set(products.flatMap(p => p.uses))];
export function findProduct(slug: string) { return products.find(p => p.slug === slug); }
