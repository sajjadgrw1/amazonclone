"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Link2, Lock, Users } from "lucide-react";
import { products } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { useLists } from "@/lib/store/app-store";

export default function ListsPage() {
  const { lists, hydrated, createList, renameList, deleteList, setListPrivacy, toggleListProduct } = useLists();
  const [newListName, setNewListName] = useState("");
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [addingToListId, setAddingToListId] = useState<string | null>(null);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[1000px] px-4 py-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-4 h-40 w-full" />
      </div>
    );
  }

  function handleCreate() {
    if (!newListName.trim()) return;
    createList({ id: `list-${Date.now()}`, name: newListName.trim(), privacy: "private", productIds: [], createdAt: new Date().toISOString() });
    setNewListName("");
  }

  return (
    <div className="mx-auto max-w-[1000px] px-4 py-6">
      <h1 className="text-2xl font-semibold text-text">Your Lists</h1>

      <div className="mt-4 flex gap-2">
        <Input
          aria-label="New list name"
          placeholder="Name a new list (e.g. Home office)"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="max-w-xs"
        />
        <Button type="button" onClick={handleCreate} disabled={!newListName.trim()}>
          Create list
        </Button>
      </div>

      {lists.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-16 text-center">
          <p className="text-lg font-semibold text-text">No lists yet</p>
          <p className="text-sm text-muted">Create a list above to start saving products.</p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {lists.map((list) => (
            <div key={list.id} className="rounded-lg border border-border bg-surface p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                {renamingId === list.id ? (
                  <div className="flex gap-2">
                    <Input
                      aria-label="Rename list"
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      className="w-48"
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        if (renameValue.trim()) renameList(list.id, renameValue.trim());
                        setRenamingId(null);
                      }}
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <h2 className="text-lg font-semibold text-text">{list.name}</h2>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <button
                    type="button"
                    onClick={() => setListPrivacy(list.id, list.privacy === "private" ? "shared" : "private")}
                    className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted hover:bg-background"
                  >
                    {list.privacy === "private" ? <Lock className="h-3.5 w-3.5" aria-hidden="true" /> : <Users className="h-3.5 w-3.5" aria-hidden="true" />}
                    {list.privacy === "private" ? "Private" : "Shared"}
                  </button>
                  {list.privacy === "shared" && (
                    <button
                      type="button"
                      onClick={() => navigator.clipboard?.writeText(`https://nuvara.example/lists/${list.id}`)}
                      className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted hover:bg-background"
                    >
                      <Link2 className="h-3.5 w-3.5" aria-hidden="true" /> Copy link
                    </button>
                  )}
                  <Button type="button" size="sm" variant="outline" onClick={() => { setRenamingId(list.id); setRenameValue(list.name); }}>
                    Rename
                  </Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => deleteList(list.id)}>
                    Delete
                  </Button>
                </div>
              </div>

              {list.productIds.length === 0 ? (
                <p className="mt-3 text-sm text-muted">This list is empty.</p>
              ) : (
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {list.productIds.map((productId) => {
                    const product = products.find((p) => p.id === productId);
                    if (!product) return null;
                    return (
                      <div key={productId} className="flex flex-col gap-1 rounded-md border border-border p-2">
                        <Link href={`/product/${product.slug}`} className="relative aspect-square w-full overflow-hidden rounded-md bg-background">
                          <Image src={product.images[0]} alt={product.title} fill sizes="120px" className="object-cover" />
                        </Link>
                        <p className="line-clamp-1 text-xs text-text">{product.title}</p>
                        <button
                          type="button"
                          onClick={() => toggleListProduct(list.id, productId)}
                          className="text-left text-xs text-danger hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-3 border-t border-border pt-3">
                {addingToListId === list.id ? (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-muted">Tap a product to add or remove it from this list.</p>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                      {products.slice(0, 12).map((product) => {
                        const inList = list.productIds.includes(product.id);
                        return (
                          <button
                            key={product.id}
                            type="button"
                            onClick={() => toggleListProduct(list.id, product.id)}
                            className={`relative aspect-square overflow-hidden rounded-md border-2 ${inList ? "border-primary" : "border-transparent"}`}
                          >
                            <Image src={product.images[0]} alt={product.title} fill sizes="80px" className="object-cover" />
                          </button>
                        );
                      })}
                    </div>
                    <Button type="button" size="sm" variant="outline" className="self-start" onClick={() => setAddingToListId(null)}>
                      Done
                    </Button>
                  </div>
                ) : (
                  <Button type="button" size="sm" variant="outline" onClick={() => setAddingToListId(list.id)}>
                    Add products
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
