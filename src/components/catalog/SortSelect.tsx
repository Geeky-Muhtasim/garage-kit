'use client';

import { useFilters } from '@/hooks/useFilters';

interface SortSelectProps {
  total: number;
  page: number;
  pageSize: number;
}

export function SortSelect({ total, page, pageSize }: SortSelectProps) {
  const { sort, brand, category, q, setParam } = useFilters();
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const isFiltered = !!brand || !!category || !!q;

  return (
    <div className="flex items-center justify-between mb-3">
      <p className="text-[11px] text-txt-2">
        Showing{' '}
        <span className="text-txt font-mono font-medium">{from}–{to}</span>
        {' '}of{' '}
        <span className="text-txt font-mono font-medium">{total}</span>
        {' '}products
        {isFiltered && <span className="text-txt-3"> · filtered</span>}
      </p>
      <select
        value={sort}
        onChange={e => setParam('sort', e.target.value)}
        className="bg-surf2 border-[0.5px] border-bdr rounded-lg px-2 py-1.5 text-xs text-txt outline-none cursor-pointer hover:border-bdr2 transition-colors"
      >
        <option value="best">Best match</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
}
