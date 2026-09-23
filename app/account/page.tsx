"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Gift,
  Headphones,
  ListChecks,
  Lock,
  MapPin,
  Package,
  Repeat,
  Sparkles,
} from "lucide-react";
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

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

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

  const hubCards = [
    { href: "/orders", icon: Package, title: "Your Orders", body: "Track, return, cancel an order, or buy again." },
    { href: "#security", icon: Lock, title: "Login & Security", body: "Edit your name, email, and sign-out." },
    { href: "/prime", icon: Sparkles, title: "Nuvara+", body: "Manage your membership and mock benefits." },
    { href: "#addresses", icon: MapPin, title: "Your Addresses", body: "Add, edit, or remove delivery addresses." },
    { href: "/gift-cards", icon: Gift, title: "Gift Cards", body: "View balance or redeem a mock gift card." },
    { href: "#payment", icon: CreditCard, title: "Your Payments", body: "View mock payment methods on file." },
    { href: "/lists", icon: ListChecks, title: "Your Lists", body: "Products you've saved to a list." },
    { href: "/orders", icon: Repeat, title: "Subscriptions", body: "View recurring mock orders." },
    { href: "/customer-service", icon: Headphones, title: "Customer Service", body: "Get help with an order or account." },
  ];

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6">
      <h1 className="mb-6 text-2xl font-semibold text-text">Your Account</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hubCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="flex items-start gap-4 rounded-lg border border-border bg-surface p-5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-link/10 text-link">
              <card.icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="flex flex-col gap-1">
              <span className="font-semibold text-text">{card.title}</span>
              <span className="text-sm text-muted">{card.body}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-6">
        <section id="security" aria-labelledby="security-heading" className="rounded-lg border border-border bg-surface p-4">
          <h2 id="security-heading" className="mb-3 text-lg font-semibold text-text">
            Login & Security
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
            <Button type="button" variant="outline" className="self-start" onClick={logout}>
              Sign out
            </Button>
          </div>
        </section>

        <section id="addresses" aria-labelledby="addresses-heading" className="rounded-lg border border-border bg-surface p-4">
          <h2 id="addresses-heading" className="mb-3 text-lg font-semibold text-text">
            Your Addresses
          </h2>
          <AddressManager defaultAddresses={mockAddresses} />
        </section>

        <section id="payment" aria-labelledby="payment-heading" className="rounded-lg border border-border bg-surface p-4">
          <h2 id="payment-heading" className="mb-3 text-lg font-semibold text-text">
            Payment Options
          </h2>
          <p className="text-sm text-muted">
            Payment methods are mock placeholders in this prototype — no real card details are collected
            or stored.
          </p>
        </section>
      </div>
    </div>
  );
}
