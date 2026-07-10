export const faqItems = [
  {
    q: "Where do PresyoGas PH prices come from?",
    a: "Prices combine DOE weekly retail advisories (released Tuesdays) with optional community pump reports so you see both official bands and what drivers actually paid.",
  },
  {
    q: "How often are prices updated?",
    a: "DOE advisory rows refresh weekly after each bulletin. Community prices can update anytime someone submits what they saw at the pump.",
  },
  {
    q: 'What does "community price" mean?',
    a: "It is a price submitted anonymously by a visitor—often closer to real pump pricing between official advisory cycles.",
  },
  {
    q: "Are these prices guaranteed at the pump?",
    a: "DOE figures are government advisories; stations may vary slightly by promo or timing. Always verify at the station display.",
  },
  {
    q: "How do I report a price?",
    a: 'Pick a station from the list or map and tap “Report price”, enter fuel type and pesos per liter, then submit—no account needed.',
  },
] as const;
