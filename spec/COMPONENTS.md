# Component Specifications

## Header
Visual:
- dark or high-contrast top area
- brand block
- delivery/location block
- large search input
- account menu
- orders link
- cart icon with count

Functionality:
- search submits to /search?q=
- location opens location modal
- account opens account/login menu
- orders routes to /orders
- cart routes to /cart
- cart count updates live
- mobile menu opens a drawer

## SearchBar
- category selector optional
- text input
- clear button when text exists
- submit on Enter and button click
- autocomplete mock dropdown
- keyboard-friendly results
- loading state
- no-results state

## CategoryNavigation
- horizontal category links
- active route state
- mobile horizontal scroll or drawer
- overflow menu for extra categories

## ProductCard
- fixed image ratio
- title with line clamp
- rating and review count
- current price and optional old price
- discount badge
- delivery label
- wishlist button
- add-to-cart button
- hover/focus states
- skeleton version

## ProductCarousel
- heading and optional see-all link
- horizontal cards
- previous/next controls on desktop
- swipe-friendly mobile behavior
- disabled controls at boundaries

## FilterSidebar / FilterDrawer
- category
- price range
- rating
- availability
- delivery option
- brand
- clear all
- apply button on mobile
- URL query synchronization

## Modal / Drawer
- focus management
- Escape to close
- backdrop click behavior
- mobile bottom sheet option
- accessible title and description

## CartItem
- product image/title/variant
- quantity selector
- price
- remove
- save for later
- unavailable warning

## OrderSummary
- subtotal
- delivery
- discount
- tax
- grand total
- checkout or place-order CTA
- coupon input where applicable

## AccountMenu
- signed-out and signed-in variants
- account
- orders
- wishlist
- addresses
- sign out
