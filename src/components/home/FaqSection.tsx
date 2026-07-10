import { faqItems } from "@/data/faq";

export function FaqSection() {
  return (
    <section id="faq" className="border-b border-slate-100 bg-slate-50/50">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Frequently asked questions
        </h2>
        <div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-2 shadow-sm">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="group px-4 py-4 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="cursor-pointer list-none text-left font-semibold text-slate-900">
                <span className="flex items-start justify-between gap-4">
                  <span>{item.q}</span>
                  <span className="mt-0.5 shrink-0 text-slate-400 transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
