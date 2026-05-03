import Link from 'next/link';

interface BrandsStripProps {
  brands: { name: string; count: number }[];
}

export function BrandsStrip({ brands }: BrandsStripProps) {
  const top = brands.slice(0, 12);
  const remaining = brands.length - 12;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-medium text-txt">Popular brands</h2>
        <Link href="/brands" className="text-xs text-amber hover:opacity-80 transition-opacity">
          All brands →
        </Link>
      </div>
      <div className="flex flex-wrap gap-2">
        {top.map(b => (
          <Link
            key={b.name}
            href={`/catalog?brand=${encodeURIComponent(b.name)}`}
            className="bg-surf border-[0.5px] border-bdr rounded-full px-3.5 py-1.5 text-xs text-txt-2 hover:border-amber hover:text-amber-lt cursor-pointer transition-colors"
          >
            {b.name}
          </Link>
        ))}
        {remaining > 0 && (
          <Link
            href="/brands"
            className="bg-surf border-[0.5px] border-bdr rounded-full px-3.5 py-1.5 text-xs text-txt-2 hover:border-amber hover:text-amber-lt cursor-pointer transition-colors"
          >
            +{remaining} more
          </Link>
        )}
      </div>
    </div>
  );
}
