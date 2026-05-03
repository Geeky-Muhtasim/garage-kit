import Link from 'next/link';
import { getAllProducts, getAllBrands, cleanBrand, cleanCategory, formatPrice } from '@/lib/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { BrandsStrip } from '@/components/home/BrandsStrip';

const MAINTENANCE_CATS = new Set(['LUBRICANT', 'AC FILTER', 'OIL FILTER', 'AIRFILTER', 'WIPER BLADE']);

export default function DealsPage() {
  const all = getAllProducts();
  const brands = getAllBrands();

  const budgetPicks = all
    .filter(p => {
      const price = parseInt(p.price, 10);
      return price > 0 && price <= 2000;
    })
    .sort((a, b) => parseInt(a.price, 10) - parseInt(b.price, 10))
    .slice(0, 8);

  const essentials = all
    .filter(p => MAINTENANCE_CATS.has(cleanCategory(p.category).toUpperCase()))
    .slice(0, 8);

  const budgetTotal = all.filter(p => {
    const price = parseInt(p.price, 10);
    return price > 0 && price <= 2000;
  }).length;

  return (
    <div className="max-w-6xl mx-auto px-5 py-6">
      {/* Hero banner */}
      <div className="bg-surf border-[0.5px] border-bdr rounded-xl p-7 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber text-bg text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">
              Featured
            </span>
            <span className="text-[10px] text-txt-3">Updated daily</span>
          </div>
          <h1 className="text-2xl font-medium text-txt mb-1">Deals & Featured</h1>
          <p className="text-xs text-txt-2 max-w-sm">
            Budget picks, maintenance essentials, and performance parts from Japan&apos;s top brands.
          </p>
        </div>
        <Link
          href="/catalog"
          className="shrink-0 bg-amber text-bg font-medium text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
        >
          Browse all {all.length}+ parts →
        </Link>
      </div>

      {/* Section 1 — Budget picks */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-medium text-txt">Budget Workshop</h2>
            <p className="text-[10px] text-txt-3 mt-0.5">Under ৳2,000 · {budgetTotal} parts</p>
          </div>
          <Link
            href="/catalog?maxPrice=2000"
            className="text-xs text-amber hover:text-amber-lt transition-colors"
          >
            View all {budgetTotal} →
          </Link>
        </div>
        {budgetPicks.length > 0 ? (
          <ProductGrid products={budgetPicks} columns={4} />
        ) : (
          <p className="text-sm text-txt-3">No budget picks available.</p>
        )}
      </section>

      {/* Section 2 — Maintenance essentials */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-medium text-txt">Maintenance Essentials</h2>
            <p className="text-[10px] text-txt-3 mt-0.5">
              Lubricants · Filters · Wiper Blades
            </p>
          </div>
          <Link
            href="/catalog?category=LUBRICANT"
            className="text-xs text-amber hover:text-amber-lt transition-colors"
          >
            Shop maintenance →
          </Link>
        </div>
        {essentials.length > 0 ? (
          <ProductGrid products={essentials} columns={4} />
        ) : (
          <p className="text-sm text-txt-3">No maintenance products found.</p>
        )}
      </section>

      {/* Section 3 — Performance brands */}
      <section className="mb-6">
        <h2 className="text-sm font-medium text-txt mb-4">Performance Brands</h2>
        <BrandsStrip brands={brands} />
      </section>
    </div>
  );
}
