"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Globe } from "lucide-react";
import { footerColumns } from "@/data/navigation";
import { LocationModal } from "@/components/navigation/LocationModal";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

export function Footer() {
  const [openColumn, setOpenColumn] = useState<string | null>(null);
  const [regionOpen, setRegionOpen] = useState(false);
  const [region, setRegion] = useState("United States");

  return (
    <footer className="mt-12 bg-header-dark text-white">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full bg-header-nav-hover py-3 text-center text-sm font-medium hover:bg-header-nav-hover/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        Back to top
      </button>

      <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {footerColumns.map((column) => {
          const isOpen = openColumn === column.title;
          return (
            <div key={column.title} className="border-b border-white/10 pb-4 sm:border-none sm:pb-0">
              <button
                type="button"
                onClick={() => setOpenColumn(isOpen ? null : column.title)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between py-2 text-sm font-bold sm:pointer-events-none sm:py-0"
              >
                {column.title}
                <span className="sm:hidden">
                  {isOpen ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
                </span>
              </button>
              <ul className={cn("flex-col gap-2 pt-2 text-sm text-white/80 sm:flex sm:pt-3", isOpen ? "flex" : "hidden")}>
                {column.items.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-4 py-8">
          <Logo />
          <button
            type="button"
            onClick={() => setRegionOpen(true)}
            className="flex items-center gap-2 rounded-md border border-white/40 px-3 py-1.5 text-sm hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            English &middot; {region}
          </button>
        </div>
      </div>

      <div className="border-t border-white/20 px-4 py-6 text-center text-xs text-white/60">
        <div className="mx-auto flex max-w-[1440px] flex-wrap justify-center gap-4 pb-3">
          <Link href="/help" className="hover:underline">Conditions of Use</Link>
          <Link href="/help" className="hover:underline">Privacy Notice</Link>
          <Link href="/help" className="hover:underline">Interest-Based Ads</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Nuvara. Demo prototype — not a real store. Not affiliated with Amazon.</p>
      </div>

      <LocationModal isOpen={regionOpen} onClose={() => setRegionOpen(false)} onSelect={setRegion} />
    </footer>
  );
}
