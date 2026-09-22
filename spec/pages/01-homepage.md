# Homepage Specification

## Purpose
Create the main discovery page that helps users search, browse categories, discover deals, and continue shopping.

## Visual structure
1. Header
2. Category navigation
3. Hero banner with primary CTA
4. Category shortcut cards
5. Deals carousel
6. Recommended product rows
7. Recently viewed section
8. Editorial/promotional tiles
9. Footer

## Functional behavior
- hero CTA navigates to a category or search page
- category card navigates to filtered search
- carousel arrows and touch scrolling work
- product cards open product details
- add-to-cart updates cart count
- wishlist toggles saved state
- search works from header

## Implementation
- compose sections from reusable components
- use arrays for categories, banners, deals, and products
- use responsive CSS grid
- lazy-load below-the-fold sections
- reserve image dimensions to prevent layout shift

## Acceptance criteria
- desktop has clear visual hierarchy and dense shopping content
- mobile stacks sections without overflow
- every card is clickable or has a clear action
- empty and loading states are implemented
