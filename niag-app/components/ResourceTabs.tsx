"use client";
import { useState } from "react";
import { useSite } from "./SiteContext";
import { useQuoteFlow } from "./QuoteFlowProvider";
import { t } from "@/lib/i18n";
import type { ProductType } from "@/types/lead";
import { trackEvent, Events } from "@/lib/tracking";

type TabId = "auto" | "bundle" | "home" | "renters" | "health" | "es_resources";

interface Article {
  tag: { en: string; es: string };
  title: { en: string; es: string };
  excerpt: { en: string; es: string };
}

const ARTICLES: Record<TabId, Article[]> = {
  auto: [
    { tag: { en: "Auto", es: "Auto" }, title: { en: "How to compare car insurance quotes without the spam", es: "Cómo comparar seguros de auto sin spam" }, excerpt: { en: "A clear path to compare auto quotes that won't flood your inbox.", es: "Una ruta clara para comparar opciones sin llenar tu correo." } },
    { tag: { en: "Auto", es: "Auto" }, title: { en: "What affects your car insurance rate?", es: "¿Qué afecta tu tarifa de seguro de auto?" }, excerpt: { en: "ZIP, driving record, vehicle, coverage — and how carriers weight them.", es: "Código postal, historial, vehículo y cobertura." } },
    { tag: { en: "Auto", es: "Auto" }, title: { en: "Do you need full coverage or liability only?", es: "¿Cobertura completa o solo responsabilidad?" }, excerpt: { en: "When liability is enough — and when it isn't.", es: "Cuándo la responsabilidad alcanza y cuándo no." } },
  ],
  bundle: [
    { tag: { en: "Bundle", es: "Combinado" }, title: { en: "How auto + home bundles can save money", es: "Cómo combinar auto + hogar puede ahorrar dinero" }, excerpt: { en: "Why bundles often beat two separate policies.", es: "Por qué un combinado supera dos pólizas separadas." } },
    { tag: { en: "Bundle", es: "Combinado" }, title: { en: "When bundling insurance makes sense", es: "Cuándo combinar tiene sentido" }, excerpt: { en: "It isn't always the right move — here's when to look.", es: "No siempre es la mejor opción — cuándo conviene." } },
    { tag: { en: "Bundle", es: "Combinado" }, title: { en: "Questions to ask before switching carriers", es: "Preguntas antes de cambiar de aseguradora" }, excerpt: { en: "Six things to ask before signing.", es: "Seis cosas para preguntar antes de firmar." } },
  ],
  home: [
    { tag: { en: "Home", es: "Hogar" }, title: { en: "What homeowners insurance usually covers", es: "Qué cubre normalmente el seguro de hogar" }, excerpt: { en: "Dwelling, contents, liability — and what's commonly excluded.", es: "Estructura, contenido, responsabilidad — y qué se excluye." } },
    { tag: { en: "Home", es: "Hogar" }, title: { en: "How to compare home insurance by ZIP", es: "Cómo comparar seguro de hogar por ZIP" }, excerpt: { en: "Why your ZIP changes premium and coverage.", es: "Por qué tu ZIP cambia la prima y la cobertura." } },
    { tag: { en: "Home", es: "Hogar" }, title: { en: "Common home insurance discounts", es: "Descuentos comunes del seguro de hogar" }, excerpt: { en: "Bundling, security, claims-free — what to ask for.", es: "Combinar, seguridad, sin reclamos — qué pedir." } },
  ],
  renters: [
    { tag: { en: "Renters", es: "Inquilinos" }, title: { en: "What renters insurance covers", es: "Qué cubre el seguro para inquilinos" }, excerpt: { en: "Personal property, liability, additional living costs.", es: "Bienes, responsabilidad, costos adicionales." } },
    { tag: { en: "Renters", es: "Inquilinos" }, title: { en: "Is renters insurance worth it?", es: "¿Vale la pena el seguro para inquilinos?" }, excerpt: { en: "Why a small monthly premium beats replacing everything yourself.", es: "Por qué pagar poco mensual le gana a reponer todo solo." } },
    { tag: { en: "Renters", es: "Inquilinos" }, title: { en: "How much renters coverage do you need?", es: "¿Cuánta cobertura para inquilinos necesitas?" }, excerpt: { en: "Inventory, replacement value, liability limits.", es: "Inventario, valor de reposición, límites." } },
  ],
  health: [
    { tag: { en: "Health", es: "Salud" }, title: { en: "How to compare health coverage options", es: "Cómo comparar opciones de seguro de salud" }, excerpt: { en: "Premium vs deductible vs network.", es: "Prima, deducible y red." } },
    { tag: { en: "Health", es: "Salud" }, title: { en: "What to know before choosing a health plan", es: "Qué saber antes de elegir un plan de salud" }, excerpt: { en: "Doctor networks, medications, real cost of care.", es: "Red de médicos, medicamentos, costo real." } },
    { tag: { en: "Health", es: "Salud" }, title: { en: "Questions to ask a licensed health partner", es: "Preguntas para un socio de salud licenciado" }, excerpt: { en: "Five questions that uncover the right plan.", es: "Cinco preguntas para encontrar tu plan." } },
  ],
  es_resources: [
    { tag: { en: "Spanish", es: "Recursos" }, title: { en: "Cómo comparar seguros sin enredos", es: "Cómo comparar seguros sin enredos" }, excerpt: { en: "Una guía corta para comparar cobertura en EE. UU.", es: "Una guía corta para comparar cobertura en EE. UU." } },
    { tag: { en: "Spanish", es: "Recursos" }, title: { en: "Seguro de auto: qué revisar antes de elegir", es: "Seguro de auto: qué revisar antes de elegir" }, excerpt: { en: "Los seis puntos a confirmar antes de firmar.", es: "Los seis puntos a confirmar antes de firmar." } },
    { tag: { en: "Spanish", es: "Recursos" }, title: { en: "Auto + hogar: cómo combinar y ahorrar", es: "Auto + hogar: cómo combinar y ahorrar" }, excerpt: { en: "Cuándo combinar pólizas realmente conviene.", es: "Cuándo combinar pólizas realmente conviene." } },
  ],
};

export default function ResourceTabs() {
  const { language, variant } = useSite();
  const { open } = useQuoteFlow();
  const [tab, setTab] = useState<TabId>("auto");

  const tabs: { id: TabId; label: string }[] = [
    { id: "auto", label: t(language, "nav.auto") },
    { id: "bundle", label: t(language, "nav.bundle") },
    { id: "home", label: t(language, "nav.home") },
    { id: "renters", label: t(language, "nav.renters") },
    { id: "health", label: t(language, "nav.health") },
    { id: "es_resources", label: language === "es" ? "Recursos en Español" : "Spanish Resources" },
  ];

  function pick(id: TabId) {
    setTab(id);
    trackEvent(Events.BLOG_TAB_CLICK, { tab: id, language, abVariant: variant });
  }

  const items = ARTICLES[tab];

  return (
    <section id="blog" className="border-t border-b border-line bg-sand py-16">
      <div className="container-wide">
        <div className="mx-auto mb-9 max-w-[700px] text-center">
          <h2 className="font-serif text-3xl font-semibold text-navy">{t(language, "blog.heading")}</h2>
          <p className="mt-2 text-ink-soft">{t(language, "blog.sub")}</p>
        </div>
        <div className="mb-7 flex flex-wrap justify-center gap-1.5">
          {tabs.map((tb) => (
            <button key={tb.id}
              onClick={() => pick(tb.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                tab === tb.id ? "border-navy bg-navy text-white" : "border-line bg-white text-ink hover:border-navy"
              }`}>
              {tb.label}
            </button>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((a, idx) => {
            const product: ProductType = tab === "es_resources" ? "bundle" : (tab as ProductType);
            return (
              <article key={idx} className="flex flex-col gap-2.5 rounded-lg border border-line bg-white p-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-green-hover">{a.tag[language]}</span>
                <h3 className="font-serif text-base font-semibold leading-snug text-navy">{a.title[language]}</h3>
                <p className="flex-1 text-sm text-ink-soft">{a.excerpt[language]}</p>
                <div className="mt-2 flex items-center justify-between border-t border-line pt-3.5">
                  <a href="#" className="text-sm font-semibold text-navy hover:underline">{t(language, "blog.readMore")} →</a>
                  <button onClick={() => open(product, "blog_card")}
                    className="text-sm font-semibold text-green-hover hover:text-green">
                    {t(language, "blog.compare")}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
