import data from '@/data/products.json';
import type { Product, ProductsData } from '@/types/product';

const db = data as unknown as ProductsData;

const GARBAGE_CATEGORY_PREFIX = 'Why Choose Japan Parts?';

export function cleanBrand(raw: string): string {
  return raw.trim().split(/\s+/)[0] || raw.trim();
}

export function cleanCategory(raw: string): string {
  if (!raw || raw.startsWith(GARBAGE_CATEGORY_PREFIX)) return '—';
  return raw;
}

export function getAllProducts(): Product[] {
  return db.products.filter(p => p.name && p.name !== 'Page Not Found');
}

export function getProductByHandle(handle: string): Product | undefined {
  return db.products.find(p => p.handle === handle);
}

export function getProductsByCategory(category: string): Product[] {
  return db.products.filter(p =>
    p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getProductsByBrand(brand: string): Product[] {
  return db.products.filter(p =>
    cleanBrand(p.brand).toLowerCase() === brand.toLowerCase()
  );
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return db.products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    cleanBrand(p.brand).toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.part_id.includes(q)
  );
}

export function getAllCategories(): { name: string; count: number }[] {
  const map = new Map<string, number>();
  db.products.forEach(p => {
    const cat = cleanCategory(p.category);
    if (cat && cat !== '—') map.set(cat, (map.get(cat) ?? 0) + 1);
  });
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllBrands(): { name: string; count: number }[] {
  const map = new Map<string, number>();
  db.products.forEach(p => {
    const name = cleanBrand(p.brand);
    if (name) map.set(name, (map.get(name) ?? 0) + 1);
  });
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const related = product.related_handles
    .map(h => getProductByHandle(h))
    .filter(Boolean) as Product[];
  if (related.length >= limit) return related.slice(0, limit);
  const byCat = getProductsByCategory(product.category)
    .filter(p => p.handle !== product.handle && !product.related_handles.includes(p.handle));
  return [...related, ...byCat].slice(0, limit);
}

export function formatPrice(price: string): string {
  const num = parseInt(price, 10);
  if (isNaN(num)) return '—';
  return '৳' + num.toLocaleString('en-BD');
}

export function getPriceRange(): { min: number; max: number } {
  const prices = db.products
    .map(p => parseInt(p.price, 10))
    .filter(n => !isNaN(n));
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
