import Link from 'next/link';

const COLUMNS = [
  {
    heading: 'Shop',
    links: [
      { label: 'All Products', href: '/catalog' },
      { label: 'By Category', href: '/catalog' },
      { label: 'By Brand', href: '/brands' },
      { label: 'Deals & Offers', href: '/deals' },
      { label: 'Sale Items', href: '/catalog?sort=price_asc' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Track Order', href: '/track' },
      { label: 'Help Center', href: '/help' },
      { label: 'Returns & Warranty', href: '/returns' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
  {
    heading: 'Account',
    links: [
      { label: 'Sign In', href: '/account' },
      { label: 'Create Account', href: '/account/register' },
      { label: 'My Orders', href: '/account/orders' },
      { label: 'Wishlist', href: '/wishlist' },
      { label: 'Shopping Cart', href: '/cart' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-surf border-t border-[0.5px] border-bdr py-10 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-amber rounded-lg flex items-center justify-center">
                <span className="text-bg font-mono font-bold text-sm leading-none">G</span>
              </div>
              <span className="font-mono font-medium text-txt text-sm">GarageKit</span>
            </div>
            <p className="text-txt-2 text-xs leading-relaxed mb-4">
              Authentic Japanese auto parts, delivered fast across Bangladesh.
            </p>
            <div className="space-y-1 text-xs text-txt-2">
              <p>📞 01905 400 666</p>
              <p>✉ info@japanparts.com.bd</p>
              <p>📍 277 Tejgaon I/A Dhaka</p>
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map(col => (
            <div key={col.heading}>
              <h3 className="text-txt text-sm font-medium mb-3">{col.heading}</h3>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-txt-2 text-xs hover:text-txt transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[0.5px] border-bdr pt-6">
          <p className="text-txt-3 text-xs">© 2024 GarageKit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
