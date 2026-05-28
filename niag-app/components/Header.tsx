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
    <header className="sticky top-0 z-40 border-b border-line" style={{ background: "#FAF7F2" }}>
      <div className="mx-auto flex max-w-container items-center gap-3.5 px-5 py-3" style={{ padding: "12px 22px" }}>
        <Link href={language === "es" ? "/es" : "/"} className="inline-flex shrink-0" aria-label="NIAG home">
          <span className="font-serif text-[22px] font-bold text-navy leading-none tracking-tight">NIAG</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" style={{ marginLeft: 18 }} aria-label="Primary">
          {navItems.map((n) => (
            <button key={n.key}
              onClick={() => { trackEvent(Events.PRODUCT_SELECT, { productType: n.product, entryPoint: "header", language, abVariant: variant }); open(n.product, "header"); }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-sand hover:text-navy">
              {t(language, n.key)}
            </button>
          ))}
          <Link href={language === "es" ? "/es#blog" : "/#blog"} className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-sand hover:text-navy">
            {t(language, "nav.resources")}
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            aria-label={language === "en" ? "Switch to Spanish" : "Switch to English"}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-transparent px-3 py-1.5 text-xs font-semibold transition hover:bg-sand hover:border-navy/20"
            style={{ letterSpacing: 1 }}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-ink-soft"><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0 -18" /></svg>
            <span className={language === "en" ? "text-navy" : "text-ink-soft"}>EN</span>
            <span className="text-line">·</span>
            <span className={language === "es" ? "text-navy" : "text-ink-soft"}>ES</span>
          </button>
          <a href="tel:18005551234" onClick={() => callExpert("header")}
             className="hidden lg:inline-flex items-center gap-2 text-sm font-semibold text-navy">
            <PhoneIcon className="h-4 w-4" />
            <span>{t(language, "nav.callExpert")}</span>
          </a>
          <button onClick={() => { trackEvent(Events.PRODUCT_SELECT, { productType: defaultProduct, entryPoint: "header", language, abVariant: variant }); open(defaultProduct, "header"); }}
                  className="btn-primary btn-sm hidden md:inline-flex">
            {copy.primaryCTA}
          </button>
          <button onClick={() => setDrawerOpen(true)} aria-label="Open menu" className="md:hidden">
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
