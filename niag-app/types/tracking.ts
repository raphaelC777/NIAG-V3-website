import type { ABVariant, EntryPoint, Language, ProductType } from "./lead";

export type TrackEventName =
  | "page_view"
  | "product_select"
  | "zip_entered"
  | "form_start"
  | "form_step_view"
  | "form_step_complete"
  | "form_back_click"
  | "form_abandon"
  | "tcpa_consent_checked"
  | "form_submit"
  | "lead_submit_success"
  | "lead_submit_error"
  | "phone_click"
  | "language_toggle"
  | "blog_tab_click"
  | "quote_recovery_click";

export interface TrackPayload {
  productType?: ProductType;
  language?: Language;
  abVariant?: ABVariant;
  entryPoint?: EntryPoint;
  zipCode?: string | null;
  city?: string | null;
  region?: string | null;
  geoSource?: string | null;
  stepName?: string;
  stepIndex?: number;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  affiliate_id?: string | null;
  [k: string]: unknown;
}
