import type { ReactNode } from "react";

export function PageHero({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="flex flex-col items-start gap-4 rounded-lg bg-secondary px-6 py-12 text-white sm:px-12">
      <h1 className="max-w-xl text-3xl font-bold">{title}</h1>
      {subtitle && <p className="max-w-lg text-white/80">{subtitle}</p>}
      {children}
    </section>
  );
}
