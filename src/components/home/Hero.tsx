import Link from 'next/link';

interface HeroProps {
  totalProducts: number;
  totalBrands: number;
}

export function Hero({ totalProducts, totalBrands }: HeroProps) {
  const stats = [
    { value: `${totalProducts.toLocaleString()}+`, label: 'Products listed' },
    { value: `${totalBrands}+`,                    label: 'Trusted brands' },
    { value: '24h',                                label: 'Delivery target' },
  ];

  return (
    <div className="bg-surf border-[0.5px] border-bdr rounded-xl p-4 sm:p-7 grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-4 sm:gap-6 items-center">
      {/* Left */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-amber mb-2 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber inline-block" />
          Authentic Japanese auto parts · Dhaka
        </p>
        <h1 className="text-xl sm:text-2xl font-medium leading-tight text-txt mb-2">
          Every part your{' '}
          <em className="not-italic text-amber">Japanese car</em>{' '}
          needs
        </h1>
        <p className="text-xs text-txt-2 leading-relaxed max-w-xs mb-4">
          {totalProducts.toLocaleString()}+ genuine OEM and aftermarket parts.
          Fast 24–48h delivery across Bangladesh.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/catalog"
            className="bg-amber text-bg font-medium text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            Browse catalog →
          </Link>
          <Link
            href="/deals"
            className="bg-transparent text-txt-2 border-[0.5px] border-bdr2 text-sm px-5 py-2.5 rounded-lg hover:border-bdr hover:text-txt transition-colors"
          >
            Today&apos;s deals
          </Link>
        </div>
      </div>

      {/* Right — stat cards */}
      <div className="flex flex-wrap sm:flex-nowrap lg:flex-col gap-2">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="bg-surf2 border-[0.5px] border-bdr border-l-2 border-l-amber rounded-lg p-3 text-right flex-1"
          >
            <p className="text-lg font-medium text-amber font-mono">{stat.value}</p>
            <p className="text-[9px] text-txt-3 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
