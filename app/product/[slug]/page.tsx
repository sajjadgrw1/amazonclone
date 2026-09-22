import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { getCategoryById } from "@/data/categories";
import { getReviewsForProduct } from "@/data/reviews";
import { coupons } from "@/data/coupons";
import { isCouponEligible } from "@/lib/pricing";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductCarousel } from "@/components/product/ProductCarousel";

export async function generateMetadata(props: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found — Nuvara" };
  return {
    title: `${product.title} — Nuvara`,
    description: product.description,
  };
}

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = getCategoryById(product.categoryId);
  const reviews = getReviewsForProduct(product.id);
  const related = getRelatedProducts(product);
  const eligibleCoupon = coupons.find((c) => isCouponEligible(c, product));

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:underline">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          {category && (
            <>
              <li>
                <Link href={`/search?category=${category.slug}`} className="hover:underline">
                  {category.name}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
            </>
          )}
          <li className="line-clamp-1 text-text" aria-current="page">
            {product.title}
          </li>
        </ol>
      </nav>

      <ProductDetailView product={product} eligibleCoupon={eligibleCoupon} />

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section aria-labelledby="description-heading">
          <h2 id="description-heading" className="mb-3 text-lg font-semibold text-text">
            Product Description
          </h2>
          <p className="text-sm text-text">{product.description}</p>

          {product.specifications && (
            <dl className="mt-4 grid grid-cols-[140px_1fr] gap-x-4 gap-y-2 text-sm">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="contents">
                  <dt className="text-muted">{key}</dt>
                  <dd className="text-text">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </section>

        <section aria-labelledby="reviews-heading">
          <h2 id="reviews-heading" className="mb-3 text-lg font-semibold text-text">
            Customer Reviews ({reviews.length})
          </h2>
          <ProductReviews reviews={reviews} />
        </section>
      </div>

      {related.length > 0 && (
        <div className="mt-10">
          <ProductCarousel heading="Related products" products={related} />
        </div>
      )}
    </div>
  );
}
