import type { Review } from "@/types";
import { products } from "@/data/products";

const templates: Array<Omit<Review, "id" | "productId">> = [
  { authorName: "J. Martinez", rating: 5, title: "Exactly as described", body: "Works great, arrived earlier than expected and packaging was solid.", createdAt: "2026-08-14T10:00:00.000Z", verifiedPurchase: true },
  { authorName: "A. Chen", rating: 4, title: "Good value", body: "Does the job well. Lost one star because setup instructions were a little thin.", createdAt: "2026-07-30T09:20:00.000Z", verifiedPurchase: true },
  { authorName: "S. Okafor", rating: 5, title: "Would buy again", body: "This is my second one, gifted the first to a friend who loved it.", createdAt: "2026-07-02T14:45:00.000Z", verifiedPurchase: true },
  { authorName: "R. Novak", rating: 3, title: "Decent but not exceptional", body: "It's fine for the price. Wouldn't call it premium quality.", createdAt: "2026-06-18T08:05:00.000Z", verifiedPurchase: false },
  { authorName: "T. Ibrahim", rating: 5, title: "Exceeded expectations", body: "Honestly better than I expected for this price point.", createdAt: "2026-05-27T17:30:00.000Z", verifiedPurchase: true },
];

export const reviews: Review[] = products.flatMap((product, productIndex) =>
  templates.slice(0, 3 + (productIndex % 3)).map((template, i) => ({
    id: `${product.id}-review-${i + 1}`,
    productId: product.id,
    ...template,
  }))
);

export function getReviewsForProduct(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}
