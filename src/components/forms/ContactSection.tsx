"use client";

import { useState } from "react";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Help us track prices
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Flag outdated rows, suggest missing stations, or leave feedback for
              the maintainers. This form is wired for UX only—connect an API
              route or email provider when you deploy.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            {sent ? (
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-400">
                Thanks—your message is captured client-side for this demo.
                Persist submissions with a server action next.
              </p>
            ) : (
              <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:ring-4 focus:ring-emerald-600/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Area
                  </label>
                  <input
                    name="area"
                    placeholder="City or barangay"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-emerald-600/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us what needs attention…"
                    className="mt-1 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-emerald-600/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  Send
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
