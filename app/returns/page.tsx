"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { mockOrders } from "@/data/mock-account";
import { useAuth, useOrders } from "@/lib/store/app-store";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const now = new Date();
const seasonYear = now.getFullYear();
const seasonStart = formatDate(new Date(seasonYear, 10, 1).toISOString());
const seasonEnd = formatDate(new Date(seasonYear, 11, 31).toISOString());
const seasonReturnBy = formatDate(new Date(seasonYear + 1, 0, 31).toISOString());

const faqs = [
  {
    q: "What can I return?",
    a: `You may return most new, unopened items sold and fulfilled by Nuvara within 30 days of delivery for a full mock refund. For the ${seasonYear} holiday season, most items purchased between ${seasonStart} and ${seasonEnd} can be returned through ${seasonReturnBy}.`,
  },
  {
    q: "When will I get my refund?",
    a: "Usually in about 2-3 weeks in this prototype's mock timeline. Most mock refunds are marked complete within 7 days after a return is received and processed.",
  },
  {
    q: "Does Nuvara offer replacements and exchanges?",
    a: "Yes — from Your Orders, select Return items on an eligible delivered order to start a mock replacement or refund. No real item is shipped or refunded in this prototype.",
  },
  {
    q: "Who pays for return shipping?",
    a: "Return shipping is mock-free for items that arrived damaged, defective, or different from what was ordered. Other mock returns may show a small return shipping deduction.",
  },
];

export default function ReturnsPage() {
  const { isSignedIn, hydrated } = useAuth();
  const { placedOrders } = useOrders();
  const [npsScore, setNpsScore] = useState<number | null>(null);
  const [orderNumber, setOrderNumber] = useState("");
  const [lookupResult, setLookupResult] = useState<"idle" | "found" | "not-found">("idle");
  const [lookupOrderLabel, setLookupOrderLabel] = useState("");

  const allOrders = [...placedOrders, ...mockOrders];

  function handleGiftReturnSearch(e: FormEvent) {
    e.preventDefault();
    const match = allOrders.find((o) => o.orderNumber.toLowerCase() === orderNumber.trim().toLowerCase());
    if (match) {
      setLookupResult("found");
      setLookupOrderLabel(match.orderNumber);
    } else {
      setLookupResult("not-found");
    }
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6">
      <h1 className="mb-6 text-3xl font-bold text-text">Returns Center</h1>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-lg border border-border bg-surface p-6">
          <h2 className="text-xl font-bold text-text">Return policy update</h2>
          <p className="mt-3 text-sm text-text">
            Free, easy mock returns on eligible items at any of your saved mock addresses.
            <br />
            You may return most new, unopened items sold and fulfilled by Nuvara within 30 days of delivery for a
            full mock refund. For the {seasonYear} holiday season, most items purchased between {seasonStart} and{" "}
            {seasonEnd} can be returned through {seasonReturnBy}.
          </p>
          <Link href="/help/shipping" className="mt-2 inline-block text-sm text-link underline hover:text-link-hover">
            Learn more about Nuvara&rsquo;s Return Policy
          </Link>
          <div className="mt-4">
            <Link href="/orders" className="text-sm font-semibold uppercase tracking-wide text-link underline hover:text-link-hover">
              Start a return in Your Orders
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface p-6">
          <h2 className="text-xl font-bold text-text">Manage Returns</h2>
          <p className="mt-3 text-sm text-muted">Check the status of your recent mock returns from Your Orders.</p>
          <Link href="/orders" className="mt-4 inline-block text-sm font-semibold uppercase tracking-wide text-link underline hover:text-link-hover">
            View your returns
          </Link>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-lg border border-border bg-surface p-6">
          <p className="font-semibold text-text">How likely are you to recommend Nuvara to a friend or colleague?</p>
          {npsScore === null ? (
            <>
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span>Not at all likely</span>
                <span>Extremely likely</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {Array.from({ length: 11 }, (_, i) => i).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setNpsScore(n)}
                    aria-label={`Score ${n}`}
                    className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-sm font-medium text-text hover:border-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                  >
                    {n}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-4 text-sm text-success">
              Thanks for the feedback (mock score: {npsScore}/10) — this survey isn&rsquo;t sent anywhere real.
            </p>
          )}
        </div>

        <div className="rounded-lg border border-border bg-surface p-6">
          <h2 className="text-xl font-bold text-text">Get product support</h2>
          <p className="mt-3 text-sm text-muted">
            Need help with a mock electronics item? Our Customer Service page can connect you with (fictional)
            product support.
          </p>
          <Link href="/customer-service" className="mt-4 inline-block text-sm font-semibold uppercase tracking-wide text-link underline hover:text-link-hover">
            Contact support
          </Link>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-border bg-surface p-6">
        <h2 className="text-2xl font-bold text-text">Gift Returns</h2>
        <p className="mt-3 text-sm text-text">
          Start a gift return by using the <span className="font-semibold">order number</span>, e.g.{" "}
          {mockOrders[0]?.orderNumber ?? "NUV-1001-8842"}
        </p>
        <details className="group mt-1">
          <summary className="flex w-fit cursor-pointer list-none items-center gap-1 text-sm text-link hover:text-link-hover">
            How do I find this?
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="mt-2 max-w-lg text-sm text-muted">
            The order number is on your packing slip, or on the order confirmation shown after checkout and on the
            order card in Your Orders.
          </p>
        </details>

        <form onSubmit={handleGiftReturnSearch} className="mt-4 flex max-w-lg flex-col gap-2 sm:flex-row">
          <input
            aria-label="Order number (with dashes)"
            type="text"
            value={orderNumber}
            onChange={(e) => {
              setOrderNumber(e.target.value);
              setLookupResult("idle");
            }}
            placeholder="Order number (with dashes)"
            className="h-12 flex-1 rounded-full border border-border bg-surface px-4 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          />
          <button
            type="submit"
            className="h-12 shrink-0 rounded-full bg-text px-6 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            Search
          </button>
        </form>

        {lookupResult === "found" && (
          <p className="mt-3 text-sm text-success">
            Found order {lookupOrderLabel}.{" "}
            <Link href="/orders" className="underline">
              Go to Your Orders
            </Link>{" "}
            to start the mock return.
          </p>
        )}
        {lookupResult === "not-found" && (
          <p className="mt-3 text-sm text-danger">
            No mock order matches that number{hydrated && !isSignedIn ? " — sign in to search your own orders" : ""}.
          </p>
        )}
      </div>

      <div className="mt-4 rounded-lg border border-border bg-surface p-6">
        <h2 className="text-2xl font-bold text-text">Frequently Asked Questions</h2>
        <div className="mt-4 flex flex-col divide-y divide-border">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-3" open>
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-text">
                {faq.q}
                <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform group-open:rotate-180")} aria-hidden="true" />
              </summary>
              <p className="mt-2 text-sm text-text">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
