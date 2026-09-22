"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { SortOption } from "@/data/products";

export interface FilterValues {
  category: string;
  minPrice: string;
  maxPrice: string;
  rating: string;
  brands: string[];
  inStockOnly: boolean;
  sort: SortOption;
}

function readFiltersFromParams(params: URLSearchParams): FilterValues {
  return {
    category: params.get("category") ?? "",
    minPrice: params.get("minPrice") ?? "",
    maxPrice: params.get("maxPrice") ?? "",
    rating: params.get("rating") ?? "",
    brands: params.get("brand")?.split(",").filter(Boolean) ?? [],
    inStockOnly: params.get("availability") === "in-stock",
    sort: (params.get("sort") as SortOption) ?? "relevance",
  };
}

export interface FilterControlsProps {
  availableBrands: string[];
  resultCount: number;
  children: React.ReactNode;
}

export function FilterControls({ availableBrands, resultCount, children }: FilterControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pending, setPending] = useState<FilterValues>(() => readFiltersFromParams(searchParams));

  const applied = readFiltersFromParams(searchParams);

  function buildUrl(values: FilterValues) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page"); // filter change resets pagination

    if (values.category) params.set("category", values.category);
    else params.delete("category");

    if (values.minPrice) params.set("minPrice", values.minPrice);
    else params.delete("minPrice");

    if (values.maxPrice) params.set("maxPrice", values.maxPrice);
    else params.delete("maxPrice");

    if (values.rating) params.set("rating", values.rating);
    else params.delete("rating");

    if (values.brands.length > 0) params.set("brand", values.brands.join(","));
    else params.delete("brand");

    if (values.inStockOnly) params.set("availability", "in-stock");
    else params.delete("availability");

    if (values.sort && values.sort !== "relevance") params.set("sort", values.sort);
    else params.delete("sort");

    return `${pathname}?${params.toString()}`;
  }

  function applyImmediately(next: Partial<FilterValues>) {
    const merged = { ...applied, ...next };
    router.push(buildUrl(merged));
  }

  function toggleBrand(values: FilterValues, brand: string): FilterValues {
    const brands = values.brands.includes(brand)
      ? values.brands.filter((b) => b !== brand)
      : [...values.brands, brand];
    return { ...values, brands };
  }

  const clearedValues: FilterValues = {
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
    brands: [],
    inStockOnly: false,
    sort: "relevance",
  };

  function renderFields(values: FilterValues, onChange: (v: FilterValues) => void) {
    return (
      <div className="flex flex-col gap-6">
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-text">Category</legend>
          <div className="flex flex-col gap-1.5">
            {categories.map((c) => (
              <label key={c.id} className="flex items-center gap-2 text-sm text-text">
                <input
                  type="radio"
                  name="filter-category"
                  checked={values.category === c.slug}
                  onChange={() => onChange({ ...values, category: c.slug })}
                  className="h-4 w-4"
                />
                {c.name}
              </label>
            ))}
            {values.category && (
              <button
                type="button"
                onClick={() => onChange({ ...values, category: "" })}
                className="mt-1 self-start text-xs font-medium text-primary hover:underline"
              >
                Clear category
              </button>
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-text">Price</legend>
          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor="min-price">Minimum price</label>
            <input
              id="min-price"
              type="number"
              min={0}
              placeholder="Min"
              value={values.minPrice}
              onChange={(e) => onChange({ ...values, minPrice: e.target.value })}
              className="h-10 w-20 rounded-md border border-border px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
            <span className="text-muted">–</span>
            <label className="sr-only" htmlFor="max-price">Maximum price</label>
            <input
              id="max-price"
              type="number"
              min={0}
              placeholder="Max"
              value={values.maxPrice}
              onChange={(e) => onChange({ ...values, maxPrice: e.target.value })}
              className="h-10 w-20 rounded-md border border-border px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-text">Customer rating</legend>
          <div className="flex flex-col gap-1.5">
            {[4, 3, 2, 1].map((r) => (
              <label key={r} className="flex items-center gap-2 text-sm text-text">
                <input
                  type="radio"
                  name="filter-rating"
                  checked={values.rating === String(r)}
                  onChange={() => onChange({ ...values, rating: String(r) })}
                  className="h-4 w-4"
                />
                {r}+ stars
              </label>
            ))}
            {values.rating && (
              <button
                type="button"
                onClick={() => onChange({ ...values, rating: "" })}
                className="mt-1 self-start text-xs font-medium text-primary hover:underline"
              >
                Clear rating
              </button>
            )}
          </div>
        </fieldset>

        {availableBrands.length > 0 && (
          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-text">Brand</legend>
            <div className="flex flex-col gap-1.5">
              {availableBrands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 text-sm text-text">
                  <input
                    type="checkbox"
                    checked={values.brands.includes(brand)}
                    onChange={() => onChange(toggleBrand(values, brand))}
                    className="h-4 w-4"
                  />
                  {brand}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-text">Availability</legend>
          <label className="flex items-center gap-2 text-sm text-text">
            <input
              type="checkbox"
              checked={values.inStockOnly}
              onChange={(e) => onChange({ ...values, inStockOnly: e.target.checked })}
              className="h-4 w-4"
            />
            In stock only
          </label>
        </fieldset>

        <button
          type="button"
          onClick={() => onChange(clearedValues)}
          className="self-start text-sm font-medium text-primary hover:underline"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <aside className="hidden lg:block">{renderFields(applied, (v) => applyImmediately(v))}</aside>

      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {resultCount} {resultCount === 1 ? "result" : "results"}
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="sr-only">
              Sort by
            </label>
            <select
              id="sort-select"
              value={applied.sort}
              onChange={(e) => applyImmediately({ sort: e.target.value as SortOption })}
              className="h-10 rounded-md border border-border bg-surface px-2 text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <option value="relevance">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Avg. Customer Review</option>
              <option value="newest">Newest Arrivals</option>
            </select>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => {
                setPending(applied);
                setMobileOpen(true);
              }}
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Filters
            </Button>
          </div>
        </div>

        {children}
      </div>

      <Modal
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        title="Filter & Sort"
        variant="drawer-bottom"
      >
        <div className="flex flex-col gap-4">
          {renderFields(pending, setPending)}
          <Button
            type="button"
            fullWidth
            onClick={() => {
              router.push(buildUrl(pending));
              setMobileOpen(false);
            }}
          >
            Apply filters
          </Button>
        </div>
      </Modal>
    </div>
  );
}
