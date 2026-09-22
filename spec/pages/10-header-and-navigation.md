# Header and Navigation Specification

## Header layers
1. Top utility strip: optional announcements, language, help, or delivery message.
2. Main header: brand, location, search, account, orders, cart.
3. Navigation strip: menu button, category links, deals, gift cards, coupons, sell, and other links.
4. Optional page-specific navigation.

## Required functional parts
### Brand
- clicking brand returns home
- keyboard focus and accessible label

### Location
- opens location modal
- select country/region or enter postal code in mock mode
- updates displayed location
- close with Escape

### Search
- category dropdown
- autocomplete suggestions
- recent searches
- clear input
- Enter submits
- mobile search remains easy to access

### Account
- signed-out menu links to login/signup
- signed-in menu links to account, orders, wishlist, and sign out
- dropdown closes on outside click or Escape

### Orders
- routes to orders
- shows signed-out redirect if required

### Cart
- shows live item count
- optional mini-cart preview
- routes to cart

### Menu
- desktop category menu
- mobile drawer with grouped categories
- expandable nested groups
- close button and Escape behavior

## Responsive behavior
- desktop uses layered horizontal layout
- mobile uses compact header, menu icon, search, and cart
- avoid squeezing every desktop link into mobile
- move secondary links into drawer
