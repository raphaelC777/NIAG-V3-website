"use client";
import { useState } from "react";
import { useSite } from "./SiteContext";
import { useQuoteFlow } from "./QuoteFlowProvider";
import ProductSelector from "./ProductSelector";
import ZipEntry from "./ZipEntry";
import { t } from "@/lib/i18n";
import type { ProductType } from "@/types/lead";

export default function BottomCta() {
  const { language, copy } = useSite();
  const { open } = useQuoteFlow();
  // Bottom CTA per spec always defaults to Bundle (independent of variant)
  const [product, setProduct] = useState<ProductType>("bundle");

  function start(zip: string) {
    open(product, "bottom_cta", { zip: zip || undefined });
  }

  return (
    <section className="bg-gradient-to-b from-sand to-cream py-16 text-center">
      <div className="container-wide max-w-[720px]">
        <h2 className="font-serif text-3xl font-semibold text-navy">{t(language, "bottom.heading")}</h2>
        <p className="mt-2 text-ink-soft">{t(language, "bottom.sub")}</p>
        <div className="card-pop mt-7 text-left">
          <h3 className="mb-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-ink-soft">
            {t(language, "hero.formLabel")}
          </h3>
          <ProductSelector initialProduct="bundle" onChange={setProduct} />
          <div className="mt-4">
            <ZipEntry onSubmit={start} ctaLabel={copy.primaryCTA} entryPoint="bottom_cta" productType={product} />
          </div>
        </div>
      </div>
    </section>
  );
}
