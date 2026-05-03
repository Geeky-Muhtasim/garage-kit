import {
  getAllProducts,
  getAllCategories,
  getAllBrands,
  searchProducts,
  getPriceRange,
  cleanBrand,
  cleanCategory,
} from '@/lib/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Sidebar } from '@/components/catalog/Sidebar';
import { SortSelect } from '@/components/catalog/SortSelect';
import { Pagination } from '@/components/catalog/Pagination';
import { ActiveFilterTags } from '@/components/catalog/ActiveFilterTags';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

const PAGE_SIZE = 12;

interface CatalogPageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    q?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const {
    category = '',
    brand = '',
    q = '',
    minPrice = '',
    maxPrice = '',
    inStock = '',
    sort = 'best',
    page: pageStr = '1',
  } = params;

  const page = parseInt(pageStr, 10) || 1;

  let products = q ? searchProducts(q) : getAllProducts();

  if (category) {
    products = products.filter(p =>
      cleanCategory(p.category).toLowerCase() === category.toLowerCase()
    );
  }

  if (brand) {
    const selectedBrands = brand.split(',').filter(Boolean);
    products = products.filter(p =>
      selectedBrands.some(b => b.toLowerCase() === cleanBrand(p.brand).toLowerCase())
    );
  }

  if (minPrice) products = products.filter(p => parseInt(p.price, 10) >= parseInt(minPrice, 10));
  if (maxPrice) products = products.filter(p => parseInt(p.price, 10) <= parseInt(maxPrice, 10));
  if (inStock === 'true') products = products.filter(p => {
    const qty = parseInt(p.stock_qty, 10);
    return isNaN(qty) || qty > 0;
  });

  if (sort === 'price_asc') products = [...products].sort((a, b) => +a.price - +b.price);
  if (sort === 'price_desc') products = [...products].sort((a, b) => +b.price - +a.price);

  const total = products.length;
  const paged = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const categories = getAllCategories();
  const brands = getAllBrands();
  const priceRange = getPriceRange();

  return (
    <>
      <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Catalog' }]} />
      <div className="flex gap-4 px-5 py-5">
        <Sidebar categories={categories} brands={brands} priceRange={priceRange} />
        <main className="flex-1 min-w-0">
          <SortSelect total={total} page={page} pageSize={PAGE_SIZE} />
          <ActiveFilterTags />
          <ProductGrid products={paged} columns={3} />
          <Pagination total={total} pageSize={PAGE_SIZE} />
        </main>
      </div>
    </>
  );
}
