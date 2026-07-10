import type { LpgTier } from "@/lib/types";

/** Illustrative LPG tank pricing — replace with dealer-linked data later */
export const lpgTiers: LpgTier[] = [
  {
    kg: 11,
    brands: [
      { brand: "Gasul", pricePhp: 795 },
      { brand: "Solane", pricePhp: 788 },
      { brand: "Petron Gasul", pricePhp: 805 },
      { brand: "Superkalan", pricePhp: 792 },
    ],
  },
  {
    kg: 22,
    brands: [
      { brand: "Gasul", pricePhp: 1495 },
      { brand: "Solane", pricePhp: 1482 },
      { brand: "Petron Gasul", pricePhp: 1512 },
      { brand: "Superkalan", pricePhp: 1490 },
    ],
  },
  {
    kg: 50,
    brands: [
      { brand: "Gasul", pricePhp: 3295 },
      { brand: "Solane", pricePhp: 3268 },
      { brand: "Petron Gasul", pricePhp: 3325 },
      { brand: "Superkalan", pricePhp: 3288 },
    ],
  },
];
