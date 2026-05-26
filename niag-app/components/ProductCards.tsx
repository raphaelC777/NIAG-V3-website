"use client";
import { useSite } from "./SiteContext";
import { useQuoteFlow } from "./QuoteFlowProvider";
import { t } from "@/lib/i18n";
import { PRODUCTS } from "@/lib/products";
import { ProductIcon } from "./icons";

export default function ProductCards() {
  const { language } = useSite();
  const { open } = useQuoteFlow();

  return (
    <section id="products" className="py-16">
      <div className="container-wide">
        <div className="mx-auto mb-9 max-w-[700px] text-center">
          <h2 className="font-serif text-3xl font-semibold text-navy">{t(language, "products.heading")}</h2>
          <p className="mt-2 text-ink-soft">{t(language, "products.sub")}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PRODUCTS.map((p) => (
            <article key={p.id}
              className={`relative flex flex-col gap-2 rounded-lg border p-5 transition hover:-translate-y-0.5 hover:shadow-card ${
                p.recommended ? "border-green bg-white" : "border-line bg-white"
              }`}>
              {p.recommended ? (
                <span className="absolute right-3.5 top-3.5 rounded-full bg-green px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  {t(language, "hero.recommended")}
                </span>
              ) : null}
              <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-[10px] bg-sand text-navy">
                <ProductIcon product={p.id} />
              </div>
              <h3 className="font-serif text-lg font-semibold text-navy">
                {language === "es" ? p.labelEs : p.labelEn}
              </h3>
              <p className="flex-1 text-sm text-ink-soft">
                {language === "es" ? p.descEs : p.descEn}
              </p>
              <button onClick={() => open(p.id, "product_card")}
                className="mt-1 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-green-hover hover:text-green">
                {t(language, `products.${p.id}.cta`)} <span>→</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
