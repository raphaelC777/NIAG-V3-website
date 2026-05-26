"use client";
import type { TrackEventName, TrackPayload } from "@/types/tracking";

declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; NIAG_DEBUG_TRACKING?: boolean }
}

const UTM_KEYS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
  "gclid", "fbclid", "affiliate_id",
];

let cachedUtm: Record<string, string | null> | null = null;

function captureUtm(): Record<string, string | null> {
  if (cachedUtm) return cachedUtm;
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string | null> = {};
  UTM_KEYS.forEach((k) => {
    const v = params.get(k) || params.get(k === "affiliate_id" ? "aff" : k);
    if (v) {
      try { sessionStorage.setItem("niag_" + k, v); } catch {}
      out[k] = v;
    } else {
      try { out[k] = sessionStorage.getItem("niag_" + k); } catch { out[k] = null; }
    }
  });
  cachedUtm = out;
  return out;
}

export function trackEvent(event: TrackEventName, payload: TrackPayload = {}) {
  if (typeof window === "undefined") return;
  const utm = captureUtm();
  const data = {
    event,
    timestamp: new Date().toISOString(),
    ...utm,
    ...payload,
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
  if (window.NIAG_DEBUG_TRACKING) {
    // eslint-disable-next-line no-console
    console.log("[track]", event, data);
  }
}

export const Events = {
  PAGE_VIEW: "page_view",
  PRODUCT_SELECT: "product_select",
  ZIP_ENTERED: "zip_entered",
  FORM_START: "form_start",
  FORM_STEP_VIEW: "form_step_view",
  FORM_STEP_COMPLETE: "form_step_complete",
  FORM_BACK_CLICK: "form_back_click",
  FORM_ABANDON: "form_abandon",
  TCPA_CONSENT_CHECKED: "tcpa_consent_checked",
  FORM_SUBMIT: "form_submit",
  LEAD_SUBMIT_SUCCESS: "lead_submit_success",
  LEAD_SUBMIT_ERROR: "lead_submit_error",
  PHONE_CLICK: "phone_click",
  LANGUAGE_TOGGLE: "language_toggle",
  BLOG_TAB_CLICK: "blog_tab_click",
  QUOTE_RECOVERY_CLICK: "quote_recovery_click",
} as const satisfies Record<string, TrackEventName>;
