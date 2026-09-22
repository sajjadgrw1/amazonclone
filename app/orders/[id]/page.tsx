"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { mockOrders } from "@/data/mock-account";
import { OrderStatusBadge } from "@/components/orders/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useOrders } from "@/lib/store/app-store";
import { formatCurrency, formatDateTime } from "@/lib/format";

export default function OrderDetailPage(props: PageProps<"/orders/[id]">) {
  const { id } = use(props.params);
  const { placedOrders, hydrated } = useOrders();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-4 h-64 w-full" />
      </div>
    );
  }

  const order = [...placedOrders, ...mockOrders].find((o) => o.id === id);

  if (!order) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center">
        <h1 className="text-xl font-semibold text-text">Order not found</h1>
        <Link href="/orders">
          <Button type="button">Back to orders</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1000px] px-4 py-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
        <Link href="/orders" className="hover:underline">
          Your Orders
        </Link>{" "}
        / <span className="text-text">{order.orderNumber}</span>
      </nav>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-text">Order {order.orderNumber}</h1>
          <p className="text-sm text-muted">Placed on {formatDateTime(order.placedAt)}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface p-4 text-sm">
          <h2 className="mb-2 font-semibold text-text">Shipping Address</h2>
          <p className="text-text">{order.shippingAddress.fullName}</p>
          <p className="text-muted">
            {order.shippingAddress.line1}, {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.postalCode}
          </p>
          <p className="text-muted">{order.shippingAddress.country}</p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4 text-sm">
          <h2 className="mb-2 font-semibold text-text">Payment</h2>
          <p className="text-text">{order.paymentMethod.label}</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-border bg-surface p-4">
        <h2 className="mb-3 font-semibold text-text">Items</h2>
        <div className="flex flex-col gap-3">
          {order.items.map((item) => (
            <div key={`${item.productId}-${item.variantId ?? "default"}`} className="flex items-center gap-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-background">
                <Image src={item.imageUrl} alt={item.title} fill sizes="64px" className="object-cover" />
              </div>
              <div className="flex-1 text-sm">
                <Link href={`/product/${item.productId}`} className="text-text hover:underline">
                  {item.title}
                </Link>
                <p className="text-muted">Qty {item.quantity}</p>
              </div>
              <p className="text-sm font-medium text-text">{formatCurrency(item.unitPrice * item.quantity)}</p>
            </div>
          ))}
        </div>

        <dl className="mt-4 flex flex-col gap-1 border-t border-border pt-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd className="text-text">{formatCurrency(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Delivery</dt>
            <dd className="text-text">{order.deliveryFee === 0 ? "FREE" : formatCurrency(order.deliveryFee)}</dd>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-success">
              <dt>Discount</dt>
              <dd>-{formatCurrency(order.discount)}</dd>
            </div>
          )}
          <div className="flex justify-between font-semibold text-text">
            <dt>Total</dt>
            <dd>{formatCurrency(order.total)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
