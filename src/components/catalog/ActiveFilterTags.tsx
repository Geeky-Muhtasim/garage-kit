'use client';

import { X } from 'lucide-react';
import { useFilters } from '@/hooks/useFilters';
import { toTitleCase } from '@/lib/utils';

export function ActiveFilterTags() {
  const { category, brand, q, setParam, toggleBrand, clearAll } = useFilters();
  const selectedBrands = brand ? brand.split(',').filter(Boolean) : [];
  const hasFilters = selectedBrands.length > 0 || !!category || !!q;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-3">
      {q && (
        <Tag label={`"${q}"`} onRemove={() => setParam('q', null)} />
      )}
      {category && (
        <Tag label={toTitleCase(category)} onRemove={() => setParam('category', null)} />
      )}
      {selectedBrands.map(b => (
        <Tag key={b} label={b} onRemove={() => toggleBrand(b)} />
      ))}
      <button
        onClick={clearAll}
        className="text-[10px] text-txt-3 hover:text-txt-2 px-1 transition-colors"
      >
        Clear all
      </button>
    </div>
  );
}

function Tag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-1.5 bg-amber-dim border-[0.5px] border-amber rounded-full px-2.5 py-1 text-[10px] text-amber-lt">
      {label}
      <button onClick={onRemove} className="text-amber hover:text-amber-lt leading-none">
        <X size={10} />
      </button>
    </div>
  );
}
