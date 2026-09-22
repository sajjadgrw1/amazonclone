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

  const promoTiles = [
    { title: "The fall edit", subtitle: "Shop premium brands", href: "/search?category=fashion", seed: "fall-edit" },
    { title: "Stay active", subtitle: "New sportswear and more", href: "/search?category=sports-outdoors", seed: "sportswear" },
    { title: "Focus on your health", subtitle: "Get essentials delivered", href: "/search?category=beauty", seed: "health" },
    { title: "Trending textures", subtitle: "The Maximalist look", href: "/search?category=home-kitchen", seed: "textures" },
  ];

  const featureColumns = [
    { title: "Save on Nuvara Devices", href: "/search?category=electronics", seed: "devices" },
    { title: "Shop fall premium picks", href: "/search?category=home-kitchen", seed: "premium-picks" },
    { title: "Fall styles for all", href: "/search?category=fashion", seed: "fall-styles" },
    { title: "Shop 450+ gift card brands", href: "/gift-cards", seed: "gift-brands" },
  ];

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-3 py-4 sm:px-4">
      <section aria-label="Featured promotions" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Link
          href="/deals/todays-deals"
          className="col-span-2 flex flex-col items-start justify-center gap-3 rounded-lg bg-secondary px-6 py-10 text-white hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring sm:px-10"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Get free delivery on your faves</p>
          <h1 className="max-w-sm text-2xl font-bold sm:text-3xl">Fast shipping on millions of items</h1>
          <span className="rounded-md bg-primary px-5 py-2.5 font-semibold text-header-dark hover:brightness-95">
            Join Nuvara+
          </span>
        </Link>

        {promoTiles.map((tile) => (
          <Link
            key={tile.seed}
            href={tile.href}
            className="relative col-span-1 flex flex-col justify-start gap-1 overflow-hidden rounded-lg bg-surface p-4 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <span className="text-sm font-bold text-text">{tile.title}</span>
            <span className="text-xs text-muted">{tile.subtitle}</span>
            <div className="relative mt-2 aspect-square w-full overflow-hidden rounded-md bg-background">
              <Image
                src={`https://picsum.photos/seed/${tile.seed}/300/300`}
                alt=""
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          </Link>
        ))}
      </section>

      <section aria-label="Featured collections" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featureColumns.map((col) => (
          <div key={col.seed} className="flex flex-col gap-3 rounded-lg bg-surface p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-text">{col.title}</h2>
              <Link href={col.href} className="text-xs font-medium text-link hover:text-link-hover hover:underline">
                See more
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[0, 1].map((i) => (
                <Link
                  key={i}
                  href={col.href}
                  className="relative aspect-square overflow-hidden rounded-md bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  <Image
                    src={`https://picsum.photos/seed/${col.seed}-${i}/240/240`}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section aria-labelledby="shop-by-category-heading" className="flex flex-col gap-3">
        <h2 id="shop-by-category-heading" className="text-lg font-semibold text-text">
          Shop by category
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
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
        </div>
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
