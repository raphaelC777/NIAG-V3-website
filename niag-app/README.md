# NIAG — Next.js Lead-Gen App

Production-ready Next.js (App Router) implementation of the NIAG lead-generation site, built
from the spec in `../NIAG_Claude_Code_Implementation_Prompt.md`.

## Stack

- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS
- Cloudflare Turnstile (preferred) or Google reCAPTCHA v3 — pluggable
- Edge runtime for `/api/geo`, Node runtime for `/api/lead`
- Vercel-aware IP geolocation with optional ipapi.co fallback

## First run

```bash
cd niag-app
cp .env.example .env.local
npm install
npm run dev
```

Open <http://localhost:3000>.

> If you don't have Node installed yet, grab the LTS from <https://nodejs.org>.

## Environment variables

See `.env.example`. Notable keys:

| Key                                | Used by                | Notes                                                   |
|------------------------------------|------------------------|---------------------------------------------------------|
| `BOT_PROTECTION_PROVIDER`          | `lib/botProtection.ts` | `turnstile` (default) or `recaptcha`                    |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`   | client `<BotProtection>` | Cloudflare Turnstile site key                          |
| `TURNSTILE_SECRET_KEY`             | server only            | Server-side verification                                 |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`   | client `<BotProtection>` | reCAPTCHA v3 site key (alt provider)                   |
| `RECAPTCHA_SECRET_KEY`             | server only            | reCAPTCHA secret                                         |
| `RECAPTCHA_MIN_SCORE`              | server only            | Default `0.5`                                            |
| `LEADPROSPER_ENDPOINT`             | server only            | POST URL for LeadProsper                                 |
| `LEADPROSPER_API_KEY`              | server only            | Bearer token                                             |
| `GHL_WEBHOOK_URL`                  | server only            | Go High Level webhook URL                                |
| `NEXT_PUBLIC_GTM_ID`               | layout                 | GTM container ID (optional)                              |
| `IPAPI_TOKEN`                      | server only            | Optional ipapi.co fallback (server-side only)            |

**Security:** never put `LEADPROSPER_*`, `TURNSTILE_SECRET_KEY`, or `RECAPTCHA_SECRET_KEY`
under `NEXT_PUBLIC_*`. The included code only reads them in route handlers.

## Routes

| Path                              | What it does                                                                |
|-----------------------------------|------------------------------------------------------------------------------|
| `/`                               | English homepage                                                             |
| `/es`                             | Spanish homepage                                                             |
| `/quote/[product]`                | Opens the homepage with the product flow auto-opened                         |
| `/es/quote/[product]`             | Same, Spanish                                                                |
| `/thank-you?product=…&zip=…`      | Post-submit results page                                                     |
| `/es/thank-you?product=…&zip=…`   | Spanish results page                                                         |
| `POST /api/lead`                  | Validates, verifies bot token, builds payload, fans out to LeadProsper + GHL |
| `GET /api/geo`                    | Returns `{ city, region, country, postal, source, confidence }`              |

`[product]` is one of: `bundle | auto | home | renters | health`.

## A/B/C variants

- `?variant=A|B|C` (or legacy `?ab=`) — sticky in `localStorage`
- Variant config: `lib/abTesting.ts`
- The variant controls hero headline, primary CTA copy, and the **hero** default product.
  The bottom CTA always defaults to **Bundle** per spec.

## Tracking

`window.dataLayer.push()` via `lib/tracking.ts`. Events covered:

`page_view`, `product_select`, `zip_entered`, `form_start`, `form_step_view`,
`form_step_complete`, `form_back_click`, `form_abandon`, `tcpa_consent_checked`,
`form_submit`, `lead_submit_success`, `lead_submit_error`, `phone_click`,
`language_toggle`, `blog_tab_click`, `quote_recovery_click`.

Each event payload carries `productType`, `language`, `abVariant`, `entryPoint`,
`zipCode`, and the UTM / click-id grab bag captured at landing (`utm_*`, `gclid`,
`fbclid`, `affiliate_id`).

## Quote flows

Defined in `lib/formSteps.ts`. Steps per the implementation spec:

| Product  | Steps |
|----------|-------|
| Bundle   | 10    |
| Auto     | 9     |
| Home     | 9     |
| Renters  | 7     |
| Health   | 8     |

Validation: `lib/validators.ts` (ZIP, email, US phone, product-specific required fields,
TCPA consent, bot token).

## Geo personalization

The `<Hero>` renders a small chip ("Compare local options in {region}") only when the geo
endpoint returns a region. The detected postal pre-fills the ZIP **as a suggestion** — the
user can overwrite it freely, and only the value the user submits is sent to partners.

No browser geolocation permission prompt fires on page load. Wire an opt-in "Use my
location" button in `<HeroVisual>` if you want explicit browser geo later.

## File map

```
app/
  layout.tsx              # Fonts, GTM, metadata
  page.tsx                # English homepage
  es/page.tsx             # Spanish homepage
  quote/[product]/page.tsx
  es/quote/[product]/page.tsx
  thank-you/page.tsx
  es/thank-you/page.tsx
  api/
    geo/route.ts          # IP-based personalization (edge)
    lead/route.ts         # Server validation + partner fan-out (node)
components/
  Header.tsx Hero.tsx HeroVisual.tsx ProductSelector.tsx ZipEntry.tsx
  TrustStrip.tsx ProductCards.tsx HowItWorks.tsx ExpertHelp.tsx
  MidPageCta.tsx ResourceTabs.tsx FAQ.tsx BottomCta.tsx Footer.tsx
  StickyMobileCta.tsx BotProtection.tsx
  SiteContext.tsx QuoteFlowProvider.tsx FormStep.tsx HomePage.tsx
  icons.tsx
lib/
  products.ts formSteps.ts tracking.ts geo.ts botProtection.ts
  leadPayload.ts validators.ts i18n.ts abTesting.ts
types/
  lead.ts tracking.ts
public/
  favicon.svg niag-logo.svg
```

## Deployment notes

- **Vercel:** geo headers (`x-vercel-ip-city`, `-region`, `-country`, `-postal-code`) come
  for free, so `/api/geo` returns real data with no extra config. Set the env vars in the
  Vercel dashboard.
- **Other hosts:** set `IPAPI_TOKEN` so `/api/geo` falls back to ipapi.co.
- **Logs:** lead submit errors are logged with the partner's reason. PII is not logged.

## What is intentionally not implemented

- No fake testimonials, BBB rating, or "save up to X%" claims.
- No browser geolocation prompt on page load.
- No silent submit of IP-derived ZIP — the user must see and edit it.
- No client-side LeadProsper / GHL credentials.
