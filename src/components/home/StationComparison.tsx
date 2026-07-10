"use client";

import { useMemo, useState } from "react";
import type { FuelColumn, GasStation } from "@/lib/types";
import { formatPricePerLiter } from "@/lib/format";
import { ArrowDownUp } from "lucide-react";

interface Props {
  stations: GasStation[];
}

const columns: { key: FuelColumn; label: string }[] = [
  { key: "diesel", label: "Diesel" },
  { key: "premDiesel", label: "Prem Diesel" },
  { key: "unleaded91", label: "Unleaded 91" },
  { key: "egas", label: "E-Gas" },
  { key: "prem95", label: "Prem 95" },
  { key: "prem97", label: "Prem 97" },
  { key: "kerosene", label: "Kerosene" },
];

export function StationComparison({ stations }: Props) {
  const [sortKey, setSortKey] = useState<FuelColumn>("diesel");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");

  const sorted = useMemo(() => {
    const dir = direction === "asc" ? 1 : -1;
    return [...stations].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null && bv == null) return a.name.localeCompare(b.name);
      if (av == null) return 1;
      if (bv == null) return -1;
      if (av === bv) return a.name.localeCompare(b.name);
      return (av - bv) * dir;
    });
  }, [stations, sortKey, direction]);

  function toggleSort(key: FuelColumn) {
    if (sortKey === key) {
      setDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setDirection("asc");
    }
  }

  return (
    <section id="comparison" className="border-b border-slate-100 bg-slate-50/40 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Price comparison
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              All prices in PHP per liter. Tap a column header to sort.
            </p>
          </div>
          <p className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <ArrowDownUp className="size-4" aria-hidden />
            Sort by diesel, unleaded, brand area, and more.
          </p>
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Station</th>
                {columns.map((c) => (
                  <th key={c.key} className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => toggleSort(c.key)}
                      className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 font-semibold text-slate-600 hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                    >
                      {c.label}
                      {sortKey === c.key ? (
                        <span className="text-emerald-700 dark:text-emerald-400" aria-hidden>
                          {direction === "asc" ? "↑" : "↓"}
                        </span>
                      ) : null}
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3">Area</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {sorted.map((row) => (
                <tr key={row.id} className="hover:bg-emerald-50/40 dark:hover:bg-emerald-950/30">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                    {row.brand}
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{row.name}</td>
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className="px-4 py-3 text-right tabular-nums text-slate-800 dark:text-slate-300"
                    >
                      {formatPricePerLiter(row[c.key])}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{row.area}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
