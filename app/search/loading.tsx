import { ProductGridSkeleton } from "@/components/product/ProductGrid";

export default function SearchLoading() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6">
      <div className="mb-4 h-7 w-48 animate-pulse rounded bg-border/70" />
      <ProductGridSkeleton count={12} />
    </div>
  );
}
