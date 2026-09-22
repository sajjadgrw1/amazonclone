"use client";

import { useMemo, useState } from "react";
import { deals } from "@/data/deals";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { DealCard } from "@/components/product/DealCard";
import { cn } from "@/lib/utils";

type SortMode = "discount" | "price" | "ending-soon";

export default function TodaysDealsPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sort, setSort] = useState<SortMode>("discount");

  const dealsWithProducts = useMemo(
    () =>
      deals
        .map((deal) => ({ deal, product: products.find((p) => p.id === deal.productId) }))
        .filter((d): d is { deal: (typeof deals)[number]; product: NonNullable<(typeof d)["product"]> } => !!d.product),
    []
  );

  const featured = dealsWithProducts.find((d) => d.deal.status === "active");

  const filtered = dealsWithProducts
    .filter((d) => categoryFilter === "all" || d.product.categoryId === categoryFilter)
    .sort((a, b) => {
      if (sort === "discount") return b.deal.discountPercent - a.deal.discountPercent;
      if (sort === "price") return a.product.price - b.product.price;
      return new Date(a.deal.endAt).getTime() - new Date(b.deal.endAt).getTime();
    });

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6">
      <h1 className="text-2xl font-semibold text-text">Today&rsquo;s Deals</h1>
      <p className="mt-1 text-sm text-muted">
        Mock daily deals for the Nuvara prototype — countdowns are demo timestamps, not real inventory.
      </p>

      {featured && (
        <div className="mt-4 flex flex-col gap-2 rounded-lg bg-secondary p-6 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-white/70">Featured deal</p>
            <p className="text-lg font-semibold">{featured.product.title}</p>
          </div>
          <p className="text-2xl font-bold">-{featured.deal.discountPercent}%</p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          <button
            role="tab"
            aria-selected={categoryFilter === "all"}
            onClick={() => setCategoryFilter("all")}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium",
              categoryFilter === "all" ? "bg-primary text-white" : "text-muted hover:bg-background"
            )}
          >
            All categories
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={categoryFilter === c.id}
              onClick={() => setCategoryFilter(c.id)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium",
                categoryFilter === c.id ? "bg-primary text-white" : "text-muted hover:bg-background"
              )}
            >
              {c.name}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm text-text">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
            className="h-9 rounded-md border border-border bg-surface px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <option value="discount">Biggest discount</option>
            <option value="price">Lowest price</option>
            <option value="ending-soon">Ending soonest</option>
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">No deals match this category right now.</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map(({ deal, product }) => (
            <DealCard key={deal.id} deal={deal} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
