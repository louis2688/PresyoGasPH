import type { WeeklyBand } from "@/lib/types";

interface Props {
  bands: WeeklyBand[];
  weekLabel: string;
}

export function WeeklyBands({ bands, weekLabel }: Props) {
  return (
    <section className="border-b border-slate-100 bg-slate-50/50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Week of price spread
            </h2>
            <p className="mt-2 text-slate-600">
              Example same-week pump range (₱/L) · {weekLabel}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {bands.map((b) => (
            <div
              key={b.fuel}
              className="rounded-2xl border border-white bg-white p-5 shadow-sm shadow-slate-200/50"
            >
              <p className="text-sm font-semibold text-slate-900">{b.fuel}</p>
              <p className="mt-3 text-2xl font-bold tabular-nums text-emerald-800">
                ₱{b.low.toFixed(2)} – {b.high.toFixed(2)}
                <span className="text-sm font-medium text-slate-500"> /L</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
