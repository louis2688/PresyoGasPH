import Link from "next/link";
import { Fuel } from "lucide-react";

const links = [
  { href: "/#comparison", label: "Prices" },
  { href: "/map", label: "Map" },
  { href: "/gasul", label: "Gasul / LPG" },
  { href: "/history", label: "History" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-slate-900"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/25">
            <Fuel className="size-5" aria-hidden />
          </span>
          <span className="leading-tight">
            PresyoGas<span className="text-emerald-700"> PH</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/#report"
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-700/30 transition hover:bg-emerald-700"
          >
            Report price
          </Link>
        </div>
      </div>

      <nav
        className="flex border-t border-slate-100 px-2 pb-2 pt-1 md:hidden"
        aria-label="Mobile sections"
      >
        <div className="flex w-full gap-1 overflow-x-auto [-webkit-overflow-scrolling:touch] pb-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium text-slate-600 ring-1 ring-slate-200/80"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
