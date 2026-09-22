# Coupons Specification

## Visual structure
- coupon page header
- category filters
- coupon cards
- discount label
- Clip Coupon button
- clipped state
- expiration or eligibility text
- product grid

## Functional behavior
- clip/unclip coupon in mock mode
- clipped coupon appears in cart/checkout summary when eligible
- filter by category and discount type
- show unavailable or expired coupon state
- prevent applying incompatible coupons

## Implementation
- Coupon model should include id, type, value, expiresAt, eligibleProductIds, and clipped
- calculate discount in one shared pricing utility
