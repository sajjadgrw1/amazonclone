"use client";

import { useEffect, useState } from "react";
import { getCountdownParts } from "@/lib/format";

export function DealCountdown({ endAt, startAt }: { endAt: string; startAt?: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) {
    // Static, SSR-safe placeholder — avoids a hydration mismatch since real
    // elapsed time can't be known until the client clock is read post-mount.
    return <span className="text-sm text-muted">Ends {new Date(endAt).toLocaleDateString()}</span>;
  }

  if (startAt && new Date(startAt).getTime() > now) {
    return <span className="text-sm text-muted">Starts {new Date(startAt).toLocaleDateString()}</span>;
  }

  const { expired, hours, minutes, seconds } = getCountdownParts(endAt, now);
  if (expired) {
    return <span className="text-sm font-medium text-danger">Deal ended</span>;
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <span className="text-sm font-medium text-danger" role="timer" aria-live="off">
      Ends in {pad(hours)}:{pad(minutes)}:{pad(seconds)}
    </span>
  );
}
