"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { Menu, MapPin, PackageSearch, ShoppingCart, Globe } from "lucide-react";
import { SearchBar } from "@/components/navigation/SearchBar";
import { CategoryNavigation } from "@/components/navigation/CategoryNavigation";
import { AccountMenu } from "@/components/account/AccountMenu";
import { LocationModal } from "@/components/navigation/LocationModal";
import { MobileMenuDrawer } from "@/components/navigation/MobileMenuDrawer";
import { Logo } from "@/components/layout/Logo";
import { useCart } from "@/lib/store/app-store";

export function Header() {
  const [locationOpen, setLocationOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, setLocation] = useState("United States");
  const { itemCount, hydrated } = useCart();

  return (
    <header className="sticky top-0 z-30">
      <div className="bg-header-dark text-white">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-2 px-2 py-2 sm:px-4">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-transparent hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring lg:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          <Logo className="hover:border hover:border-white" />

          <button
            type="button"
            onClick={() => setLocationOpen(true)}
            className="hidden shrink-0 items-center gap-1.5 rounded-md border border-transparent px-2 py-1.5 text-left text-xs hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring lg:flex"
          >
            <MapPin className="h-5 w-5" aria-hidden="true" />
            <span className="leading-tight">
              <span className="block text-white/70">Deliver to</span>
              <span className="block font-semibold">{location}</span>
            </span>
          </button>

          <div className="order-last w-full sm:order-none sm:w-auto sm:flex-1">
            <SearchBar />
          </div>

          <button
            type="button"
            className="hidden shrink-0 items-center gap-1 rounded-md border border-transparent px-2 py-1.5 text-sm hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring lg:flex"
            aria-label="Choose a language, currently English"
          >
            <Globe className="h-5 w-5" aria-hidden="true" />
            <span className="font-semibold">EN</span>
          </button>

          <Link
            href="/orders"
            className="hidden shrink-0 flex-col items-start rounded-md border border-transparent px-2 py-1.5 text-xs hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring md:flex"
          >
            <span className="text-white/70">Returns</span>
            <span className="flex items-center gap-1 font-semibold">
              <PackageSearch className="h-4 w-4" aria-hidden="true" />
              &amp; Orders
            </span>
          </Link>

          <AccountMenu />

          <Link
            href="/cart"
            aria-label={`Cart, ${hydrated ? itemCount : 0} items`}
            className="relative flex h-11 shrink-0 items-center gap-1 rounded-md border border-transparent px-2 hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <span className="relative">
              <ShoppingCart className="h-7 w-7" aria-hidden="true" />
              <span className="absolute -right-2 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-header-dark">
                {hydrated ? itemCount : 0}
              </span>
            </span>
            <span className="hidden font-semibold sm:inline">Cart</span>
          </Link>
        </div>
      </div>

      <div className="hidden lg:block">
        <Suspense fallback={<div className="h-[39px] bg-header-nav" />}>
          <CategoryNavigation />
        </Suspense>
      </div>

      <LocationModal isOpen={locationOpen} onClose={() => setLocationOpen(false)} onSelect={setLocation} />
      <MobileMenuDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
