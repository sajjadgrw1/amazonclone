"use client";

import { useMemo, useState } from "react";
import { pressReleases } from "@/data/press-releases";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const categories = Array.from(new Set(pressReleases.map((p) => p.category)));

export default function PressPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const results = useMemo(
    () => pressReleases.filter((p) => !activeCategory || p.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="mx-auto max-w-[900px] px-4 py-6">
      <PageHero
        title="Press Center"
        subtitle="Fictional press releases used to demonstrate this page pattern — none of these announcements are real."
      />

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm font-medium",
            !activeCategory ? "bg-primary text-white" : "border border-border text-muted hover:bg-background"
          )}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActiveCategory(c)}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium",
              activeCategory === c ? "bg-primary text-white" : "border border-border text-muted hover:bg-background"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col divide-y divide-border rounded-lg border border-border bg-surface">
        {results.length === 0 ? (
          <p className="p-6 text-center text-sm text-muted">No press releases in this category yet.</p>
        ) : (
          results.map((release) => (
            <details key={release.id} className="p-4">
              <summary className="flex cursor-pointer flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Badge variant="primary">{release.category}</Badge>
                  <span className="text-xs text-muted">{formatDate(release.publishedAt)}</span>
                </div>
                <span className="font-semibold text-text">{release.title}</span>
                <span className="text-sm text-muted">{release.excerpt}</span>
              </summary>
              <p className="mt-3 text-sm text-text">{release.body}</p>
            </details>
          ))
        )}
      </div>
    </div>
  );
}
