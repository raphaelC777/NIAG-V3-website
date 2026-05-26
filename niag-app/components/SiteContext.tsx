"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resolveVariant, VARIANTS } from "@/lib/abTesting";
import type { ABVariant, Language, ProductType } from "@/types/lead";
import { trackEvent, Events } from "@/lib/tracking";

interface GeoState {
  city?: string; region?: string; postal?: string;
  source?: string; confidence?: string;
}

interface SiteCtx {
  language: Language;
  variant: ABVariant;
  defaultProduct: ProductType;
  copy: { heroHeadline: string; primaryCTA: string; hypothesis: string };
  geo: GeoState;
  setLanguage: (l: Language) => void;
}

const Ctx = createContext<SiteCtx | null>(null);

export function useSite() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSite must be used inside SiteProvider");
  return v;
}

export function SiteProvider({
  initialLanguage,
  children,
}: { initialLanguage: Language; children: React.ReactNode }) {
  const params = useSearchParams();
  const router = useRouter();

  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [variant, setVariant] = useState<ABVariant>("A");
  const [geo, setGeo] = useState<GeoState>({});

  // Variant resolution (client-side, runs once)
  useEffect(() => {
    const fromQuery = params.get("variant") || params.get("ab");
    setVariant(resolveVariant(fromQuery));
  }, [params]);

  // Geo personalization (server-backed)
  useEffect(() => {
    let alive = true;
    fetch("/api/geo")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (alive && data) setGeo(data); })
      .catch(() => { /* non-blocking */ });
    return () => { alive = false; };
  }, []);

  // Fire page_view once we know variant + language
  useEffect(() => {
    trackEvent(Events.PAGE_VIEW, {
      language, abVariant: variant,
      path: window.location.pathname + window.location.search,
    });
    if (typeof window !== "undefined") window.NIAG_DEBUG_TRACKING = true;
  }, [language, variant]);

  function setLanguage(l: Language) {
    if (l === language) return;
    trackEvent(Events.LANGUAGE_TOGGLE, { from: language, to: l, language: l, abVariant: variant });
    setLanguageState(l);
    // Navigate to the language-prefixed path
    const path = window.location.pathname;
    const stripped = path.replace(/^\/es(?=\/|$)/, "") || "/";
    const target = l === "es" ? `/es${stripped === "/" ? "" : stripped}` : stripped;
    router.push(target);
  }

  const value = useMemo<SiteCtx>(() => {
    const cfg = VARIANTS[variant];
    return {
      language, variant,
      defaultProduct: cfg.defaultProduct,
      copy: cfg[language],
      geo,
      setLanguage,
    };
  }, [language, variant, geo]); // eslint-disable-line react-hooks/exhaustive-deps

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
