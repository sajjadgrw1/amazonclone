# Checkout Specification

## Visual structure
- progress/step indicator
- shipping address
- delivery method
- payment method
- order items
- coupon/discount
- order summary
- place order CTA

## Functional behavior
- select/add/edit address
- select delivery option
- select mock payment method
- validate required sections
- place order creates a mock order
- success page shows order number and summary
- failure state allows retry

## Implementation
- use a multi-section layout on desktop
- stack sections on mobile
- keep summary visible without obstructing content
- never process real payments in prototype mode
