import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";

export interface PriceDisplayProps {
  price: number;
  compareAtPrice?: number;
  currency?: string;
  size?: "sm" | "lg";
}

export function PriceDisplay({ price, compareAtPrice, currency = "USD", size = "sm" }: PriceDisplayProps) {
  const hasDiscount = !!compareAtPrice && compareAtPrice > price;
  const discountPercent = hasDiscount
    ? Math.round((1 - price / (compareAtPrice as number)) * 100)
    : 0;

  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className={size === "lg" ? "text-2xl font-semibold text-text" : "text-base font-semibold text-text"}>
        {formatCurrency(price, currency)}
      </span>
      {hasDiscount && (
        <>
          <span className="text-sm text-muted line-through">
            {formatCurrency(compareAtPrice as number, currency)}
          </span>
          <Badge variant="discount">-{discountPercent}%</Badge>
        </>
      )}
    </div>
  );
}
