"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

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
    <div className="mx-auto max-w-[700px] px-4 py-6">
      <PageHero
        title="Nuvara Newsletter"
        subtitle="Get mock updates about demo deals and prototype features. This is a UX demo — no real emails are ever sent."
      />

      <div className="mt-8 rounded-lg border border-border bg-surface p-6">
        {!hydrated ? (
          <div className="flex flex-col gap-3">
            <div className="h-11 w-full animate-pulse rounded-md bg-background" />
            <div className="h-11 w-32 animate-pulse rounded-md bg-background" />
          </div>
        ) : subscribedEmail ? (
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              <p className="font-semibold">You&rsquo;re subscribed</p>
            </div>
            <p className="text-sm text-muted">
              Mock subscription active for <span className="font-medium text-text">{subscribedEmail}</span>. No real
              emails will be sent.
            </p>
            <Button type="button" variant="outline" onClick={handleUnsubscribe}>
              Unsubscribe
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex-1">
              <Input
                aria-label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
              />
            </div>
            <Button type="submit" isLoading={isSubmitting} className="shrink-0">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Subscribe
            </Button>
          </form>
        )}
      </div>

      <p className="mt-4 text-xs text-muted">
        By subscribing you agree to receive mock marketing content for this prototype only. Unsubscribe anytime.
      </p>
    </div>
  );
}
