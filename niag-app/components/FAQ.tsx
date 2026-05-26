"use client";
import { useState } from "react";
import { useSite } from "./SiteContext";
import { t } from "@/lib/i18n";

const QA_EN: { q: string; a: string }[] = [
  { q: "Is NIAG an insurance company?", a: "No. NIAG is not an insurance carrier and not a government agency. We help connect consumers with licensed insurance partners and professionals who provide quotes and coverage." },
  { q: "How does NIAG match me with insurance options?", a: "We use the answers you provide — like ZIP code, product type, and basic profile info — to route you to partners who serve your area and product need. You decide whether to move forward." },
  { q: "Will I get spammed?", a: "We only share your information with partners selected to help you with the product you requested. You can opt out, request data deletion, or use our Do Not Sell link at any time." },
  { q: "Do I need to provide my SSN?", a: "No. Our quote flow does not collect Social Security Numbers. A licensed partner may request additional info if you continue with them." },
  { q: "Is this free?", a: "Yes. Comparing options through NIAG is free with no obligation to purchase." },
  { q: "Can I compare auto and home together?", a: "Yes. Our Bundle flow asks the right questions for both auto and home so partners can quote them side-by-side." },
  { q: "Do you support Spanish speakers?", a: "Yes. The site and the form flows are available in Spanish. Use the language toggle at the top of the page." },
  { q: "Who may contact me after I submit the form?", a: "Licensed insurance partners aligned to your selected product and location. You'll see disclosure and consent language before submitting." },
];
const QA_ES: { q: string; a: string }[] = [
  { q: "¿NIAG es una compañía de seguros?", a: "No. NIAG no es aseguradora ni agencia del gobierno. Te conectamos con socios de seguros y profesionales licenciados que ofrecen cotizaciones y cobertura." },
  { q: "¿Cómo me asigna NIAG las opciones?", a: "Usamos tus respuestas — código postal, tipo de producto e información básica — para conectarte con socios que sirven tu área. Tú decides cómo continuar." },
  { q: "¿Me llegará spam?", a: "Solo compartimos tu información con socios seleccionados para el producto que pediste. Puedes optar por salir o pedir eliminación de datos cuando quieras." },
  { q: "¿Necesito dar mi SSN?", a: "No. Nuestro formulario no pide SSN. Un socio licenciado puede pedir información adicional si decides continuar." },
  { q: "¿Es gratis?", a: "Sí. Comparar opciones a través de NIAG es gratis, sin compromiso de compra." },
  { q: "¿Puedo comparar auto y hogar juntos?", a: "Sí. Nuestro flujo combinado hace las preguntas correctas para auto y hogar para que los socios puedan cotizarlos juntos." },
  { q: "¿Atienden en español?", a: "Sí. El sitio y los formularios están en español. Cambia el idioma desde la parte superior." },
  { q: "¿Quién puede contactarme después?", a: "Socios de seguros licenciados alineados con tu producto y ubicación. Verás el consentimiento antes de enviar." },
];

export default function FAQ() {
  const { language } = useSite();
  const items = language === "es" ? QA_ES : QA_EN;
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-16">
      <div className="container-wide">
        <div className="mx-auto mb-9 max-w-[700px] text-center">
          <h2 className="font-serif text-3xl font-semibold text-navy">{t(language, "faq.heading")}</h2>
          <p className="mt-2 text-ink-soft">{t(language, "faq.sub")}</p>
        </div>
        <div className="mx-auto max-w-[820px]">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="mb-2.5 overflow-hidden rounded-[10px] border border-line bg-white">
                <button onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-navy">
                  <span>{it.q}</span>
                  <span className="text-2xl leading-none text-green">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen ? <div className="px-5 pb-5 text-sm text-ink-soft">{it.a}</div> : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
