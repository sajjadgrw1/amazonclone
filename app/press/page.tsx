"use client";

import { useMemo, useState, type SyntheticEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { pressReleases } from "@/data/press-releases";
import { NewsMasthead } from "@/components/layout/NewsMasthead";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const categories = Array.from(new Set(pressReleases.map((p) => p.category)));

const heroTiles = [
  { title: "Sell on Nuvara: tools for mock sellers", href: "/sell", seed: "hero-sell", tone: "bg-secondary" },
  { title: "Nuvara+ brings mock fast delivery to more cities", href: "/prime", seed: "hero-prime", tone: "bg-header-nav" },
];

const topicSections = [
  {
    heading: "Nuvara+ shopping and benefits",
    moreLabel: "More Nuvara+",
    moreHref: "/prime",
    cards: [
      { title: "How Nuvara+ makes everyday shopping more affordable", href: "/prime", category: "Nuvara+", seed: "topic-prime-1" },
      { title: "Nuvara Big Deal Days: everything you need to know", href: "/deals/todays-deals", category: "Deals", seed: "topic-prime-2" },
      { title: "Clip and save with mock Nuvara Coupons", href: "/coupons", category: "Deals", seed: "topic-prime-3" },
      { title: "450+ mock gift card brands, all in one place", href: "/gift-cards", category: "Shopping", seed: "topic-prime-4" },
    ],
  },
  {
    heading: "Explore Nuvara",
    moreLabel: "More about us",
    moreHref: "/about",
    cards: [
      { title: "Life at Nuvara: what we're building next", href: "/about", category: "Company", seed: "topic-explore-1" },
      { title: "Open mock roles across engineering and operations", href: "/careers", category: "Careers", seed: "topic-explore-2" },
      { title: "Our fictional 2030 sustainability commitment", href: "/sustainability", category: "Sustainability", seed: "topic-explore-3" },
      { title: "How we design for accessibility across Nuvara", href: "/accessibility", category: "Accessibility", seed: "topic-explore-4" },
    ],
  },
];

export default function PressPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const results = useMemo(
    () => pressReleases.filter((p) => !activeCategory || p.category === activeCategory),
    [activeCategory]
  );

  const featured = pressReleases[featuredIndex];

  function handleToggle(id: string, e: SyntheticEvent<HTMLDetailsElement>) {
    const isOpen = e.currentTarget.open;
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (isOpen) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  function openInArchive(id: string) {
    setActiveCategory(null);
    setOpenIds((prev) => new Set(prev).add(id));
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div className="flex flex-col">
      <h1 className="sr-only">Nuvara News</h1>
      <NewsMasthead />

      <div className="mx-auto w-full max-w-[1440px] px-4 py-6">
        <div className="flex items-center justify-between gap-4 rounded-md border border-border bg-surface px-4 py-3">
          <button
            type="button"
            onClick={() => openInArchive(featured.id)}
            className="min-w-0 flex-1 truncate text-left text-sm font-semibold text-text hover:underline"
          >
            {featured.title}
          </button>
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              aria-label="Previous story"
              onClick={() => setFeaturedIndex((i) => (i - 1 + pressReleases.length) % pressReleases.length)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-primary hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="text-sm font-medium text-muted">
              {featuredIndex + 1} / {pressReleases.length}
            </span>
            <button
              type="button"
              aria-label="Next story"
              onClick={() => setFeaturedIndex((i) => (i + 1) % pressReleases.length)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-primary hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {heroTiles.map((tile) => (
            <Link
              key={tile.seed}
              href={tile.href}
              className={cn(
                "group relative flex aspect-[16/9] items-end overflow-hidden rounded-lg p-6 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
                tile.tone
              )}
            >
              <span className="relative text-xl font-bold">{tile.title}</span>
            </Link>
          ))}
        </div>

        {topicSections.map((section) => (
          <section key={section.heading} className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text">{section.heading}</h2>
              <Link href={section.moreHref} className="flex items-center gap-1 text-sm font-medium text-link hover:text-link-hover">
                {section.moreLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {section.cards.map((card) => (
                <Link
                  key={card.seed}
                  href={card.href}
                  className="flex flex-col gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-md bg-background">
                    <Image src={`https://picsum.photos/seed/${card.seed}/320/200`} alt="" fill sizes="280px" className="object-cover" />
                  </div>
                  <p className="text-sm font-semibold text-text">{card.title}</p>
                  <Badge variant="neutral" className="self-start">
                    {card.category}
                  </Badge>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-text">Newsroom archive</h2>
          <p className="mt-1 text-sm text-muted">
            Fictional press releases used to demonstrate this page pattern — none of these announcements are real.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
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

          <div className="mt-4 flex max-w-[900px] flex-col divide-y divide-border rounded-lg border border-border bg-surface">
            {results.length === 0 ? (
              <p className="p-6 text-center text-sm text-muted">No press releases in this category yet.</p>
            ) : (
              results.map((release) => (
                <details
                  key={release.id}
                  id={release.id}
                  open={openIds.has(release.id)}
                  onToggle={(e) => handleToggle(release.id, e)}
                  className="scroll-mt-4 p-4"
                >
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
        </section>
      </div>
    </div>
  );
}
