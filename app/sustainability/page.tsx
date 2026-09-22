import { Leaf, Package, Truck, Recycle } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

const goals = [
  { icon: Package, label: "Mock packaging waste reduced", value: 62, target: "vs. 2019 baseline" },
  { icon: Truck, label: "Mock deliveries via electric vehicles", value: 38, target: "of last-mile fleet" },
  { icon: Recycle, label: "Mock fulfillment centers recycling cardboard", value: 91, target: "of active sites" },
];

const initiatives = [
  {
    title: "Right-sized packaging",
    body: "Mock algorithm selects the smallest box that fits an order, cutting fictional void-fill waste.",
  },
  {
    title: "Renewable-powered fulfillment",
    body: "A demo commitment to source mock fulfillment-center electricity from renewable providers by 2030.",
  },
  {
    title: "Seller sustainability badge",
    body: "A UX concept badge sellers could earn for mock low-carbon shipping options.",
  },
];

export default function SustainabilityPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-6">
      <PageHero
        title="Sustainability"
        subtitle="All figures on this page are fictional demo data used to illustrate a sustainability page pattern — not real environmental metrics."
      >
        <div className="flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm">
          <Leaf className="h-4 w-4" aria-hidden="true" />
          Mock goal: net-zero mock shipping emissions by 2035
        </div>
      </PageHero>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {goals.map((goal) => (
          <div key={goal.label} className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
            <goal.icon className="h-6 w-6 text-primary" aria-hidden="true" />
            <p className="text-sm text-muted">{goal.label}</p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-background">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${goal.value}%` }}
                role="progressbar"
                aria-valuenow={goal.value}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={goal.label}
              />
            </div>
            <p className="text-sm font-semibold text-text">
              {goal.value}% <span className="font-normal text-muted">{goal.target}</span>
            </p>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-10 text-lg font-semibold text-text">Current initiatives</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {initiatives.map((i) => (
          <div key={i.title} className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4">
            <p className="font-semibold text-text">{i.title}</p>
            <p className="text-sm text-muted">{i.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
