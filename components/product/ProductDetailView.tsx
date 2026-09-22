"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, MapPin, ShieldCheck, Tag, Truck } from "lucide-react";
import type { Product } from "@/types";
import type { Coupon } from "@/types";
import { ProductGallery } from "@/components/product/ProductGallery";
import { RatingStars } from "@/components/product/RatingStars";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { Button } from "@/components/ui/Button";
import { useCart, useCheckoutSelection, useWishlist } from "@/lib/store/app-store";
import { recordRecentlyViewed } from "@/lib/hooks/useRecentlyViewed";

export interface ProductDetailViewProps {
  product: Product;
  eligibleCoupon?: Coupon;
}

export function ProductDetailView({ product, eligibleCoupon }: ProductDetailViewProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { clippedCouponCodes, clipCoupon } = useCheckoutSelection();

  const [selectedVariantId, setSelectedVariantId] = useState(product.variants?.[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  useEffect(() => {
    recordRecentlyViewed(product.id);
  }, [product.id]);

  const selectedVariant = product.variants?.find((v) => v.id === selectedVariantId);
  const effectivePrice = selectedVariant?.priceOverride ?? product.price;
  const inStock = selectedVariant ? selectedVariant.inStock : product.inStock;
  const wishlisted = isWishlisted(product.id);
  const couponClipped = eligibleCoupon ? clippedCouponCodes.includes(eligibleCoupon.code) : false;

  function handleAddToCart() {
    addToCart(product.id, quantity, selectedVariantId);
    setAddedMessage(true);
    window.setTimeout(() => setAddedMessage(false), 2500);
  }

  function handleBuyNow() {
    addToCart(product.id, quantity, selectedVariantId);
    router.push("/checkout");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div>
        <ProductGallery images={product.images} title={product.title} />
      </div>

      <div className="flex flex-col gap-4">
        <div>
          {product.brand && <p className="text-sm text-primary">{product.brand}</p>}
          <h1 className="text-xl font-semibold text-text sm:text-2xl">{product.title}</h1>
          <div className="mt-1">
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
          </div>
        </div>

        <div className="border-y border-border py-3">
          <PriceDisplay price={effectivePrice} compareAtPrice={product.compareAtPrice} currency={product.currency} size="lg" />
        </div>

        {eligibleCoupon && (
          <div className="flex items-center justify-between gap-3 rounded-md border border-dashed border-warning/60 bg-warning/5 p-3">
            <div className="flex items-center gap-2 text-sm text-text">
              <Tag className="h-4 w-4 text-warning" aria-hidden="true" />
              <span>
                Clip coupon: {eligibleCoupon.type === "percentage" ? `${eligibleCoupon.value}% off` : `$${eligibleCoupon.value} off`}
              </span>
            </div>
            <Button
              type="button"
              size="sm"
              variant={couponClipped ? "outline" : "primary"}
              onClick={() => clipCoupon(eligibleCoupon.code)}
              disabled={couponClipped}
            >
              {couponClipped ? "Clipped" : "Clip coupon"}
            </Button>
          </div>
        )}

        {product.variants && product.variants.length > 0 && (
          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-text">Options</legend>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariantId(variant.id)}
                  aria-pressed={selectedVariantId === variant.id}
                  disabled={!variant.inStock}
                  className={`rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:cursor-not-allowed disabled:opacity-40 ${
                    selectedVariantId === variant.id ? "border-primary bg-primary/10 text-primary" : "border-border text-text hover:bg-background"
                  }`}
                >
                  {variant.label}
                  {!variant.inStock && " (out of stock)"}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div className="flex items-start gap-2 rounded-md border border-border p-3 text-sm text-text">
          <Truck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <p className="font-medium">{product.deliveryEstimate}</p>
            <p className="flex items-center gap-1 text-muted">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Deliver to your location
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-border p-4">
          <p className={inStock ? "font-semibold text-success" : "font-semibold text-danger"}>
            {inStock ? "In Stock" : "Currently unavailable"}
          </p>

          {inStock && (
            <QuantitySelector value={quantity} onChange={setQuantity} min={1} max={10} />
          )}

          <Button type="button" onClick={handleAddToCart} disabled={!inStock} fullWidth>
            Add to Cart
          </Button>
          <Button type="button" variant="secondary" onClick={handleBuyNow} disabled={!inStock} fullWidth>
            Buy Now
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => toggleWishlist(product.id)}
            fullWidth
            aria-pressed={wishlisted}
          >
            <Heart className={wishlisted ? "h-4 w-4 fill-danger text-danger" : "h-4 w-4"} aria-hidden="true" />
            {wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
          </Button>

          {addedMessage && (
            <p role="status" className="text-sm font-medium text-success">
              Added to cart.
            </p>
          )}

          <div className="flex items-center gap-2 border-t border-border pt-3 text-xs text-muted">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Sold and shipped by {product.brand ?? "Nuvara Marketplace"} (mock seller)
          </div>
        </div>
      </div>
    </div>
  );
}

