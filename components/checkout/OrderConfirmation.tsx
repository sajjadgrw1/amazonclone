import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";
import type { Order } from "@/types";

export function OrderConfirmation({ order }: { order: Order }) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-16 text-center">
      <CheckCircle2 className="h-14 w-14 text-success" aria-hidden="true" />
      <h1 className="text-2xl font-semibold text-text">Order placed!</h1>
      <p className="text-sm text-muted">
        Order <span className="font-semibold text-text">{order.orderNumber}</span> has been placed. This
        is a mock order — no real payment was processed.
      </p>

      <div className="w-full rounded-lg border border-border bg-surface p-4 text-left text-sm">
        <p className="font-medium text-text">Order total: {formatCurrency(order.total)}</p>
        <p className="text-muted">Shipping to {order.shippingAddress.fullName}, {order.shippingAddress.city}</p>
        <p className="text-muted">Paying with {order.paymentMethod.label}</p>
      </div>

      <div className="flex gap-3">
        <Link href="/orders">
          <Button type="button">View orders</Button>
        </Link>
        <Link href="/">
          <Button type="button" variant="outline">
            Continue shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
