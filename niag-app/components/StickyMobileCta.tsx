"use client";
import { useEffect, useState } from "react";
import { useSite } from "./SiteContext";
import { useQuoteFlow } from "./QuoteFlowProvider";
import { t } from "@/lib/i18n";

export default function StickyMobileCta() {
  const { language, defaultProduct } = useSite();
  const { open } = useQuoteFlow();
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() { setShow(window.scrollY > 380); }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 md:hidden"
      style={{
        padding: "10px 12px",
        background: "linear-gradient(to top, #FAF7F2 75%, rgba(250,247,242,0))",
        pointerEvents: "none",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 10px)",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          maxWidth: 460,
          pointerEvents: "auto",
          background: "#0A1F44",
          borderRadius: 14,
          padding: "10px 12px",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 10,
          alignItems: "center",
          boxShadow: "0 10px 24px rgba(10,31,68,.22)",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div className="font-serif text-sm font-semibold text-cream" style={{ letterSpacing: -0.2 }}>
            {t(language, "sticky.title")}
          </div>
          <div className="truncate text-[11px]" style={{ color: "rgba(250,247,242,.7)" }}>
            {t(language, "sticky.sub")}
          </div>
        </div>
        <button
          onClick={() => open(defaultProduct, "sticky_mobile")}
          className="btn-primary"
          style={{ height: 48, padding: "0 20px", fontSize: 15, whiteSpace: "nowrap" }}
        >
          {t(language, "sticky.cta")}
        </button>
      </div>
    </div>
  );
}
