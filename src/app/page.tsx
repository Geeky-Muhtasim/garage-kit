import { getAllProducts, getAllCategories, getAllBrands, cleanBrand } from '@/lib/products';
import { Hero } from '@/components/home/Hero';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { BrandsStrip } from '@/components/home/BrandsStrip';
import { TrustBar } from '@/components/home/TrustBar';
import { ProductGrid } from '@/components/product/ProductGrid';
import Link from 'next/link';

export default function HomePage() {
  const products = getAllProducts();
  const categories = getAllCategories();
  const brands = getAllBrands();

  const totalProducts = products.length;
  const totalBrands = brands.length;

  const topBrandNames = new Set(brands.slice(0, 8).map(b => b.name.toLowerCase()));
  const topProducts = products
    .filter(p => {
      const qty = parseInt(p.stock_qty, 10);
      const available = isNaN(qty) || qty > 0;
      return available && topBrandNames.has(cleanBrand(p.brand).toLowerCase());
    })
    .slice(0, 6);

  return (
    <main className="max-w-6xl mx-auto px-5 py-6">
      <section className="mb-6">
        <Hero totalProducts={totalProducts} totalBrands={totalBrands} />
      </section>

      <section className="mb-6">
        <h2 className="text-sm font-medium text-txt mb-3">Shop by Category</h2>
        <CategoryGrid categories={categories.slice(0, 12)} />
      </section>

      <section className="mb-6">
        <BrandsStrip brands={brands} />
      </section>

      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-txt">Best Sellers</h2>
          <Link href="/catalog" className="text-xs text-amber hover:opacity-80 transition-opacity">
            View all →
          </Link>
        </div>
        <ProductGrid products={topProducts} columns={3} />
      </section>

      <section className="mb-6">
        <TrustBar />
      </section>
    </main>
  );
}
