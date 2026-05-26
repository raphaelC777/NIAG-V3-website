import type { LeadPayload } from "@/types/lead";

interface NormalizedLead extends LeadPayload {
  partnerPayload: Record<string, unknown>;
}

/** Build a normalized lead payload from validated client input + server context. */
export function buildNormalizedLead(
  raw: LeadPayload,
  ctx: { leadSourceUrl?: string; ipAddress?: string; userAgent?: string },
): NormalizedLead {
  const consent = {
    tcpaConsent: !!raw.consent?.tcpaConsent,
    tcpaConsentText: raw.consent?.tcpaConsentText || "",
    tcpaConsentTimestamp: raw.consent?.tcpaConsentTimestamp || new Date().toISOString(),
    leadSourceUrl: ctx.leadSourceUrl,
    ipAddress: ctx.ipAddress,
    userAgent: ctx.userAgent,
  };
  const partnerPayload = {
    product: raw.productType,
    language: raw.language,
    ab_variant: raw.abVariant,
    entry_point: raw.entryPoint,
    zip: raw.answers.zip,
    first_name: raw.answers.name?.first,
    last_name: raw.answers.name?.last,
    email: raw.answers.contact?.email,
    phone: raw.answers.contact?.phone,
    own_or_rent: raw.answers.ownRent,
    property_type: raw.answers.propertyType,
    year_built: raw.answers.yearBuilt,
    currently_insured: raw.answers.currentlyInsured ?? raw.answers.currentlyInsuredAuto,
    vehicle_count: raw.answers.vehicleCount,
    driver_count: raw.answers.driverCount,
    incidents: raw.answers.incidents,
    coverage_for: raw.answers.coverageFor,
    age_range: raw.answers.ageRange,
    rental_type: raw.answers.rentalType,
    coverage_amount: raw.answers.coverageAmount,
    start_date: raw.answers.startDate,
    tcpa_consent: consent.tcpaConsent,
    tcpa_consent_text: consent.tcpaConsentText,
    tcpa_consent_timestamp: consent.tcpaConsentTimestamp,
    lead_source_url: consent.leadSourceUrl,
    ip_address: consent.ipAddress,
    user_agent: consent.userAgent,
    ...raw.utm,
    submitted_at: raw.submittedAt,
  };
  return { ...raw, consent, partnerPayload };
}

interface DeliveryResult { ok: boolean; provider: string; reason?: string; data?: unknown }

export async function sendToLeadProsper(payload: Record<string, unknown>): Promise<DeliveryResult> {
  const endpoint = process.env.LEADPROSPER_ENDPOINT;
  const apiKey = process.env.LEADPROSPER_API_KEY;
  if (!endpoint) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("[LeadProsper] LEADPROSPER_ENDPOINT not set — returning mock success in dev.");
      return { ok: true, provider: "leadprosper", reason: "mock_dev" };
    }
    return { ok: false, provider: "leadprosper", reason: "endpoint_not_configured" };
  }
  try {
    const r = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    const data = await r.json().catch(() => ({}));
    return { ok: r.ok, provider: "leadprosper", data, reason: r.ok ? undefined : `http_${r.status}` };
  } catch {
    return { ok: false, provider: "leadprosper", reason: "network_error" };
  }
}

export async function sendToGoHighLevel(payload: Record<string, unknown>): Promise<DeliveryResult> {
  const url = process.env.GHL_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("[GoHighLevel] GHL_WEBHOOK_URL not set — returning mock success in dev.");
      return { ok: true, provider: "gohighlevel", reason: "mock_dev" };
    }
    return { ok: false, provider: "gohighlevel", reason: "endpoint_not_configured" };
  }
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    return { ok: r.ok, provider: "gohighlevel", reason: r.ok ? undefined : `http_${r.status}` };
  } catch {
    return { ok: false, provider: "gohighlevel", reason: "network_error" };
  }
}
