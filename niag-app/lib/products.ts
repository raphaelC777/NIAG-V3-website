import type { ProductType } from "@/types/lead";

export interface ProductDef {
  id: ProductType;
  labelEn: string;
  labelEs: string;
  descEn: string;
  descEs: string;
  recommended?: boolean;
  routeEn: string;
  routeEs: string;
  trackingValue: string;
}

export const PRODUCTS: ProductDef[] = [
  {
    id: "bundle",
    labelEn: "Bundle",
    labelEs: "Auto + Hogar",
    descEn: "Combine auto + home and compare smarter.",
    descEs: "Combina auto y hogar para comparar mejor.",
    recommended: true,
    routeEn: "/quote/bundle",
    routeEs: "/es/quote/bundle",
    trackingValue: "bundle",
  },
  {
    id: "auto",
    labelEn: "Auto",
    labelEs: "Seguro de Auto",
    descEn: "Compare options for your car in minutes.",
    descEs: "Compara opciones para tu carro en minutos.",
    routeEn: "/quote/auto",
    routeEs: "/es/quote/auto",
    trackingValue: "auto",
  },
  {
    id: "home",
    labelEn: "Home",
    labelEs: "Seguro de Hogar",
    descEn: "Protect your home with trusted coverage options.",
    descEs: "Protege tu hogar con cobertura de confianza.",
    routeEn: "/quote/home",
    routeEs: "/es/quote/home",
    trackingValue: "home",
  },
  {
    id: "renters",
    labelEn: "Renters",
    labelEs: "Inquilinos",
    descEn: "Simple protection for your apartment or rental.",
    descEs: "Protección simple para tu apartamento o renta.",
    routeEn: "/quote/renters",
    routeEs: "/es/quote/renters",
    trackingValue: "renters",
  },
  {
    id: "health",
    labelEn: "Health",
    labelEs: "Seguro de Salud",
    descEn: "Explore health coverage options with licensed partners.",
    descEs: "Explora opciones de salud con socios licenciados.",
    routeEn: "/quote/health",
    routeEs: "/es/quote/health",
    trackingValue: "health",
  },
];

export const DEFAULT_PRODUCT: ProductType = "bundle";

export function getProduct(id: ProductType) {
  return PRODUCTS.find((p) => p.id === id)!;
}

export function isProduct(value: string): value is ProductType {
  return ["bundle", "auto", "home", "renters", "health"].includes(value);
}
