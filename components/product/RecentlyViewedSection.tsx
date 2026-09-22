"use client";

import { useRecentlyViewed } from "@/lib/hooks/useRecentlyViewed";
import { ProductCarousel } from "@/components/product/ProductCarousel";

export function RecentlyViewedSection() {
  const { products, hydrated } = useRecentlyViewed();

  if (!hydrated) return null;
  if (products.length === 0) {
    return (
      <section className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted">
        Products you view will show up here.
      </section>
    );
  }

  return <ProductCarousel heading="Recently viewed" products={products} />;
}
