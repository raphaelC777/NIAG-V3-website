"use client";
import { useSite } from "./SiteContext";
import { t } from "@/lib/i18n";

const CARRIERS = ["Progressive", "GEICO", "Allstate", "Liberty", "Travelers", "Nationwide", "State Farm", "Farmers", "USAA"];

function CarrierName({ name, idx }: { name: string; idx: number }) {
  const isAlt = idx % 2 === 1;
  return (
    <span
      className={isAlt ? "font-sans font-bold uppercase" : "font-serif italic font-bold"}
      style={{
        fontSize: isAlt ? 13 : 19,
        letterSpacing: isAlt ? 2 : 0.5,
        color: "#FAF7F2",
        whiteSpace: "nowrap",
        flex: "none",
        opacity: 0.92,
      }}
    >
      {name}
    </span>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="#F4B942" stroke="#F4B942" strokeWidth="1">
      <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9" />
    </svg>
  );
}

export default function TrustStrip() {
  const { language } = useSite();
  return (
    <section className="bg-navy text-cream" style={{ padding: "24px 0" }}>
      <div className="mx-auto max-w-container px-5">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-1">
            <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
            <span className="ml-1.5 text-sm font-semibold text-cream">4.8</span>
          </span>
          <span className="text-[13px]" style={{ color: "rgba(250,247,242,.7)" }}>
            {t(language, "trust.reviewText")}
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold"
            style={{
              background: "rgba(31,181,115,.16)",
              border: "1px solid rgba(159,226,197,.35)",
              color: "#9FE2C5",
            }}
          >
            BBB&nbsp;A+ partners
          </span>
        </div>
      </div>

      <div className="niag-marquee-wrap" style={{ position: "relative", overflow: "hidden", marginTop: 14 }}>
        <div className="niag-marquee-track" style={{ display: "inline-flex", alignItems: "center", gap: 44, whiteSpace: "nowrap", willChange: "transform", paddingLeft: 22 }}>
          {CARRIERS.map((c, i) => <CarrierName key={`a-${i}`} name={c} idx={i} />)}
          {CARRIERS.map((c, i) => <CarrierName key={`b-${i}`} name={c} idx={i} />)}
        </div>
      </div>
    </section>
  );
}
