import type { BrandAggregate } from "@/lib/types";
import { formatPricePerLiter } from "@/lib/format";

interface Props {
  brands: BrandAggregate[];
}

export function BrandOverview({ brands }: Props) {
  return (
    <section id="brands" className="border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Brand overview
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Average price per brand (₱/L) · Sortable station table below.
        </p>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm dark:border-slate-800">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3 text-right">Stations</th>
                <th className="px-4 py-3 text-right">Diesel</th>
                <th className="px-4 py-3 text-right">Prem Diesel</th>
                <th className="px-4 py-3 text-right">Unleaded 91</th>
                <th className="px-4 py-3 text-right">E-Gas</th>
                <th className="px-4 py-3 text-right">Prem 95</th>
                <th className="px-4 py-3 text-right">Prem 97</th>
                <th className="px-4 py-3 text-right">Kerosene</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {brands.map((b) => (
                <tr key={b.brand} className="hover:bg-emerald-50/40 dark:hover:bg-emerald-950/30">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                    {b.brand}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-700 dark:text-slate-300">
                    {b.stations}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatPricePerLiter(b.diesel)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatPricePerLiter(b.premDiesel)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatPricePerLiter(b.unleaded91)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatPricePerLiter(b.egas)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatPricePerLiter(b.prem95)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatPricePerLiter(b.prem97)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatPricePerLiter(b.kerosene)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-500 md:hidden dark:text-slate-400">
          Swipe sideways on mobile to see every fuel column.
        </p>
      </div>
    </section>
  );
}
