"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const REGIONS = ["United States", "Canada", "United Kingdom", "Germany", "India", "Australia"];

export interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: string) => void;
}

export function LocationModal({ isOpen, onClose, onSelect }: LocationModalProps) {
  const [region, setRegion] = useState(REGIONS[0]);
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState<string | undefined>();

  function handleApply() {
    if (postalCode && !/^[a-zA-Z0-9\s-]{3,10}$/.test(postalCode)) {
      setError("Enter a valid postal code or leave it blank.");
      return;
    }
    setError(undefined);
    onSelect(postalCode ? `${region} ${postalCode}` : region);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Choose your delivery location" variant="center">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted">
          Select a country/region, or enter a postal code for more accurate delivery estimates. This is a
          mock control for the Nuvara prototype.
        </p>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-text">
          Country / Region
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="h-11 rounded-md border border-border bg-surface px-3 text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        <Input
          label="Postal code (optional)"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="e.g. 94103"
          error={error}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
}
