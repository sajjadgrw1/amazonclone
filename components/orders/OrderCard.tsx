"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Order } from "@/types";
import { OrderStatusBadge } from "@/components/orders/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency, formatDate } from "@/lib/format";

export function OrderCard({ order }: { order: Order }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"cancel" | "return" | null>(null);
  const [actionMessage, setActionMessage] = useState<string | undefined>();

  function openConfirm(action: "cancel" | "return") {
    setPendingAction(action);
    setConfirmOpen(true);
  }

  function confirmAction() {
    setActionMessage(
      pendingAction === "cancel"
        ? "Cancellation requested (mock action, no real order was changed)."
        : "Return requested (mock action, no real order was changed)."
    );
    setConfirmOpen(false);
  }

  const canCancel = order.status === "pending" || order.status === "processing";
  const canReturn = order.status === "delivered";

  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 text-xs uppercase tracking-wide text-muted">
        <div className="flex flex-wrap gap-4">
          <span>
            <span className="block font-semibold text-text">Order placed</span>
            <span className="normal-case">{formatDate(order.placedAt)}</span>
          </span>
          <span>
            <span className="block font-semibold text-text">Total</span>
            <span className="normal-case">{formatCurrency(order.total)}</span>
          </span>
          <span>
            <span className="block font-semibold text-text">Order #</span>
            <span className="normal-case">{order.orderNumber}</span>
          </span>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="flex flex-col gap-3 py-3">
        {order.items.map((item) => (
          <div key={`${item.productId}-${item.variantId ?? "default"}`} className="flex items-center gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-background">
              <Image src={item.imageUrl} alt={item.title} fill sizes="56px" className="object-cover" />
            </div>
            <div className="flex-1 text-sm">
              <Link href={`/product/${item.productId}`} className="text-text hover:underline">
                {item.title}
              </Link>
              <p className="text-muted">Qty {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {actionMessage && <p className="mb-2 text-sm text-success">{actionMessage}</p>}

      <div className="flex flex-wrap gap-2 border-t border-border pt-3">
        <Button type="button" size="sm">
          Track package
        </Button>
        <Link href={`/orders/${order.id}`}>
          <Button type="button" variant="outline" size="sm">
            View order
          </Button>
        </Link>
        {canCancel && (
          <Button type="button" variant="outline" size="sm" onClick={() => openConfirm("cancel")}>
            Cancel order
          </Button>
        )}
        {canReturn && (
          <Button type="button" variant="outline" size="sm" onClick={() => openConfirm("return")}>
            Return items
          </Button>
        )}
      </div>

      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title={pendingAction === "cancel" ? "Cancel this order?" : "Start a return?"}
      >
        <p className="text-sm text-muted">
          This is a mock action for the Nuvara prototype — no real order will be changed.
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => setConfirmOpen(false)}>
            Never mind
          </Button>
          <Button type="button" variant="danger" onClick={confirmAction}>
            {pendingAction === "cancel" ? "Cancel order" : "Start return"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
