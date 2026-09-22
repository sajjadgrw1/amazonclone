"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { useCart, useWishlist } from "@/lib/store/app-store";
import { formatDate } from "@/lib/format";

export default function WishlistPage() {
  const { items, hydrated, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-4 h-40 w-full" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center">
        <h1 className="text-xl font-semibold text-text">Your wishlist is empty</h1>
        <p className="text-sm text-muted">Tap the heart icon on any product to save it here.</p>
        <Link href="/">
          <Button type="button">Start browsing</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold text-text">Your Wishlist ({items.length})</h1>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((wishlistItem) => {
          const product = products.find((p) => p.id === wishlistItem.productId);
          if (!product) return null;
          return (
            <div key={wishlistItem.productId} className="flex gap-3 rounded-lg border border-border bg-surface p-3">
              <Link href={`/product/${product.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-background">
                <Image src={product.images[0]} alt={product.title} fill sizes="96px" className="object-cover" />
              </Link>
              <div className="flex flex-1 flex-col gap-1">
                <Link href={`/product/${product.slug}`} className="line-clamp-2 text-sm font-medium text-text hover:underline">
                  {product.title}
                </Link>
                <PriceDisplay price={product.price} compareAtPrice={product.compareAtPrice} currency={product.currency} />
                <p className="text-xs text-muted">Saved {formatDate(wishlistItem.addedAt)}</p>
                {!product.inStock && <p className="text-xs font-medium text-danger">Out of stock</p>}
                <div className="mt-auto flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    disabled={!product.inStock}
                    onClick={() => {
                      addToCart(product.id, 1);
                      removeFromWishlist(product.id);
                    }}
                  >
                    Move to cart
                  </Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => removeFromWishlist(product.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
