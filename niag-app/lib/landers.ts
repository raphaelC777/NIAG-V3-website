import type { ProductType } from "@/types/lead";

/**
 * Landing-page variation registry.
 *
 * Each lander is a distinct, ad-friendly URL like `/lp/<slug>` with its own
 * hero copy, CTA, trust bullets, and form-open mode. To launch a new lander
 * for an existing product:
 *
 *   1) Append a row below with a unique slug.
 *   2) Optionally translate `es` copy.
 *   3) Deploy — the route renders automatically.
 *
 * To run an A/B on landers, point ads at two slugs and compare attribution
 * in the warehouse via `lander_slug` on each lead.
 */

export type FormOpenMode = "modal" | "tab";

export interface LanderCopy {
  eyebrow?: string;
  headline: string;
  sub: string;
  ctaLabel: string;
  trustBullets?: string[];
}

export interface LanderSpec {
  slug: string;
  product: ProductType;
  /** "modal" keeps user on the lander; "tab" opens a fresh /form/[product] tab. */
  formOpenMode: FormOpenMode;
  /** Toggle long-form sections under the hero. Keep landers light by default. */
  sections: {
    trustStrip?: boolean;
    howItWorks?: boolean;
    expertHelp?: boolean;
    faq?: boolean;
    footer?: boolean;
  };
  en: LanderCopy;
  es: LanderCopy;
}

const TRUST_EN = ["Free", "60 seconds", "No credit check", "No SSN"];
const TRUST_ES = ["Gratis", "60 segundos", "Sin verificación de crédito", "Sin SSN"];

export const LANDERS: LanderSpec[] = [
  // ── Bundle (auto + home) ─────────────────────────────────────────────
  {
    slug: "bundle-default",
    product: "bundle",
    formOpenMode: "modal",
    sections: { trustStrip: true, howItWorks: true, expertHelp: true, faq: true, footer: true },
    en: {
      eyebrow: "Save up to 32%",
      headline: "Bundle & save on auto + home insurance.",
      sub: "Compare quotes from 30+ top carriers in 60 seconds. Free.",
      ctaLabel: "Get my free quote",
      trustBullets: TRUST_EN,
    },
    es: {
      eyebrow: "Ahorra hasta 32%",
      headline: "Combina y ahorra en seguro de auto + hogar.",
      sub: "Compara cotizaciones de 30+ aseguradoras en 60 segundos. Gratis.",
      ctaLabel: "Obtener mi cotización",
      trustBullets: TRUST_ES,
    },
  },
  {
    slug: "bundle-savings",
    product: "bundle",
    formOpenMode: "tab",
    sections: { trustStrip: true, footer: true },
    en: {
      eyebrow: "Average bundle savings",
      headline: "Drivers who bundle save $710/yr on average.",
      sub: "One quote, both policies. We compare 30+ carriers so you don't have to.",
      ctaLabel: "Show me my savings",
      trustBullets: ["Average savings", "Local experts", "No spam", "No SSN"],
    },
    es: {
      eyebrow: "Ahorro promedio al combinar",
      headline: "Combina auto + hogar y ahorra $710/año en promedio.",
      sub: "Una cotización, las dos pólizas. Comparamos 30+ aseguradoras por ti.",
      ctaLabel: "Ver mi ahorro",
      trustBullets: ["Ahorro promedio", "Expertos locales", "Sin spam", "Sin SSN"],
    },
  },
  {
    slug: "bundle-spam",
    product: "bundle",
    formOpenMode: "modal",
    sections: { trustStrip: true, expertHelp: true, footer: true },
    en: {
      headline: "Compare bundle quotes without the spam.",
      sub: "Your data stays yours. We only share with the licensed partners you pick.",
      ctaLabel: "Start without spam",
      trustBullets: ["No robocalls", "No resold data", "TCPA-compliant"],
    },
    es: {
      headline: "Compara seguros combinados sin enredos.",
      sub: "Tu información es tuya. Solo compartimos con socios licenciados que elijas.",
      ctaLabel: "Comenzar sin spam",
      trustBullets: ["Sin llamadas robot", "Datos no revendidos", "Cumple TCPA"],
    },
  },

  // ── Auto ─────────────────────────────────────────────────────────────
  {
    slug: "auto-fast",
    product: "auto",
    formOpenMode: "modal",
    sections: { trustStrip: true, howItWorks: true, faq: true, footer: true },
    en: {
      eyebrow: "60-second auto quote",
      headline: "Compare auto insurance quotes in 60 seconds.",
      sub: "Pull rates from 30+ carriers without a credit check.",
      ctaLabel: "Start my auto quote",
      trustBullets: TRUST_EN,
    },
    es: {
      eyebrow: "Cotización en 60s",
      headline: "Cotiza tu seguro de auto en 60 segundos.",
      sub: "Compara 30+ aseguradoras sin verificación de crédito.",
      ctaLabel: "Cotizar mi auto",
      trustBullets: TRUST_ES,
    },
  },
  {
    slug: "auto-switch",
    product: "auto",
    formOpenMode: "tab",
    sections: { trustStrip: true, footer: true },
    en: {
      eyebrow: "Switching is easy",
      headline: "Paying too much for auto? Switch in minutes.",
      sub: "We handle cancellation paperwork. You keep the savings.",
      ctaLabel: "Check my new rate",
      trustBullets: ["No cancellation fee", "No paperwork", "Real carriers"],
    },
    es: {
      eyebrow: "Cambiar es fácil",
      headline: "¿Pagas demasiado por tu seguro de auto?",
      sub: "Nos ocupamos del papeleo. Tú te quedas con el ahorro.",
      ctaLabel: "Ver mi nueva tarifa",
      trustBullets: ["Sin cargo de cancelación", "Sin papeleo", "Aseguradoras reales"],
    },
  },

  // ── Home ─────────────────────────────────────────────────────────────
  {
    slug: "home-quote",
    product: "home",
    formOpenMode: "modal",
    sections: { trustStrip: true, expertHelp: true, faq: true, footer: true },
    en: {
      eyebrow: "Homeowners insurance",
      headline: "Protect your home — compare quotes from 20+ carriers.",
      sub: "Coverage that fits how you actually live. No upsell games.",
      ctaLabel: "Get my home quote",
      trustBullets: TRUST_EN,
    },
    es: {
      eyebrow: "Seguro de hogar",
      headline: "Protege tu hogar — compara con 20+ aseguradoras.",
      sub: "Cobertura para tu vida real. Sin trucos.",
      ctaLabel: "Cotizar mi hogar",
      trustBullets: TRUST_ES,
    },
  },

  // ── Renters ──────────────────────────────────────────────────────────
  {
    slug: "renters-cheap",
    product: "renters",
    formOpenMode: "modal",
    sections: { trustStrip: true, footer: true },
    en: {
      eyebrow: "Renters from $12/mo",
      headline: "Renters insurance from $12 a month.",
      sub: "Belongings, liability, and a quick claims line. Sign up in under 5 minutes.",
      ctaLabel: "See plans",
      trustBullets: ["Instant proof of insurance", "Cancel anytime", "Pet damage included"],
    },
    es: {
      eyebrow: "Inquilinos desde $12/mes",
      headline: "Seguro para inquilinos desde $12 al mes.",
      sub: "Pertenencias, responsabilidad y reclamos rápidos. En menos de 5 minutos.",
      ctaLabel: "Ver planes",
      trustBullets: ["Comprobante al instante", "Cancela cuando quieras", "Incluye daños de mascota"],
    },
  },

  // ── Health ───────────────────────────────────────────────────────────
  {
    slug: "health-marketplace",
    product: "health",
    formOpenMode: "tab",
    sections: { trustStrip: true, footer: true },
    en: {
      eyebrow: "ACA + private plans",
      headline: "Compare health plans with a licensed broker.",
      sub: "Subsidy eligibility, ACA, short-term — all in one place. Free.",
      ctaLabel: "See my options",
      trustBullets: ["Licensed broker", "No SSN to compare", "Free service"],
    },
    es: {
      eyebrow: "ACA y planes privados",
      headline: "Compara planes de salud con un broker licenciado.",
      sub: "Subsidios, ACA, planes a corto plazo — todo en un solo lugar. Gratis.",
      ctaLabel: "Ver mis opciones",
      trustBullets: ["Broker licenciado", "Sin SSN para comparar", "Servicio gratis"],
    },
  },
];

export function getLander(slug: string): LanderSpec | null {
  return LANDERS.find((l) => l.slug === slug) || null;
}

export function listLanderSlugs(): string[] {
  return LANDERS.map((l) => l.slug);
}
