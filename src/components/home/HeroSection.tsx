import Link from "next/link";
import { ArrowRight, MapPinned, Calculator } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-emerald-100 bg-gradient-to-b from-emerald-50/80 via-white to-white">
      <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 size-72 rounded-full bg-sky-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
        <p className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-200/80">
          Fuel price tracker
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Track fuel prices across{" "}
          <span className="text-emerald-700">Metro Manila</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-600">
          Compare pumps from major brands, browse by city, and see a map-style
          view of where deals cluster. Community reports help fill the gap
          between DOE advisories—just like{" "}
          <a
            href="https://gaswatchph.com/"
            className="font-medium text-emerald-800 underline-offset-4 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            GasWatch PH
          </a>
          .
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/#comparison"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700"
          >
            Compare prices
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/map"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/60"
          >
            <MapPinned className="size-4 text-emerald-700" aria-hidden />
            Open map view
          </Link>
          <Link
            href="/#calculator"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-emerald-900 underline-offset-4 hover:underline"
          >
            <Calculator className="size-4" aria-hidden />
            Fuel cost calculator
          </Link>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Works in your browser—no download.
        </p>
      </div>
    </section>
  );
}
