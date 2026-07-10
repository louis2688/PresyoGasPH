import type { Metadata } from "next";
import Link from "next/link";
import { weeklyHistory } from "@/data/history";

export const metadata: Metadata = {
  title: "Price history · PresyoGas PH",
  description:
    "Rolling Metro Manila averages for diesel and unleaded—swap with live analytics feeds.",
};

export default function HistoryPage() {
  const rows = [...weeklyHistory].reverse(); // oldest → newest for chart feel
  const maxFuel = Math.max(
    ...rows.map((r) => Math.max(r.dieselMetroAvg, r.unleadedMetroAvg)),
  );

  return (
    <main className="bg-white dark:bg-slate-950">
      <section className="border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white dark:border-slate-800 dark:from-indigo-950/40 dark:to-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-900 dark:text-indigo-400">
              Trends
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Price history
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              Metro Manila weighted averages across four illustrative weeks—ideal
              placeholder for charts fed by your advisory ingestion pipeline.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-700"
          >
            ← Current prices
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm dark:border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-400">
              <tr>
                <th className="px-6 py-4">Week</th>
                <th className="px-6 py-4 text-right">Diesel · Metro avg</th>
                <th className="px-6 py-4 text-right">Unleaded · Metro avg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {weeklyHistory.map((row) => (
                <tr key={row.week}>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">
                    {row.week}
                  </td>
                  <td className="px-6 py-4 text-right tabular-nums text-slate-800 dark:text-slate-300">
                    ₱{row.dieselMetroAvg.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right tabular-nums text-slate-800 dark:text-slate-300">
                    ₱{row.unleadedMetroAvg.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900/60">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Relative movement (demo bars)
          </p>
          <div className="mt-6 space-y-6">
            {rows.map((row) => (
              <div key={`viz-${row.week}`}>
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <span>{row.week}</span>
                  <span className="tabular-nums text-slate-500 dark:text-slate-400">
                    Diesel ₱{row.dieselMetroAvg.toFixed(2)} · Unleaded ₱
                    {row.unleadedMetroAvg.toFixed(2)}
                  </span>
                </div>
                <div className="mt-2 flex gap-3">
                  <div className="flex-1">
                    <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className="h-3 rounded-full bg-emerald-500"
                        style={{
                          width: `${(row.dieselMetroAvg / maxFuel) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className="h-3 rounded-full bg-sky-500"
                        style={{
                          width: `${(row.unleadedMetroAvg / maxFuel) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
