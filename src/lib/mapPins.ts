export type PriceTier = "good" | "mid" | "high" | "muted";

export const TIER_HEX: Record<PriceTier, string> = {
  good: "#10b981",
  mid: "#fbbf24",
  high: "#f43f5e",
  muted: "#94a3b8",
};

export function tierForPrice(
  price: number | null,
  min: number,
  max: number,
): PriceTier {
  if (price == null) return "muted";
  if (max === min) return "good";
  const t = (price - min) / (max - min);
  if (t <= 0.33) return "good";
  if (t <= 0.66) return "mid";
  return "high";
}
