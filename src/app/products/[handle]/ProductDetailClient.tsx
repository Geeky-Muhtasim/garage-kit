'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Share2, Minus, Plus } from 'lucide-react';
import type { Product } from '@/types/product';
import { formatPrice, cleanBrand, cleanCategory } from '@/lib/products';
import { ProductImage } from '@/components/product/ProductImage';
import { ProductGrid } from '@/components/product/ProductGrid';
import { StockIndicator } from '@/components/ui/StockIndicator';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

interface Props {
  product: Product;
  related: Product[];
  isOEM: boolean;
}

export function ProductDetailClient({ product, related, isOEM }: Props) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [qty, setQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const wishlisted = isWishlisted(product.handle);

  const brand = cleanBrand(product.brand);
  const rawCategory = cleanCategory(product.category);
  const category = rawCategory === '—' ? `${brand} Part` : rawCategory;

  const stockNum = parseInt(product.stock_qty, 10);
  const hasQty = product.stock_qty !== '' && !isNaN(stockNum);
  const inStock = !hasQty || stockNum > 0;

  const thumbs = [product.image_url].filter(Boolean);

  const SPEC_ROWS = [
    { key: 'Part ID',      value: product.part_id },
    { key: 'Brand',        value: brand },
    { key: 'Category',     value: category },
    { key: 'Availability', value: inStock ? `In stock${hasQty ? ` (${product.stock_qty} units)` : ''}` : 'Out of stock' },
    { key: 'Lead time',    value: '24 – 48 hours' },
    { key: 'Warranty',     value: 'Manufacturer warranty' },
  ];

  return (
    <>
      {/* Two-column layout: image left, info right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 px-4 sm:px-5 py-4 sm:py-5">
        {/* Left — Image gallery */}
        <div className="bg-surf border-[0.5px] border-bdr rounded-xl overflow-hidden">
          <div className="h-44 sm:h-56 bg-surf2 relative">
            <ProductImage
              src={product.image_url}
              alt={product.name}
              brand={brand}
              fill
              priority
            />
          </div>
          {thumbs.length > 0 && (
            <div className="flex gap-2 p-3">
              {thumbs.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className={`w-11 h-11 bg-surf2 rounded-lg border-[0.5px] overflow-hidden flex items-center justify-center ${
                    activeThumb === i ? 'border-amber' : 'border-bdr hover:border-bdr2'
                  }`}
                >
                  <ProductImage src={src} alt="" brand={brand} width={44} height={44} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right — Product info */}
        <div className="flex flex-col gap-3">
          {/* Badges */}
          <div className="flex gap-1.5 flex-wrap">
            {isOEM && <Badge label="OEM" variant="green" />}
            {inStock && <Badge label="In Stock" variant="green" />}
          </div>

          {/* Brand + Name */}
          <div>
            <Link href={`/catalog?brand=${encodeURIComponent(brand)}`}>
              <p className="text-[10px] text-amber font-semibold tracking-widest uppercase mb-1 hover:opacity-80 transition-opacity">
                {brand}
              </p>
            </Link>
            <h1 className="text-lg font-medium text-txt leading-snug">{product.name}</h1>
          </div>

          {/* Spec table */}
          <div className="bg-surf border-[0.5px] border-bdr rounded-lg overflow-hidden">
            {SPEC_ROWS.map(row => (
              <div key={row.key} className="flex border-b-[0.5px] border-bdr last:border-0">
                <div className="w-20 sm:w-24 px-3 py-2 text-[10px] text-txt-3 bg-surf2 shrink-0 tracking-wide">
                  {row.key}
                </div>
                <div className="px-3 py-2 text-[10px] text-txt font-mono">{row.value}</div>
              </div>
            ))}
          </div>

          {/* Price & cart */}
          <div className="bg-surf border-[0.5px] border-bdr rounded-lg p-4">
            <p className="text-3xl font-medium text-txt font-mono mb-3">
              {formatPrice(product.price)}
            </p>
            <StockIndicator qty={product.stock_qty} showBar />

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center border-[0.5px] border-bdr rounded-lg overflow-hidden">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-txt-2 hover:text-txt hover:bg-surf2 transition-colors"
                >
                  <Minus size={12} />
                </button>
                <span className="w-10 text-center text-sm font-mono text-txt">{qty}</span>
                <button
                  onClick={() => setQty(q => Math.min(99, q + 1))}
                  className="w-8 h-8 flex items-center justify-center text-txt-2 hover:text-txt hover:bg-surf2 transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>
              <p className="text-sm font-mono text-txt-2">
                Total:{' '}
                <span className="text-txt">
                  {formatPrice(String(parseInt(product.price, 10) * qty))}
                </span>
              </p>
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => addToCart(product, qty)}
                disabled={!inStock}
                className="flex-1 bg-amber text-bg font-medium text-sm py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className="w-10 h-10 bg-surf2 border-[0.5px] border-bdr rounded-lg flex items-center justify-center hover:border-bdr2 transition-colors"
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={16} className={wishlisted ? 'text-red fill-red' : 'text-txt-2'} />
              </button>
              <button className="w-10 h-10 bg-surf2 border-[0.5px] border-bdr rounded-lg flex items-center justify-center hover:border-bdr2 transition-colors">
                <Share2 size={16} className="text-txt-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description — ONLY appears here, below the two-column grid */}
      {product.description && (
        <div className="px-4 sm:px-5 mb-6">
          <div className="bg-surf border-[0.5px] border-bdr rounded-lg p-4">
            <div className="flex gap-4 border-b-[0.5px] border-bdr mb-3 -mx-4 px-4">
              {['Description', 'Specifications', 'Compatibility'].map((tab, i) => (
                <button
                  key={tab}
                  className={`text-xs pb-2 border-b-2 -mb-px ${
                    i === 0
                      ? 'text-txt border-amber'
                      : 'text-txt-3 border-transparent opacity-40 cursor-not-allowed'
                  }`}
                  disabled={i !== 0}
                >
                  {tab}
                </button>
              ))}
            </div>
            <p className="text-xs text-txt-2 leading-relaxed">{product.description}</p>
          </div>
        </div>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <div className="px-4 sm:px-5 pb-10">
          <h2 className="text-sm font-medium text-txt mb-3">Related products</h2>
          <ProductGrid products={related} columns={4} />
        </div>
      )}
    </>
  );
}
