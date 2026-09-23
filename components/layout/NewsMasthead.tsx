"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, ChevronDown, Search, X } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";

const navGroups = [
  {
    label: "News",
    items: [
      { label: "Press Center", href: "/press" },
      { label: "Today's Deals", href: "/deals/todays-deals" },
    ],
  },
  {
    label: "About Us",
    items: [
      { label: "About Nuvara", href: "/about" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    label: "Our Impact",
    items: [
      { label: "Sustainability", href: "/sustainability" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

export function NewsMasthead() {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<string | null>(null);

  async function requestNotifications() {
    if (typeof window === "undefined" || !("Notification" in window)) {
      setNotificationStatus("Notifications aren't supported in this browser.");
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      setNotificationStatus(
        permission === "granted" ? "Notifications allowed." : "Notifications weren't allowed."
      );
    } catch {
      setNotificationStatus("Couldn't request notification permission.");
    }
    setBannerDismissed(true);
  }

  return (
    <>
      {!bannerDismissed && (
        <div className="flex items-center justify-between gap-3 bg-background px-4 py-3 text-sm text-text">
          <button type="button" onClick={requestNotifications} className="text-left underline-offset-2 hover:underline">
            To sign up for news alerts from Nuvara, click here and choose &ldquo;Allow&rdquo; for notifications.
          </button>
          <button
            type="button"
            onClick={() => setBannerDismissed(true)}
            aria-label="Dismiss notification banner"
            className="shrink-0 rounded p-1 text-muted hover:bg-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
      {notificationStatus && (
        <p role="status" className="bg-background px-4 pb-2 text-xs text-muted">
          {notificationStatus}
        </p>
      )}

      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link href="/press" className="text-2xl font-bold text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
            Nuvara <span className="text-primary">News</span>
          </Link>

          <nav aria-label="Newsletter site navigation" className="flex flex-wrap items-center gap-1 sm:gap-2">
            {navGroups.map((group) => (
              <Dropdown
                key={group.label}
                trigger={({ open, toggle }) => (
                  <button
                    type="button"
                    onClick={toggle}
                    aria-expanded={open}
                    className="flex items-center gap-1 rounded-md px-2 py-2 text-sm font-bold text-text hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                  >
                    {group.label}
                    <ChevronDown className="h-4 w-4 text-primary" aria-hidden="true" />
                  </button>
                )}
              >
                {(close) => (
                  <div role="menu" className="flex flex-col py-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        role="menuitem"
                        href={item.href}
                        onClick={close}
                        className="px-4 py-2 text-sm text-text hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-inset"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </Dropdown>
            ))}
            <Link
              href="/newsletter#subscribe-form"
              className="flex items-center gap-1.5 rounded-md px-2 py-2 text-sm font-medium text-text hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              Subscribe
              <Bell className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/search"
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-md text-text hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
