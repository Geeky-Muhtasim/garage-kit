'use client';

import Link from 'next/link';
import { Plus, Heart } from 'lucide-react';
import type { Product } from '@/types/product';
import { formatPrice, cleanBrand } from '@/lib/products';
import { ProductImage } from './ProductImage';
import { StockIndicator } from '@/components/ui/StockIndicator';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const brand = cleanBrand(product.brand);
  const wishlisted = isWishlisted(product.handle);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Link href={`/products/${product.handle}`} className="h-full">
      <div className="bg-surf border-[0.5px] border-bdr rounded-xl overflow-hidden hover:border-bdr2 transition-colors cursor-pointer group flex flex-col h-full">

        {/* Image — fixed 130px */}
        <div className="h-32.5 bg-surf2 relative shrink-0 overflow-hidden">
          <ProductImage src={product.image_url} alt={product.name} brand={brand} fill />
          <button
            onClick={handleWishlist}
            className={`absolute top-2 right-2 w-5 h-5 bg-surf/80 rounded flex items-center justify-center transition-opacity ${
              wishlisted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={10} className={wishlisted ? 'text-red fill-red' : 'text-txt-2'} />
          </button>
        </div>

        {/* Body */}
        <div className="p-3 flex flex-col flex-1">
          {/* Brand — 1 line */}
          <p className="text-[10px] text-amber font-semibold uppercase tracking-wider mb-1 truncate">
            {brand}
          </p>

          {/* Name — exactly 2 lines */}
          <p className="text-xs text-txt leading-snug mb-2 line-clamp-2 min-h-8">
            {product.name}
          </p>

          {/* Part ID — 1 line */}
          <p className="text-[9px] text-txt-3 font-mono mb-3 truncate">
            #{product.part_id}
          </p>

          {/* Spacer pushes footer to bottom */}
          <div className="flex-1" />

          {/* Footer — pinned to bottom */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t-[0.5px] border-bdr">
            <div>
              <span className="text-sm font-medium text-txt font-mono">
                {formatPrice(product.price)}
              </span>
              <div className="mt-0.5">
                <StockIndicator qty={product.stock_qty} />
              </div>
            </div>
            <button
              onClick={handleAdd}
              aria-label="Add to cart"
              className="w-6 h-6 bg-amber rounded-md flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
            >
              <Plus size={14} className="text-bg" />
            </button>
          </div>
        </div>

      </div>
    </Link>
  );
}
