"use client";

import { useMemo, useState } from "react";
import type { FuelColumn, GasStation } from "@/lib/types";

interface Props {
  stations: GasStation[];
}

const fuels: { key: FuelColumn; label: string }[] = [
  { key: "diesel", label: "Diesel" },
  { key: "unleaded91", label: "Unleaded 91" },
  { key: "prem95", label: "Premium 95" },
];

export function ReportPriceSection({ stations }: Props) {
  const [stationId, setStationId] = useState(stations[0]?.id ?? "");
  const [fuel, setFuel] = useState<FuelColumn>("diesel");
  const [price, setPrice] = useState("");
  const [done, setDone] = useState(false);

  const station = useMemo(
    () => stations.find((s) => s.id === stationId),
    [stations, stationId],
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <section id="report" className="border-b border-slate-100 bg-emerald-950 text-emerald-50">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Report a pump price
            </h2>
            <p className="mt-4 text-emerald-100/90">
              Anonymous submissions keep neighbors informed between advisories.
              This scaffold validates locally—hook up persistence when your API
              is ready.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-700/60 bg-emerald-900/40 p-6 shadow-lg backdrop-blur">
            {done ? (
              <div className="space-y-3">
                <p className="font-semibold text-white">
                  Price captured — thank you!
                </p>
                <p className="text-sm text-emerald-100/90">
                  Station {station?.name} · {fuel} · ₱{price}/L (demo only).
                </p>
                <button
                  type="button"
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-900"
                  onClick={() => setDone(false)}
                >
                  Report another
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={submit}>
                <div>
                  <label className="text-xs font-semibold text-emerald-100">
                    Station
                  </label>
                  <select
                    value={stationId}
                    onChange={(e) => setStationId(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-emerald-700/60 bg-emerald-950/40 px-3 py-2 text-sm text-white outline-none focus:ring-4 focus:ring-emerald-400/25"
                  >
                    {stations.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.brand} · {s.name} · {s.area}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-emerald-100">
                    Fuel
                  </label>
                  <select
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value as FuelColumn)}
                    className="mt-1 w-full rounded-xl border border-emerald-700/60 bg-emerald-950/40 px-3 py-2 text-sm text-white outline-none focus:ring-4 focus:ring-emerald-400/25"
                  >
                    {fuels.map((f) => (
                      <option key={f.key} value={f.key}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-emerald-100">
                    Price (₱ / L)
                  </label>
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    inputMode="decimal"
                    placeholder="e.g. 101.40"
                    required
                    className="mt-1 w-full rounded-xl border border-emerald-700/60 bg-emerald-950/40 px-3 py-2 text-sm text-white outline-none placeholder:text-emerald-300/60 focus:ring-4 focus:ring-emerald-400/25"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-white py-2.5 text-sm font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-50"
                >
                  Submit price
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
