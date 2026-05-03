import type { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  emptyMessage?: string;
}

const colClass = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
};

export function ProductGrid({ products, columns = 3, emptyMessage = 'No products found.' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center text-txt-2 text-sm">{emptyMessage}</div>
    );
  }

  return (
    <div className={`grid ${colClass[columns]} gap-3 items-stretch`}>
      {products.map(p => (
        <ProductCard key={p.handle} product={p} />
      ))}
    </div>
  );
}
