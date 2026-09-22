"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Gift } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

const PRESET_AMOUNTS = [25, 50, 100, 150, 200];

function GiftCardBuyForm() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") === "physical" ? "physical" : "digital";

  const [cardType, setCardType] = useState<"digital" | "physical">(initialType);
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [added, setAdded] = useState(false);

  function handleCustomAmountChange(value: string) {
    setCustomAmount(value);
    const parsed = Number(value);
    if (value && !Number.isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  }

  function handleAddToCart() {
    const next: Record<string, string> = {};
    if (!amount || amount < 5 || amount > 500) next.amount = "Choose an amount between $5 and $500.";
    if (cardType === "digital" && !/^\S+@\S+\.\S+$/.test(recipientEmail)) next.recipientEmail = "Enter a valid recipient email.";
    if (!recipientName) next.recipientName = "Enter a recipient name.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setAdded(true);
    window.setTimeout(() => setAdded(false), 3000);
  }

  return (
    <div className="mx-auto grid max-w-[1000px] gap-8 px-4 py-6 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-semibold text-text">Buy a Gift Card</h1>

        <div className="flex gap-2">
          {(["digital", "physical"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setCardType(t)}
              className={cn(
                "rounded-md border px-4 py-2 text-sm font-medium capitalize",
                cardType === t ? "border-primary bg-primary/10 text-primary" : "border-border text-text hover:bg-background"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-text">Amount</p>
          <div className="flex flex-wrap gap-2">
            {PRESET_AMOUNTS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setAmount(preset);
                  setCustomAmount("");
                }}
                className={cn(
                  "rounded-md border px-4 py-2 text-sm font-medium",
                  amount === preset && !customAmount ? "border-primary bg-primary/10 text-primary" : "border-border text-text hover:bg-background"
                )}
              >
                {formatCurrency(preset)}
              </button>
            ))}
            <Input
              aria-label="Custom amount"
              placeholder="Custom"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              className="w-28"
            />
          </div>
          {errors.amount && <p className="mt-1 text-sm text-danger">{errors.amount}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Recipient name" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} error={errors.recipientName} required />
          {cardType === "digital" && (
            <Input
              label="Recipient email"
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              error={errors.recipientEmail}
              required
            />
          )}
        </div>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-text">
          Message (optional)
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            maxLength={200}
            className="rounded-md border border-border bg-surface p-3 text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          />
        </label>

        <Input
          label="Delivery date (optional)"
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          helperText="Leave blank to send immediately (mock delivery)."
        />

        <Button type="button" onClick={handleAddToCart} className="self-start">
          Add to cart
        </Button>
        {added && <p className="text-sm text-success">Added to cart (mock gift card, no real value).</p>}
      </div>

      <div className="rounded-lg border border-border bg-surface p-4">
        <p className="mb-2 text-sm font-semibold text-text">Preview</p>
        <div className="flex aspect-video flex-col justify-between rounded-lg bg-gradient-to-br from-secondary to-primary p-4 text-white">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5" aria-hidden="true" />
            <span className="font-bold">nuvara</span>
          </div>
          <div>
            <p className="text-2xl font-bold">{formatCurrency(amount || 0)}</p>
            <p className="text-xs text-white/80">For {recipientName || "your recipient"}</p>
          </div>
        </div>
        {message && <p className="mt-3 text-sm italic text-muted">&ldquo;{message}&rdquo;</p>}
      </div>
    </div>
  );
}

export default function GiftCardBuyPage() {
  return (
    <Suspense fallback={null}>
      <GiftCardBuyForm />
    </Suspense>
  );
}
