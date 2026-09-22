import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

const badgeVariants = cva("inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold", {
  variants: {
    variant: {
      discount: "bg-danger/10 text-danger",
      success: "bg-success/10 text-success",
      warning: "bg-warning/10 text-warning",
      neutral: "bg-background text-muted border border-border",
      primary: "bg-primary/10 text-primary",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
