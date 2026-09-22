"use client";

import { useState } from "react";
import type { Address } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCheckoutSelection } from "@/lib/store/app-store";

const emptyForm = { fullName: "", line1: "", city: "", state: "", postalCode: "", country: "United States", phone: "" };

export function AddressManager({ defaultAddresses }: { defaultAddresses: Address[] }) {
  const { customAddresses, addAddress, updateAddress, deleteAddress } = useCheckoutSelection();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | undefined>();

  function startEdit(address: Address) {
    setEditingId(address.id);
    setForm({
      fullName: address.fullName,
      line1: address.line1,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      phone: address.phone ?? "",
    });
    setShowAddForm(false);
  }

  function handleSave() {
    if (!form.fullName || !form.line1 || !form.city || !form.state || !form.postalCode) {
      setError("Fill in all required fields.");
      return;
    }
    if (editingId) {
      updateAddress({ id: editingId, ...form });
    } else {
      addAddress({ id: `addr-${Date.now()}`, ...form });
    }
    setForm(emptyForm);
    setError(undefined);
    setEditingId(null);
    setShowAddForm(false);
  }

  const isFormOpen = showAddForm || !!editingId;

  return (
    <div className="flex flex-col gap-3">
      {defaultAddresses.map((addr) => (
        <div key={addr.id} className="rounded-md border border-border p-3 text-sm">
          <p className="font-medium text-text">{addr.fullName} <span className="ml-1 text-xs text-muted">(default demo address)</span></p>
          <p className="text-muted">
            {addr.line1}, {addr.city}, {addr.state} {addr.postalCode}, {addr.country}
          </p>
        </div>
      ))}

      {customAddresses.map((addr) => (
        <div key={addr.id} className="rounded-md border border-border p-3 text-sm">
          <p className="font-medium text-text">{addr.fullName}</p>
          <p className="text-muted">
            {addr.line1}, {addr.city}, {addr.state} {addr.postalCode}, {addr.country}
          </p>
          <div className="mt-2 flex gap-2">
            <Button type="button" size="sm" variant="outline" onClick={() => startEdit(addr)}>
              Edit
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={() => deleteAddress(addr.id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}

      {isFormOpen ? (
        <div className="flex flex-col gap-3 rounded-md border border-dashed border-border p-3">
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
            <Button type="button" onClick={handleSave}>
              {editingId ? "Save changes" : "Add address"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
                setForm(emptyForm);
                setError(undefined);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button type="button" variant="outline" size="sm" className="self-start" onClick={() => setShowAddForm(true)}>
          Add a new address
        </Button>
      )}
    </div>
  );
}
