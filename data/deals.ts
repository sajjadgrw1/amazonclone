import type { Deal } from "@/types";

// "Today" for this mock dataset is anchored near 2026-09-22 (see spec/README.md —
// mock data first). startAt/endAt are fixed ISO strings, never computed from
// Date.now() at module load, so server and client render the same static data;
// only the live countdown display (client-only, post-mount) is time-dependent.
export const deals: Deal[] = [
  {
    id: "deal-voltix-headphones",
    productId: "voltix-wireless-headphones",
    discountPercent: 33,
    startAt: "2026-09-20T00:00:00.000Z",
    endAt: "2026-09-24T23:59:59.000Z",
    claimedPercent: 62,
    status: "active",
    isLightningDeal: true,
  },
  {
    id: "deal-hearthlane-airfryer",
    productId: "hearthlane-air-fryer",
    discountPercent: 30,
    startAt: "2026-09-21T12:00:00.000Z",
    endAt: "2026-09-23T12:00:00.000Z",
    claimedPercent: 88,
    status: "active",
    isLightningDeal: true,
  },
  {
    id: "deal-strideline-shoes",
    productId: "strideline-running-shoes",
    discountPercent: 27,
    startAt: "2026-09-22T00:00:00.000Z",
    endAt: "2026-09-26T23:59:59.000Z",
    claimedPercent: 41,
    status: "active",
  },
  {
    id: "deal-portaflow-powerbank",
    productId: "portaflow-power-bank",
    discountPercent: 23,
    startAt: "2026-09-22T00:00:00.000Z",
    endAt: "2026-09-25T23:59:59.000Z",
    claimedPercent: 35,
    status: "active",
  },
  {
    id: "deal-aurelia-serum",
    productId: "aurelia-vitamin-c-serum",
    discountPercent: 24,
    startAt: "2026-09-24T00:00:00.000Z",
    endAt: "2026-09-28T23:59:59.000Z",
    claimedPercent: 0,
    status: "upcoming",
  },
  {
    id: "deal-pawshire-dogbed",
    productId: "pawshire-dog-bed",
    discountPercent: 27,
    startAt: "2026-09-25T00:00:00.000Z",
    endAt: "2026-09-29T23:59:59.000Z",
    claimedPercent: 0,
    status: "upcoming",
  },
  {
    id: "deal-hearthlane-mixer",
    productId: "hearthlane-stand-mixer",
    discountPercent: 21,
    startAt: "2026-09-15T00:00:00.000Z",
    endAt: "2026-09-19T23:59:59.000Z",
    claimedPercent: 100,
    status: "expired",
  },
  {
    id: "deal-playtown-blocks",
    productId: "playtown-building-blocks",
    discountPercent: 25,
    startAt: "2026-09-20T00:00:00.000Z",
    endAt: "2026-09-24T23:59:59.000Z",
    claimedPercent: 100,
    status: "sold-out",
    isLightningDeal: true,
  },
];

export function getDealForProduct(productId: string): Deal | undefined {
  return deals.find((d) => d.productId === productId);
}

export function getLightningDeals(): Deal[] {
  return deals.filter((d) => d.isLightningDeal);
}
