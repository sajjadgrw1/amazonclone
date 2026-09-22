"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, Package, ShieldCheck, User as UserIcon } from "lucide-react";
import { mockAddresses } from "@/data/mock-account";
import { AddressManager } from "@/components/account/AddressManager";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/lib/store/app-store";

export default function AccountPage() {
  const { user, isSignedIn, hydrated, logout } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [savedMessage, setSavedMessage] = useState(false);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-4 h-64 w-full" />
      </div>
    );
  }

  if (!isSignedIn || !user) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center">
        <h1 className="text-xl font-semibold text-text">Sign in to view your account</h1>
        <Link href="/login?next=/account">
          <Button type="button">Sign in</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6">
      <h1 className="mb-6 text-2xl font-semibold text-text">Your Account</h1>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Account navigation" className="hidden flex-col gap-1 text-sm lg:flex">
          <a href="#profile" className="rounded-md px-3 py-2 font-medium text-text hover:bg-background">Profile</a>
          <a href="#addresses" className="rounded-md px-3 py-2 font-medium text-text hover:bg-background">Addresses</a>
          <a href="#payment" className="rounded-md px-3 py-2 font-medium text-text hover:bg-background">Payment</a>
          <a href="#security" className="rounded-md px-3 py-2 font-medium text-text hover:bg-background">Security</a>
        </nav>

        <div className="flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/orders" className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 hover:shadow-md">
              <Package className="h-6 w-6 text-primary" aria-hidden="true" />
              <div>
                <p className="font-medium text-text">Your Orders</p>
                <p className="text-xs text-muted">Track, return, or buy again</p>
              </div>
            </Link>
            <Link href="/wishlist" className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 hover:shadow-md">
              <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
              <div>
                <p className="font-medium text-text">Your Wishlist</p>
                <p className="text-xs text-muted">Saved items</p>
              </div>
            </Link>
          </div>

          <section id="profile" aria-labelledby="profile-heading" className="rounded-lg border border-border bg-surface p-4">
            <h2 id="profile-heading" className="mb-3 flex items-center gap-2 text-lg font-semibold text-text">
              <UserIcon className="h-5 w-5" aria-hidden="true" /> Profile
            </h2>
            <div className="flex flex-col gap-3 sm:max-w-sm">
              <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input label="Email" value={user.email} disabled helperText="Mock account — email can't be changed in this prototype." />
              <Button
                type="button"
                className="self-start"
                onClick={() => {
                  setSavedMessage(true);
                  window.setTimeout(() => setSavedMessage(false), 2000);
                }}
              >
                Save changes
              </Button>
              {savedMessage && <p className="text-sm text-success">Profile updated (mock, not persisted).</p>}
            </div>
          </section>

          <section id="addresses" aria-labelledby="addresses-heading" className="rounded-lg border border-border bg-surface p-4">
            <h2 id="addresses-heading" className="mb-3 text-lg font-semibold text-text">
              Addresses
            </h2>
            <AddressManager defaultAddresses={mockAddresses} />
          </section>

          <section id="payment" aria-labelledby="payment-heading" className="rounded-lg border border-border bg-surface p-4">
            <h2 id="payment-heading" className="mb-3 flex items-center gap-2 text-lg font-semibold text-text">
              <CreditCard className="h-5 w-5" aria-hidden="true" /> Payment Methods
            </h2>
            <p className="text-sm text-muted">
              Payment methods are mock placeholders in this prototype — no real card details are collected
              or stored.
            </p>
          </section>

          <section id="security" aria-labelledby="security-heading" className="rounded-lg border border-border bg-surface p-4">
            <h2 id="security-heading" className="mb-3 text-lg font-semibold text-text">
              Security & Sign out
            </h2>
            <Button type="button" variant="outline" onClick={logout}>
              Sign out
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
