export function formatPeso(n: number, fractionDigits = 2) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(n);
}

export function formatPricePerLiter(n: number | null) {
  if (n == null) return "—";
  return `₱${n.toFixed(2)}`;
}
