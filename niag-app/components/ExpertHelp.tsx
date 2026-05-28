"use client";
import { useSite } from "./SiteContext";
import { useQuoteFlow } from "./QuoteFlowProvider";
import { t } from "@/lib/i18n";

const CHECK = (
  <svg viewBox="0 0 20 20" width="20" height="20" fill="none" className="shrink-0">
    <circle cx="10" cy="10" r="10" fill="#22C55E" opacity=".12" />
    <path d="M6.5 10.5 8.75 12.75 13.5 7.5" stroke="#22C55E" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ExpertHelp() {
  const { language, defaultProduct } = useSite();
  const { open } = useQuoteFlow();
  const bullets = [
    t(language, "twocol.bullet1"),
    t(language, "twocol.bullet2"),
    t(language, "twocol.bullet3"),
  ];
  return (
    <section className="py-16">
      <div className="container-wide">
        <div className="mx-auto max-w-[720px] overflow-hidden rounded-2xl bg-navy text-center" style={{ boxShadow: "0 20px 48px rgba(10,31,68,.18)" }}>
          <div style={{ padding: "48px 32px 40px" }}>
            <h2 className="font-serif text-3xl font-semibold text-white md:text-4xl">
              {t(language, "twocol.heading")}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base" style={{ color: "rgba(250,247,242,.75)" }}>
              {t(language, "twocol.sub")}
            </p>
            <ul className="mx-auto mt-6 flex flex-col items-center gap-2.5 sm:flex-row sm:justify-center sm:gap-5">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm font-medium text-cream">
                  {CHECK} {b}
                </li>
              ))}
            </ul>
            <button
              onClick={() => open(defaultProduct, "mid_cta")}
              className="btn-primary btn-lg mt-8"
              style={{ fontSize: 17, minWidth: 240 }}
            >
              {t(language, "twocol.cta")}
            </button>
            <p className="mt-3 text-xs" style={{ color: "rgba(250,247,242,.5)" }}>
              {t(language, "twocol.footnote")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
