"use client";
import { useSite } from "./SiteContext";
import { t } from "@/lib/i18n";
import { CheckIcon, LockIcon, ShieldIcon } from "./icons";

/** Polished app-dashboard visual. No fake prices, no fake real names. */
export default function HeroVisual() {
  const { language, geo } = useSite();

  const locationLabel =
    geo.city
      ? `${t(language, "geo.nearby")} ${geo.city}${geo.region ? `, ${geo.region}` : ""}`
      : t(language, "geo.zipMatch");

  return (
    <div className="grid gap-3 rounded-lg border border-line bg-white p-5 shadow-card">
      <div className="flex items-center justify-between border-b border-dashed border-line pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-navy text-cream">
            <ShieldIcon className="h-4 w-4" />
          </span>
          <div>
            <div className="font-serif text-base font-semibold text-navy">
              {language === "es" ? "Tu panel de cotización" : "Your quote dashboard"}
            </div>
            <div className="text-[11px] uppercase tracking-wider text-ink-soft">{locationLabel}</div>
          </div>
        </div>
        <span className="rounded-full bg-green/10 px-2.5 py-1 text-[11px] font-semibold text-green-hover">
          {language === "es" ? "ZIP activo" : "ZIP-based matches"}
        </span>
      </div>

      {/* Mini partner cards (no fake prices, no fake real names) */}
      <div className="grid gap-2.5">
        {[
          { mark: "NA", label: language === "es" ? "Aseguradora asignada" : "Matched carrier", meta: language === "es" ? "Experto local disponible" : "Local expert available", color: "bg-navy" },
          { mark: "TP", label: language === "es" ? "Socio de confianza" : "Trusted partner", meta: language === "es" ? "Opciones de cobertura" : "Coverage options", color: "bg-green" },
          { mark: "RC", label: language === "es" ? "Aseguradora regional" : "Regional carrier", meta: language === "es" ? "Elegible para combinar" : "Bundle eligible", color: "bg-navy-600" },
        ].map((row, i) => (
          <div key={i} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[10px] border border-line bg-cream p-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-md ${row.color} font-serif text-sm font-bold text-white`}>
              {row.mark}
            </div>
            <div>
              <div className="text-sm font-semibold">{row.label}</div>
              <div className="text-[12px] text-ink-soft">{row.meta}</div>
            </div>
            <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-navy">
              {language === "es" ? "Ver" : "View"}
            </span>
          </div>
        ))}
      </div>

      {/* Animated progress line + security badge */}
      <div className="mt-1 grid gap-2">
        <div className="h-1 w-full overflow-hidden rounded-full bg-sand">
          <div className="hero-progress h-full bg-green" />
        </div>
        <div className="flex items-center justify-between text-[11px] text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <LockIcon className="h-3 w-3" />
            <span>{language === "es" ? "Sin SSN" : "No SSN requested"}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckIcon className="h-3 w-3 text-green" />
            <span>{language === "es" ? "Las opciones se actualizan" : "Matching in seconds"}</span>
          </span>
        </div>
      </div>
      <div className="text-center text-[11px] italic text-ink-soft">
        {language === "es"
          ? "Vista previa ilustrativa · Las opciones reales dependen de tu código postal y elegibilidad."
          : "Illustrative preview · Actual options depend on your ZIP and eligibility."}
      </div>

      <style jsx>{`
        .hero-progress {
          width: 30%;
          animation: heroProgress 3.6s ease-in-out infinite;
        }
        @keyframes heroProgress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(180%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
