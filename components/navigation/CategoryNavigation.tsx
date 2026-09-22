"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

const extraLinks = [
  { label: "Today's Deals", href: "/deals/todays-deals" },
  { label: "Coupons", href: "/coupons" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "Sell", href: "/sell" },
];

export function CategoryNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = pathname === "/search" ? searchParams.get("category") : null;

  return (
    <nav aria-label="Category navigation" className="bg-secondary text-white">
      <div
        className={cn(
          "mx-auto flex max-w-[1440px] items-center gap-4 overflow-x-auto px-4 py-2 text-sm",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        )}
      >
        {categories.map((c) => {
          const isActive = activeCategory === c.slug;
          return (
            <Link
              key={c.id}
              href={`/search?category=${c.slug}`}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "shrink-0 whitespace-nowrap rounded px-2 py-1 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
                isActive && "bg-white/15 font-semibold"
              )}
            >
              {c.name}
            </Link>
          );
        })}
        <span className="shrink-0 border-l border-white/20 pl-4" aria-hidden="true" />
        {extraLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 whitespace-nowrap rounded px-2 py-1 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
