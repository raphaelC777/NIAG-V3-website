import type { Language, ProductType } from "@/types/lead";

export type StepType = "zip" | "choice" | "name" | "contact" | "consent";

interface ChoiceOption { value: string; labelEn: string; labelEs: string }
export interface FormStepDef {
  id: string;
  type: StepType;
  qEn: string;
  qEs: string;
  helperEn?: string;
  helperEs?: string;
  options?: ChoiceOption[];
}

// Reusable building blocks
const zipStep: FormStepDef = {
  id: "zip", type: "zip",
  qEn: "What's your ZIP code?",
  qEs: "¿Cuál es tu código postal?",
  helperEn: "Insurance options vary by ZIP. We never sell your location data.",
  helperEs: "Las opciones varían por ZIP. Nunca vendemos tu ubicación.",
};

const nameStep: FormStepDef = {
  id: "name", type: "name",
  qEn: "What's your name?", qEs: "¿Cómo te llamas?",
};
const contactStep: FormStepDef = {
  id: "contact", type: "contact",
  qEn: "Best way to reach you?",
  qEs: "¿Cómo te contactamos?",
  helperEn: "We only share your contact info with licensed partners you choose to work with.",
  helperEs: "Solo compartimos tu información con socios licenciados que elijas.",
};
const consentStep: FormStepDef = {
  id: "consent", type: "consent",
  qEn: "One last thing — please review",
  qEs: "Un detalle más — por favor revisa",
};

const startDate: FormStepDef = {
  id: "startDate", type: "choice",
  qEn: "When would you like coverage to start?",
  qEs: "¿Cuándo te gustaría empezar la cobertura?",
  options: [
    { value: "asap", labelEn: "As soon as possible", labelEs: "Lo antes posible" },
    { value: "7", labelEn: "Within 7 days", labelEs: "En 7 días" },
    { value: "30", labelEn: "Within 30 days", labelEs: "En 30 días" },
    { value: "later", labelEn: "Just exploring", labelEs: "Solo explorando" },
  ],
};

const ownRent: FormStepDef = {
  id: "ownRent", type: "choice",
  qEn: "Do you currently own or rent your home?",
  qEs: "¿Eres dueño o rentas tu hogar?",
  options: [
    { value: "own", labelEn: "I own", labelEs: "Soy dueño" },
    { value: "rent", labelEn: "I rent", labelEs: "Rento" },
    { value: "other", labelEn: "Other / not sure", labelEs: "Otro / no estoy seguro" },
  ],
};
const propertyType: FormStepDef = {
  id: "propertyType", type: "choice",
  qEn: "What type of property is it?", qEs: "¿Qué tipo de propiedad es?",
  options: [
    { value: "single", labelEn: "Single-family home", labelEs: "Casa unifamiliar" },
    { value: "condo", labelEn: "Condo / townhouse", labelEs: "Condo / townhouse" },
    { value: "multi", labelEn: "Multi-family", labelEs: "Multifamiliar" },
    { value: "mobile", labelEn: "Mobile / manufactured", labelEs: "Móvil / manufacturada" },
  ],
};
const yearBuilt: FormStepDef = {
  id: "yearBuilt", type: "choice",
  qEn: "Approximately when was the home built?",
  qEs: "¿Aproximadamente cuándo se construyó el hogar?",
  options: [
    { value: "2010+", labelEn: "2010 or later", labelEs: "2010 o después" },
    { value: "1990-2009", labelEn: "1990 — 2009", labelEs: "1990 — 2009" },
    { value: "1970-1989", labelEn: "1970 — 1989", labelEs: "1970 — 1989" },
    { value: "pre1970", labelEn: "Before 1970", labelEs: "Antes de 1970" },
  ],
};
const currentlyInsuredAuto: FormStepDef = {
  id: "currentlyInsuredAuto", type: "choice",
  qEn: "Do you currently have auto insurance?",
  qEs: "¿Tienes seguro de auto actualmente?",
  options: [
    { value: "yes", labelEn: "Yes", labelEs: "Sí" },
    { value: "no", labelEn: "No", labelEs: "No" },
    { value: "lapsed", labelEn: "Recently lapsed", labelEs: "Recientemente vencido" },
  ],
};
const currentlyInsuredGeneric: FormStepDef = {
  id: "currentlyInsured", type: "choice",
  qEn: "Do you currently have insurance for this?",
  qEs: "¿Tienes seguro actualmente?",
  options: [
    { value: "yes", labelEn: "Yes", labelEs: "Sí" },
    { value: "no", labelEn: "No", labelEs: "No" },
    { value: "lapsed", labelEn: "Recently lapsed", labelEs: "Recientemente vencido" },
  ],
};
const currentlyInsuredHome: FormStepDef = {
  ...currentlyInsuredGeneric,
  qEn: "Do you currently have home insurance?",
  qEs: "¿Tienes seguro de hogar actualmente?",
};
const currentlyInsuredHealth: FormStepDef = {
  id: "currentlyInsured", type: "choice",
  qEn: "Do you have health coverage currently?",
  qEs: "¿Tienes cobertura de salud actualmente?",
  options: [
    { value: "yes", labelEn: "Yes", labelEs: "Sí" },
    { value: "cobra", labelEn: "On COBRA", labelEs: "Con COBRA" },
    { value: "no", labelEn: "No", labelEs: "No" },
  ],
};
const incidents: FormStepDef = {
  id: "incidents", type: "choice",
  qEn: "Any accidents or tickets in the last 3 years?",
  qEs: "¿Algún accidente o multa en los últimos 3 años?",
  options: [
    { value: "none", labelEn: "None", labelEs: "Ninguno" },
    { value: "one", labelEn: "1 incident", labelEs: "1 incidente" },
    { value: "two", labelEn: "2 or more", labelEs: "2 o más" },
  ],
};
function countOpts(): ChoiceOption[] {
  return ["1", "2", "3", "4+"].map((v) => ({ value: v, labelEn: v, labelEs: v }));
}
const vehicleCount: FormStepDef = {
  id: "vehicleCount", type: "choice",
  qEn: "How many vehicles do you need to cover?",
  qEs: "¿Cuántos vehículos necesitan cobertura?",
  options: countOpts(),
};
const driverCount: FormStepDef = {
  id: "driverCount", type: "choice",
  qEn: "How many drivers should we include?",
  qEs: "¿Cuántos conductores debemos incluir?",
  options: countOpts(),
};
const rentalType: FormStepDef = {
  id: "rentalType", type: "choice",
  qEn: "What kind of place are you renting?",
  qEs: "¿Qué tipo de lugar rentas?",
  options: [
    { value: "apt", labelEn: "Apartment", labelEs: "Apartamento" },
    { value: "house", labelEn: "House", labelEs: "Casa" },
    { value: "condo", labelEn: "Condo", labelEs: "Condo" },
    { value: "other", labelEn: "Other", labelEs: "Otro" },
  ],
};
const coverageAmount: FormStepDef = {
  id: "coverageAmount", type: "choice",
  qEn: "Estimated value of your belongings?",
  qEs: "¿Valor estimado de tus pertenencias?",
  options: [
    { value: "low", labelEn: "Under $20,000", labelEs: "Menos de $20,000" },
    { value: "mid", labelEn: "$20,000 — $50,000", labelEs: "$20,000 — $50,000" },
    { value: "high", labelEn: "$50,000 — $100,000", labelEs: "$50,000 — $100,000" },
    { value: "top", labelEn: "More than $100,000", labelEs: "Más de $100,000" },
  ],
};
const coverageFor: FormStepDef = {
  id: "coverageFor", type: "choice",
  qEn: "Who needs coverage?", qEs: "¿Quién necesita cobertura?",
  options: [
    { value: "self", labelEn: "Just me", labelEs: "Solo yo" },
    { value: "couple", labelEn: "Me + partner", labelEs: "Yo y mi pareja" },
    { value: "family", labelEn: "My family", labelEs: "Mi familia" },
  ],
};
const ageRange: FormStepDef = {
  id: "ageRange", type: "choice",
  qEn: "Age range of the primary applicant?",
  qEs: "¿Rango de edad del solicitante principal?",
  options: [
    { value: "under35", labelEn: "Under 35", labelEs: "Menos de 35" },
    { value: "35to54", labelEn: "35 — 54", labelEs: "35 — 54" },
    { value: "55to64", labelEn: "55 — 64", labelEs: "55 — 64" },
    { value: "65+", labelEn: "65 or older", labelEs: "65 o más" },
  ],
};

export const FLOWS: Record<ProductType, FormStepDef[]> = {
  bundle: [zipStep, ownRent, propertyType, currentlyInsuredAuto, vehicleCount, driverCount, startDate, nameStep, contactStep, consentStep],
  auto:   [zipStep, currentlyInsuredGeneric, vehicleCount, driverCount, incidents, startDate, nameStep, contactStep, consentStep],
  home:   [zipStep, ownRent, propertyType, yearBuilt, currentlyInsuredHome, startDate, nameStep, contactStep, consentStep],
  renters:[zipStep, rentalType, startDate, coverageAmount, nameStep, contactStep, consentStep],
  health: [zipStep, coverageFor, ageRange, currentlyInsuredHealth, startDate, nameStep, contactStep, consentStep],
};

export const FLOW_TITLES: Record<ProductType, { en: string; es: string }> = {
  bundle:  { en: "Bundle (Auto + Home) Quote", es: "Cotización Combinada (Auto + Hogar)" },
  auto:    { en: "Auto Insurance Quote", es: "Cotización de Seguro de Auto" },
  home:    { en: "Home Insurance Quote", es: "Cotización de Seguro de Hogar" },
  renters: { en: "Renters Insurance Quote", es: "Cotización para Inquilinos" },
  health:  { en: "Health Insurance Quote", es: "Cotización de Seguro de Salud" },
};

export function getStepLabel(step: FormStepDef, lang: Language): string {
  return lang === "es" ? step.qEs : step.qEn;
}
export function getStepHelper(step: FormStepDef, lang: Language): string | undefined {
  return lang === "es" ? step.helperEs : step.helperEn;
}
export function getOptionLabel(opt: ChoiceOption, lang: Language): string {
  return lang === "es" ? opt.labelEs : opt.labelEn;
}
