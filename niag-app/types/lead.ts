export type ProductType = "bundle" | "auto" | "home" | "renters" | "health";
export type ABVariant = "A" | "B" | "C";
export type Language = "en" | "es";

export type EntryPoint =
  | "header"
  | "hero"
  | "product_card"
  | "mid_cta"
  | "blog_card"
  | "sticky_mobile"
  | "bottom_cta"
  | "footer"
  | "quote_recovery"
  | "mobile_drawer"
  | "deep_link";

export interface NameAnswer { first: string; last: string }
export interface ContactAnswer { email: string; phone: string }

export interface FormAnswers {
  zip?: string;
  ownRent?: string;
  propertyType?: string;
  currentlyInsured?: string;
  currentlyInsuredAuto?: string;
  vehicleCount?: string;
  driverCount?: string;
  incidents?: string;
  startDate?: string;
  yearBuilt?: string;
  rentalType?: string;
  coverageAmount?: string;
  coverageFor?: string;
  ageRange?: string;
  name?: NameAnswer;
  contact?: ContactAnswer;
  consent?: boolean;
}

export interface UtmPayload {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  affiliate_id?: string | null;
}

export interface LeadCerts {
  /** Jornaya LeadiD token (https://www.jornaya.com). Public, safe to log. */
  jornayaLeadId?: string;
  /** TrustedForm cert URL (https://www.activeprospect.com/products/trustedform/). */
  trustedFormCertUrl?: string;
  /** TrustedForm ping URL (used to claim cert later). */
  trustedFormPingUrl?: string;
  /** TrustedForm cert token (alternative to cert URL). */
  trustedFormCertToken?: string;
}

export interface LeadPayload {
  productType: ProductType;
  language: Language;
  abVariant: ABVariant;
  entryPoint: EntryPoint;
  /** Optional landing-page slug, e.g. "bundle-savings-v2". Used for attribution. */
  landerSlug?: string;
  answers: FormAnswers;
  consent: {
    tcpaConsent: boolean;
    tcpaConsentText: string;
    tcpaConsentTimestamp: string;
    leadSourceUrl?: string;
    ipAddress?: string;
    userAgent?: string;
  };
  utm: UtmPayload;
  botToken?: string;
  certs?: LeadCerts;
  submittedAt: string;
}
