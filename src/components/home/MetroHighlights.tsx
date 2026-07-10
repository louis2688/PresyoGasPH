import type { MetroSnapshot } from "@/lib/types";

interface Props {
  snapshot: MetroSnapshot;
}

export function MetroHighlights({ snapshot }: Props) {
  return (
    <section className="border-b border-slate-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Metro Manila fuel snapshot
        </h2>
        <p className="mt-2 text-slate-600">As of {snapshot.updatedLabel}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-emerald-900">
              Cheapest diesel
            </p>
            <p className="mt-3 text-3xl font-bold tabular-nums text-slate-900">
              ₱{snapshot.cheapestDiesel.price.toFixed(2)}
              <span className="text-base font-semibold text-slate-600">
                /L · {snapshot.cheapestDiesel.brand}
              </span>
            </p>
            <p className="mt-3 text-sm text-slate-600">
              About ₱
              {(snapshot.avgDiesel - snapshot.cheapestDiesel.price).toFixed(2)}
              /L below the current metro average of ₱{snapshot.avgDiesel.toFixed(2)}
              .
            </p>
          </div>

          <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-sky-900">
              Cheapest unleaded
            </p>
            <p className="mt-3 text-3xl font-bold tabular-nums text-slate-900">
              ₱{snapshot.cheapestUnleaded.price.toFixed(2)}
              <span className="text-base font-semibold text-slate-600">
                /L · {snapshot.cheapestUnleaded.brand}
              </span>
            </p>
            <p className="mt-3 text-sm text-slate-600">
              About ₱
              {(snapshot.avgUnleaded - snapshot.cheapestUnleaded.price).toFixed(2)}
              /L below the current metro average of ₱
              {snapshot.avgUnleaded.toFixed(2)}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
