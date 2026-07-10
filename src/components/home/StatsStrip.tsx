import type { MetroSnapshot } from "@/lib/types";

interface Props {
  snapshot: MetroSnapshot;
}

export function StatsStrip({ snapshot }: Props) {
  const tiles = [
    {
      label: "Avg. diesel",
      value: `₱${snapshot.avgDiesel.toFixed(2)}`,
      sub: "Metro Manila · ₱/L",
    },
    {
      label: "Avg. unleaded",
      value: `₱${snapshot.avgUnleaded.toFixed(2)}`,
      sub: "Metro Manila · ₱/L",
    },
    {
      label: "Stations tracked",
      value: snapshot.stationCount.toLocaleString("en-PH"),
      sub: "Across monitored cities",
    },
    {
      label: "Metro cities",
      value: String(snapshot.cityCount),
      sub: "Coverage snapshot",
    },
  ];

  return (
    <section className="border-b border-slate-100 bg-white">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <div
            key={t.label}
            className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 shadow-sm shadow-slate-200/40"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t.label}
            </p>
            <p className="mt-2 text-3xl font-bold tabular-nums text-slate-900">
              {t.value}
            </p>
            <p className="mt-1 text-sm text-slate-600">{t.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
