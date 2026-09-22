"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { formatCurrency } from "@/lib/format";

const REFERRAL_RATE = 0.08; // 8% mock referral fee
const FIXED_FEE = 0.99; // mock per-item fee

const feeCards = [
  { title: "Referral fee", body: `${REFERRAL_RATE * 100}% of each item's sale price (mock rate).` },
  { title: "Per-item fee", body: `${formatCurrency(FIXED_FEE)} per unit sold (mock rate).` },
  { title: "Subscription", body: "No mock subscription fee in this prototype." },
];

export default function SellPricingPage() {
  const [salePrice, setSalePrice] = useState("25.00");
  const price = Number(salePrice) || 0;
  const referralFee = +(price * REFERRAL_RATE).toFixed(2);
  const totalFees = +(referralFee + FIXED_FEE).toFixed(2);
  const youKeep = +(price - totalFees).toFixed(2);

  return (
    <div className="mx-auto max-w-[900px] px-4 py-6">
      <h1 className="text-2xl font-semibold text-text">Seller Pricing</h1>
      <p className="mt-2 text-sm text-danger">
        All figures on this page are demo data for the Nuvara prototype and do not reflect real fees.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {feeCards.map((card) => (
          <div key={card.title} className="rounded-lg border border-border bg-surface p-4">
            <p className="font-semibold text-text">{card.title}</p>
            <p className="mt-1 text-sm text-muted">{card.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-border bg-surface p-6">
        <h2 className="mb-4 text-lg font-semibold text-text">Fee calculator (mock rates)</h2>
        <Input
          label="Item sale price"
          type="number"
          min={0}
          step="0.01"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
          className="max-w-xs"
        />

        <dl className="mt-4 flex max-w-xs flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Referral fee</dt>
            <dd className="text-text">{formatCurrency(referralFee)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Per-item fee</dt>
            <dd className="text-text">{formatCurrency(FIXED_FEE)}</dd>
          </div>
          <div className="flex justify-between border-t border-border pt-2 font-semibold text-text">
            <dt>You&rsquo;d keep</dt>
            <dd>{formatCurrency(Math.max(0, youKeep))}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
