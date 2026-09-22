"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, Mic } from "lucide-react";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

const quickLinks = [
  { label: "Today's Deals", href: "/deals/todays-deals" },
  { label: "Buy Again", href: "/orders" },
  { label: "Groceries", href: "/search?category=grocery" },
  { label: "Coupons", href: "/coupons" },
  { label: "Automotive", href: "/search?category=automotive" },
  { label: "Gift Cards", href: "/gift-cards" },
];

export function CategoryNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = pathname === "/search" ? searchParams.get("category") : null;

  return (
    <nav aria-label="Category navigation" className="bg-header-nav text-white">
      <div
        className={cn(
          "mx-auto flex max-w-[1440px] items-center gap-1 overflow-x-auto px-2 py-1.5 text-sm",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        )}
      >
        <Link
          href="/categories"
          className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded px-2 py-1.5 font-semibold border border-transparent hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
          All
        </Link>

        <Link
          href="/help"
          className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded px-2 py-1.5 border border-transparent hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          <Mic className="h-4 w-4" aria-hidden="true" />
          <span className="italic">Alexa</span> for shopping
        </Link>

        <Link
          href="/prime"
          className="shrink-0 whitespace-nowrap rounded-full bg-white px-3 py-1 font-semibold text-header-dark hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          Join Nuvara+
        </Link>

        {categories.slice(0, 5).map((c) => {
          const isActive = activeCategory === c.slug;
          return (
            <Link
              key={c.id}
              href={`/search?category=${c.slug}`}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "shrink-0 whitespace-nowrap rounded border border-transparent px-2 py-1.5 hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
                isActive && "border-white font-semibold"
              )}
            >
              {c.name}
            </Link>
          );
        })}

        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 whitespace-nowrap rounded border border-transparent px-2 py-1.5 hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            {link.label}
          </Link>
        ))}

        <span className="ml-auto shrink-0 whitespace-nowrap pl-4 pr-2 text-sm font-bold">
          Nuvara Big Deal Days is October 6&ndash;7
        </span>
      </div>
    </nav>
  );
}
