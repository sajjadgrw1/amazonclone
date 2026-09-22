"use client";

import { useState } from "react";
import Link from "next/link";
import { mockOrders } from "@/data/mock-account";
import { OrderCard } from "@/components/orders/OrderCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth, useOrders } from "@/lib/store/app-store";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types";

const TABS: { id: OrderStatus | "all"; label: string }[] = [
  { id: "all", label: "All orders" },
  { id: "pending", label: "Pending" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];

export default function OrdersPage() {
  const { isSignedIn, hydrated: authHydrated } = useAuth();
  const { placedOrders, hydrated: ordersHydrated } = useOrders();
  const [tab, setTab] = useState<OrderStatus | "all">("all");
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

  const allOrders = [...placedOrders, ...mockOrders];
  const filtered = allOrders.filter((order) => {
    const matchesTab = tab === "all" || order.status === tab;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q || order.orderNumber.toLowerCase().includes(q) || order.items.some((i) => i.title.toLowerCase().includes(q));
    return matchesTab && matchesQuery;
  });

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-text">Your Orders</h1>
        <Input
          aria-label="Search orders"
          placeholder="Search by order # or product"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-64"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2 border-b border-border pb-2" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
              tab === t.id ? "bg-primary text-white" : "text-muted hover:bg-background"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-16 text-center">
          <p className="text-lg font-semibold text-text">No orders found</p>
          <p className="text-sm text-muted">Try a different filter, or start shopping.</p>
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            Continue shopping
          </Link>
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
