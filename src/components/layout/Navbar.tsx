'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'Brands', href: '/brands' },
  { label: 'Deals', href: '/deals' },
  { label: 'Track Order', href: '/track' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount } = useCart();
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setMobileOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 h-12 bg-surf border-b border-[0.5px] border-bdr">
        <div className="h-full flex items-center gap-4 px-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 bg-amber rounded-lg flex items-center justify-center">
              <span className="text-bg font-mono font-bold text-sm leading-none">G</span>
            </div>
            <span className="font-mono font-medium text-txt text-sm hidden sm:block">GarageKit</span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {NAV_LINKS.map(link => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs pb-0.5 transition-colors ${
                    active
                      ? 'text-txt border-b-2 border-amber'
                      : 'text-txt-2 hover:text-txt border-b-2 border-transparent'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: search + icons */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Search bar */}
            <form onSubmit={handleSearch} className="hidden sm:flex items-center">
              <div className="flex items-center bg-surf2 border-[0.5px] border-bdr rounded-lg px-3 py-1.5 w-52">
                <input
                  type="text"
                  placeholder="Search parts..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="bg-transparent text-xs text-txt placeholder-txt-3 outline-none flex-1 min-w-0"
                />
                <button type="submit" className="ml-1 text-txt-3 hover:text-txt shrink-0">
                  <Search size={14} />
                </button>
              </div>
            </form>

            {/* Icon buttons */}
            {[
              { icon: Heart, label: 'Wishlist', href: '/wishlist' },
            ].map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 bg-surf2 border-[0.5px] border-bdr rounded-lg flex items-center justify-center hover:border-bdr2 transition-colors"
              >
                <Icon size={16} className="text-txt-2" />
              </Link>
            ))}

            {/* Cart with badge */}
            <Link
              href="/cart"
              aria-label="Cart"
              className="w-8 h-8 bg-surf2 border-[0.5px] border-bdr rounded-lg flex items-center justify-center hover:border-bdr2 transition-colors relative"
            >
              <ShoppingBag size={16} className="text-txt-2" />
              {itemCount > 0 && (
                <span
                  suppressHydrationWarning
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber rounded-full text-bg text-[9px] font-mono font-bold flex items-center justify-center"
                >
                  {itemCount}
                </span>
              )}
            </Link>

            <Link
              href="/account"
              aria-label="Account"
              className="w-8 h-8 bg-surf2 border-[0.5px] border-bdr rounded-lg flex items-center justify-center hover:border-bdr2 transition-colors"
            >
              <User size={16} className="text-txt-2" />
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-8 h-8 bg-surf2 border-[0.5px] border-bdr rounded-lg flex items-center justify-center hover:border-bdr2 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={16} className="text-txt-2" /> : <Menu size={16} className="text-txt-2" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-12 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="relative bg-surf border-b border-[0.5px] border-bdr p-5 flex flex-col gap-4">
            <form onSubmit={handleSearch} className="flex items-center bg-surf2 border-[0.5px] border-bdr rounded-lg px-3 py-2">
              <input
                type="text"
                placeholder="Search parts..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="bg-transparent text-sm text-txt placeholder-txt-3 outline-none flex-1"
              />
              <button type="submit"><Search size={16} className="text-txt-3" /></button>
            </form>
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium ${pathname === link.href ? 'text-amber' : 'text-txt-2'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
