"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { NewsMasthead } from "@/components/layout/NewsMasthead";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "nuvara-newsletter-email";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

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

  return (
    <div className="flex flex-col">
      <NewsMasthead />

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
