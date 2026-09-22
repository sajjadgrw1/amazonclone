"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { mockOrders } from "@/data/mock-account";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth, useOrders } from "@/lib/store/app-store";

export default function CustomerServicePage() {
  const { isSignedIn, hydrated } = useAuth();
  const { placedOrders } = useOrders();

  const [orderId, setOrderId] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);

  const availableOrders = [...placedOrders, ...mockOrders];

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!subject || !message) {
      setError("Fill in a subject and message.");
      return;
    }
    setError(undefined);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center">
        <CheckCircle2 className="h-14 w-14 text-success" aria-hidden="true" />
        <h1 className="text-xl font-semibold text-text">Message sent</h1>
        <p className="text-sm text-muted">
          Thanks — this is a mock submission for the Nuvara prototype. No real support ticket was created.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[600px] px-4 py-6">
      <h1 className="text-2xl font-semibold text-text">Customer Service</h1>
      <p className="mt-2 text-sm text-muted">Send a mock message to our (fictional) support team.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 rounded-lg border border-border bg-surface p-6">
        {hydrated && isSignedIn && availableOrders.length > 0 && (
          <label className="flex flex-col gap-1.5 text-sm font-medium text-text">
            Related order (optional)
            <select
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="h-11 rounded-md border border-border bg-surface px-3 text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <option value="">None</option>
              {availableOrders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.orderNumber}
                </option>
              ))}
            </select>
          </label>
        )}

        <Input label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />

        <label className="flex flex-col gap-1.5 text-sm font-medium text-text">
          Message
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            required
            className="rounded-md border border-border bg-surface p-3 text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          />
        </label>

        {error && <p className="text-sm text-danger">{error}</p>}

        <Button type="submit">Send message</Button>
      </form>
    </div>
  );
}
