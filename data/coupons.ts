import type { Coupon } from "@/types";

export const coupons: Coupon[] = [
  {
    id: "coupon-save10-electronics",
    code: "SAVE10ELEC",
    type: "percentage",
    value: 10,
    expiresAt: "2026-10-15T23:59:59.000Z",
    eligibleCategoryIds: ["electronics"],
  },
  {
    id: "coupon-5off-home",
    code: "HOME5",
    type: "fixed",
    value: 5,
    expiresAt: "2026-10-10T23:59:59.000Z",
    eligibleCategoryIds: ["home-kitchen"],
  },
  {
    id: "coupon-15off-fashion",
    code: "STYLE15",
    type: "percentage",
    value: 15,
    expiresAt: "2026-10-05T23:59:59.000Z",
    eligibleCategoryIds: ["fashion"],
  },
  {
    id: "coupon-beauty-clip",
    code: "GLOW20",
    type: "percentage",
    value: 20,
    expiresAt: "2026-09-30T23:59:59.000Z",
    eligibleCategoryIds: ["beauty"],
  },
  {
    id: "coupon-sitewide-3",
    code: "WELCOME3",
    type: "fixed",
    value: 3,
    expiresAt: "2026-12-31T23:59:59.000Z",
  },
  {
    id: "coupon-expired-example",
    code: "SUMMEREND",
    type: "percentage",
    value: 25,
    expiresAt: "2026-09-01T23:59:59.000Z",
    eligibleCategoryIds: ["sports-outdoors"],
  },
];

export function getCouponByCode(code: string): Coupon | undefined {
  return coupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
}
