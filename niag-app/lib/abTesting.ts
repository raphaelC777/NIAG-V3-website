import type { ABVariant, Language, ProductType } from "@/types/lead";

interface VariantCopy { heroHeadline: string; primaryCTA: string; hypothesis: string }
interface VariantConfig {
  defaultProduct: ProductType;
  en: VariantCopy;
  es: VariantCopy;
}

export const VARIANTS: Record<ABVariant, VariantConfig> = {
  A: {
    defaultProduct: "bundle",
    en: {
      heroHeadline: "Bundle & save on auto + home insurance.",
      primaryCTA: "Get my free quote",
      hypothesis: "Bundle-first positioning increases lead value.",
    },
    es: {
      heroHeadline: "Combina y ahorra en seguro de auto + hogar.",
      primaryCTA: "Obtener mi cotización",
      hypothesis: "Posicionamiento bundle-first aumenta el valor del lead.",
    },
  },
  B: {
    defaultProduct: "auto",
    en: {
      heroHeadline: "Compare insurance quotes without the spam.",
      primaryCTA: "Start my quote",
      hypothesis: "Anti-spam trust copy increases form starts.",
    },
    es: {
      heroHeadline: "Compara seguros sin enredos.",
      primaryCTA: "Comenzar mi cotización",
      hypothesis: "Lenguaje anti-spam incrementa form starts.",
    },
  },
  C: {
    defaultProduct: "bundle",
    en: {
      heroHeadline: "Compare coverage with local experts you can trust.",
      primaryCTA: "Talk to a quote expert",
      hypothesis: "Human support framing improves cautious-user conversion.",
    },
    es: {
      heroHeadline: "Compara cobertura con expertos locales.",
      primaryCTA: "Hablar con un experto",
      hypothesis: "Apoyo humano aumenta conversión para usuarios cautelosos.",
    },
  },
};

export function isVariant(v: string | null | undefined): v is ABVariant {
  return v === "A" || v === "B" || v === "C";
}

const STORAGE_KEY = "niag_ab";

/** Resolve variant client-side: URL ?variant= or ?ab= > storage > random. */
export function resolveVariant(searchParam?: string | null): ABVariant {
  if (typeof window === "undefined") {
    if (isVariant(searchParam || "")) return searchParam as ABVariant;
    return "A";
  }
  const fromUrl = (searchParam || "").toUpperCase();
  if (isVariant(fromUrl)) {
    try { localStorage.setItem(STORAGE_KEY, fromUrl); } catch {}
    return fromUrl;
  }
  let stored: string | null = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch {}
  if (isVariant(stored)) return stored as ABVariant;
  const r = Math.random();
  const assigned: ABVariant = r < 0.34 ? "A" : r < 0.67 ? "B" : "C";
  try { localStorage.setItem(STORAGE_KEY, assigned); } catch {}
  return assigned;
}

export function getCopy(variant: ABVariant, language: Language) {
  return VARIANTS[variant][language];
}

export function getDefaultProduct(variant: ABVariant): ProductType {
  return VARIANTS[variant].defaultProduct;
}
