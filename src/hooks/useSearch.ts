'use client';

import { useState, useEffect } from 'react';
import { searchProducts } from '@/lib/products';
import type { Product } from '@/types/product';

export function useSearch(initialQ = '') {
  const [query, setQuery] = useState(initialQ);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setResults(query.trim() ? searchProducts(query) : []);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  return { query, setQuery, results };
}
