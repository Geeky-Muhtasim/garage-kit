'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const setParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    if (key !== 'page') params.delete('page');
    router.push(`/catalog?${params.toString()}`);
  }, [searchParams, router]);

  const toggleBrand = useCallback((brand: string) => {
    const current = searchParams.get('brand') ?? '';
    const list = current ? current.split(',') : [];
    const next = list.includes(brand)
      ? list.filter(b => b !== brand)
      : [...list, brand];
    setParam('brand', next.join(',') || null);
  }, [searchParams, setParam]);

  const clearAll = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    ['brand', 'category', 'q', 'minPrice', 'maxPrice', 'inStock', 'sort', 'page'].forEach(k => params.delete(k));
    router.push(`/catalog?${params.toString()}`);
  }, [searchParams, router]);

  return {
    category: searchParams.get('category') ?? '',
    brand: searchParams.get('brand') ?? '',
    q: searchParams.get('q') ?? '',
    minPrice: searchParams.get('minPrice') ?? '',
    maxPrice: searchParams.get('maxPrice') ?? '',
    inStock: searchParams.get('inStock') === 'true',
    sort: searchParams.get('sort') ?? 'best',
    page: parseInt(searchParams.get('page') ?? '1', 10),
    setParam,
    toggleBrand,
    clearAll,
  };
}
