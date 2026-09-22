import { Star, StarHalf } from "lucide-react";

export interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
}

export function RatingStars({ rating, reviewCount, size = "sm" }: RatingStarsProps) {
  const iconSize = size === "md" ? "h-5 w-5" : "h-4 w-4";
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;

  return (
    <div className="flex items-center gap-1" role="img" aria-label={`Rated ${rating} out of 5 stars`}>
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < full) {
            return <Star key={i} className={`${iconSize} fill-warning text-warning`} />;
          }
          if (i === full && hasHalf) {
            return <StarHalf key={i} className={`${iconSize} fill-warning text-warning`} />;
          }
          return <Star key={i} className={`${iconSize} text-border`} />;
        })}
      </div>
      {typeof reviewCount === "number" && (
        <span className="text-sm text-muted">{reviewCount.toLocaleString()}</span>
      )}
    </div>
  );
}
