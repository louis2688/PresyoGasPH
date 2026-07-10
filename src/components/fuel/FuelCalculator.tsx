"use client";

import { useMemo, useState } from "react";
import type { BrandAggregate } from "@/lib/types";
import Link from "next/link";

interface Props {
  brands: BrandAggregate[];
  metroDieselAvg: number;
  metroUnleadedAvg: number;
}

type Mode = "diesel" | "unleaded91";

const presets = [10, 20, 30, 40] as const;

export function FuelCalculator({
  brands,
  metroDieselAvg,
  metroUnleadedAvg,
}: Props) {
  const [mode, setMode] = useState<Mode>("diesel");
  const [brand, setBrand] = useState(brands[0]?.brand ?? "Cleanfuel");
  const [liters, setLiters] = useState(20);

  const price = useMemo(() => {
    const row = brands.find((b) => b.brand === brand);
    if (!row) return metroDieselAvg;
    const p = mode === "diesel" ? row.diesel : row.unleaded91;
    return p ?? (mode === "diesel" ? metroDieselAvg : metroUnleadedAvg);
  }, [brand, brands, mode, metroDieselAvg, metroUnleadedAvg]);

  const total = price * liters;

  return (
    <section id="calculator" className="border-b border-slate-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Fuel cost calculator
            </h2>
            <p className="mt-3 text-slate-600">
              Estimate a fill-up using brand averages from the overview table,
              then compare with the metro mean to see how much you would pay
              for a typical trip.
            </p>
            <Link
              href="/map"
              className="mt-6 inline-flex text-sm font-semibold text-emerald-800 underline-offset-4 hover:underline"
            >
              See cheapest station on the map →
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold text-slate-700">
                Fuel type
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as Mode)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-emerald-600/15"
                >
                  <option value="diesel">Diesel</option>
                  <option value="unleaded91">Unleaded 91</option>
                </select>
              </label>
              <label className="text-xs font-semibold text-slate-700">
                Brand
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-emerald-600/15"
                >
                  {brands.map((b) => (
                    <option key={b.brand} value={b.brand}>
                      {b.brand}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-4">
              <label className="text-xs font-semibold text-slate-700">
                Liters to fill
              </label>
              <input
                type="number"
                min={1}
                step={1}
                value={liters}
                onChange={(e) => setLiters(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm tabular-nums outline-none focus:ring-4 focus:ring-emerald-600/15"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-emerald-50 hover:ring-emerald-200"
                    onClick={() => setLiters(p)}
                  >
                    {p}L
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-white p-4 ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Estimated total
              </p>
              <p className="mt-2 text-4xl font-bold tabular-nums text-slate-900">
                ₱{total.toFixed(2)}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Using ₱{price.toFixed(2)}/L ·{" "}
                {mode === "diesel" ? "Metro avg diesel" : "Metro avg unleaded"}{" "}
                is ₱
                {(mode === "diesel" ? metroDieselAvg : metroUnleadedAvg).toFixed(2)}
                /L.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
