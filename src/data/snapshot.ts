import type { MetroSnapshot, WeeklyBand } from "@/lib/types";

export const metroSnapshot: MetroSnapshot = {
  weekLabel: "Apr 22 – 28, 2026",
  updatedLabel: "April 28, 2026",
  avgDiesel: 101.78,
  avgUnleaded: 87.24,
  stationCount: 964,
  cityCount: 17,
  cheapestDiesel: { brand: "Cleanfuel", price: 100.0 },
  cheapestUnleaded: { brand: "Seaoil", price: 84.32 },
};

/** Example same-week low / high pump range (₱/L) — swap for live DOE bands */
export const weeklyBands: WeeklyBand[] = [
  { fuel: "Diesel", low: 100.0, high: 108.53 },
  { fuel: "Unleaded 91", low: 84.32, high: 92.51 },
  { fuel: "Kerosene", low: 72.4, high: 77.4 },
];
