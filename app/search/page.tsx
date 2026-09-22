import { Suspense } from "react";
import Link from "next/link";
import { filterAndSortProducts, getAvailableBrands, products, type SortOption } from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import { FilterControls } from "@/components/navigation/FilterControls";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Pagination } from "@/components/ui/Pagination";

const PAGE_SIZE = 12;

function toNumber(value: string | string[] | undefined): number | undefined {
  if (typeof value !== "string") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export default async function SearchPage(props: PageProps<"/search">) {
  const searchParams = await props.searchParams;

  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  const categorySlug = typeof searchParams.category === "string" ? searchParams.category : "";
  const brands = typeof searchParams.brand === "string" ? searchParams.brand.split(",").filter(Boolean) : [];
  const sort = (typeof searchParams.sort === "string" ? searchParams.sort : "relevance") as SortOption;
  const page = Math.max(1, toNumber(searchParams.page) ?? 1);

  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;

  const filtered = filterAndSortProducts({
    q,
    category: category?.id,
    minPrice: toNumber(searchParams.minPrice),
    maxPrice: toNumber(searchParams.maxPrice),
    rating: toNumber(searchParams.rating),
    brands,
    inStockOnly: searchParams.availability === "in-stock",
    sort,
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const availableBrands = getAvailableBrands(category ? products.filter((p) => p.categoryId === category.id) : products);

  const heading = q ? `Results for "${q}"` : category ? category.name : "All products";

  function buildPageHref(targetPage: number) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (categorySlug) params.set("category", categorySlug);
    if (brands.length) params.set("brand", brands.join(","));
    if (sort !== "relevance") params.set("sort", sort);
    if (searchParams.minPrice) params.set("minPrice", String(searchParams.minPrice));
    if (searchParams.maxPrice) params.set("maxPrice", String(searchParams.maxPrice));
    if (searchParams.rating) params.set("rating", String(searchParams.rating));
    if (searchParams.availability) params.set("availability", String(searchParams.availability));
    if (targetPage > 1) params.set("page", String(targetPage));
    return `/search?${params.toString()}`;
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6">
      <nav aria-label="Breadcrumb" className="mb-2 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:underline">Home</Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="text-text" aria-current="page">
            {heading}
          </li>
        </ol>
      </nav>
      <h1 className="mb-4 text-2xl font-semibold text-text">{heading}</h1>

      <Suspense fallback={null}>
        <FilterControls availableBrands={availableBrands} resultCount={filtered.length}>
          <ProductGrid products={pageItems} />
          <Pagination currentPage={currentPage} totalPages={totalPages} buildHref={buildPageHref} />
        </FilterControls>
      </Suspense>
    </div>
  );
}
