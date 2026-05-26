"use client";
import { useState } from "react";
import { useSite } from "./SiteContext";
import { useQuoteFlow } from "./QuoteFlowProvider";
import { t } from "@/lib/i18n";
import { PRODUCTS } from "@/lib/products";
import type { ProductType } from "@/types/lead";
import { isZip } from "@/lib/validators";
import { trackEvent, Events } from "@/lib/tracking";

export default function MidPageCta() {
  const { language, variant, defaultProduct } = useSite();
  const { open } = useQuoteFlow();
  const [product, setProduct] = useState<ProductType>(defaultProduct);
  const [zip, setZip] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    trackEvent(Events.PRODUCT_SELECT, { productType: product, entryPoint: "mid_cta", language, abVariant: variant });
    if (zip && isZip(zip)) {
      trackEvent(Events.ZIP_ENTERED, { zipCode: zip, productType: product, entryPoint: "mid_cta", language, abVariant: variant });
    }
    open(product, "mid_cta", { zip: zip || undefined });
  }

  return (
    <section className="py-16">
      <div className="container-wide">
        <div className="rounded-lg bg-navy p-10 text-cream">
          <div className="grid items-center gap-7 md:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-white">{t(language, "midcta.heading")}</h2>
              <p className="mt-1 text-cream/80">{t(language, "midcta.sub")}</p>
            </div>
            <form onSubmit={submit}
              className="grid items-center gap-2.5 rounded-[10px] bg-white p-3.5 md:grid-cols-[1fr_1fr_auto]">
              <select value={product}
                onChange={(e) => setProduct(e.target.value as ProductType)}
                className="rounded-xs border-[1.5px] border-line bg-white px-3.5 py-3 text-sm text-ink">
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {language === "es" ? p.labelEs : p.labelEn}
                  </option>
                ))}
              </select>
              <input type="tel" inputMode="numeric" maxLength={5}
                value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
                placeholder={t(language, "hero.zipPlaceholder")}
                className="rounded-xs border-[1.5px] border-line bg-white px-3.5 py-3 text-sm text-ink" />
              <button type="submit" className="btn-primary">{t(language, "midcta.cta")}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
