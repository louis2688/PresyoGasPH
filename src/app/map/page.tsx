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
    <main className="bg-white">
      <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
              Explorer
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Fuel price map
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Pins react to your filters and highlight relative savings for the
              fuel column you choose.
              {area ? (
                <>
                  {" "}
                  Showing stations near{" "}
                  <span className="font-semibold text-slate-900">{area}</span> —
                  adjust the area dropdown anytime.
                </>
              ) : null}
            </p>
          </div>
          <Link
            href="/#comparison"
            className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:border-emerald-200 hover:bg-emerald-50"
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
