"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { categories } from "@/data/categories";
import { searchProducts } from "@/data/products";
import { cn } from "@/lib/utils";

const RECENT_SEARCHES_KEY = "nuvara-recent-searches";
const MAX_RECENT = 5;
const DEBOUNCE_MS = 200;

function readRecentSearches(): string[] {
  try {
    const raw = window.localStorage.getItem(RECENT_SEARCHES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeRecentSearch(query: string) {
  try {
    const existing = readRecentSearches().filter((q) => q.toLowerCase() !== query.toLowerCase());
    const next = [query, ...existing].slice(0, MAX_RECENT);
    window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
  } catch {
    // best effort only
  }
}

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<ReturnType<typeof searchProducts>>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    setRecentSearches(readRecentSearches());
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(() => {
      setSuggestions(searchProducts(query).slice(0, 6));
      setLoading(false);
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  useEffect(() => {
    if (!open) return;
    function handlePointer(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  function submitSearch(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    writeRecentSearch(trimmed);
    setRecentSearches(readRecentSearches());
    setOpen(false);
    const params = new URLSearchParams();
    params.set("q", trimmed);
    if (category !== "all") params.set("category", category);
    router.push(`/search?${params.toString()}`);
  }

  const showRecent = query.trim().length === 0 && recentSearches.length > 0;
  const showDropdown = open && (showRecent || query.trim().length >= 2);

  return (
    <div ref={rootRef} className={cn("relative flex w-full", className)}>
      <label htmlFor="site-search-category" className="sr-only">
        Search category
      </label>
      <select
        id="site-search-category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="hidden shrink-0 rounded-l-md border border-r-0 border-border bg-background px-2 text-sm text-text sm:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        <option value="all">All</option>
        {categories.map((c) => (
          <option key={c.id} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>

      <div className="relative flex-1">
        <label htmlFor="site-search-input" className="sr-only">
          Search products
        </label>
        <input
          id="site-search-input"
          type="text"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="site-search-listbox"
          aria-autocomplete="list"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submitSearch(query);
          }}
          placeholder="Search Nuvara"
          className="h-11 w-full border border-border bg-surface px-3 pr-9 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring sm:rounded-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}

        {showDropdown && (
          <ul
            id="site-search-listbox"
            role="listbox"
            className="absolute left-0 right-0 top-full z-40 mt-1 max-h-80 overflow-y-auto rounded-md border border-border bg-surface py-1 shadow-lg"
          >
            {loading && <li className="px-3 py-2 text-sm text-muted">Searching…</li>}

            {!loading && showRecent &&
              recentSearches.map((term) => (
                <li key={term}>
                  <button
                    type="button"
                    onClick={() => submitSearch(term)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-text hover:bg-background"
                  >
                    <Search className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                    {term}
                  </button>
                </li>
              ))}

            {!loading && !showRecent && suggestions.length === 0 && (
              <li className="px-3 py-2 text-sm text-muted">No results for &ldquo;{query}&rdquo;</li>
            )}

            {!loading &&
              !showRecent &&
              suggestions.map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    onClick={() => submitSearch(product.title)}
                    role="option"
                    aria-selected={false}
                    className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm text-text hover:bg-background"
                  >
                    <span className="line-clamp-1">{product.title}</span>
                    <span className="shrink-0 text-xs text-muted">{product.brand}</span>
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        onClick={() => submitSearch(query)}
        aria-label="Submit search"
        className="flex h-11 w-12 shrink-0 items-center justify-center rounded-r-md bg-[linear-gradient(to_bottom,#f7dfa5,#f0c14b)] text-text hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        <Search className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
