import type { Coupon, Product } from "@/types";

export interface PricedLine {
  productId: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface OrderTotals {
  subtotal: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}

const TAX_RATE = 0.0; // prototype: no real tax jurisdiction, kept explicit and at 0
const FREE_DELIVERY_THRESHOLD = 35;
const STANDARD_DELIVERY_FEE = 4.99;

export function priceForVariant(
  product: Pick<Product, "price">,
  variantPriceOverride?: number
): number {
  return variantPriceOverride ?? product.price;
}

export function isCouponEligible(
  coupon: Coupon,
  product: Pick<Product, "id" | "categoryId">
): boolean {
  const now = Date.now();
  if (new Date(coupon.expiresAt).getTime() < now) return false;
  if (coupon.eligibleProductIds && coupon.eligibleProductIds.length > 0) {
    return coupon.eligibleProductIds.includes(product.id);
  }
  if (coupon.eligibleCategoryIds && coupon.eligibleCategoryIds.length > 0) {
    return coupon.eligibleCategoryIds.includes(product.categoryId);
  }
  return true;
}

export function discountForLine(
  coupon: Coupon | undefined,
  line: PricedLine
): number {
  if (!coupon) return 0;
  if (coupon.type === "percentage") {
    return +(line.lineTotal * (coupon.value / 100)).toFixed(2);
  }
  return Math.min(coupon.value, line.lineTotal);
}

export function calculateOrderTotals(
  lines: PricedLine[],
  appliedCoupons: Coupon[] = []
): OrderTotals {
  const subtotal = +lines.reduce((sum, l) => sum + l.lineTotal, 0).toFixed(2);

  const discount = +appliedCoupons
    .reduce((sum, coupon) => {
      if (coupon.type === "percentage") {
        return sum + subtotal * (coupon.value / 100);
      }
      return sum + coupon.value;
    }, 0)
    .toFixed(2);

  const cappedDiscount = Math.min(discount, subtotal);
  const taxableAmount = Math.max(0, subtotal - cappedDiscount);
  const tax = +(taxableAmount * TAX_RATE).toFixed(2);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
  const total = +(taxableAmount + tax + delivery).toFixed(2);

  return { subtotal, discount: cappedDiscount, tax, delivery, total };
}
