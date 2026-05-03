import { notFound } from 'next/navigation';
import { getAllProducts, getProductByHandle, getRelatedProducts, cleanBrand } from '@/lib/products';
import { ProductDetailClient } from './ProductDetailClient';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import type { Product } from '@/types/product';

export async function generateStaticParams() {
  return getAllProducts().map(p => ({ handle: p.handle }));
}

interface PageProps {
  params: Promise<{ handle: string }>;
}

const OEM_BRANDS = new Set([
  'modellista', 'wald', 'trd', 'gr', 'toyota', 'honda',
  'mitsubishi', 'denso', 'advics', 'piaa', 'brembo', 'yokohama',
]);

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) return notFound();

  const related = getRelatedProducts(product, 4);
  const isOEM = OEM_BRANDS.has(cleanBrand(product.brand).toLowerCase());

  return (
    <>
      <Breadcrumb crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Catalog', href: '/catalog' },
        { label: product.name },
      ]} />
      <ProductDetailClient product={product} related={related} isOEM={isOEM} />
    </>
  );
}
