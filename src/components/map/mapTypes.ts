import type { PriceTier } from "@/lib/mapPins";

export interface MapMarkerModel {
  id: string;
  lat: number;
  lng: number;
  tier: PriceTier;
  label: string;
}
