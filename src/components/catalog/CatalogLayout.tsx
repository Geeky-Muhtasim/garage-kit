'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

interface CatalogLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  activeFilterCount: number;
}

export function CatalogLayout({ sidebar, children, activeFilterCount }: CatalogLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 py-5">
      {/* Mobile filter button */}
      <div className="flex items-center gap-3 mb-4 lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-surf border-[0.5px] border-bdr rounded-lg px-3 py-2 text-sm text-txt-2 hover:border-bdr2 transition-colors"
        >
          <SlidersHorizontal size={14} />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-amber text-bg text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-bg border-r-[0.5px] border-bdr overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b-[0.5px] border-bdr sticky top-0 bg-bg">
              <span className="text-sm font-medium text-txt">Filters</span>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex items-center justify-center text-txt-2 hover:text-txt transition-colors"
              >
                <X size={15} />
              </button>
            </div>
            <div className="p-4">{sidebar}</div>
          </div>
        </div>
      )}

      {/* Main layout */}
      <div className="flex gap-5">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-50 shrink-0 self-start sticky top-16">
          {sidebar}
        </aside>
        {/* Content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
