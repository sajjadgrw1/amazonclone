import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Nuvara home"
      className={cn(
        "group flex shrink-0 flex-col items-start rounded-md px-2 pt-1.5 pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
        className
      )}
    >
      <span className="text-2xl font-bold italic tracking-tight text-white">nuvara</span>
      <svg
        viewBox="0 0 100 18"
        aria-hidden="true"
        className="-mt-1 h-3 w-[88px] text-primary"
      >
        <path
          d="M3 3 C 30 17, 70 17, 95 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M89 1 L98 4.5 L88.5 9 Z" fill="currentColor" />
      </svg>
    </Link>
  );
}
