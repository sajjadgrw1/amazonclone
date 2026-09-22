import Link from "next/link";
import { Button } from "@/components/ui/Button";

const phases = [
  {
    title: "1. Register",
    body: "Tell us about your business or individual seller details, and choose the categories you'll sell in.",
  },
  {
    title: "2. List products",
    body: "Add product titles, photos, pricing, and stock levels using the seller mock dashboard (not included in this prototype).",
  },
  {
    title: "3. Fulfill orders",
    body: "Mock orders appear in a seller queue; mark them shipped to simulate fulfillment.",
  },
  {
    title: "4. Get paid",
    body: "Demo payouts are simulated on a mock schedule — no real funds move in this prototype.",
  },
];

export default function SellHowItWorksPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-6">
      <h1 className="text-2xl font-semibold text-text">How Selling on Nuvara Works</h1>
      <p className="mt-2 text-sm text-muted">
        A walkthrough of the mock seller journey used in this prototype.
      </p>

      <ol className="mt-6 flex flex-col gap-4">
        {phases.map((phase) => (
          <li key={phase.title} className="rounded-lg border border-border bg-surface p-4">
            <p className="font-semibold text-text">{phase.title}</p>
            <p className="mt-1 text-sm text-muted">{phase.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex gap-3">
        <Link href="/sell/register">
          <Button type="button">Register as a seller</Button>
        </Link>
        <Link href="/sell/pricing">
          <Button type="button" variant="outline">See pricing</Button>
        </Link>
      </div>
    </div>
  );
}
