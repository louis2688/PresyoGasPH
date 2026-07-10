import type { FuelColumn, GasStation } from "@/lib/types";

/** Three-letter codes aligned with reference UI (PTR, SHL, …) */
const BRAND_CODES: Record<string, string> = {
  Petron: "PTR",
  Shell: "SHL",
  Caltex: "CAL",
  "Flying V": "FLV",
  Seaoil: "SEA",
  Unioil: "UNI",
  Phoenix: "PHX",
  Total: "TTL",
  Cleanfuel: "CLN",
  Jetti: "JTT",
  PTT: "PTT",
};

function abbrevBrand(brand: string): string {
  const letters = brand.replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase();
  return letters.padEnd(3, "·").slice(0, 3);
}

export function brandAbbrev(brand: string): string {
  return BRAND_CODES[brand] ?? abbrevBrand(brand);
}

/** Stable pseudo-ID for UI (#692-style) */
export function stationDisplayNumber(id: string): string {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return String(Math.abs(h % 9000) + 100);
}

export function stationMapLabel(station: GasStation, fuel: FuelColumn): string {
  const code = brandAbbrev(station.brand);
  const p = station[fuel];
  const num = p != null ? Math.round(p) : "—";
  return `${code} ${num}`;
}
