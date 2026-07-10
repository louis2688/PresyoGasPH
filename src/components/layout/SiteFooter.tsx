import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            PresyoGas PH
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Community-backed retail fuel comparison for Filipino drivers—no app,
            no paywall. Data is illustrative in this scaffold; plug in DOE feeds
            and your own station list.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/map"
                className="text-slate-700 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
              >
                Fuel map
              </Link>
            </li>
            <li>
              <Link
                href="/gasul"
                className="text-slate-700 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
              >
                Gasul / LPG
              </Link>
            </li>
            <li>
              <Link
                href="/history"
                className="text-slate-700 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
              >
                Price history
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Disclaimer
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Pump prices move with promos and timing. Verify the display at the
            station. Not affiliated with the Department of Energy.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-200/80 py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500">
        © {new Date().getFullYear()} PresyoGas PH · Built by Louis Madrigal
      </div>
    </footer>
  );
}
