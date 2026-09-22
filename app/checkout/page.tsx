"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { products } from "@/data/products";
import { coupons } from "@/data/coupons";
import { mockAddresses, mockPaymentMethods } from "@/data/mock-account";
import { AddressSection } from "@/components/checkout/AddressSection";
import { PaymentSection } from "@/components/checkout/PaymentSection";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth, useCart, useCheckoutSelection, useOrders } from "@/lib/store/app-store";
import { calculateOrderTotals, type PricedLine } from "@/lib/pricing";
import { formatCurrency } from "@/lib/format";
import type { Order, OrderItem } from "@/types";

type DeliveryOption = "standard" | "express";

export default function CheckoutPage() {
  const { isSignedIn, hydrated: authHydrated } = useAuth();
  const { activeItems, hydrated: cartHydrated, clearCart } = useCart();
  const {
    selectedAddressId,
    selectedPaymentMethodId,
    clippedCouponCodes,
    customAddresses,
    setAddress,
    addAddress,
    setPaymentMethod,
  } = useCheckoutSelection();
  const { placeOrder } = useOrders();

  const [delivery, setDelivery] = useState<DeliveryOption>("standard");
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [placeOrderError, setPlaceOrderError] = useState<string | undefined>();
  const [validationError, setValidationError] = useState<string | undefined>();
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const hydrated = authHydrated && cartHydrated;
  const allAddresses = [...mockAddresses, ...customAddresses];

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-6">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="mt-4 h-64 w-full" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center">
        <h1 className="text-xl font-semibold text-text">Sign in to continue to checkout</h1>
        <p className="text-sm text-muted">You&rsquo;ll need a Nuvara account to place a mock order.</p>
        <Link href="/login?next=/checkout">
          <Button type="button">Sign in</Button>
        </Link>
      </div>
    );
  }

  if (confirmedOrder) {
    return <OrderConfirmation order={confirmedOrder} />;
  }

  if (activeItems.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center">
        <h1 className="text-xl font-semibold text-text">Your cart is empty</h1>
        <Link href="/">
          <Button type="button">Continue shopping</Button>
        </Link>
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
  const baseTotals = calculateOrderTotals(lines, appliedCoupons);
  const deliveryFee = delivery === "express" ? 9.99 : baseTotals.delivery;
  const totals = {
    ...baseTotals,
    delivery: deliveryFee,
    total: +(baseTotals.total - baseTotals.delivery + deliveryFee).toFixed(2),
  };

  function handlePlaceOrder() {
    setValidationError(undefined);
    setPlaceOrderError(undefined);

    if (!selectedAddressId) {
      setValidationError("Select or add a shipping address.");
      return;
    }
    if (!selectedPaymentMethodId) {
      setValidationError("Select a payment method.");
      return;
    }

    setIsPlacingOrder(true);
    window.setTimeout(() => {
      setIsPlacingOrder(false);

      if (simulateFailure) {
        setPlaceOrderError("Your mock payment was declined. No charge was made — please try again.");
        return;
      }

      const address = allAddresses.find((a) => a.id === selectedAddressId)!;
      const paymentMethod = mockPaymentMethods.find((p) => p.id === selectedPaymentMethodId)!;

      const orderItems: OrderItem[] = activeItems.map((item) => {
        const product = products.find((p) => p.id === item.productId)!;
        const variant = product.variants?.find((v) => v.id === item.variantId);
        return {
          productId: product.id,
          variantId: item.variantId,
          title: product.title,
          imageUrl: product.images[0],
          unitPrice: variant?.priceOverride ?? product.price,
          quantity: item.quantity,
        };
      });

      const order: Order = {
        id: `order-${Date.now()}`,
        orderNumber: `NUV-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        items: orderItems,
        status: "pending",
        placedAt: new Date().toISOString(),
        subtotal: totals.subtotal,
        discount: totals.discount,
        tax: totals.tax,
        deliveryFee: totals.delivery,
        total: totals.total,
        shippingAddress: address,
        paymentMethod,
      };

      placeOrder(order);
      clearCart();
      setConfirmedOrder(order);
    }, 800);
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6">
      <h1 className="mb-2 text-2xl font-semibold text-text">Checkout</h1>
      <ol className="mb-6 flex gap-4 text-sm text-muted" aria-label="Checkout steps">
        <li className="font-medium text-primary">1. Address</li>
        <li>2. Delivery</li>
        <li>3. Payment</li>
        <li>4. Review</li>
      </ol>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-4">
          <AddressSection
            addresses={allAddresses}
            selectedAddressId={selectedAddressId}
            onSelect={setAddress}
            onAdd={addAddress}
          />

          <section aria-labelledby="delivery-heading" className="rounded-lg border border-border bg-surface p-4">
            <h2 id="delivery-heading" className="mb-3 text-lg font-semibold text-text">
              2. Delivery Method
            </h2>
            <div className="flex flex-col gap-2">
              <label className="flex cursor-pointer items-center justify-between rounded-md border border-border p-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <span className="flex items-center gap-3">
                  <input type="radio" name="delivery" checked={delivery === "standard"} onChange={() => setDelivery("standard")} className="h-4 w-4" />
                  Standard (4-6 business days)
                </span>
                <span className="text-muted">{baseTotals.delivery === 0 ? "FREE" : formatCurrency(baseTotals.delivery)}</span>
              </label>
              <label className="flex cursor-pointer items-center justify-between rounded-md border border-border p-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <span className="flex items-center gap-3">
                  <input type="radio" name="delivery" checked={delivery === "express"} onChange={() => setDelivery("express")} className="h-4 w-4" />
                  Express (2 business days)
                </span>
                <span className="text-muted">{formatCurrency(9.99)}</span>
              </label>
            </div>
          </section>

          <PaymentSection
            paymentMethods={mockPaymentMethods}
            selectedPaymentMethodId={selectedPaymentMethodId}
            onSelect={setPaymentMethod}
            simulateFailure={simulateFailure}
            onSimulateFailureChange={setSimulateFailure}
          />

          <section aria-labelledby="items-heading" className="rounded-lg border border-border bg-surface p-4">
            <h2 id="items-heading" className="mb-3 text-lg font-semibold text-text">
              4. Order Items ({activeItems.length})
            </h2>
            <ul className="flex flex-col gap-2 text-sm">
              {activeItems.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;
                return (
                  <li key={`${item.productId}-${item.variantId ?? "default"}`} className="flex justify-between">
                    <span className="text-text">
                      {product.title} &times; {item.quantity}
                    </span>
                    <span className="text-muted">{formatCurrency(product.price * item.quantity)}</span>
                  </li>
                );
              })}
            </ul>
          </section>

          {(validationError || placeOrderError) && (
            <div role="alert" className="flex items-start gap-2 rounded-md border border-danger/40 bg-danger/5 p-3 text-sm text-danger">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <div>
                <p>{validationError ?? placeOrderError}</p>
                {placeOrderError && (
                  <Button type="button" size="sm" variant="outline" className="mt-2" onClick={handlePlaceOrder}>
                    Retry
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        <div>
          <OrderSummary
            totals={totals}
            ctaLabel={isPlacingOrder ? "Placing order..." : "Place your order"}
            onCta={handlePlaceOrder}
            ctaDisabled={isPlacingOrder}
          />
        </div>
      </div>
    </div>
  );
}
