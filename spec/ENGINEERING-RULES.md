# Engineering Rules

## Architecture
Suggested structure:
- app/
- components/layout/
- components/navigation/
- components/product/
- components/cart/
- components/checkout/
- components/account/
- components/orders/
- components/ui/
- data/
- lib/
- types/

## State
Use a central client state solution only when needed. For the prototype, a small context/store is acceptable:
- cart items and quantities
- wishlist IDs
- authenticated user mock state
- selected address
- selected payment method
- applied coupons

Persist non-sensitive demo state in localStorage if appropriate. Never store real card details or passwords.

## Data models
Create TypeScript types for:
Product, ProductVariant, Review, Category, CartItem, Address, PaymentMethod, Order, OrderItem, Coupon, Deal, User, WishlistItem, NavigationItem.

## Quality
- Avoid duplicated markup.
- Avoid huge components.
- Use stable keys.
- Handle image loading failure.
- Keep currency formatting in a utility.
- Keep dates formatted in a utility.
- Add skeletons for slow sections.
- Avoid layout shift by reserving image space.
- Ensure mobile pages do not overflow horizontally.
