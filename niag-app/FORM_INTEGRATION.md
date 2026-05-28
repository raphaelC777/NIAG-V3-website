# Intake form — integration guide

The intake form is the most important piece of this app. This guide covers
everything you need to wire it up to production: where the code lives, how
to switch between modal and standalone-tab mode, and how to flip on
Cloudflare Turnstile, Jornaya, and TrustedForm.

---

## 1. Where the form lives

| Concern                          | File                                          |
|----------------------------------|-----------------------------------------------|
| Step definitions (per product)   | [`lib/formSteps.ts`](lib/formSteps.ts)        |
| Provider + submit logic          | [`components/QuoteFlowProvider.tsx`](components/QuoteFlowProvider.tsx) |
| Field rendering (zip/name/etc.)  | [`components/FormStep.tsx`](components/FormStep.tsx) |
| Standalone /form route page      | [`components/StandaloneForm.tsx`](components/StandaloneForm.tsx) |
| Client lead-cert scripts         | [`components/LeadCertScripts.tsx`](components/LeadCertScripts.tsx) |
| Client bot-protection widget     | [`components/BotProtection.tsx`](components/BotProtection.tsx) |
| Lead API + partner dispatch      | [`app/api/lead/route.ts`](app/api/lead/route.ts) |
| Server bot verification          | [`lib/botProtection.ts`](lib/botProtection.ts) |
| Partner payload normalization    | [`lib/leadPayload.ts`](lib/leadPayload.ts)   |
| Landing-page variations registry | [`lib/landers.ts`](lib/landers.ts)           |

---

## 2. Opening the form: modal vs. new tab

Any CTA in the app calls `useQuoteFlow().open(product, entryPoint, opts?)`.

```ts
const { open } = useQuoteFlow();

// Default — opens the multi-step modal over the current page
open("bundle", "hero");

// New tab — sends the user to /form/bundle?ep=hero with a clean session
open("bundle", "hero", { mode: "tab" });

// Modal with pre-filled ZIP
open("auto", "hero", { zip: "33101" });
```

The mode is configurable **per lander** via `formOpenMode` in
`lib/landers.ts`. Two landers can ship the same product with opposite
modes so you can A/B which converts better.

---

## 3. Landing-page variations

Every lander lives at `/lp/<slug>` (and `/es/lp/<slug>`). To add a new one:

1. Open `lib/landers.ts`.
2. Append a `LanderSpec` row:

```ts
{
  slug: "bundle-florida-fl",
  product: "bundle",
  formOpenMode: "modal",
  sections: { trustStrip: true, faq: true, footer: true },
  en: {
    eyebrow: "Florida drivers",
    headline: "Florida bundle quotes — auto + home in 60 seconds.",
    sub: "Compare carriers that actually write in FL. No SSN.",
    ctaLabel: "Get my FL quote",
    trustBullets: ["FL-licensed", "60 seconds", "Free"],
  },
  es: {
    eyebrow: "Conductores en Florida",
    headline: "Cotización combinada en FL — auto + hogar en 60 segundos.",
    sub: "Compara aseguradoras reales de FL. Sin SSN.",
    ctaLabel: "Cotizar en FL",
    trustBullets: ["Licenciados en FL", "60 segundos", "Gratis"],
  },
},
```

3. Deploy. The route is generated automatically.

Point ads at `/lp/bundle-florida-fl`. Each lead carries `lander_slug` in
the partner payload, so attribution lines up in the warehouse.

Seed landers:

| Slug                  | Product | Mode    | Hypothesis                                   |
|-----------------------|---------|---------|----------------------------------------------|
| `bundle-default`      | bundle  | modal   | Bundle-first positioning                     |
| `bundle-savings`      | bundle  | tab     | $710/yr savings claim, fewer sections        |
| `bundle-spam`         | bundle  | modal   | Anti-spam framing                            |
| `auto-fast`           | auto    | modal   | "60 seconds" speed framing                   |
| `auto-switch`         | auto    | tab     | Switch-cost objection handling               |
| `home-quote`          | home    | modal   | Plain homeowners positioning                 |
| `renters-cheap`       | renters | modal   | $12/mo price anchor                          |
| `health-marketplace`  | health  | tab     | Licensed broker framing                      |

---

## 4. Cloudflare Turnstile (bot protection)

Already wired. Site key is public-safe; the secret must stay server-side.

To turn it **on**:

```bash
# .env.local (or your hosting provider's env panel)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAAxxxxx
TURNSTILE_SECRET_KEY=0x4AAAAAAAxxxxx_secret
```

To turn it **off** (e.g. local dev): leave both blank. The client emits a
`DEV_BYPASS` token and the server only honors that bypass when
`NODE_ENV !== "production"`. So in production with blank keys, every
submission is rejected — which is the safe default.

reCAPTCHA v3 fallback is supported by setting
`NEXT_PUBLIC_RECAPTCHA_SITE_KEY` + `RECAPTCHA_SECRET_KEY`.

The widget renders on the final TCPA consent step
(see [`QuoteFlowProvider.tsx:241`](components/QuoteFlowProvider.tsx#L241-L245)).

---

## 5. Jornaya LeadiD

Public Campaign ID only — there is no client secret for Jornaya.

```bash
NEXT_PUBLIC_JORNAYA_CAMPAIGN_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

When set, [`LeadCertScripts.tsx`](components/LeadCertScripts.tsx) injects
the LeadiD `create.leadid.com/campaign/<id>.js` script while the form is
open. The cert token is auto-populated into hidden input `#leadid_token`,
which the submit handler reads via `readLeadCerts()` and ships to the
partner as `jornaya_leadid`.

If you also want the TCPA disclosure hash, the existing markup in the
consent step is the disclosure target — point Jornaya's
`leadid_tcpa_disclosure` snippet at the same `<label>` block in
[`FormStep.tsx`](components/FormStep.tsx) (the one wrapping the consent
checkbox + text). Most buyers accept just the LeadiD token.

---

## 6. TrustedForm (ActiveProspect)

No secret keys — it's purely client-side.

```bash
NEXT_PUBLIC_TRUSTEDFORM_ENABLED=1
```

When enabled, the script loads from `api.trustedform.com/trustedform.js`
and writes the cert URL into `#xxTrustedFormCertUrl_0`. The submit
handler reads it via `readLeadCerts()` and ships:

- `trustedform_cert_url`
- `trustedform_ping_url`
- `trustedform_cert_token`

to the partner. Buyers claim the cert later via their TrustedForm
account.

---

## 7. Lead partners (LeadProsper / Go High Level)

```bash
LEADPROSPER_ENDPOINT=https://api.leadprosper.io/leads
LEADPROSPER_API_KEY=your_api_key
GHL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/...
```

`app/api/lead/route.ts` dispatches to both in parallel. A lead is
considered accepted if **at least one** partner returns 2xx. If both are
configured and both fail, the API returns `502` and the client shows the
error state.

Local dev (no env vars) returns a `mock_dev` success so the thank-you
flow can be exercised end-to-end.

---

## 8. Submit-time payload

```ts
// What the client sends to /api/lead
{
  productType: "bundle",
  language: "en",
  abVariant: "A",
  entryPoint: "hero",
  landerSlug: "bundle-savings",   // populated when URL matches /lp/<slug>
  answers: { zip, name, contact, ... },
  consent: {
    tcpaConsent: true,
    tcpaConsentText: "<exact text user agreed to>",
    tcpaConsentTimestamp: "2026-05-28T16:21:08.412Z",
  },
  botToken: "<turnstile token>",
  certs: {
    jornayaLeadId: "...",
    trustedFormCertUrl: "https://cert.trustedform.com/...",
    trustedFormPingUrl: "https://ping.trustedform.com/...",
    trustedFormCertToken: "...",
  },
  utm: { utm_source, gclid, fbclid, affiliate_id, ... },
  submittedAt: "2026-05-28T16:21:08.412Z",
}
```

Server then enriches with `leadSourceUrl`, `ipAddress`, `userAgent`
before calling partners.

---

## 9. Adding a new step or field

1. Append a `FormStepDef` in [`lib/formSteps.ts`](lib/formSteps.ts).
2. Add the new field name to `FormAnswers` in
   [`types/lead.ts`](types/lead.ts).
3. If it isn't a `choice` / `name` / `contact` / `zip` / `consent` step,
   add a render branch in [`components/FormStep.tsx`](components/FormStep.tsx).
4. Add it to the right product's `FLOWS` array.
5. If the new field should ship to partners, surface it in
   [`lib/leadPayload.ts`](lib/leadPayload.ts) → `partnerPayload`.

---

## 10. Partial-form drafts ("continue where you left off")

The form autosaves on every step change. Three discovery paths offer a
draft back to the user:

1. **`?resume=<draftId>` in the URL** — for SMS/email recovery links.
2. **`niag_draft_id` httpOnly cookie** — same browser, same device.
3. **localStorage** — same browser, offline-safe fallback.

### Storage

- **Production:** Vercel KV (or any Upstash-compatible Redis). 7-day TTL.
  Set `KV_REST_API_URL` + `KV_REST_API_TOKEN`. When you enable Vercel KV
  in the dashboard, these are auto-injected — no extra config needed.
- **Local dev:** in-memory map (per process). Restarts wipe drafts.

The store is fronted by [`lib/draftStorage.ts`](lib/draftStorage.ts) with
a single tiny REST client — no SDK dependency.

### Cookies & privacy

- `niag_draft_id` — httpOnly, secure, SameSite=Lax, 7-day max-age.
- IP address and user-agent are stored as **audit fields only**, never
  used as a lookup key. (Same-IP lookup leaks data across users on
  shared networks.)
- TCPA consent state is stripped before persistence — users must
  re-accept consent each session.
- The UI never displays restored PII before the user clicks "Continue".

### Banner

[`components/ResumeBanner.tsx`](components/ResumeBanner.tsx) renders at
the top of `/` and `/lp/[slug]` whenever a draft is detected:

> ↩  Continue where you left off?
> We saved your progress on the Bundle quote — step 4 of 10.
> [Start over]  [Continue]

The banner shows only the product label + step number, never the user's
name, ZIP, or contact info.

### Abandonment recovery (Go High Level)

Configure a GHL workflow that fires when a draft sits idle for N
minutes. Send an SMS / email containing a personalized link:

```
https://niag.com/form/bundle?resume=<draftId>&utm_source=ghl&utm_campaign=abandon
```

When the user clicks, `/form/[product]` fetches the draft from KV, drops
the user right back at the step where they stopped, and pre-fills every
answer except the TCPA consent.

### Programmatic API

If a future feature needs to trigger resume from JS:

```ts
import { loadDraftRemote } from "@/lib/draftClient";
import { useQuoteFlow } from "@/components/QuoteFlowProvider";

const { resumeDraft } = useQuoteFlow();
const draft = await loadDraftRemote();           // reads cookie
if (draft) resumeDraft(draft, "header_recovery");
```

### Endpoints

| Method | Path                                | Purpose                          |
|--------|-------------------------------------|----------------------------------|
| GET    | `/api/draft`                        | Read by cookie                   |
| GET    | `/api/draft?draftId=<id>`           | Read by ID (recovery link)       |
| POST   | `/api/draft`                        | Upsert draft + (re)set cookie    |
| DELETE | `/api/draft`                        | Wipe draft + cookie              |

---

## 11. Tracking

Every flow event lands in `window.dataLayer` (GTM). Toggle GTM with
`NEXT_PUBLIC_GTM_ID`. Open the browser console with
`window.NIAG_DEBUG_TRACKING = true` to see events live (already on in
dev).
