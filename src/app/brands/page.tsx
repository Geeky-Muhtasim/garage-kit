import { getAllBrands } from '@/lib/products';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import Link from 'next/link';

export default function BrandsPage() {
  const brands = getAllBrands();

  return (
    <>
      <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Brands' }]} />
      <div className="px-5 py-5">
        <h1 className="text-xl font-medium text-txt mb-1">All brands</h1>
        <p className="text-xs text-txt-2 mb-6">
          {brands.length} brands across Japanese automotive parts
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {brands.map(brand => (
            <Link key={brand.name} href={`/catalog?brand=${encodeURIComponent(brand.name)}`}>
              <div className="bg-surf border-[0.5px] border-bdr rounded-xl p-5 hover:border-amber transition-colors cursor-pointer">
                <p className="text-sm font-medium text-txt">{brand.name}</p>
                <p className="text-xs text-txt-2 font-mono mt-1">{brand.count} parts</p>
                <p className="text-xs text-amber mt-3 hover:opacity-80">View {brand.count} parts →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
