# Product Details Specification

## Visual structure
1. Breadcrumbs
2. image gallery
3. product title and rating
4. price and discount
5. coupon area
6. variant selectors
7. delivery/location panel
8. quantity and purchase actions
9. seller/availability panel
10. description/specifications
11. reviews
12. related products

## Functional behavior
- thumbnail changes main image
- variant selection updates selected variant and price if applicable
- quantity validates min/max
- add to cart adds selected variant
- buy now adds item and routes to checkout
- wishlist toggles
- coupon can be clipped in mock mode
- review tabs or sections navigate correctly

## Implementation
- keep selected image, variant, and quantity in local state
- use reusable PriceDisplay, RatingStars, QuantitySelector
- handle unavailable/out-of-stock states
- use responsive two-column desktop and stacked mobile layout
