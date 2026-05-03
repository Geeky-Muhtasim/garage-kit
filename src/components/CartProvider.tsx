'use client';

import { useState, useEffect, ReactNode } from 'react';
import type { CartItem, Product } from '@/types/product';
import { CartContext } from '@/hooks/useCart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('garagekit-cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('garagekit-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.handle === product.handle);
      if (existing) {
        return prev.map(i =>
          i.handle === product.handle
            ? { ...i, quantity: Math.min(i.quantity + qty, 99) }
            : i
        );
      }
      return [...prev, {
        handle: product.handle,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        quantity: qty,
      }];
    });
  };

  const removeFromCart = (handle: string) =>
    setItems(prev => prev.filter(i => i.handle !== handle));

  const updateQty = (handle: string, qty: number) => {
    if (qty <= 0) return removeFromCart(handle);
    setItems(prev =>
      prev.map(i => i.handle === handle ? { ...i, quantity: Math.min(qty, 99) } : i)
    );
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + parseInt(i.price, 10) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, itemCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}
