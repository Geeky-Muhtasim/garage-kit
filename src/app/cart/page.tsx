'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X, ShoppingBag, Phone } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/products';

export default function CartPage() {
  const { items, updateQty, removeFromCart, totalPrice, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-20 text-center">
        <div className="w-16 h-16 bg-surf2 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShoppingBag size={28} className="text-txt-3" />
        </div>
        <h1 className="text-lg font-medium text-txt mb-2">Your cart is empty</h1>
        <p className="text-sm text-txt-2 mb-6">Add some parts from the catalog to get started.</p>
        <Link
          href="/catalog"
          className="inline-block bg-amber text-bg font-medium text-sm px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
        >
          Browse catalog →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 py-6">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-xl font-medium text-txt">Your Cart</h1>
        <span className="bg-surf2 border-[0.5px] border-bdr text-txt-2 text-xs font-mono px-2 py-0.5 rounded-full">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Item list */}
        <div className="flex-1 flex flex-col gap-3">
          {items.map(item => (
            <div
              key={item.handle}
              className="bg-surf border-[0.5px] border-bdr rounded-xl p-4 flex items-start gap-4"
            >
              {/* Image */}
              <div className="w-16 h-16 bg-surf2 rounded-lg overflow-hidden relative shrink-0">
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-txt-3 text-xl font-mono">
                    {item.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-txt font-medium leading-snug line-clamp-2 mb-1">
                  {item.name}
                </p>
                <p className="text-[10px] text-txt-3 font-mono">
                  {formatPrice(item.price)} each
                </p>
              </div>

              {/* Qty + remove */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-mono font-medium text-txt">
                    {formatPrice(String(parseInt(item.price, 10) * item.quantity))}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.handle)}
                    className="text-txt-3 hover:text-txt transition-colors"
                    aria-label="Remove"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="flex items-center border-[0.5px] border-bdr rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQty(item.handle, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-txt-2 hover:bg-surf2 transition-colors"
                  >
                    <Minus size={11} />
                  </button>
                  <span className="w-8 text-center text-xs font-mono text-txt">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(item.handle, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-txt-2 hover:bg-surf2 transition-colors"
                  >
                    <Plus size={11} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:w-72 shrink-0">
          <div className="bg-surf border-[0.5px] border-bdr rounded-xl p-5 sticky top-16">
            <h2 className="text-sm font-medium text-txt mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs text-txt-2">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-mono text-txt">{formatPrice(String(totalPrice))}</span>
              </div>
              <div className="flex justify-between text-xs text-txt-2">
                <span>Delivery</span>
                <span className="text-txt-3">Calculated on order</span>
              </div>
            </div>

            <div className="border-t-[0.5px] border-bdr pt-3 mb-4">
              <div className="flex justify-between text-sm font-medium text-txt">
                <span>Total</span>
                <span className="font-mono text-amber">{formatPrice(String(totalPrice))}</span>
              </div>
            </div>

            {/* COD notice */}
            <div className="bg-amber-dim border-[0.5px] border-amber rounded-lg p-3 mb-4">
              <p className="text-[10px] text-amber-lt font-medium mb-1">Cash on Delivery</p>
              <p className="text-[10px] text-amber leading-relaxed">
                Call or WhatsApp us to confirm your order and delivery details.
              </p>
            </div>

            <a
              href="tel:+8801905400666"
              className="flex items-center justify-center gap-2 w-full bg-amber text-bg font-medium text-sm py-2.5 rounded-lg hover:opacity-90 transition-opacity mb-2"
            >
              <Phone size={14} />
              +88 01905 400 666
            </a>
            <p className="text-[10px] text-txt-3 text-center">10am – 8pm daily · Dhaka</p>
          </div>
        </div>
      </div>
    </div>
  );
}
