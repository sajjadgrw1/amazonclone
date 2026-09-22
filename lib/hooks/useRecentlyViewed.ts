"use client";

import { useEffect, useState } from "react";
import { products } from "@/data/products";
import type { Product } from "@/types";

const STORAGE_KEY = "nuvara-recently-viewed";
const MAX_ITEMS = 10;

export function recordRecentlyViewed(productId: string) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    const next = [productId, ...ids.filter((id) => id !== productId)].slice(0, MAX_ITEMS);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // best effort only
  }
}

export function useRecentlyViewed(): { products: Product[]; hydrated: boolean } {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      setIds(raw ? JSON.parse(raw) : []);
    } catch {
      setIds([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  const list = ids
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => !!p);

  return { products: list, hydrated };
}
