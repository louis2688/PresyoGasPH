import type { Metadata } from "next";
import Link from "next/link";
import { FuelMapExplorer } from "@/components/map/FuelMapExplorer";
import { stations } from "@/data/stations";

export const metadata: Metadata = {
  title: "Fuel price map · PresyoGas PH",
  description:
    "Explore demo stations on an interactive canvas with fuel and brand filters.",
};

type PageProps = {
  searchParams: Promise<{ area?: string }>;
};

export default async function MapPage({ searchParams }: PageProps) {
  const { area } = await searchParams;

  return (
    <main className="bg-white dark:bg-slate-950">
      <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white dark:border-slate-800 dark:from-emerald-950/40 dark:to-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-400">
              Explorer
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-slate-100">
              Fuel price map
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
              Pins react to your filters and highlight relative savings for the
              fuel column you choose.
              {area ? (
                <>
                  {" "}
                  Showing stations near{" "}
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{area}</span> —
                  adjust the area dropdown anytime.
                </>
              ) : null}
            </p>
          </div>
          <Link
            href="/#comparison"
            className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:border-emerald-200 hover:bg-emerald-50 dark:border-slate-800 dark:text-slate-200 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/60"
          >
            ← Back to tables
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <FuelMapExplorer
          key={area ?? "all"}
          stations={stations}
          initialArea={area ?? null}
        />
      </div>
    </main>
  );
}
