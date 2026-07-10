"use client";

import Link from "next/link";
import {
  ExternalLink,
  MapPin,
  Navigation,
  Pencil,
  X,
  AlertTriangle,
} from "lucide-react";
import type { FuelColumn, GasStation } from "@/lib/types";
import { stationDisplayNumber } from "@/lib/stationLabel";

const FUEL_ROWS: { key: FuelColumn; label: string }[] = [
  { key: "diesel", label: "Diesel" },
  { key: "premDiesel", label: "Premium Diesel" },
  { key: "unleaded91", label: "Unleaded 91" },
  { key: "prem95", label: "Premium 95" },
  { key: "prem97", label: "Premium 97 / 98 / 100" },
  { key: "kerosene", label: "Kerosene" },
  { key: "egas", label: "E-Gasoline" },
];

interface Props {
  station: GasStation | null;
  open: boolean;
  onClose: () => void;
}

export function StationDetailSheet({ station, open, onClose }: Props) {
  if (!open || !station) return null;

  const googleUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${station.lat},${station.lng}&navigate=yes`;

  return (
    <>
      <button
        type="button"
        aria-label="Close station details"
        className="fixed inset-0 z-[2500] bg-black/55 backdrop-blur-[2px] md:bg-black/45"
        onClick={onClose}
      />

      <div className="fixed inset-x-0 bottom-0 z-[2600] flex max-h-[90vh] flex-col rounded-t-3xl bg-[#0c1629] text-slate-100 shadow-[0_-12px_48px_rgba(0,0,0,.45)] md:inset-auto md:left-1/2 md:top-1/2 md:h-auto md:max-h-[85vh] md:w-full md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl">
        <div className="flex shrink-0 flex-col items-center border-b border-white/10 px-4 pb-3 pt-2 md:rounded-t-3xl">
          <span className="mb-3 h-1 w-10 rounded-full bg-white/20 md:hidden" />
          <div className="flex w-full items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                <span className="size-2 rounded-full bg-sky-500" aria-hidden />
                {station.brand}
              </p>
              <h2 className="mt-1 text-xl font-bold leading-snug text-white md:text-2xl">
                {station.name}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                {station.area}{" "}
                <span className="text-slate-500">
                  · #{stationDisplayNumber(station.id)}
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="mt-4 grid w-full grid-cols-2 gap-3">
            <Link
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500"
            >
              <MapPin className="size-4 shrink-0" aria-hidden />
              Google Maps
              <ExternalLink className="size-3.5 opacity-70" aria-hidden />
            </Link>
            <Link
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-900/30 transition hover:bg-cyan-400"
            >
              <Navigation className="size-4 shrink-0" aria-hidden />
              Waze
              <ExternalLink className="size-3.5 opacity-70" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Current prices
          </p>

          <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
            <p className="flex items-start gap-2 leading-snug">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-400/90" />
              Visited this station? Help drivers nearby — flag wrong prices or
              stock when you wire forms to your API.
            </p>
          </div>

          <ul className="mt-6 space-y-3">
            {FUEL_ROWS.map((row) => (
              <FuelRowDisplay key={row.key} station={station} row={row} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function FuelRowDisplay({
  station,
  row,
}: {
  station: GasStation;
  row: { key: FuelColumn; label: string };
}) {
  const price = station[row.key];

  return (
    <li className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <div className="min-w-[120px] flex-1">
        <p className="font-semibold text-white">{row.label}</p>
        <p className="text-xs text-slate-500">Posted price</p>
      </div>
      <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
        {price != null ? (
          <span className="text-lg font-bold tabular-nums text-emerald-400">
            ₱{price.toFixed(2)}
          </span>
        ) : (
          <span className="text-sm font-semibold text-slate-500">N/A</span>
        )}
        {price != null ? (
          <>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-lg border border-white/15 px-2.5 py-1 text-[11px] font-semibold text-slate-200 hover:bg-white/10"
            >
              <Pencil className="size-3.5" aria-hidden />
              Update
            </button>
            <button
              type="button"
              className="text-[11px] font-semibold text-slate-400 underline-offset-2 hover:text-white hover:underline"
            >
              No stock
            </button>
          </>
        ) : null}
      </div>
    </li>
  );
}
