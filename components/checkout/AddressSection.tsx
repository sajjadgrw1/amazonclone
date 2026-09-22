"use client";

import { useState } from "react";
import type { Address } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export interface AddressSectionProps {
  addresses: Address[];
  selectedAddressId: string | null;
  onSelect: (id: string) => void;
  onAdd: (address: Address) => void;
}

const emptyForm = { fullName: "", line1: "", city: "", state: "", postalCode: "", country: "United States", phone: "" };

export function AddressSection({ addresses, selectedAddressId, onSelect, onAdd }: AddressSectionProps) {
  const [showForm, setShowForm] = useState(addresses.length === 0);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | undefined>();

  function handleAdd() {
    if (!form.fullName || !form.line1 || !form.city || !form.state || !form.postalCode) {
      setError("Fill in all required fields.");
      return;
    }
    const newAddress: Address = { id: `addr-${Date.now()}`, ...form };
    onAdd(newAddress);
    onSelect(newAddress.id);
    setForm(emptyForm);
    setError(undefined);
    setShowForm(false);
  }

  return (
    <section aria-labelledby="address-heading" className="rounded-lg border border-border bg-surface p-4">
      <h2 id="address-heading" className="mb-3 text-lg font-semibold text-text">
        1. Shipping Address
      </h2>

      <div className="flex flex-col gap-2">
        {addresses.map((addr) => (
          <label
            key={addr.id}
            className="flex cursor-pointer items-start gap-3 rounded-md border border-border p-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5"
          >
            <input
              type="radio"
              name="shipping-address"
              checked={selectedAddressId === addr.id}
              onChange={() => onSelect(addr.id)}
              className="mt-1 h-4 w-4"
            />
            <span>
              <span className="block font-medium text-text">{addr.fullName}</span>
              <span className="block text-muted">
                {addr.line1}, {addr.city}, {addr.state} {addr.postalCode}, {addr.country}
              </span>
            </span>
          </label>
        ))}
      </div>

      {showForm ? (
        <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
            <Input label="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <Input label="Address line" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} required />
          <div className="grid gap-3 sm:grid-cols-3">
            <Input label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
            <Input label="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} required />
            <Input label="Postal code" value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} required />
          </div>
          {error && <p className="text-sm text-danger">{error}</p>}
          <div className="flex gap-2">
            <Button type="button" onClick={handleAdd}>
              Save address
            </Button>
            {addresses.length > 0 && (
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Button type="button" variant="outline" size="sm" className="mt-3" onClick={() => setShowForm(true)}>
          Add a new address
        </Button>
      )}
    </section>
  );
}
