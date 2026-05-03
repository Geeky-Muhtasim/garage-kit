'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { ProductGrid } from '@/components/product/ProductGrid';

export default function WishlistPage() {
  const { items, itemCount, removeFromWishlist } = useWishlist();

  return (
    <div className="max-w-6xl mx-auto px-5 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Heart size={18} className="text-red" />
          <h1 className="text-xl font-medium text-txt">Saved Items</h1>
          {itemCount > 0 && (
            <span className="bg-surf2 border-[0.5px] border-bdr text-txt-2 text-xs font-mono px-2 py-0.5 rounded-full">
              {itemCount}
            </span>
          )}
        </div>
        {itemCount > 0 && (
          <button
            onClick={() => items.forEach(i => removeFromWishlist(i.handle))}
            className="text-xs text-txt-3 hover:text-txt-2 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <div className="w-16 h-16 bg-surf2 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart size={28} className="text-txt-3" />
          </div>
          <h2 className="text-base font-medium text-txt mb-2">No saved items yet</h2>
          <p className="text-sm text-txt-2 mb-6">
            Heart any product to save it here for later.
          </p>
          <Link
            href="/catalog"
            className="inline-block bg-amber text-bg font-medium text-sm px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            Browse catalog →
          </Link>
        </div>
      ) : (
        <ProductGrid products={items} columns={3} />
      )}
    </div>
  );
}
