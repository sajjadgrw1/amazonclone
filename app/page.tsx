import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { deals } from "@/data/deals";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { RecentlyViewedSection } from "@/components/product/RecentlyViewedSection";

export default function HomePage() {
  const dealProducts = deals
    .filter((d) => d.status === "active")
    .map((d) => products.find((p) => p.id === d.productId))
    .filter((p): p is (typeof products)[number] => !!p);

  const bestsellers = products.filter((p) => p.tags?.includes("bestseller"));
  const homeAndKitchen = products.filter((p) => p.categoryId === "home-kitchen");
  const electronics = products.filter((p) => p.categoryId === "electronics");

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 py-6">
      <section
        aria-label="Featured promotion"
        className="flex flex-col items-start justify-center gap-4 rounded-lg bg-secondary px-6 py-12 text-white sm:px-12"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-white/70">New season, new finds</p>
        <h1 className="max-w-xl text-3xl font-bold sm:text-4xl">Everything you need, delivered to your door.</h1>
        <p className="max-w-lg text-white/80">
          Browse thousands of mock listings across electronics, home, fashion, and more — all part of the
          Nuvara prototype.
        </p>
        <Link
          href="/deals/todays-deals"
          className="rounded-md bg-warning px-5 py-3 font-semibold text-text hover:bg-warning/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
        >
          Shop today&rsquo;s deals
        </Link>
      </section>

      <section aria-label="Shop by category" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/search?category=${category.slug}`}
            className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-3 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-md bg-background">
              <Image
                src={`https://picsum.photos/seed/category-${category.slug}/300/300`}
                alt=""
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium text-text">{category.name}</span>
          </Link>
        ))}
      </section>

      {dealProducts.length > 0 && (
        <ProductCarousel heading="Today's Deals" seeAllHref="/deals/todays-deals" products={dealProducts} />
      )}

      <ProductCarousel heading="Bestsellers" seeAllHref="/search?sort=rating" products={bestsellers} />
      <ProductCarousel heading="Home & Kitchen picks" seeAllHref="/search?category=home-kitchen" products={homeAndKitchen} />
      <ProductCarousel heading="Electronics you might like" seeAllHref="/search?category=electronics" products={electronics} />

      <RecentlyViewedSection />

      <section aria-label="Promotional tiles" className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-text">Try Nuvara+</h2>
          <p className="text-sm text-muted">Fast mock delivery and member-only demo pricing.</p>
          <Link href="/prime" className="text-sm font-medium text-primary hover:underline">
            Learn more
          </Link>
        </div>
        <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-text">Sell on Nuvara</h2>
          <p className="text-sm text-muted">Reach more mock customers by listing your products.</p>
          <Link href="/sell" className="text-sm font-medium text-primary hover:underline">
            Get started
          </Link>
        </div>
      </section>
    </div>
  );
}
