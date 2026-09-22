import Link from "next/link";
import { BarChart3, PackageCheck, Rocket, Store } from "lucide-react";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/Button";

const steps = [
  { icon: Store, title: "Create your store", body: "Set up a seller profile with your business or individual details." },
  { icon: PackageCheck, title: "List your products", body: "Add listings with photos, pricing, and inventory counts." },
  { icon: Rocket, title: "Start selling", body: "Your listings go live across Nuvara's mock storefront." },
  { icon: BarChart3, title: "Track performance", body: "Monitor mock orders and demo sales analytics." },
];

const faqs = [
  { q: "Is this a real marketplace?", a: "No — Nuvara is a UX prototype. No real products, payments, or seller accounts are created." },
  { q: "What are the fees?", a: "See the Pricing page for demo fee examples using mock rates." },
  { q: "How long does approval take?", a: "In this prototype, registration is instantly marked pending review (mock)." },
];

export default function SellLandingPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6">
      <section className="flex flex-col items-start gap-4 rounded-lg bg-secondary px-6 py-12 text-white sm:px-12">
        <h1 className="max-w-xl text-3xl font-bold">Sell on Nuvara</h1>
        <p className="max-w-lg text-white/80">
          Reach mock customers across categories. This is a demo seller flow — no real store is created.
        </p>
        <Link href="/sell/register">
          <Button type="button" variant="secondary" className="bg-warning text-text hover:bg-warning/90">
            Start selling
          </Button>
        </Link>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div key={step.title} className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4">
            <step.icon className="h-6 w-6 text-primary" aria-hidden="true" />
            <p className="font-semibold text-text">{step.title}</p>
            <p className="text-sm text-muted">{step.body}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-10 text-lg font-semibold text-text">Popular categories for sellers</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <span key={c.id} className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-text">
            {c.name}
          </span>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/sell/how-it-works">
          <Button type="button" variant="outline">How it works</Button>
        </Link>
        <Link href="/sell/pricing">
          <Button type="button" variant="outline">Pricing</Button>
        </Link>
        <Link href="/sell/register">
          <Button type="button">Register as a seller</Button>
        </Link>
      </div>

      <h2 className="mb-3 mt-10 text-lg font-semibold text-text">Seller FAQ</h2>
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
