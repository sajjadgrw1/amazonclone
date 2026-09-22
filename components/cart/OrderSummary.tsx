"use client";

import { useState } from "react";
import type { OrderTotals } from "@/lib/pricing";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getCouponByCode } from "@/data/coupons";
import { useCheckoutSelection } from "@/lib/store/app-store";

export interface OrderSummaryProps {
  totals: OrderTotals;
  ctaLabel: string;
  onCta: () => void;
  ctaDisabled?: boolean;
  showCouponInput?: boolean;
}

export function OrderSummary({ totals, ctaLabel, onCta, ctaDisabled, showCouponInput }: OrderSummaryProps) {
  const { clippedCouponCodes, clipCoupon } = useCheckoutSelection();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | undefined>();
  const [couponSuccess, setCouponSuccess] = useState<string | undefined>();

  function handleApplyCoupon() {
    const coupon = getCouponByCode(couponInput);
    if (!coupon) {
      setCouponError("That coupon code isn't valid.");
      setCouponSuccess(undefined);
      return;
    }
    if (new Date(coupon.expiresAt).getTime() < Date.now()) {
      setCouponError("That coupon has expired.");
      setCouponSuccess(undefined);
      return;
    }
    if (clippedCouponCodes.includes(coupon.code)) {
      setCouponError("That coupon is already applied.");
      return;
    }
    clipCoupon(coupon.code);
    setCouponError(undefined);
    setCouponSuccess(`${coupon.code} applied.`);
    setCouponInput("");
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-4">
      <h2 className="text-lg font-semibold text-text">Order Summary</h2>

      {showCouponInput && (
        <div className="flex flex-col gap-2 border-b border-border pb-4">
          <div className="flex gap-2">
            <Input
              aria-label="Coupon code"
              placeholder="Enter coupon code"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              className="flex-1"
            />
            <Button type="button" variant="outline" onClick={handleApplyCoupon} disabled={!couponInput}>
              Apply
            </Button>
          </div>
          {couponError && <p className="text-sm text-danger">{couponError}</p>}
          {couponSuccess && <p className="text-sm text-success">{couponSuccess}</p>}
          {clippedCouponCodes.length > 0 && (
            <p className="text-xs text-muted">Applied: {clippedCouponCodes.join(", ")}</p>
          )}
        </div>
      )}

      <dl className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="text-text">{formatCurrency(totals.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Delivery</dt>
          <dd className="text-text">{totals.delivery === 0 ? "FREE" : formatCurrency(totals.delivery)}</dd>
        </div>
        {totals.discount > 0 && (
          <div className="flex justify-between text-success">
            <dt>Discount</dt>
            <dd>-{formatCurrency(totals.discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-muted">Tax</dt>
          <dd className="text-text">{formatCurrency(totals.tax)}</dd>
        </div>
        <div className="flex justify-between border-t border-border pt-2 text-base font-semibold text-text">
          <dt>Order total</dt>
          <dd>{formatCurrency(totals.total)}</dd>
        </div>
      </dl>

      <Button type="button" onClick={onCta} disabled={ctaDisabled} fullWidth>
        {ctaLabel}
      </Button>
    </div>
  );
}
