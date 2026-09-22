import { TrendingUp, DollarSign, Users2, Package2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { formatCurrency } from "@/lib/format";

const highlights = [
  { icon: DollarSign, label: "Mock quarterly revenue", value: formatCurrency(482_300_000) },
  { icon: TrendingUp, label: "Mock YoY growth", value: "+18%" },
  { icon: Users2, label: "Mock active accounts", value: "3.1M" },
  { icon: Package2, label: "Mock orders shipped", value: "9.4M" },
];

const reports = [
  { id: "q2-2026", title: "Q2 2026 mock shareholder letter", period: "Apr – Jun 2026" },
  { id: "q1-2026", title: "Q1 2026 mock shareholder letter", period: "Jan – Mar 2026" },
  { id: "fy-2025", title: "FY2025 mock annual report", period: "Full year 2025" },
];

export default function InvestorRelationsPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-6">
      <PageHero
        title="Investor Relations"
        subtitle="All figures below are fictional demo data used to illustrate an investor relations page — Nuvara has no real shares, revenue, or shareholders."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        {highlights.map((h) => (
          <div key={h.label} className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4">
            <h.icon className="h-6 w-6 text-primary" aria-hidden="true" />
            <p className="text-xl font-bold text-text">{h.value}</p>
            <p className="text-sm text-muted">{h.label}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-10 text-lg font-semibold text-text">Mock shareholder reports</h2>
      <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-surface">
        {reports.map((report) => (
          <details key={report.id} className="p-4">
            <summary className="cursor-pointer text-sm font-medium text-text">
              {report.title}
              <span className="ml-2 text-xs font-normal text-muted">{report.period}</span>
            </summary>
            <p className="mt-2 text-sm text-muted">
              This is a placeholder summary for the {report.title.toLowerCase()}. In this prototype there is no real
              downloadable document — Nuvara is not a publicly traded company.
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
