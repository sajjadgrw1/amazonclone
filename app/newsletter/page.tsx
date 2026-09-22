"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Bell, ChevronDown, Search, X, CheckCircle2 } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "nuvara-newsletter-email";

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

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<string | null>(null);

  useEffect(() => {
    try {
      setSubscribedEmail(window.localStorage.getItem(STORAGE_KEY));
    } catch {
      // best effort only
    } finally {
      setHydrated(true);
    }
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError(undefined);
    setIsSubmitting(true);
    setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, email);
      } catch {
        // best effort only
      }
      setSubscribedEmail(email);
      setIsSubmitting(false);
    }, 600);
  }

  function handleUnsubscribe() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // best effort only
    }
    setSubscribedEmail(null);
    setEmail("");
  }

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
    <div className="flex flex-col">
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
          <Link href="/newsletter" className="text-2xl font-bold text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
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
            <a
              href="#subscribe-form"
              className="flex items-center gap-1.5 rounded-md px-2 py-2 text-sm font-medium text-text hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              Subscribe
              <Bell className="h-4 w-4" aria-hidden="true" />
            </a>
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

      <div className="mx-auto w-full max-w-[900px] px-4 py-10">
        <h1 className="text-4xl font-bold text-text">Subscribe to our weekly newsletter</h1>
        <p className="mt-2 text-lg text-muted">Mock news, facts, and original stories about Nuvara.</p>

        <div id="subscribe-form" className="mt-8 scroll-mt-6 border-t-4 border-primary bg-surface p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-text">Sign up for the weekly Nuvara News newsletter</h2>

          {!hydrated ? (
            <div className="mt-6 h-11 w-full max-w-md animate-pulse rounded bg-background" />
          ) : subscribedEmail ? (
            <div className="mt-6 flex flex-col items-start gap-3">
              <div className="flex items-center gap-2 text-success">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                <p className="font-semibold">You&rsquo;re subscribed</p>
              </div>
              <p className="text-sm text-muted">
                Mock subscription active for <span className="font-medium text-text">{subscribedEmail}</span>. No
                real emails will be sent.
              </p>
              <Button type="button" variant="outline" onClick={handleUnsubscribe}>
                Unsubscribe
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 max-w-md">
              <div className="flex items-end gap-3 border-b-2 border-text pb-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  Enter email
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!error}
                  aria-describedby={error ? "newsletter-email-error" : undefined}
                  className="w-full border-0 bg-transparent text-base text-text placeholder:text-muted focus-visible:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Subscribe"
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-50"
                  )}
                >
                  {isSubmitting ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
                  ) : (
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              {error && (
                <p id="newsletter-email-error" className="mt-2 text-sm text-danger">
                  {error}
                </p>
              )}
              <p className="mt-3 text-xs text-muted">
                <Link href="/help" className="underline hover:text-text">
                  Nuvara Privacy Notice
                </Link>{" "}
                &middot; This is a UX demo — no real emails are ever sent. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
