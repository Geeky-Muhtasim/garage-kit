'use client';

import { useFilters } from '@/hooks/useFilters';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  total: number;
  pageSize: number;
}

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const delta = 2;
  const range: number[] = [];
  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i);
  }

  const pages: (number | '...')[] = [];

  if (range[0] > 2) {
    pages.push(1, '...');
  } else {
    pages.push(1);
  }

  pages.push(...range);

  if (range[range.length - 1] < total - 1) {
    pages.push('...', total);
  } else if (total > 1) {
    pages.push(total);
  }

  return pages;
}

export function Pagination({ total, pageSize }: PaginationProps) {
  const { page, setParam } = useFilters();
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const goTo = (p: number) => setParam('page', String(p));
  const pages = getPageNumbers(page, totalPages);

  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      <button
        disabled={page === 1}
        onClick={() => goTo(page - 1)}
        className="w-8 h-8 bg-surf2 border-[0.5px] border-bdr rounded-lg flex items-center justify-center text-txt-2 hover:border-bdr2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={14} />
      </button>

      {pages.map((p, i) =>
        p === '...'
          ? (
            <span key={`dot-${i}`} className="w-8 text-center text-txt-3 text-xs select-none">
              …
            </span>
          )
          : (
            <button
              key={p}
              onClick={() => goTo(p as number)}
              className={`w-8 h-8 rounded-lg text-xs font-mono border-[0.5px] transition-colors ${
                p === page
                  ? 'bg-amber-dim border-amber text-amber-lt'
                  : 'bg-surf2 border-bdr text-txt-2 hover:border-bdr2 hover:text-txt'
              }`}
            >
              {p}
            </button>
          )
      )}

      <button
        disabled={page === totalPages}
        onClick={() => goTo(page + 1)}
        className="w-8 h-8 bg-surf2 border-[0.5px] border-bdr rounded-lg flex items-center justify-center text-txt-2 hover:border-bdr2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
