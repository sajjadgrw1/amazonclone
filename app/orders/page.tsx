"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { mockOrders } from "@/data/mock-account";
import { OrderCard } from "@/components/orders/OrderCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/format";
import { useAuth, useOrders } from "@/lib/store/app-store";
import { cn } from "@/lib/utils";
import type { Order } from "@/types";

type Tab = "all" | "buy-again" | "not-shipped" | "cancelled" | "pay";
type Period = "3m" | "6m" | "2026" | "2025" | "archived";

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "Orders" },
  { id: "buy-again", label: "Buy Again" },
  { id: "not-shipped", label: "Not Yet Shipped" },
  { id: "cancelled", label: "Cancelled Orders" },
  { id: "pay", label: "Nuvara Pay" },
];

const PERIOD_LABELS: Record<Period, string> = {
  "3m": "past 3 months",
  "6m": "past 6 months",
  "2026": "2026",
  "2025": "2025",
  archived: "archived orders",
};

function isInPeriod(iso: string, period: Period, now: Date): boolean {
  const date = new Date(iso);
  const days = (now.getTime() - date.getTime()) / (24 * 3600 * 1000);
  switch (period) {
    case "3m":
      return days <= 92;
    case "6m":
      return days <= 183;
    case "2026":
      return date.getFullYear() === 2026;
    case "2025":
      return date.getFullYear() === 2025;
    case "archived":
      return now.getFullYear() - date.getFullYear() >= 2;
  }
}

export default function OrdersPage() {
  const { isSignedIn, hydrated: authHydrated } = useAuth();
  const { placedOrders, hydrated: ordersHydrated } = useOrders();
  const [tab, setTab] = useState<Tab>("all");
  const [period, setPeriod] = useState<Period>("3m");
  const [query, setQuery] = useState("");

  const hydrated = authHydrated && ordersHydrated;

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-4 h-40 w-full" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center">
        <h1 className="text-xl font-semibold text-text">Sign in to see your orders</h1>
        <Link href="/login?next=/orders">
          <Button type="button">Sign in</Button>
        </Link>
      </div>
    );
  }

  const allOrders: Order[] = [...placedOrders, ...mockOrders];
  const now = new Date();

  const mostRecentYear = allOrders.length
    ? new Date(
        allOrders.reduce((latest, o) => (new Date(o.placedAt) > new Date(latest) ? o.placedAt : latest), allOrders[0].placedAt)
      ).getFullYear()
    : now.getFullYear();

  const periodFiltered = allOrders.filter((o) => isInPeriod(o.placedAt, period, now));

  const tabFiltered = periodFiltered.filter((o) => {
    if (tab === "buy-again") return o.status === "delivered";
    if (tab === "not-shipped") return o.status === "pending" || o.status === "processing";
    if (tab === "cancelled") return o.status === "cancelled";
    return true;
  });

  const q = query.trim().toLowerCase();
  const filtered = tabFiltered.filter(
    (order) =>
      !q || order.orderNumber.toLowerCase().includes(q) || order.items.some((i) => i.title.toLowerCase().includes(q))
  );

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6">
      <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-1.5 text-sm">
        <Link href="/account" className="text-link hover:text-link-hover hover:underline">
          Your Account
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
        <span className="font-medium text-primary">Your Orders</span>
      </nav>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-text">Your Orders</h1>
        <form onSubmit={handleSearchSubmit} className="flex shrink-0 items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              aria-label="Search all orders"
              type="text"
              placeholder="Search all orders"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-11 w-56 rounded-full border border-border bg-surface pl-9 pr-3 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring sm:w-72"
            />
          </div>
          <button
            type="submit"
            className="h-11 shrink-0 rounded-full bg-text px-4 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            Search Orders
          </button>
        </form>
      </div>

      <div className="mb-4 flex flex-wrap gap-x-6 gap-y-2 border-b border-border" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "border-b-2 pb-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
              tab === t.id ? "border-primary text-primary" : "border-transparent text-muted hover:text-text"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-text">
          <span className="font-semibold">{filtered.length}</span> orders placed in{" "}
          <label className="sr-only" htmlFor="orders-period">
            Period
          </label>
          <select
            id="orders-period"
            value={period}
            onChange={(e) => setPeriod(e.target.value as Period)}
            className="ml-1 rounded-md border border-border bg-surface px-2 py-1 text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
              <option key={p} value={p}>
                {PERIOD_LABELS[p]}
              </option>
            ))}
          </select>
        </p>
        <button
          type="button"
          onClick={() => setTab("pay")}
          className="text-sm font-medium text-link hover:text-link-hover hover:underline"
        >
          View transactions
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-1 rounded-lg border border-dashed border-border py-16 text-center">
          <p className="text-sm text-text">
            Looks like you haven&rsquo;t placed an order in the {PERIOD_LABELS[period]}.{" "}
            {period !== "6m" && (
              <button type="button" onClick={() => setPeriod("6m")} className="font-medium text-link hover:text-link-hover hover:underline">
                View orders in {mostRecentYear}
              </button>
            )}
          </p>
        </div>
      ) : tab === "pay" ? (
        <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-surface">
          {filtered.map((order) => (
            <div key={order.id} className="flex flex-wrap items-center justify-between gap-2 p-4 text-sm">
              <div>
                <p className="font-medium text-text">Order #{order.orderNumber}</p>
                <p className="text-muted">{formatDate(order.placedAt)}</p>
              </div>
              <p className="font-semibold text-text">{formatCurrency(order.total)}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
