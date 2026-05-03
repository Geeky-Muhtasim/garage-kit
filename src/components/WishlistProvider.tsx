'use client';

import { useState, useEffect, ReactNode } from 'react';
import type { Product } from '@/types/product';
import { WishlistContext } from '@/hooks/useWishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('garagekit-wishlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('garagekit-wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: Product) => {
    setItems(prev =>
      prev.find(i => i.handle === product.handle) ? prev : [...prev, product]
    );
  };

  const removeFromWishlist = (handle: string) =>
    setItems(prev => prev.filter(i => i.handle !== handle));

  const toggleWishlist = (product: Product) => {
    setItems(prev =>
      prev.find(i => i.handle === product.handle)
        ? prev.filter(i => i.handle !== product.handle)
        : [...prev, product]
    );
  };

  const isWishlisted = (handle: string) => items.some(i => i.handle === handle);
  const itemCount = items.length;

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, toggleWishlist, isWishlisted, itemCount }}>
      {children}
    </WishlistContext.Provider>
  );
}
