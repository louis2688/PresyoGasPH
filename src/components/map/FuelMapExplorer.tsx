"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import type { GasStation, FuelColumn } from "@/lib/types";
import { tierForPrice } from "@/lib/mapPins";
import { stationMapLabel } from "@/lib/stationLabel";
import { AREA_JUMP } from "@/data/areaCenters";
import type { MapMarkerModel } from "./mapTypes";
import { StationDetailSheet } from "./StationDetailSheet";

const LeafletStationMap = dynamic(() => import("./LeafletStationMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[min(55vh,520px)] min-h-[380px] w-full items-center justify-center rounded-3xl border border-slate-200 bg-slate-100 text-sm text-slate-500">
      Loading map…
    </div>
  ),
});

interface Props {
  stations: GasStation[];
  initialArea?: string | null;
}

const fuelKeys: { key: FuelColumn; label: string }[] = [
  { key: "diesel", label: "Diesel" },
  { key: "premDiesel", label: "Prem. Diesel" },
  { key: "unleaded91", label: "Unleaded 91" },
  { key: "egas", label: "E-Gasoline" },
  { key: "prem95", label: "Premium 95" },
  { key: "prem97", label: "Premium 97" },
  { key: "kerosene", label: "Kerosene" },
];

export function FuelMapExplorer({ stations, initialArea }: Props) {
  const brands = useMemo(
    () => Array.from(new Set(stations.map((s) => s.brand))).sort(),
    [stations],
  );

  const [fuel, setFuel] = useState<FuelColumn>("diesel");
  const [brandFilter, setBrandFilter] = useState<string>("All brands");
  const [areaFilter, setAreaFilter] = useState(initialArea ?? "All areas");

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailStationId, setDetailStationId] = useState<string | null>(null);

  const handleStationClick = useCallback((id: string) => {
    setSelectedId(id);
    setDetailStationId(id);
  }, []);

  const filtered = useMemo(() => {
    return stations.filter((s) => {
      const okBrand =
        brandFilter === "All brands" ? true : s.brand === brandFilter;
      const okArea =
        areaFilter === "All areas" ? true : s.area === areaFilter;
      return okBrand && okArea;
    });
  }, [stations, brandFilter, areaFilter]);

  const prices = useMemo(
    () =>
      filtered
        .map((s) => s[fuel])
        .filter((v): v is number => typeof v === "number"),
    [filtered, fuel],
  );

  const minP = prices.length ? Math.min(...prices) : 0;
  const maxP = prices.length ? Math.max(...prices) : 0;

  const mapMarkers: MapMarkerModel[] = useMemo(
    () =>
      filtered.map((s) => ({
        id: s.id,
        lat: s.lat,
        lng: s.lng,
        tier: tierForPrice(s[fuel], minP, maxP),
        label: stationMapLabel(s, fuel),
      })),
    [filtered, fuel, minP, maxP],
  );

  const selected = filtered.find((s) => s.id === selectedId) ?? null;

  const detailStation = detailStationId
    ? (stations.find((s) => s.id === detailStationId) ?? null)
    : null;

  const areas = useMemo(() => {
    const names = Array.from(new Set(stations.map((s) => s.area))).sort();
    return names;
  }, [stations]);

  const jumpTargets = useMemo(() => {
    const names = Array.from(new Set(stations.map((s) => s.area))).sort();
    return names
      .filter((n): n is keyof typeof AREA_JUMP => n in AREA_JUMP)
      .map((n) => ({
        label: n,
        center: AREA_JUMP[n].center,
        zoom: AREA_JUMP[n].zoom,
      }));
  }, [stations]);

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <label className="text-xs font-semibold text-slate-700">
              Fuel type
              <select
                value={fuel}
                onChange={(e) => setFuel(e.target.value as FuelColumn)}
                className="mt-1 block rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-emerald-600/15"
              >
                {fuelKeys.map((f) => (
                  <option key={f.key} value={f.key}>
                    {f.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs font-semibold text-slate-700">
              Brand
              <select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="mt-1 block rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-emerald-600/15"
              >
                <option>All brands</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs font-semibold text-slate-700">
              Area
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="mt-1 block rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-emerald-600/15"
              >
                <option>All areas</option>
                {areas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-950">
              No stations match those filters—clear the brand filter or widen
              the area selection.
            </div>
          ) : null}

          <div className="relative isolate z-0 h-[min(55vh,520px)] min-h-[380px] w-full">
            <LeafletStationMap
              markers={mapMarkers}
              selectedId={selectedId}
              onStationClick={handleStationClick}
              jumpTargets={jumpTargets}
            />

            <div className="pointer-events-none absolute bottom-3 left-3 z-[700] flex flex-wrap gap-3 rounded-2xl bg-white/95 px-3 py-2 text-[11px] font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" /> Best
                deal
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-amber-400" /> Average
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-rose-500" /> Higher
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            © OpenStreetMap contributors · © CARTO · Clusters zoom on tap · Pill
            codes use the fuel column above (price rounded).
          </p>
        </div>

        <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Selected station
            </p>
            {selected ? (
              <div className="mt-2 space-y-2 text-sm">
                <p className="text-lg font-semibold text-slate-900">
                  {selected.brand}
                </p>
                <p className="text-slate-700">{selected.name}</p>
                <p className="text-slate-500">{selected.area}</p>
                <p className="text-2xl font-bold tabular-nums text-emerald-800">
                  {selected[fuel] != null
                    ? `₱${selected[fuel]!.toFixed(2)}/L`
                    : "Unavailable"}
                </p>
                <button
                  type="button"
                  className="mt-2 text-sm font-semibold text-emerald-800 underline-offset-2 hover:underline"
                  onClick={() => handleStationClick(selected.id)}
                >
                  Open full detail sheet →
                </button>
                <p className="text-xs text-slate-500">
                  Showing {fuelKeys.find((f) => f.key === fuel)?.label}. Range
                  in view ₱{minP.toFixed(2)} – ₱{maxP.toFixed(2)}.
                </p>
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-600">
                Tap a pill marker or cluster on the map—clusters zoom in to show
                more pins.
              </p>
            )}
          </div>

          <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
            <p className="font-semibold text-slate-900">Filters snapshot</p>
            <p className="mt-1">
              {filtered.length} stations visible · Labels show{" "}
              {fuelKeys.find((f) => f.key === fuel)?.label} tier vs metro peers.
            </p>
          </div>
        </aside>
      </div>

      <StationDetailSheet
        station={detailStation}
        open={detailStationId !== null && detailStation !== null}
        onClose={() => setDetailStationId(null)}
      />
    </>
  );
}
