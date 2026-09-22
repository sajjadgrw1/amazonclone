import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // This app hydrates cart/wishlist/recent-searches/recently-viewed from
      // localStorage after mount, which is the standard SSR-safe pattern
      // (localStorage doesn't exist on the server) and is exactly the
      // "synchronize with an external system" case this rule's own docs
      // carve out — it just doesn't special-case storage reads.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Capture-hook tooling: plain Node/CommonJS, not part of the app bundle.
    ".claude/**",
  ]),
]);

export default eslintConfig;
