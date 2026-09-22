"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";
import { coupons } from "@/data/coupons";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCart, useCheckoutSelection } from "@/lib/store/app-store";
import { calculateOrderTotals, type PricedLine } from "@/lib/pricing";

export default function CartPage() {
  const router = useRouter();
  const { items, activeItems, savedItems, hydrated } = useCart();
  const { clippedCouponCodes } = useCheckoutSelection();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-6">
        <Skeleton className="mb-4 h-8 w-56" />
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  const lines: PricedLine[] = activeItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    const variant = product?.variants?.find((v) => v.id === item.variantId);
    const unitPrice = variant?.priceOverride ?? product?.price ?? 0;
    return {
      productId: item.productId,
      unitPrice,
      quantity: item.quantity,
      lineTotal: +(unitPrice * item.quantity).toFixed(2),
    };
  });

  const appliedCoupons = coupons.filter((c) => clippedCouponCodes.includes(c.code));
  const totals = calculateOrderTotals(lines, appliedCoupons);

  const recommended = products.slice(0, 8);

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-text">Your cart is empty</h1>
        <p className="text-sm text-muted">Looks like you haven&rsquo;t added anything yet.</p>
        <Link href="/" className="text-sm font-medium text-primary hover:underline">
          Continue shopping
        </Link>
        <div className="mt-8 w-full">
          <ProductCarousel heading="Popular right now" products={recommended} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold text-text">Shopping Cart</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          <div className="rounded-lg border border-border bg-surface p-4">
            <h2 className="mb-2 text-lg font-semibold text-text">Cart</h2>

            {activeItems.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted">No items in your cart right now.</p>
            ) : (
              activeItems.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;
                return <CartItemRow key={`${item.productId}-${item.variantId ?? "default"}`} item={item} product={product} />;
              })
            )}

            <div className="mt-4 rounded-md border border-border p-4">
              <h3 className="mb-2 font-semibold text-text">Saved for later {savedItems.length > 0 && `(${savedItems.length})`}</h3>
              {savedItems.length === 0 ? (
                <p className="text-sm text-muted">Your saved items appear here.</p>
              ) : (
                savedItems.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  if (!product) return null;
                  return <CartItemRow key={`${item.productId}-${item.variantId ?? "default"}-saved`} item={item} product={product} />;
                })
              )}
            </div>
          </div>

          <ProductCarousel heading="Frequently viewed together" products={recommended} />
        </div>

        <div>
          <OrderSummary
            totals={totals}
            ctaLabel={`Proceed to Checkout (${activeItems.reduce((n, i) => n + i.quantity, 0)} items)`}
            onCta={() => router.push("/checkout")}
            ctaDisabled={activeItems.length === 0}
            showCouponInput
          />
        </div>
      </div>
    </div>
  );
}
