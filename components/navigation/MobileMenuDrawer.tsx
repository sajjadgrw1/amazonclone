"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { primaryNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

export interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenuDrawer({ isOpen, onClose }: MobileMenuDrawerProps) {
  const [expandedId, setExpandedId] = useState<string | null>(primaryNavigation[0]?.id ?? null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Browse Nuvara" variant="drawer-right">
      <nav aria-label="Mobile navigation" className="flex flex-col">
        {primaryNavigation.map((item) => {
          const hasChildren = !!item.children?.length;
          const expanded = expandedId === item.id;
          return (
            <div key={item.id} className="border-b border-border">
              {hasChildren ? (
                <button
                  type="button"
                  onClick={() => setExpandedId(expanded ? null : item.id)}
                  aria-expanded={expanded}
                  className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  {item.label}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} aria-hidden="true" />
                </button>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-3 text-sm font-semibold text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  {item.label}
                </Link>
              )}
              {hasChildren && expanded && (
                <ul className="flex flex-col gap-1 pb-3 pl-3">
                  {item.children!.map((child) => (
                    <li key={child.id}>
                      <Link
                        href={child.href}
                        onClick={onClose}
                        className="block rounded py-1.5 text-sm text-muted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </Modal>
  );
}
