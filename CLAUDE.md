# CLAUDE.md — Nuvara (Amazon-inspired marketplace prototype)

Engineering rules for this repo. Adapted from the `amazon_clone_ai_reference_package`
spec package, extracted at [spec/](spec/) (original ZIP also kept at repo root as
[amazon_clone_ai_reference_package.zip](amazon_clone_ai_reference_package.zip)) — read
[spec/pages/*.md](spec/pages/), [spec/COMPONENTS.md](spec/COMPONENTS.md),
[spec/DESIGN-SYSTEM.md](spec/DESIGN-SYSTEM.md), and [spec/ROUTE-MAP.md](spec/ROUTE-MAP.md)
before implementing a new page or shared component. The spec package's own
[spec/README.md](spec/README.md) is explicit: "Use original brand name, logo, copy,
colors, icons, and imagery... not protected branding or assets". **Overridden by the
project owner (2026-09-22):** this prototype now intentionally replicates Amazon's
exact color identity (header navy `#131921`/`#232F3E`, accent orange `#FF9900`/
`#FEBD69`) and an Amazon-style wordmark/logo treatment, built from scratch (no
downloaded Amazon logo assets). The "Nuvara" name, mock data, and "not a real
store/not affiliated with Amazon" disclaimers stay as-is — only the visual identity
restriction is lifted.

## What this is

An **original**, Amazon-inspired e-commerce marketplace UX study. Next.js App Router,
TypeScript, Tailwind CSS. Mock data only — no real backend, no real payments, no real
passwords, no real gift-card codes.

- **Working brand name (placeholder, pending confirmation): "Nuvara"**. Visual identity
  (colors, wordmark/logo treatment) intentionally mirrors Amazon's — see the override
  note above. Swap this name/identity freely if the project owner picks something else —
  it is not final.

## Stack & tooling

- Next.js (App Router), TypeScript, Tailwind CSS v4 (CSS-based theme via `@theme` in
  `app/globals.css` — no `tailwind.config.js`)
- Package manager: npm
- `npm run dev` / `npm run build` / `npm run start` / `npm run lint` / `npm run typecheck`
- Run lint, typecheck, and build before considering a change finished, when the tooling
  is available.

## Architecture

```
app/                    App Router routes (one folder per route segment)
components/layout/      Header, Footer, page shells
components/navigation/  CategoryNavigation, mobile drawer, breadcrumbs
components/product/     ProductCard, ProductCarousel, PriceDisplay, RatingStars, gallery
components/cart/        CartItem, OrderSummary (cart context), mini-cart
components/checkout/    Checkout steps, address/payment selectors
components/account/     AccountMenu, profile/address forms
components/orders/      Order cards, status badges, order detail views
components/ui/          Generic primitives: Button, Input, Dropdown, Modal/Drawer, Card
data/                   Typed mock data (products, categories, deals, coupons, orders...)
lib/                    Utilities: currency formatting, date formatting, pricing, cn()
types/                  Shared TypeScript types (see types/index.ts)
```

Build shared `components/ui/` primitives before page-specific components. Build shared
components before the pages that consume them.

## State

A small client-side store (React context, or a lightweight state library if the context
grows unwieldy) holds:

- cart items and quantities
- wishlist product IDs
- mock authenticated user
- selected address
- selected payment method
- applied/clipped coupons

Persist non-sensitive demo state in `localStorage` (cart, wishlist, clipped coupons,
recently viewed). **Never** persist real card details or passwords — there are none;
this is mock auth and mock payment only.

## Data models

Defined in `types/index.ts`: `Product`, `ProductVariant`, `Review`, `Category`,
`CartItem`, `Address`, `PaymentMethod`, `Order`, `OrderItem`, `Coupon`, `Deal`, `User`,
`WishlistItem`, `NavigationItem`. Extend this file rather than inlining ad-hoc shapes
elsewhere. Mock data in `data/` must be typed against these interfaces.

## Routing conventions

- Search, filters, sorting, and pagination live in URL query params (`?q=`, `?category=`,
  `?sort=`, `?minPrice=`, `?maxPrice=`, `?rating=`, `?page=`), not local-only state, so
  results are shareable/linkable. See `ROUTE-MAP.md` in the reference package for the
  full route list.
- Route groups worth considering as the app grows: `(shop)` for browse/cart/checkout,
  `(account)` for account/orders/wishlist/lists, `(marketing)` for deals/coupons/gift-cards
  /sell/prime-equivalent/help. Not required up front — introduce a group when a segment
  actually needs a distinct layout, not preemptively.

## Quality bar

- Every route needs a working desktop layout and a working mobile layout.
- Every interactive element needs loading, empty, error, disabled, hover, and focus
  states where applicable — not just the happy path.
- No dead buttons: every visible action either does something against mock data, or is
  clearly labeled as not-yet-connected. Never a silent no-op.
- Avoid duplicated markup — extract a shared component once a pattern repeats.
- Avoid huge components — split when a component is doing more than one job.
- Use stable `key`s for lists (IDs, not array index, once data can reorder).
- Handle image loading failure (fallback state, not a broken-image icon).
- Currency formatting lives in one `lib/` utility — do not hand-roll `$${price}` in
  components.
- Date formatting lives in one `lib/` utility.
- Add skeleton states for sections that load mock data asynchronously.
- Reserve image dimensions (explicit width/height or aspect-ratio) to avoid layout
  shift.
- Mobile pages must not overflow horizontally — verify at ~375px width.
- Accessibility: semantic HTML, labelled form controls, visible focus rings, keyboard
  navigation for menus/modals/carousels, alt text on all product imagery, Escape closes
  modals/drawers, focus is trapped inside open modals and returned on close.

## Known gaps / assumptions carried from the reference spec

- The reference package's `MASTER-PROMPT.md` references a `components/` folder inside
  the spec package itself; that folder does not exist in the extracted ZIP — only
  `COMPONENTS.md`. Treat `COMPONENTS.md` as the authoritative component spec.
- The membership page (`/prime` in `ROUTE-MAP.md`) must use an original name and
  fictional benefits — never "Prime" in user-facing copy.
- Deal countdowns must be computed from real `startAt`/`endAt` timestamps, never
  hardcoded strings.
- `/product/[slug]` calls `notFound()` for an unknown slug, but because the root layout's
  `Header` contains a `<Suspense>` boundary (required for `useSearchParams` in
  `CategoryNavigation`), the response has already started streaming as `200` by the time
  `notFound()` runs — this is Next.js's documented "soft 404" trade-off for streaming App
  Router pages (see `node_modules/next/dist/docs/.../not-found.md` and
  `.../loading.md#status-codes`), not a bug. The correct UI renders and Next.js auto-injects
  `<meta name="robots" content="noindex">`, but the HTTP status is `200`, not `404`. A true
  404 status would require checking existence in `proxy.ts` before any rendering starts —
  not implemented here since it can't special-case one dynamic segment without also
  intercepting every other route. `/orders/[id]` has the same soft-not-found UI behavior,
  for a different reason: order data lives in client-side state (`localStorage`), which a
  server component / proxy can never see, so that page's "not found" branch is inherently
  client-only.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
