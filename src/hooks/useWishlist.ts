'use client';

import { createContext, useContext } from 'react';
import type { Product } from '@/types/product';

export interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (handle: string) => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (handle: string) => boolean;
  itemCount: number;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function useWishlist(): WishlistContextType {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
