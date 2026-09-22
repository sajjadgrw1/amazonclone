"use client";

import { useState } from "react";
import { CheckCircle2, Truck, Tv, Percent } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

const benefits = [
  { icon: Truck, title: "Fast mock delivery", body: "Unlimited free fast delivery on eligible mock orders." },
  { icon: Tv, title: "Streaming perks", body: "Access to a fictional demo streaming benefit — not a real service." },
  { icon: Percent, title: "Member-only pricing", body: "Extra discounts on select mock deals." },
];

const faqs = [
  { q: "Is this a real subscription?", a: "No — Nuvara+ is a fictional membership used only to demonstrate the UX pattern." },
  { q: "Can I cancel anytime?", a: "Yes, mock cancellation is instant and reversible on this page." },
];

export default function PrimePage() {
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");
  const [isMember, setIsMember] = useState(false);

  const price = plan === "monthly" ? 6.99 : 59;

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-6">
      <section className="flex flex-col items-start gap-4 rounded-lg bg-secondary px-6 py-12 text-white sm:px-12">
        <h1 className="max-w-xl text-3xl font-bold">Nuvara+</h1>
        <p className="max-w-lg text-white/80">
          A fictional membership benefit used to demonstrate this UX pattern — not a real subscription service.
        </p>
        {isMember ? (
          <div className="flex items-center gap-2 rounded-md bg-success/20 px-4 py-2 text-success">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> You&rsquo;re a mock Nuvara+ member
          </div>
        ) : (
          <Button type="button" className="bg-warning text-text hover:bg-warning/90" onClick={() => setIsMember(true)}>
            Join Nuvara+
          </Button>
        )}
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {benefits.map((b) => (
          <div key={b.title} className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4">
            <b.icon className="h-6 w-6 text-primary" aria-hidden="true" />
            <p className="font-semibold text-text">{b.title}</p>
            <p className="text-sm text-muted">{b.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-border bg-surface p-6">
        <h2 className="mb-4 text-lg font-semibold text-text">Choose a plan</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {(["monthly", "yearly"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlan(p)}
              className={cn(
                "flex flex-col gap-1 rounded-lg border p-4 text-left",
                plan === p ? "border-primary bg-primary/5" : "border-border hover:bg-background"
              )}
            >
              <span className="text-sm font-medium capitalize text-text">{p}</span>
              <span className="text-2xl font-bold text-text">
                {formatCurrency(p === "monthly" ? 6.99 : 59)}
                <span className="text-sm font-normal text-muted">/{p === "monthly" ? "mo" : "yr"}</span>
              </span>
              {p === "yearly" && <span className="text-xs font-medium text-success">Save vs. monthly</span>}
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-muted">Selected plan: {formatCurrency(price)} billed {plan}.</p>

        {isMember ? (
          <Button type="button" variant="outline" className="mt-4" onClick={() => setIsMember(false)}>
            Cancel membership
          </Button>
        ) : (
          <Button type="button" className="mt-4" onClick={() => setIsMember(true)}>
            Join Nuvara+
          </Button>
        )}
      </div>

      <h2 className="mb-3 mt-10 text-lg font-semibold text-text">FAQ</h2>
      <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-surface">
        {faqs.map((faq) => (
          <details key={faq.q} className="p-4">
            <summary className="cursor-pointer text-sm font-medium text-text">{faq.q}</summary>
            <p className="mt-2 text-sm text-muted">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
