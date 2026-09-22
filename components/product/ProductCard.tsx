"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/types";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { RatingStars } from "@/components/product/RatingStars";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCart, useWishlist } from "@/lib/store/app-store";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div
      className={cn(
        "group relative flex w-full flex-col rounded-lg border border-border bg-surface p-3 transition-shadow hover:shadow-md focus-within:shadow-md",
        className
      )}
    >
      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        aria-pressed={wishlisted}
        aria-label={wishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
        className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-muted shadow hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        <Heart className={cn("h-5 w-5", wishlisted && "fill-danger text-danger")} aria-hidden="true" />
      </button>

      <Link
        href={`/product/${product.slug}`}
        className="flex flex-col gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-background">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 220px, 45vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
          {!product.inStock && (
            <span className="absolute inset-x-0 bottom-0 bg-text/80 py-1 text-center text-xs font-medium text-white">
              Out of stock
            </span>
          )}
        </div>

        <p className="line-clamp-2 text-sm text-text">{product.title}</p>
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        <PriceDisplay price={product.price} compareAtPrice={product.compareAtPrice} currency={product.currency} />
        <p className="text-xs text-muted">{product.deliveryEstimate}</p>
      </Link>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-3"
        disabled={!product.inStock}
        onClick={() => addToCart(product.id, 1)}
      >
        {product.inStock ? "Add to cart" : "Out of stock"}
      </Button>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border border-border bg-surface p-3">
      <Skeleton className="aspect-square w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
}
