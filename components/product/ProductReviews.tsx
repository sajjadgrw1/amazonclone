import type { Review } from "@/types";
import { RatingStars } from "@/components/product/RatingStars";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";

export function ProductReviews({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className="text-sm text-muted">No reviews yet for this product.</p>;
  }

  return (
    <div className="flex flex-col divide-y divide-border">
      {reviews.map((review) => (
        <article key={review.id} className="py-4">
          <div className="flex items-center gap-2">
            <RatingStars rating={review.rating} />
            {review.verifiedPurchase && <Badge variant="success">Verified Purchase</Badge>}
          </div>
          {review.title && <h3 className="mt-1 font-semibold text-text">{review.title}</h3>}
          <p className="mt-1 text-sm text-muted">
            {review.authorName} &middot; {formatDate(review.createdAt)}
          </p>
          <p className="mt-2 text-sm text-text">{review.body}</p>
        </article>
      ))}
    </div>
  );
}
