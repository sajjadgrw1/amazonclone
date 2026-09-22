"use client";

import { useState } from "react";
import { getLightningDeals } from "@/data/deals";
import { products } from "@/data/products";
import { DealCard } from "@/components/product/DealCard";
import { cn } from "@/lib/utils";

type Tab = "active" | "upcoming";

export default function LightningDealsPage() {
  const [tab, setTab] = useState<Tab>("active");

  const lightningDeals = getLightningDeals()
    .map((deal) => ({ deal, product: products.find((p) => p.id === deal.productId) }))
    .filter((d): d is { deal: ReturnType<typeof getLightningDeals>[number]; product: NonNullable<(typeof d)["product"]> } => !!d.product);

  const filtered = lightningDeals.filter(({ deal }) => (tab === "active" ? deal.status !== "upcoming" : deal.status === "upcoming"));

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6">
      <h1 className="text-2xl font-semibold text-text">Lightning Deals</h1>
      <p className="mt-1 text-sm text-muted">Limited-time mock deals — claimed percentage and timers are demo data.</p>

      <div className="mt-4 flex gap-2 border-b border-border pb-3" role="tablist">
        <button
          role="tab"
          aria-selected={tab === "active"}
          onClick={() => setTab("active")}
          className={cn("rounded-md px-3 py-1.5 text-sm font-medium", tab === "active" ? "bg-primary text-white" : "text-muted hover:bg-background")}
        >
          Active & ending soon
        </button>
        <button
          role="tab"
          aria-selected={tab === "upcoming"}
          onClick={() => setTab("upcoming")}
          className={cn("rounded-md px-3 py-1.5 text-sm font-medium", tab === "upcoming" ? "bg-primary text-white" : "text-muted hover:bg-background")}
        >
          Upcoming
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">No {tab} lightning deals right now.</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map(({ deal, product }) => (
            <DealCard key={deal.id} deal={deal} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
