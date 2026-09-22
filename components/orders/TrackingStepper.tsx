import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import type { Order, OrderStatus } from "@/types";

const STEPS = ["Ordered", "Shipped", "Out for delivery", "Delivered"] as const;

const STEP_INDEX: Partial<Record<OrderStatus, number>> = {
  pending: 0,
  processing: 1,
  shipped: 2,
  delivered: 3,
};

const HEADLINE: Partial<Record<OrderStatus, string>> = {
  pending: "Order placed",
  processing: "Preparing your package",
  shipped: "Arriving soon",
  delivered: "Delivered",
};

export function TrackingStepper({ order }: { order: Order }) {
  if (order.status === "cancelled" || order.status === "returned") {
    return (
      <div className="rounded-lg border border-border bg-surface p-4">
        <p className="font-semibold text-text">
          {order.status === "cancelled" ? "This order was cancelled" : "This order was returned"}
        </p>
        <p className="mt-1 text-sm text-muted">Mock status — no real fulfillment occurred.</p>
      </div>
    );
  }

  const activeIndex = STEP_INDEX[order.status] ?? 0;

  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <h2 className="text-lg font-semibold text-text">{HEADLINE[order.status]}</h2>
      <p className="text-sm text-muted">
        {order.status === "delivered" ? "Package was delivered" : "Package is on the way"}
      </p>

      <div className="mt-4 flex items-center justify-between">
        {STEPS.map((step, i) => (
          <div key={step} className="flex flex-1 flex-col items-center gap-1.5 text-center">
            <div className="flex w-full items-center">
              <div className={cn("h-0.5 flex-1", i === 0 ? "bg-transparent" : i <= activeIndex ? "bg-primary" : "bg-border")} />
              <div
                className={cn(
                  "h-3 w-3 shrink-0 rounded-full",
                  i <= activeIndex ? "bg-primary" : "bg-border"
                )}
                aria-hidden="true"
              />
              <div className={cn("h-0.5 flex-1", i === STEPS.length - 1 ? "bg-transparent" : i < activeIndex ? "bg-primary" : "bg-border")} />
            </div>
            <span className={cn("text-xs", i === activeIndex ? "font-semibold text-text" : "text-muted")}>
              {step}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-border pt-3">
        <h3 className="mb-2 text-sm font-semibold text-text">Tracking updates</h3>
        <ul className="flex flex-col gap-1 text-sm text-muted">
          {activeIndex >= 0 && <li>{formatDate(order.placedAt)} — Order confirmed</li>}
          {activeIndex >= 1 && <li>{formatDate(order.placedAt)} — Package prepared for shipment</li>}
          {activeIndex >= 2 && <li>{formatDate(order.placedAt)} — Package shipped, out for delivery</li>}
          {activeIndex >= 3 && <li>{formatDate(order.placedAt)} — Delivered</li>}
        </ul>
      </div>
    </div>
  );
}
