import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold text-text">Page not found</h1>
      <p className="max-w-md text-sm text-muted">
        We couldn&rsquo;t find what you were looking for. It may have been moved, or the link may be
        incorrect.
      </p>
      <Link href="/">
        <Button type="button">Back to homepage</Button>
      </Link>
    </div>
  );
}
