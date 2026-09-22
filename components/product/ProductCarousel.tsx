"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";

export interface ProductCarouselProps {
  heading: string;
  seeAllHref?: string;
  products: Product[];
}

export function ProductCarousel({ heading, seeAllHref, products }: ProductCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateBoundaries = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateBoundaries();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateBoundaries, { passive: true });
    window.addEventListener("resize", updateBoundaries);
    return () => {
      el.removeEventListener("scroll", updateBoundaries);
      window.removeEventListener("resize", updateBoundaries);
    };
  }, [updateBoundaries]);

  function scrollByAmount(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: "smooth" });
  }

  if (products.length === 0) return null;

  return (
    <section className="flex flex-col gap-3" aria-label={heading}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text">{heading}</h2>
        {seeAllHref && (
          <Link href={seeAllHref} className="text-sm font-medium text-primary hover:underline">
            See all
          </Link>
        )}
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <div key={product.id} className="w-[45vw] shrink-0 snap-start sm:w-[220px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByAmount(-1)}
          disabled={atStart}
          aria-label={`Scroll ${heading} left`}
          className={cn(
            "absolute left-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface shadow disabled:opacity-30 lg:flex",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          )}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount(1)}
          disabled={atEnd}
          aria-label={`Scroll ${heading} right`}
          className={cn(
            "absolute right-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface shadow disabled:opacity-30 lg:flex",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          )}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
