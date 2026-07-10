import Link from "next/link";
import { metroCities } from "@/data/cities";

export function CityBrowse() {
  return (
    <section className="border-b border-slate-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Browse by city
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Jump to the map filtered by area—handy when you already know where
          you are driving today.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {metroCities.map((c) => (
            <Link
              key={c.name}
              href={`/map?area=${encodeURIComponent(c.name)}`}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-900"
            >
              {c.name}
              <span className="ml-1.5 text-xs text-slate-500">
                {c.stations}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
