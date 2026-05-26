"use client";
import { useSite } from "./SiteContext";
import { t } from "@/lib/i18n";

export default function HowItWorks() {
  const { language } = useSite();
  const steps = [
    { num: 1, t: "how.step1.title", d: "how.step1.desc" },
    { num: 2, t: "how.step2.title", d: "how.step2.desc" },
    { num: 3, t: "how.step3.title", d: "how.step3.desc" },
  ];
  return (
    <section className="border-t border-b border-line bg-sand py-16">
      <div className="container-wide">
        <h2 className="text-center font-serif text-3xl font-semibold text-navy">{t(language, "how.heading")}</h2>
        <div className="mt-9 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.num} className="rounded-lg border border-line bg-white p-6">
              <span className="mb-3.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy font-serif font-bold text-cream">
                {s.num}
              </span>
              <h3 className="font-serif text-lg font-semibold text-navy">{t(language, s.t)}</h3>
              <p className="mt-1 text-sm text-ink-soft">{t(language, s.d)}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-sm text-ink-soft">{t(language, "how.footnote")}</p>
      </div>
    </section>
  );
}
