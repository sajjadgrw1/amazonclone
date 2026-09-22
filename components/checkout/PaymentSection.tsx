"use client";

import type { PaymentMethod } from "@/types";

export interface PaymentSectionProps {
  paymentMethods: PaymentMethod[];
  selectedPaymentMethodId: string | null;
  onSelect: (id: string) => void;
  simulateFailure: boolean;
  onSimulateFailureChange: (value: boolean) => void;
}

export function PaymentSection({
  paymentMethods,
  selectedPaymentMethodId,
  onSelect,
  simulateFailure,
  onSimulateFailureChange,
}: PaymentSectionProps) {
  return (
    <section aria-labelledby="payment-heading" className="rounded-lg border border-border bg-surface p-4">
      <h2 id="payment-heading" className="mb-3 text-lg font-semibold text-text">
        3. Payment Method
      </h2>

      <div className="flex flex-col gap-2">
        {paymentMethods.map((pm) => (
          <label
            key={pm.id}
            className="flex cursor-pointer items-center gap-3 rounded-md border border-border p-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5"
          >
            <input
              type="radio"
              name="payment-method"
              checked={selectedPaymentMethodId === pm.id}
              onChange={() => onSelect(pm.id)}
              className="h-4 w-4"
            />
            {pm.label}
          </label>
        ))}
      </div>

      <label className="mt-4 flex items-center gap-2 rounded-md border border-dashed border-border p-3 text-xs text-muted">
        <input
          type="checkbox"
          checked={simulateFailure}
          onChange={(e) => onSimulateFailureChange(e.target.checked)}
          className="h-4 w-4"
        />
        Demo control: simulate a declined mock payment to preview the failure/retry state
      </label>
    </section>
  );
}
