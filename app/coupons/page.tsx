"use client";

import { useState } from "react";
import { Tag } from "lucide-react";
import { coupons } from "@/data/coupons";
import { categories, getCategoryById } from "@/data/categories";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useCheckoutSelection } from "@/lib/store/app-store";
import { formatDate } from "@/lib/format";

// Module-scope, not render-scope: evaluated once when the page module loads
// rather than on every render, so it doesn't trip React's render-purity lint
// (coupon expiry is a day-granularity check, so this doesn't need to tick).
const now = Date.now();

export default function CouponsPage() {
  const { clippedCouponCodes, clipCoupon, unclipCoupon } = useCheckoutSelection();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "percentage" | "fixed">("all");

  const filteredCoupons = coupons.filter((c) => {
    const matchesCategory = categoryFilter === "all" || c.eligibleCategoryIds?.includes(categoryFilter);
    const matchesType = typeFilter === "all" || c.type === typeFilter;
    return matchesCategory && matchesType;
  });

  const eligibleProducts = products.filter((p) =>
    coupons.some((c) => c.eligibleCategoryIds?.includes(p.categoryId) && new Date(c.expiresAt).getTime() >= now)
  );

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6">
      <h1 className="text-2xl font-semibold text-text">Coupons</h1>
      <p className="mt-1 text-sm text-muted">Clip a coupon to apply it automatically at checkout (mock discounts).</p>

      <div className="mt-4 flex flex-wrap gap-3 border-b border-border pb-3">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-10 rounded-md border border-border bg-surface px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
          className="h-10 rounded-md border border-border bg-surface px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          <option value="all">All discount types</option>
          <option value="percentage">Percentage off</option>
          <option value="fixed">Fixed amount off</option>
        </select>
      </div>

      {filteredCoupons.length === 0 ? (
        <p className="py-8 text-sm text-muted">No coupons match these filters.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCoupons.map((coupon) => {
            const expired = new Date(coupon.expiresAt).getTime() < now;
            const clipped = clippedCouponCodes.includes(coupon.code);
            const category = coupon.eligibleCategoryIds?.[0] ? getCategoryById(coupon.eligibleCategoryIds[0]) : undefined;

            return (
              <div key={coupon.id} className="flex flex-col gap-2 rounded-lg border border-dashed border-warning/50 bg-warning/5 p-4">
                <div className="flex items-center gap-2 text-warning">
                  <Tag className="h-5 w-5" aria-hidden="true" />
                  <span className="text-xl font-bold">
                    {coupon.type === "percentage" ? `${coupon.value}% OFF` : `$${coupon.value} OFF`}
                  </span>
                </div>
                <p className="text-sm text-text">
                  {category ? `${category.name} purchases` : "Sitewide"} &middot; code {coupon.code}
                </p>
                <p className="text-xs text-muted">
                  {expired ? "Expired" : `Expires ${formatDate(coupon.expiresAt)}`}
                </p>
                <Button
                  type="button"
                  size="sm"
                  variant={clipped ? "outline" : "primary"}
                  disabled={expired}
                  onClick={() => (clipped ? unclipCoupon(coupon.code) : clipCoupon(coupon.code))}
                  className={cn("self-start")}
                >
                  {expired ? "Expired" : clipped ? "Clipped ✓" : "Clip Coupon"}
                </Button>
              </div>
            );
          })}
        </div>
      )}

      <h2 className="mb-3 mt-10 text-lg font-semibold text-text">Eligible products</h2>
      <ProductGrid products={eligibleProducts} />
    </div>
  );
}
