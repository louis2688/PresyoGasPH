export type FuelColumn =
  | "diesel"
  | "premDiesel"
  | "unleaded91"
  | "egas"
  | "prem95"
  | "prem97"
  | "kerosene";

export interface GasStation {
  id: string;
  brand: string;
  name: string;
  area: string;
  diesel: number | null;
  premDiesel: number | null;
  unleaded91: number | null;
  egas: number | null;
  prem95: number | null;
  prem97: number | null;
  kerosene: number | null;
  lat: number;
  lng: number;
}

export interface BrandAggregate {
  brand: string;
  stations: number;
  diesel: number | null;
  premDiesel: number | null;
  unleaded91: number | null;
  egas: number | null;
  prem95: number | null;
  prem97: number | null;
  kerosene: number | null;
}

export interface MetroSnapshot {
  weekLabel: string;
  updatedLabel: string;
  avgDiesel: number;
  avgUnleaded: number;
  stationCount: number;
  cityCount: number;
  cheapestDiesel: { brand: string; price: number };
  cheapestUnleaded: { brand: string; price: number };
}

export interface WeeklyBand {
  fuel: string;
  low: number;
  high: number;
}

export interface LpgTier {
  kg: 11 | 22 | 50;
  brands: { brand: string; pricePhp: number }[];
}

export interface PriceWeekPoint {
  week: string;
  dieselMetroAvg: number;
  unleadedMetroAvg: number;
}
