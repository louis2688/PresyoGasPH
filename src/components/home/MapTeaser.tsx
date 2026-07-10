import Link from "next/link";
import { MapPin, Layers, Crosshair } from "lucide-react";

export function MapTeaser() {
  return (
    <section className="border-b border-slate-100 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Fuel price map
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Explore stations on a lightweight map canvas. Pins are positioned
            from lat/lng and color-coded against the cheapest price in view for
            the fuel you pick.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="mt-0.5 text-emerald-700 dark:text-emerald-400">
                <MapPin className="size-5" aria-hidden />
              </span>
              <span>
                <strong className="text-slate-900 dark:text-slate-100">Pin colors</strong> — best
                deal (green), average (amber), higher than peers (rose).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 text-emerald-700 dark:text-emerald-400">
                <Layers className="size-5" aria-hidden />
              </span>
              <span>
                <strong className="text-slate-900 dark:text-slate-100">Filters</strong> — fuel
                column, brand, and city so the map stays focused.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 text-emerald-700 dark:text-emerald-400">
                <Crosshair className="size-5" aria-hidden />
              </span>
              <span>
                <strong className="text-slate-900 dark:text-slate-100">No API keys</strong> in this
                scaffold—swap the canvas for Google or Mapbox when you wire
                production tiles.
              </span>
            </li>
          </ul>
          <Link
            href="/map"
            className="mt-8 inline-flex rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-600/30 transition hover:bg-emerald-700"
          >
            Open the map
          </Link>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-100 to-emerald-50 shadow-inner dark:border-slate-800 dark:from-slate-900 dark:to-emerald-950/40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.15),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.12),transparent_40%)]" />
          <div className="absolute left-8 top-10 size-4 rounded-full bg-emerald-500 shadow-lg ring-4 ring-white dark:ring-slate-800" />
          <div className="absolute right-16 top-24 size-3 rounded-full bg-amber-400 shadow ring-4 ring-white dark:ring-slate-800" />
          <div className="absolute bottom-16 left-1/3 size-3 rounded-full bg-rose-500 shadow ring-4 ring-white dark:ring-slate-800" />
          <div className="absolute bottom-10 right-10 size-4 rounded-full bg-emerald-600 shadow-lg ring-4 ring-white dark:ring-slate-800" />
          <p className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 p-3 text-xs text-slate-600 shadow-sm ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/90 dark:text-slate-300 dark:ring-slate-700">
            Schematic preview—real coordinates drive the live map route.
          </p>
        </div>
      </div>
    </section>
  );
}
