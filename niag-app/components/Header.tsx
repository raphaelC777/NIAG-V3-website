"use client";
import { useState } from "react";
import Link from "next/link";
import { useSite } from "./SiteContext";
import { t } from "@/lib/i18n";
import { trackEvent, Events } from "@/lib/tracking";
import { PhoneIcon } from "./icons";
import { useQuoteFlow } from "./QuoteFlowProvider";

export default function Header() {
  const { language, variant, copy, defaultProduct, setLanguage } = useSite();
  const { open } = useQuoteFlow();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems: { key: string; product: "auto" | "bundle" | "home" | "renters" | "health" }[] = [
    { key: "nav.auto", product: "auto" },
    { key: "nav.bundle", product: "bundle" },
    { key: "nav.home", product: "home" },
    { key: "nav.renters", product: "renters" },
    { key: "nav.health", product: "health" },
  ];

  function callExpert(loc: string) {
    trackEvent(Events.PHONE_CLICK, { location: loc, language, abVariant: variant });
  }

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-line">
      <div className="container-wide flex items-center justify-between gap-4 py-3.5">
        <Link href={language === "es" ? "/es" : "/"} className="inline-flex items-center gap-2 font-serif text-xl font-bold text-navy tracking-wide">
          <span>NIAG</span>
          <span className="hidden sm:block text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-green">
            Insurance Assistance Group
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {navItems.map((n) => (
            <button key={n.key}
              onClick={() => { trackEvent(Events.PRODUCT_SELECT, { productType: n.product, entryPoint: "header", language, abVariant: variant }); open(n.product, "header"); }}
              className="text-[15px] font-medium text-ink hover:text-navy">
              {t(language, n.key)}
            </button>
          ))}
          <Link href={language === "es" ? "/es#blog" : "/#blog"} className="text-[15px] font-medium text-ink hover:text-navy">
            {t(language, "nav.resources")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="inline-flex overflow-hidden rounded-full border border-line bg-white text-xs">
            {(["en", "es"] as const).map((l) => (
              <button key={l}
                onClick={() => setLanguage(l)}
                className={`px-3 py-1.5 font-semibold ${language === l ? "bg-navy text-white" : "text-ink-soft"}`}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="tel:18005551234" onClick={() => callExpert("header")}
             className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-navy">
            <PhoneIcon className="h-4 w-4" />
            <span>{t(language, "nav.callExpert")}</span>
          </a>
          <button onClick={() => { trackEvent(Events.PRODUCT_SELECT, { productType: defaultProduct, entryPoint: "header", language, abVariant: variant }); open(defaultProduct, "header"); }}
                  className="btn-primary btn-sm hidden md:inline-flex">
            {copy.primaryCTA}
          </button>
          <button onClick={() => setDrawerOpen(true)} aria-label="Open menu" className="lg:hidden">
            <svg viewBox="0 0 24 24" fill="none" stroke="#0A1F44" strokeWidth="2" className="h-7 w-7">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 bg-navy/55" onClick={() => setDrawerOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-[min(320px,85vw)] bg-cream p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <span className="font-serif text-xl font-bold text-navy">NIAG</span>
              <button onClick={() => setDrawerOpen(false)} aria-label="Close menu" className="text-2xl leading-none">×</button>
            </div>
            {navItems.map((n) => (
              <button key={n.key}
                onClick={() => { setDrawerOpen(false); open(n.product, "mobile_drawer"); }}
                className="block w-full border-b border-line py-3.5 text-left font-medium text-ink">
                {t(language, n.key)}
              </button>
            ))}
            <Link href={language === "es" ? "/es#blog" : "/#blog"}
                  onClick={() => setDrawerOpen(false)}
                  className="block w-full border-b border-line py-3.5 text-left font-medium text-ink">
              {t(language, "nav.resources")}
            </Link>
            <a href="tel:18005551234" onClick={() => { setDrawerOpen(false); callExpert("mobile_drawer"); }}
               className="block w-full border-b border-line py-3.5 text-left font-medium text-ink">
              {t(language, "nav.callExpert")}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
