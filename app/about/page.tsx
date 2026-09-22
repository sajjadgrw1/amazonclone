import Link from "next/link";
import { Users, Package, Globe2, Heart } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";

const stats = [
  { icon: Users, label: "Mock employees", value: "12,400+" },
  { icon: Package, label: "Mock listings", value: "80,000+" },
  { icon: Globe2, label: "Mock delivery regions", value: "6" },
  { icon: Heart, label: "Founded (fictional)", value: "2019" },
];

const values = [
  {
    title: "Customer obsession",
    body: "Every mock feature in this prototype starts from a real customer journey — search, compare, buy, track.",
  },
  {
    title: "Original by design",
    body: "Nuvara uses its own name, colors, and copy. It's inspired by familiar marketplace patterns, not a copy of any single company's code or assets.",
  },
  {
    title: "Built in the open",
    body: "This is a UX prototype: mock data only, no real backend, no real payments, no real passwords.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-6">
      <PageHero
        title="About Nuvara"
        subtitle="Nuvara is an original, Amazon-inspired e-commerce UX prototype. Everything you see — products, orders, reviews — is mock data used to study marketplace design."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-start gap-2 rounded-lg border border-border bg-surface p-4">
            <stat.icon className="h-6 w-6 text-primary" aria-hidden="true" />
            <p className="text-xl font-bold text-text">{stat.value}</p>
            <p className="text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-10 text-lg font-semibold text-text">What we value</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4">
            <p className="font-semibold text-text">{v.title}</p>
            <p className="text-sm text-muted">{v.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4 rounded-lg border border-border bg-surface p-6">
        <div className="flex-1">
          <p className="font-semibold text-text">Curious about working here?</p>
          <p className="text-sm text-muted">Browse mock open roles across engineering, operations, and design.</p>
        </div>
        <Link href="/careers">
          <Button type="button">See careers</Button>
        </Link>
      </div>
    </div>
  );
}
