import type { Metadata } from "next";
import Link from "next/link";
import { lpgTiers } from "@/data/lpg";

export const metadata: Metadata = {
  title: "Gasul / LPG · PresyoGas PH",
  description:
    "Compare illustrative tank pricing across major LPG brands—swap with distributor feeds later.",
};

export default function GasulPage() {
  return (
    <main className="bg-white dark:bg-slate-950">
      <section className="border-b border-slate-100 bg-gradient-to-b from-sky-50 to-white dark:border-slate-800 dark:from-sky-950/40 dark:to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-900 dark:text-sky-400">
            Household fuel
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Gasul / LPG pricing
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
            Tank estimates help households compare major distributors before
            heading to the depot—numbers here are placeholders similar to public
            trackers like{" "}
            <a
              href="https://gaswatchph.com/"
              className="font-semibold text-emerald-800 underline-offset-4 hover:underline dark:text-emerald-400"
              target="_blank"
              rel="noreferrer"
            >
              GasWatch PH
            </a>
            .
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-600/30 hover:bg-emerald-700"
          >
            ← Fuel station prices
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-3">
          {lpgTiers.map((tier) => (
            <div
              key={tier.kg}
              className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {tier.kg} kg
                </h2>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  PHP per tank
                </span>
              </div>
              <ul className="mt-6 space-y-4">
                {tier.brands
                  .slice()
                  .sort((a, b) => a.pricePhp - b.pricePhp)
                  .map((row) => (
                    <li
                      key={row.brand}
                      className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 ring-1 ring-slate-100 dark:bg-slate-950 dark:ring-slate-800"
                    >
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {row.brand}
                      </span>
                      <span className="font-bold tabular-nums text-emerald-800 dark:text-emerald-400">
                        ₱{row.pricePhp.toLocaleString("en-PH")}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
          * Illustrative values for UX scaffolding. Actual retail SRP varies by
          distributor promotions—confirm with your dealer before pickup.
        </p>
      </section>
    </main>
  );
}
