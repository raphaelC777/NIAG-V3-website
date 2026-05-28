"use client";
import { useSite } from "./SiteContext";
import { t } from "@/lib/i18n";
import { CheckIcon, LockIcon } from "./icons";

const QUOTES = [
  { carrier: "Progressive", initial: "P", price: "$47", color: "bg-navy" },
  { carrier: "GEICO", initial: "G", price: "$52", color: "bg-green" },
  { carrier: "Allstate", initial: "A", price: "$58", color: "bg-navy-600" },
  { carrier: "Nationwide", initial: "N", price: "$63", color: "bg-navy" },
  { carrier: "State Farm", initial: "SF", price: "$71", color: "bg-green" },
];

export default function HeroVisual() {
  const { language, geo } = useSite();

  const locationLabel =
    geo.city
      ? `${t(language, "geo.nearby")} ${geo.city}${geo.region ? `, ${geo.region}` : ""}`
      : t(language, "geo.zipMatch");

  return (
    <div className="relative mx-auto w-full max-w-[400px] lg:max-w-none">
      {/* Navy gradient container */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #0A1F44 0%, #1E3360 60%, #0A1F44 100%)",
          minHeight: 480,
          padding: "40px 20px 24px",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -right-12 -top-12 h-48 w-48 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(31,181,115,.12) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(30,51,96,.5) 0%, transparent 70%)" }}
        />

        {/* Phone frame */}
        <div
          className="relative mx-auto lg:rotate-[-3deg] lg:hover:rotate-0 transition-transform duration-500"
          style={{ width: 272 }}
        >
          <div
            className="rounded-[36px] border-[3px] border-white/20 bg-white shadow-pop overflow-hidden"
          >
            {/* Notch / Dynamic Island */}
            <div className="flex justify-center pt-2.5 pb-1 bg-white">
              <div className="h-[22px] w-[90px] rounded-full bg-ink/10" />
            </div>

            {/* Screen content */}
            <div className="bg-cream px-4 pb-3">
              {/* Status bar */}
              <div className="flex items-center justify-between px-1 py-1.5 text-[10px] font-semibold text-ink-soft">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
                    <rect x="0" y="6" width="2.5" height="4" rx="0.5" />
                    <rect x="3.5" y="4" width="2.5" height="6" rx="0.5" />
                    <rect x="7" y="2" width="2.5" height="8" rx="0.5" />
                    <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" />
                  </svg>
                  <svg width="20" height="10" viewBox="0 0 20 10" fill="currentColor">
                    <rect x="0" y="1" width="16" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1" />
                    <rect x="1.5" y="2.5" width="11" height="5" rx="0.75" />
                    <rect x="17" y="3" width="2" height="4" rx="0.75" opacity="0.4" />
                  </svg>
                </div>
              </div>

              {/* Header */}
              <div className="mt-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green">
                    <CheckIcon className="h-3.5 w-3.5 text-white" />
                  </span>
                  <div>
                    <div className="text-sm font-bold text-navy">{t(language, "heroVisual.title")}</div>
                    <div className="text-[10px] text-ink-soft">{locationLabel}</div>
                  </div>
                </div>
              </div>

              {/* Quote rows */}
              <div className="flex flex-col gap-2">
                {QUOTES.map((q, i) => (
                  <div
                    key={q.carrier}
                    className="niag-quote-row flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-soft"
                    style={{
                      animation: "niag-quote-row-in 0.4s ease-out backwards",
                      animationDelay: `${i * 0.15}s`,
                    }}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${q.color} text-[11px] font-bold text-white`}
                    >
                      {q.initial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-semibold text-navy truncate">{q.carrier}</div>
                      <div className="text-[10px] text-ink-soft">{t(language, "heroVisual.coverage")}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-base font-bold text-navy">{q.price}</span>
                      <span className="text-[10px] text-ink-soft">{t(language, "heroVisual.perMonth")}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Compare all button (decorative) */}
              <div
                className="mt-3 w-full rounded-xl bg-green py-2.5 text-center text-[13px] font-semibold text-white"
              >
                {t(language, "heroVisual.compareAll")}
              </div>

              {/* Home indicator */}
              <div className="mt-3 flex justify-center pb-1">
                <div className="h-1 w-24 rounded-full bg-ink/15" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating trust badges */}
        <div
          className="niag-float-badge absolute top-8 right-3 hidden items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-card backdrop-blur-sm lg:flex"
          style={{ animation: "niag-float 3s ease-in-out infinite" }}
        >
          <span className="h-2 w-2 rounded-full bg-green" />
          <span className="text-[11px] font-semibold text-navy">{t(language, "hero.trust.ssn")}</span>
        </div>
        <div
          className="niag-float-badge absolute bottom-12 left-3 hidden items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-card backdrop-blur-sm lg:flex"
          style={{ animation: "niag-float 3s ease-in-out infinite", animationDelay: "1.5s" }}
        >
          <LockIcon className="h-3 w-3 text-navy" />
          <span className="text-[11px] font-semibold text-navy">{t(language, "heroVisual.secure")}</span>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-center text-[10px] italic" style={{ color: "rgba(250,247,242,.5)" }}>
          {t(language, "heroVisual.disclaimer")}
        </p>
      </div>
    </div>
  );
}
