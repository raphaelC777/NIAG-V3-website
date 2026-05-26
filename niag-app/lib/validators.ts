import type { FormAnswers, Language, ProductType } from "@/types/lead";

const ZIP_RX = /^\d{5}$/;
const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RX = /^\+?1?[\s().-]*\d{3}[\s().-]*\d{3}[\s().-]*\d{4}$/;

export const isZip = (v: string) => ZIP_RX.test(v);
export const isEmail = (v: string) => EMAIL_RX.test(v);
export const isUsPhone = (v: string) => PHONE_RX.test(v);

export const messages = {
  en: {
    required: "This field is required.",
    invalidZip: "That ZIP doesn’t look right. Mind double-checking?",
    invalidEmail: "Please enter a valid email address.",
    invalidPhone: "Enter a phone number where a licensed partner can reach you.",
    consentRequired: "Please confirm consent before submitting.",
    botRequired: "Please complete the verification before submitting.",
  },
  es: {
    required: "Este campo es obligatorio.",
    invalidZip: "Ese código postal no se ve bien. ¿Lo verificas?",
    invalidEmail: "Ingresa un correo electrónico válido.",
    invalidPhone: "Ingresa un teléfono donde un socio licenciado pueda llamarte.",
    consentRequired: "Confirma tu consentimiento para continuar.",
    botRequired: "Completa la verificación antes de enviar.",
  },
} as const;

export function getMsg(lang: Language) {
  return messages[lang];
}

/** Server-side required-field validation per product. */
export function validateLeadAnswers(product: ProductType, a: FormAnswers): string[] {
  const errs: string[] = [];
  if (!a.zip || !isZip(a.zip)) errs.push("zip");
  if (!a.startDate && product !== "renters") errs.push("startDate");
  if (!a.name || !a.name.first || !a.name.last) errs.push("name");
  if (!a.contact || !isEmail(a.contact.email)) errs.push("contact.email");
  if (!a.contact || !isUsPhone(a.contact.phone)) errs.push("contact.phone");
  if (!a.consent) errs.push("consent");

  switch (product) {
    case "bundle":
      if (!a.ownRent) errs.push("ownRent");
      if (!a.propertyType) errs.push("propertyType");
      if (!a.currentlyInsuredAuto) errs.push("currentlyInsuredAuto");
      if (!a.vehicleCount) errs.push("vehicleCount");
      if (!a.driverCount) errs.push("driverCount");
      break;
    case "auto":
      if (!a.currentlyInsured) errs.push("currentlyInsured");
      if (!a.vehicleCount) errs.push("vehicleCount");
      if (!a.driverCount) errs.push("driverCount");
      if (!a.incidents) errs.push("incidents");
      break;
    case "home":
      if (!a.ownRent) errs.push("ownRent");
      if (!a.propertyType) errs.push("propertyType");
      if (!a.yearBuilt) errs.push("yearBuilt");
      if (!a.currentlyInsured) errs.push("currentlyInsured");
      break;
    case "renters":
      if (!a.rentalType) errs.push("rentalType");
      if (!a.startDate) errs.push("startDate");
      if (!a.coverageAmount) errs.push("coverageAmount");
      break;
    case "health":
      if (!a.coverageFor) errs.push("coverageFor");
      if (!a.ageRange) errs.push("ageRange");
      if (!a.currentlyInsured) errs.push("currentlyInsured");
      break;
  }
  return errs;
}
