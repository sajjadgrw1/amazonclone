"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { useRegistries } from "@/lib/store/app-store";

const OCCASIONS = ["Wedding", "Baby", "Housewarming", "Birthday"];

export default function RegistryPage() {
  const { registries, hydrated, createRegistry, toggleRegistryProduct } = useRegistries();
  const [showForm, setShowForm] = useState(false);
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [ownerName, setOwnerName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [error, setError] = useState<string | undefined>();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[1000px] px-4 py-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-4 h-40 w-full" />
      </div>
    );
  }

  function handleCreate() {
    if (!ownerName.trim()) {
      setError("Enter a name for the registry.");
      return;
    }
    createRegistry({
      id: `registry-${Date.now()}`,
      occasion,
      ownerName: ownerName.trim(),
      eventDate: eventDate || undefined,
      productIds: [],
      createdAt: new Date().toISOString(),
    });
    setOwnerName("");
    setEventDate("");
    setError(undefined);
    setShowForm(false);
  }

  return (
    <div className="mx-auto max-w-[1000px] px-4 py-6">
      <h1 className="text-2xl font-semibold text-text">Registry</h1>
      <p className="mt-1 text-sm text-muted">Create a mock gift registry for a wedding, baby, or other occasion.</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {OCCASIONS.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => {
              setOccasion(o);
              setShowForm(true);
            }}
            className={`rounded-full border px-4 py-1.5 text-sm ${occasion === o && showForm ? "border-primary bg-primary/10 text-primary" : "border-border text-text hover:bg-background"}`}
          >
            {o}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="mt-4 flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 sm:max-w-sm">
          <Input label="Your name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} error={error} required />
          <Input label="Event date (optional)" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
          <div className="flex gap-2">
            <Button type="button" onClick={handleCreate}>Create {occasion.toLowerCase()} registry</Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {registries.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-16 text-center">
          <p className="text-lg font-semibold text-text">No registries yet</p>
          <p className="text-sm text-muted">Choose an occasion above to create one.</p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {registries.map((registry) => (
            <div key={registry.id} className="rounded-lg border border-border bg-surface p-4">
              <h2 className="text-lg font-semibold text-text">
                {registry.ownerName}&rsquo;s {registry.occasion} Registry
              </h2>
              {registry.eventDate && <p className="text-sm text-muted">Event date: {registry.eventDate}</p>}
              <p className="mt-1 text-sm text-muted">{registry.productIds.length} items added</p>

              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {products.slice(0, 12).map((product) => {
                  const added = registry.productIds.includes(product.id);
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => toggleRegistryProduct(registry.id, product.id)}
                      className={`relative aspect-square overflow-hidden rounded-md border-2 ${added ? "border-primary" : "border-transparent"}`}
                      aria-pressed={added}
                      aria-label={`${added ? "Remove" : "Add"} ${product.title}`}
                    >
                      <Image src={product.images[0]} alt={product.title} fill sizes="80px" className="object-cover" />
                    </button>
                  );
                })}
              </div>

              {registry.productIds.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {registry.productIds.map((id) => {
                    const p = products.find((prod) => prod.id === id);
                    if (!p) return null;
                    return (
                      <Link key={id} href={`/product/${p.slug}`} className="text-xs text-primary hover:underline">
                        {p.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
