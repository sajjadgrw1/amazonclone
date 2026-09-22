"use client";

import Image from "next/image";
import Link from "next/link";
import type { Deal, Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { DealCountdown } from "@/components/product/DealCountdown";
import { useCart } from "@/lib/store/app-store";

export function DealCard({ deal, product }: { deal: Deal; product: Product }) {
  const { addToCart } = useCart();
  const discountedPrice = +(product.price * (1 - deal.discountPercent / 100)).toFixed(2);
  const soldOut = deal.status === "sold-out";
  const expired = deal.status === "expired";
  const upcoming = deal.status === "upcoming";

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-3">
      <Link href={`/product/${product.slug}`} className="relative aspect-square w-full overflow-hidden rounded-md bg-background">
        <Image src={product.images[0]} alt={product.title} fill sizes="220px" className="object-cover" />
        <Badge variant="discount" className="absolute left-2 top-2">
          -{deal.discountPercent}%
        </Badge>
      </Link>

      <Link href={`/product/${product.slug}`} className="line-clamp-2 text-sm text-text hover:underline">
        {product.title}
      </Link>

      <PriceDisplay price={expired ? product.price : discountedPrice} compareAtPrice={product.price} currency={product.currency} />

      <div className="h-2 w-full overflow-hidden rounded-full bg-background" role="progressbar" aria-valuenow={deal.claimedPercent} aria-valuemin={0} aria-valuemax={100} aria-label="Percent claimed">
        <div className="h-full bg-warning" style={{ width: `${deal.claimedPercent}%` }} />
      </div>
      <p className="text-xs text-muted">{deal.claimedPercent}% claimed</p>

      {!upcoming && !expired && <DealCountdown endAt={deal.endAt} />}
      {upcoming && <DealCountdown endAt={deal.endAt} startAt={deal.startAt} />}
      {expired && <span className="text-sm font-medium text-muted">Deal ended</span>}

      {soldOut ? (
        <Button type="button" variant="outline" size="sm" disabled>
          Sold out — join waitlist
        </Button>
      ) : expired ? (
        <Button type="button" variant="outline" size="sm" disabled>
          Deal ended
        </Button>
      ) : upcoming ? (
        <Button type="button" variant="outline" size="sm" disabled>
          Starts soon
        </Button>
      ) : (
        <Button type="button" size="sm" onClick={() => addToCart(product.id, 1)}>
          Add to cart
        </Button>
      )}
    </div>
  );
}
