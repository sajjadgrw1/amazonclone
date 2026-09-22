"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { categories } from "@/data/categories";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type SellerType = "individual" | "business";

const STEPS = ["Seller details", "Store setup", "Review"];

export default function SellRegisterPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [sellerType, setSellerType] = useState<SellerType>("individual");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [storeName, setStoreName] = useState("");
  const [category, setCategory] = useState(categories[0].id);

  function validateStep(current: number): boolean {
    const next: Record<string, string> = {};
    if (current === 0) {
      if (!fullName) next.fullName = "Enter your name.";
      if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email.";
      if (!phone) next.phone = "Enter a contact phone number.";
    }
    if (current === 1) {
      if (!storeName) next.storeName = "Choose a store name.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) return;
    if (step === STEPS.length - 1) {
      setSubmitted(true);
      return;
    }
    setStep((s) => s + 1);
  }

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center">
        <CheckCircle2 className="h-14 w-14 text-success" aria-hidden="true" />
        <h1 className="text-2xl font-semibold text-text">Application submitted</h1>
        <p className="text-sm text-muted">
          Your seller application for <span className="font-medium text-text">{storeName}</span> is now
          pending mock review. This is a demo — no real seller account was created.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[600px] px-4 py-6">
      <h1 className="text-2xl font-semibold text-text">Become a Seller</h1>

      <ol className="mt-4 flex gap-2 text-sm" aria-label="Registration progress">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={cn(
              "flex-1 border-b-2 pb-2 text-center font-medium",
              i === step ? "border-primary text-primary" : i < step ? "border-success text-success" : "border-border text-muted"
            )}
          >
            {label}
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-col gap-4">
        {step === 0 && (
          <>
            <div className="flex gap-2">
              {(["individual", "business"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSellerType(t)}
                  className={cn(
                    "rounded-md border px-4 py-2 text-sm font-medium capitalize",
                    sellerType === t ? "border-primary bg-primary/10 text-primary" : "border-border text-text hover:bg-background"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <Input label={sellerType === "business" ? "Business name" : "Full name"} value={fullName} onChange={(e) => setFullName(e.target.value)} error={errors.fullName} required />
            <Input label="Contact email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} required />
            <Input label="Contact phone" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} required />
          </>
        )}

        {step === 1 && (
          <>
            <Input label="Store name" value={storeName} onChange={(e) => setStoreName(e.target.value)} error={errors.storeName} required />
            <label className="flex flex-col gap-1.5 text-sm font-medium text-text">
              Primary category
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-11 rounded-md border border-border bg-surface px-3 text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4 text-sm">
            <p><span className="text-muted">Seller type:</span> <span className="capitalize text-text">{sellerType}</span></p>
            <p><span className="text-muted">Name:</span> <span className="text-text">{fullName}</span></p>
            <p><span className="text-muted">Email:</span> <span className="text-text">{email}</span></p>
            <p><span className="text-muted">Phone:</span> <span className="text-text">{phone}</span></p>
            <p><span className="text-muted">Store name:</span> <span className="text-text">{storeName}</span></p>
            <p><span className="text-muted">Category:</span> <span className="text-text">{categories.find((c) => c.id === category)?.name}</span></p>
          </div>
        )}

        <div className="flex justify-between">
          {step > 0 ? (
            <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          ) : (
            <span />
          )}
          <Button type="button" onClick={goNext}>
            {step === STEPS.length - 1 ? "Submit application" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
