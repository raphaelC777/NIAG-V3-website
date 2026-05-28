"use client";
import { useState, useEffect } from "react";
import { useSite } from "./SiteContext";
import { t } from "@/lib/i18n";
import ProductSelector from "./ProductSelector";
import ZipEntry from "./ZipEntry";
import HeroVisual from "./HeroVisual";
import { CheckIcon } from "./icons";
import type { ProductType } from "@/types/lead";
import { useQuoteFlow } from "./QuoteFlowProvider";
import { trackEvent, Events } from "@/lib/tracking";

export default function Hero() {
  const { language, copy, defaultProduct, variant, geo } = useSite();
  const { open } = useQuoteFlow();
  const [selected, setSelected] = useState<ProductType>(defaultProduct);

  useEffect(() => { setSelected(defaultProduct); }, [defaultProduct]);

  function start(zip: string) {
    open(selected, "hero", { zip: zip || undefined });
  }

  function handleProductChange(p: ProductType) {
    setSelected(p);
    trackEvent(Events.PRODUCT_SELECT, { productType: p, entryPoint: "hero", language, abVariant: variant });
  }

  const localChip = geo.region
    ? (language === "es" ? `Opciones cerca de ${geo.region}` : `Compare local options in ${geo.region}`)
    : null;

  return (
    <section className="relative border-b border-line overflow-hidden pt-12 pb-16" style={{ background: "#FAF7F2" }}>
      {/* Background image with gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/hero-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          opacity: 0.32,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, #FAF7F2 35%, rgba(250,247,242,0.4) 60%, rgba(250,247,242,0.15) 100%), linear-gradient(to bottom, rgba(250,247,242,0.3) 0%, #FAF7F2 92%)",
        }}
      />
      <div className="container-wide relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          {localChip ? (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-green" />
              {localChip}
            </div>
          ) : null}
          <h1 className="font-serif text-4xl font-semibold leading-tight text-navy md:text-5xl">
            {copy.heroHeadline}
          </h1>
          <p className="mt-4 max-w-[540px] text-lg text-ink-soft">{t(language, "hero.sub")}</p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink-soft">
            {(["hero.trust.free", "hero.trust.time", "hero.trust.credit", "hero.trust.ssn"] as const).map((k) => (
              <li key={k} className="inline-flex items-center gap-1.5 font-medium">
                <CheckIcon className="h-3.5 w-3.5 text-green" />
                <span>{t(language, k)}</span>
              </li>
            ))}
          </ul>

          {/* Quote selector card */}
          <div className="card-pop mt-6">
            <h3 className="mb-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-ink-soft">
              {t(language, "hero.formLabel")}
            </h3>
            <ProductSelector initialProduct={defaultProduct} onChange={handleProductChange} />
            <div className="mt-4">
              <ZipEntry onSubmit={start} ctaLabel={t(language, "hero.startBtn")} entryPoint="hero" productType={selected} />
            </div>
            <button
              onClick={() => { trackEvent(Events.QUOTE_RECOVERY_CLICK, { location: "hero", language, abVariant: variant }); alert(t(language, "hero.recovery")); }}
              className="mt-3.5 block w-full text-center text-sm text-ink-soft underline">
              {t(language, "hero.recovery")}
            </button>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
