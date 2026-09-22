"use client";

import Image from "next/image";
import Link from "next/link";
import type { CartItem, Product } from "@/types";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { formatCurrency } from "@/lib/format";
import { useCart } from "@/lib/store/app-store";

export interface CartItemRowProps {
  item: CartItem;
  product: Product;
}

export function CartItemRow({ item, product }: CartItemRowProps) {
  const { setQuantity, removeFromCart, setSavedForLater } = useCart();
  const variant = product.variants?.find((v) => v.id === item.variantId);
  const unitPrice = variant?.priceOverride ?? product.price;
  const unavailable = variant ? !variant.inStock : !product.inStock;

  return (
    <div className="flex gap-4 border-b border-border py-4 last:border-none">
      <Link href={`/product/${product.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-background">
        <Image src={product.images[0]} alt={product.title} fill sizes="96px" className="object-cover" />
      </Link>

      <div className="flex flex-1 flex-col gap-1">
        <Link href={`/product/${product.slug}`} className="text-sm font-medium text-text hover:underline">
          {product.title}
        </Link>
        {variant && <p className="text-xs text-muted">{variant.label}</p>}
        {unavailable && <p className="text-xs font-medium text-danger">Currently unavailable</p>}
        <p className="text-sm font-semibold text-text">{formatCurrency(unitPrice, product.currency)}</p>

        <div className="mt-1 flex flex-wrap items-center gap-3">
          {!item.savedForLater && (
            <QuantitySelector
              value={item.quantity}
              onChange={(q) => setQuantity(product.id, q, item.variantId)}
              min={1}
              max={10}
            />
          )}
          <button
            type="button"
            onClick={() => setSavedForLater(product.id, !item.savedForLater, item.variantId)}
            className="text-xs font-medium text-primary hover:underline"
          >
            {item.savedForLater ? "Move to cart" : "Save for later"}
          </button>
          <button
            type="button"
            onClick={() => removeFromCart(product.id, item.variantId)}
            className="text-xs font-medium text-danger hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      <p className="shrink-0 self-start text-sm font-semibold text-text">
        {formatCurrency(unitPrice * item.quantity, product.currency)}
      </p>
    </div>
  );
}
