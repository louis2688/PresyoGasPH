const steps = [
  {
    n: "01",
    title: "DOE publishes",
    body: "The Department of Energy issues weekly retail advisories—your official reference range for the week.",
  },
  {
    n: "02",
    title: "We normalize",
    body: "Structured entries for brands, areas, and product columns so tables, maps, and calculators stay aligned.",
  },
  {
    n: "03",
    title: "Drivers report",
    body: "Optional community pump prices capture what people pay between advisories—submitted anonymously.",
  },
  {
    n: "04",
    title: "You compare",
    body: "Use sortable tables, the map, and calculators to pick a station that fits your route and budget.",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          How we track prices
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
          A simple pipeline you can later back with cron jobs, admin tools, and
          verification—this UI is ready for the data you connect.
        </p>
        <ol className="mt-10 grid gap-6 md:grid-cols-2">
          {steps.map((s) => (
            <li
              key={s.n}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/60"
            >
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{s.n}</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                {s.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
