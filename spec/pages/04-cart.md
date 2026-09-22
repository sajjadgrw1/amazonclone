# Cart Specification

## Visual structure
- page title
- cart items list
- quantity controls
- remove/save actions
- subtotal
- coupon input
- delivery message
- order summary
- recommended products

## Functional behavior
- increase/decrease quantity
- remove item
- save for later
- move saved item back to cart
- calculate subtotal and discount
- disable checkout when cart is empty
- route to checkout

## Implementation
- derive totals from cart state rather than hardcoding
- show unavailable or quantity-limit warnings
- include empty cart and loading states
