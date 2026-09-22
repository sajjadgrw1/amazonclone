import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
}

export function Pagination({ currentPage, totalPages, buildHref }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1 py-6">
      <Link
        href={buildHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={cn(
          "flex h-10 min-w-10 items-center justify-center rounded-md border border-border px-2 text-sm",
          currentPage === 1 ? "pointer-events-none opacity-40" : "hover:bg-background"
        )}
      >
        Previous
      </Link>
      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={cn(
            "flex h-10 min-w-10 items-center justify-center rounded-md border px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
            page === currentPage ? "border-primary bg-primary text-white" : "border-border hover:bg-background"
          )}
        >
          {page}
        </Link>
      ))}
      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={cn(
          "flex h-10 min-w-10 items-center justify-center rounded-md border border-border px-2 text-sm",
          currentPage === totalPages ? "pointer-events-none opacity-40" : "hover:bg-background"
        )}
      >
        Next
      </Link>
    </nav>
  );
}
