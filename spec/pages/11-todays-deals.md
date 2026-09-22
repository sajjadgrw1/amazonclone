# Today's Deals Specification

## Purpose
A deal-discovery page with time-sensitive promotions and category filters.

## Visual structure
- page title and intro
- deal category tabs
- featured deal banner
- deal product grid
- discount badges
- progress/claimed indicator for selected mock deals
- filters and sorting
- countdown only for demo data with clear expiration

## Functional behavior
- filter by category and deal type
- sort by discount, price, or ending soon
- open product detail
- add to cart
- show sold-out and expired states
- countdown must be derived from a timestamp, not hardcoded text

## Implementation
- use Deal type with startAt, endAt, claimedPercent, and status
- do not imply real-time deal availability in mock mode
- use accessible progress labels
