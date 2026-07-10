import Link from "next/link";
import { Flame } from "lucide-react";

export function GasulTeaser() {
  return (
    <section className="border-b border-slate-100 bg-gradient-to-r from-amber-50 via-white to-sky-50 dark:border-slate-800 dark:from-amber-950/40 dark:via-slate-950 dark:to-sky-950/40">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <span className="mt-1 flex size-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400">
            <Flame className="size-6" aria-hidden />
          </span>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Gasul / LPG at home
            </h2>
            <p className="mt-2 max-w-xl text-slate-600 dark:text-slate-300">
              Compare tank sizes and distributor estimates before you head to the
              depot—mirroring the LPG module on reference trackers.
            </p>
          </div>
        </div>
        <Link
          href="/gasul"
          className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:shadow-slate-100/10 dark:hover:bg-slate-200"
        >
          View LPG prices
        </Link>
      </div>
    </section>
  );
}
