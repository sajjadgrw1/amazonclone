"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/format";

const mockTransactions = [
  { id: "tx-1", label: "Redeemed gift card", amount: 50, date: "2026-09-10T12:00:00.000Z" },
  { id: "tx-2", label: "Used on order NUV-1002-1190", amount: -20, date: "2026-09-14T09:05:00.000Z" },
];

export default function GiftCardBalancePage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [balance, setBalance] = useState<number | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(undefined);
    setBalance(null);

    if (!/^NUV-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(code.trim())) {
      setError("Enter a valid mock code in the format NUV-XXXX-XXXX.");
      return;
    }

    const seed = code.trim().toUpperCase().split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
    setBalance(10 + (seed % 15) * 5);
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-12">
      <h1 className="text-2xl font-semibold text-text">Check Gift Card Balance</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6">
        <Input
          label="Gift card claim code"
          placeholder="NUV-XXXX-XXXX"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          error={error}
        />
        <Button type="submit">Check balance</Button>
      </form>

      {balance !== null && (
        <div role="status" className="rounded-lg border border-border bg-surface p-4 text-center">
          <p className="text-sm text-muted">Current balance</p>
          <p className="text-3xl font-bold text-text">{formatCurrency(balance)}</p>
        </div>
      )}

      <div>
        <h2 className="mb-2 text-sm font-semibold text-text">Transaction history (demo)</h2>
        <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-surface">
          {mockTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 text-sm">
              <div>
                <p className="text-text">{tx.label}</p>
                <p className="text-xs text-muted">{formatDate(tx.date)}</p>
              </div>
              <p className={tx.amount >= 0 ? "font-medium text-success" : "font-medium text-danger"}>
                {tx.amount >= 0 ? "+" : ""}
                {formatCurrency(tx.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Link href="/gift-cards/redeem" className="text-sm font-medium text-primary hover:underline">
        Redeem another gift card
      </Link>
    </div>
  );
}
