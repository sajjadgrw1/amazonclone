"use client";

import Link from "next/link";
import { ChevronDown, User as UserIcon } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import { useAuth } from "@/lib/store/app-store";
import { cn } from "@/lib/utils";

export function AccountMenu() {
  const { isSignedIn, user, logout, hydrated } = useAuth();

  return (
    <Dropdown
      align="right"
      trigger={({ open, toggle }) => (
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-haspopup="menu"
          className="flex h-11 items-center gap-1.5 rounded-md px-2 text-sm text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          <UserIcon className="h-5 w-5" aria-hidden="true" />
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-xs text-white/70">
              {hydrated && isSignedIn ? `Hello, ${user?.name.split(" ")[0]}` : "Hello, sign in"}
            </span>
            <span className="block font-semibold">Account & Lists</span>
          </span>
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    >
      {(close) => (
        <div role="menu" className="flex flex-col py-1">
          {hydrated && isSignedIn ? (
            <>
              <Link role="menuitem" href="/account" onClick={close} className={menuItemClass}>
                Your Account
              </Link>
              <Link role="menuitem" href="/orders" onClick={close} className={menuItemClass}>
                Your Orders
              </Link>
              <Link role="menuitem" href="/wishlist" onClick={close} className={menuItemClass}>
                Your Wishlist
              </Link>
              <Link role="menuitem" href="/lists" onClick={close} className={menuItemClass}>
                Your Lists
              </Link>
              <div className="my-1 border-t border-border" />
              <button
                role="menuitem"
                type="button"
                onClick={() => {
                  logout();
                  close();
                }}
                className={cn(menuItemClass, "text-left")}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link role="menuitem" href="/login" onClick={close} className={menuItemClass}>
                Sign In
              </Link>
              <Link role="menuitem" href="/signup" onClick={close} className={menuItemClass}>
                Create Account
              </Link>
              <div className="my-1 border-t border-border" />
              <Link role="menuitem" href="/orders" onClick={close} className={menuItemClass}>
                Your Orders
              </Link>
              <Link role="menuitem" href="/wishlist" onClick={close} className={menuItemClass}>
                Your Wishlist
              </Link>
            </>
          )}
        </div>
      )}
    </Dropdown>
  );
}

const menuItemClass =
  "px-4 py-2 text-sm text-text hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-inset";
