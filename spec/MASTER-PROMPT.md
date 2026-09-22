# Master Prompt for Claude Code

Act as a senior product designer, UX engineer, and Next.js architect.

Build an original Amazon-inspired e-commerce marketplace with Next.js App Router, TypeScript, and Tailwind CSS. Use a new brand identity and original assets. Do not copy Amazon logos, source code, proprietary images, or exact brand language.

Read every file in this package before coding:
1. CLAUDE.md
2. DESIGN-SYSTEM.md
3. COMPONENTS.md
4. ROUTE-MAP.md
5. All files inside pages/
6. All files inside components/
7. SCREENSHOT-CHECKLIST.md

Execution rules:
- First inspect the repository and summarize its current structure.
- Do not overwrite existing work without explaining the change.
- Build shared components before page-specific components.
- Use typed mock data and service functions.
- Keep components modular and reusable.
- Implement desktop and mobile layouts for every route.
- Include loading, empty, error, disabled, hover, focus, and success states.
- Do not use fake buttons: every visible action must have a working mock interaction or a clearly marked not-yet-connected state.
- Keep cart, wishlist, authentication, and checkout state consistent across routes.
- Use URL query parameters for search, filters, sorting, and pagination.
- Use accessible labels, keyboard navigation, focus styles, semantic HTML, and alt text.
- Run lint, typecheck, and build when available.
- Before finishing, list changed files, routes, completed interactions, and remaining limitations.

Start with the app shell, then implement the routes in ROUTE-MAP.md in order.
