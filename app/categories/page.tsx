import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6">
      <h1 className="text-2xl font-semibold text-text">Shop by Category</h1>

      <div className="mt-6 flex flex-col gap-8">
        {categories.map((category) => {
          const popular = getProductsByCategory(category.id).slice(0, 4);
          return (
            <section key={category.id} aria-labelledby={`cat-${category.id}`} className="rounded-lg border border-border bg-surface p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 id={`cat-${category.id}`} className="text-lg font-semibold text-text">
                  {category.name}
                </h2>
                <Link href={`/search?category=${category.slug}`} className="text-sm font-medium text-primary hover:underline">
                  See all
                </Link>
              </div>

              {popular.length === 0 ? (
                <p className="text-sm text-muted">No products in this category yet.</p>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {popular.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      className="flex flex-col gap-2 rounded-md border border-border p-2 hover:shadow-md"
                    >
                      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-background">
                        <Image src={product.images[0]} alt={product.title} fill sizes="150px" className="object-cover" />
                      </div>
                      <p className="line-clamp-2 text-xs text-text">{product.title}</p>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
