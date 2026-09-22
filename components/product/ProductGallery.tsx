"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-3 sm:flex-row-reverse sm:gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-background sm:flex-1">
        <Image
          src={images[activeIndex]}
          alt={title}
          fill
          priority
          sizes="(min-width: 1024px) 500px, 90vw"
          className="object-cover"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto sm:w-20 sm:flex-col sm:overflow-y-auto">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label={`Show image ${i + 1} of ${images.length}`}
            aria-current={activeIndex === i}
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
              activeIndex === i ? "border-primary" : "border-border"
            )}
          >
            <Image src={src} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
