import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <p className="font-semibold text-slate-900">PresyoGas PH</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600">
            Community-backed retail fuel comparison for Filipino drivers—no app,
            no paywall. Data is illustrative in this scaffold; plug in DOE feeds
            and your own station list.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/map"
                className="text-slate-700 hover:text-emerald-700"
              >
                Fuel map
              </Link>
            </li>
            <li>
              <Link
                href="/gasul"
                className="text-slate-700 hover:text-emerald-700"
              >
                Gasul / LPG
              </Link>
            </li>
            <li>
              <Link
                href="/history"
                className="text-slate-700 hover:text-emerald-700"
              >
                Price history
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Disclaimer
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Pump prices move with promos and timing. Verify the display at the
            station. Not affiliated with the Department of Energy.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-200/80 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} PresyoGas PH · Built with{" "}
        <a
          className="text-slate-700 underline-offset-2 hover:underline"
          href="https://nextjs.org"
          rel="noreferrer"
        >
          Next.js
        </a>
      </div>
    </footer>
  );
}
