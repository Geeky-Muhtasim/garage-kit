'use client';

import { useState, FormEvent } from 'react';
import { Package, Phone, MessageCircle } from 'lucide-react';

export default function TrackPage() {
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (orderId.trim() || phone.trim()) setSubmitted(true);
  };

  return (
    <div className="max-w-lg mx-auto px-5 py-16">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-amber-dim border-[0.5px] border-amber rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Package size={24} className="text-amber" />
        </div>
        <h1 className="text-xl font-medium text-txt mb-2">Track Your Order</h1>
        <p className="text-sm text-txt-2">
          Enter your order details and we&apos;ll show you the latest status.
        </p>
      </div>

      <div className="bg-surf border-[0.5px] border-bdr rounded-xl p-6">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] text-txt-3 uppercase tracking-wide mb-1.5">
                Order ID
              </label>
              <input
                type="text"
                placeholder="e.g. GK-2024-00123"
                value={orderId}
                onChange={e => setOrderId(e.target.value)}
                className="w-full bg-surf2 border-[0.5px] border-bdr rounded-lg px-3 py-2.5 text-sm text-txt placeholder-txt-3 outline-none focus:border-amber transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] text-txt-3 uppercase tracking-wide mb-1.5">
                Phone number
              </label>
              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-surf2 border-[0.5px] border-bdr rounded-lg px-3 py-2.5 text-sm text-txt placeholder-txt-3 outline-none focus:border-amber transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber text-bg font-medium text-sm py-2.5 rounded-lg hover:opacity-90 transition-opacity mt-1"
            >
              Track Order →
            </button>
          </form>
        ) : (
          <div className="text-center py-4">
            <div className="w-10 h-10 bg-green-dim border-[0.5px] border-green rounded-full flex items-center justify-center mx-auto mb-3">
              <Package size={18} className="text-green" />
            </div>
            <p className="text-sm font-medium text-txt mb-1">Order found</p>
            <p className="text-xs text-txt-2 mb-4">
              For real-time updates, contact us directly with your order ID.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs text-amber hover:text-amber-lt transition-colors"
            >
              Search again
            </button>
          </div>
        )}

        {/* Contact options */}
        <div className="mt-5 pt-5 border-t-[0.5px] border-bdr">
          <p className="text-[10px] text-txt-3 text-center mb-3 uppercase tracking-wide">
            Need help? Contact us directly
          </p>
          <div className="flex gap-2">
            <a
              href="tel:+8801905400666"
              className="flex-1 flex items-center justify-center gap-2 bg-surf2 border-[0.5px] border-bdr rounded-lg py-2.5 text-xs text-txt-2 hover:border-bdr2 hover:text-txt transition-colors"
            >
              <Phone size={13} />
              Call us
            </a>
            <a
              href="https://wa.me/8801905400666"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-green-dim border-[0.5px] border-green rounded-lg py-2.5 text-xs text-green hover:opacity-80 transition-opacity"
            >
              <MessageCircle size={13} />
              WhatsApp
            </a>
          </div>
          <p className="text-[10px] text-txt-3 text-center mt-2">
            +88 01905 400 666 · 10am – 8pm daily
          </p>
        </div>
      </div>
    </div>
  );
}
