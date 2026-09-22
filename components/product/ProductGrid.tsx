import Link from "next/link";
import type { Product } from "@/types";
import { ProductCard, ProductCardSkeleton } from "@/components/product/ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-16 text-center">
        <p className="text-lg font-semibold text-text">No results found</p>
        <p className="max-w-sm text-sm text-muted">
          Try removing a filter, checking your spelling, or browse a category instead.
        </p>
        <Link href="/categories" className="text-sm font-medium text-primary hover:underline">
          Browse categories
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
