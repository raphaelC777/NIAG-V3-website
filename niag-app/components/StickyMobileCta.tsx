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
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white p-3 shadow-pop md:hidden"
         style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}>
      <button onClick={() => open(defaultProduct, "sticky_mobile")} className="btn-primary w-full">
        {t(language, "sticky.cta")}
      </button>
    </div>
  );
}
