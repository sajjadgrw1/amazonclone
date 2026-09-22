"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";

export default function GiftCardRedeemPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [redeemedAmount, setRedeemedAmount] = useState<number | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(undefined);
    setRedeemedAmount(null);

    if (!/^NUV-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(code.trim())) {
      setError("Enter a valid mock code in the format NUV-XXXX-XXXX.");
      return;
    }

    // Deterministic mock amount derived from the code so the same code always redeems the same value.
    const seed = code.trim().toUpperCase().split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
    setRedeemedAmount(10 + (seed % 20) * 5);
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-12">
      <h1 className="text-2xl font-semibold text-text">Redeem a Gift Card</h1>
      <p className="text-sm text-muted">
        Enter a mock demo code (try <code className="rounded bg-background px-1">NUV-AB12-CD34</code>) — no real gift
        card codes are used in this prototype.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6">
        <Input
          label="Gift card claim code"
          placeholder="NUV-XXXX-XXXX"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          error={error}
        />
        <Button type="submit">Redeem</Button>
      </form>

      {redeemedAmount !== null && (
        <div role="status" className="rounded-lg border border-success/40 bg-success/5 p-4 text-sm text-success">
          Success! {formatCurrency(redeemedAmount)} has been added to your mock Nuvara balance.
        </div>
      )}

      <Link href="/gift-cards/balance" className="text-sm font-medium text-primary hover:underline">
        Check your gift card balance
      </Link>
    </div>
  );
}
