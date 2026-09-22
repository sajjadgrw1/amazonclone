import { Badge } from "@/components/ui/Badge";
import type { OrderStatus } from "@/types";

const statusMap: Record<OrderStatus, { label: string; variant: "success" | "warning" | "neutral" | "discount" | "primary" }> = {
  pending: { label: "Pending", variant: "neutral" },
  processing: { label: "Processing", variant: "primary" },
  shipped: { label: "Shipped", variant: "warning" },
  delivered: { label: "Delivered", variant: "success" },
  cancelled: { label: "Cancelled", variant: "discount" },
  returned: { label: "Returned", variant: "discount" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { label, variant } = statusMap[status];
  return <Badge variant={variant}>{label}</Badge>;
}
