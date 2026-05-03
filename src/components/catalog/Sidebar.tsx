'use client';

import { useFilters } from '@/hooks/useFilters';
import { toTitleCase } from '@/lib/utils';
import { Check } from 'lucide-react';

interface SidebarProps {
  categories: { name: string; count: number }[];
  brands: { name: string; count: number }[];
  priceRange: { min: number; max: number };
}

export function Sidebar({ categories, brands, priceRange }: SidebarProps) {
  const { category, brand, minPrice, maxPrice, inStock, setParam, toggleBrand } = useFilters();
  const selectedBrands = brand ? brand.split(',').filter(Boolean) : [];

  return (
    <aside className="sticky top-16 w-50 shrink-0 flex flex-col gap-3 self-start">
      {/* Vehicle context */}
      <div className="bg-amber-dim border-[0.5px] border-amber rounded-xl p-4">
        <p className="text-[9px] text-amber-lt opacity-70 uppercase tracking-wider">Filtering for</p>
        <p className="text-xs font-medium text-amber-lt">All vehicles</p>
        <p className="text-[10px] text-amber font-mono">Any make · Any year</p>
        <button className="text-[10px] text-amber-lt opacity-60 mt-1.5 cursor-pointer underline block">
          Change vehicle ›
        </button>
      </div>

      {/* Category */}
      <FilterBlock
        title="Category"
        activeCount={category ? 1 : 0}
        onClear={category ? () => setParam('category', null) : undefined}
      >
        <div className="space-y-1.5">
          {categories.slice(0, 15).map(cat => {
            const active = category.toLowerCase() === cat.name.toLowerCase();
            return (
              <label key={cat.name} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={active}
                  onClick={() => setParam('category', active ? null : cat.name)}
                />
                <span className="text-[10px] text-txt-2 flex-1 truncate">
                  {toTitleCase(cat.name)}
                </span>
                <span className="text-[9px] text-txt-3 font-mono">{cat.count}</span>
              </label>
            );
          })}
        </div>
      </FilterBlock>

      {/* Brand */}
      <FilterBlock
        title="Brand"
        activeCount={selectedBrands.length}
        onClear={selectedBrands.length > 0 ? () => setParam('brand', null) : undefined}
      >
        <div className="space-y-1.5">
          {brands.slice(0, 10).map(b => {
            const active = selectedBrands.includes(b.name);
            return (
              <label key={b.name} className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={active} onClick={() => toggleBrand(b.name)} />
                <span className="text-[10px] text-txt-2 flex-1 truncate">{b.name}</span>
                <span className="text-[9px] text-txt-3 font-mono">{b.count}</span>
              </label>
            );
          })}
        </div>
      </FilterBlock>

      {/* Price range */}
      <FilterBlock title="Price range">
        <div className="flex gap-1.5">
          <input
            type="number"
            placeholder={String(priceRange.min)}
            defaultValue={minPrice}
            onBlur={e => setParam('minPrice', e.target.value || null)}
            className="w-full bg-surf2 border-[0.5px] border-bdr rounded text-[10px] text-txt px-2 py-1 font-mono outline-none focus:border-amber"
          />
          <span className="text-txt-3 text-xs self-center">–</span>
          <input
            type="number"
            placeholder={String(priceRange.max)}
            defaultValue={maxPrice}
            onBlur={e => setParam('maxPrice', e.target.value || null)}
            className="w-full bg-surf2 border-[0.5px] border-bdr rounded text-[10px] text-txt px-2 py-1 font-mono outline-none focus:border-amber"
          />
        </div>
      </FilterBlock>

      {/* Availability */}
      <FilterBlock
        title="Availability"
        activeCount={inStock ? 1 : 0}
        onClear={inStock ? () => setParam('inStock', null) : undefined}
      >
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={inStock}
            onClick={() => setParam('inStock', inStock ? null : 'true')}
          />
          <span className="text-[10px] text-txt-2">In stock only</span>
        </label>
      </FilterBlock>
    </aside>
  );
}

function FilterBlock({
  title,
  activeCount = 0,
  onClear,
  children,
}: {
  title: string;
  activeCount?: number;
  onClear?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surf border-[0.5px] border-bdr rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-medium text-txt tracking-wide uppercase">
            {title}
          </span>
          {activeCount > 0 && (
            <span className="bg-amber text-bg text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              {activeCount}
            </span>
          )}
        </div>
        {onClear && (
          <button
            onClick={onClear}
            className="text-[10px] text-amber hover:text-amber-lt transition-colors"
          >
            Clear
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function Checkbox({ checked, onClick }: { checked: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`w-3.5 h-3.5 rounded-[3px] border-[0.5px] flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
        checked ? 'bg-amber border-amber' : 'bg-transparent border-bdr2 hover:border-amber'
      }`}
    >
      {checked && <Check size={9} className="text-bg stroke-3" />}
    </div>
  );
}
