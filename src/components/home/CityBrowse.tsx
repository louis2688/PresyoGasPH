import Link from "next/link";
import { metroCities } from "@/data/cities";

export function CityBrowse() {
  return (
    <section className="border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Browse by city
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
          Jump to the map filtered by area—handy when you already know where
          you are driving today.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {metroCities.map((c) => (
            <Link
              key={c.name}
              href={`/map?area=${encodeURIComponent(c.name)}`}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-900 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/60 dark:hover:text-emerald-400"
            >
              {c.name}
              <span className="ml-1.5 text-xs text-slate-500 dark:text-slate-400">
                {c.stations}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
