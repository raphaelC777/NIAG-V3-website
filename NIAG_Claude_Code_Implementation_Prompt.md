# NIAG - Claude Code Implementation Prompt

Use this prompt in Claude Code after exporting/downloading the current Claude Design HTML.

Recommended workflow:

1. Export the Claude Design page as HTML/CSS/JS.
2. Put the exported files in the repo under `/raw-design` or paste the HTML into `raw-design/index.html`.
3. Open Claude Code in the project.
4. Paste the prompt below.

---

## Prompt For Claude Code

You are a senior Next.js engineer. Convert the current static NIAG HTML design into a production-ready, mobile-first lead-generation app.

The design/HTML already exists, but the logic is incomplete. Preserve the visual structure, but implement the actual quote flow, product-specific forms, tracking, geolocation personalization, bot protection, and integration placeholders.

## Project Context

Brand: **NIAG - National Insurance Assistance Group**

Goal: high-converting US insurance lead generation site for:

- Bundle: Auto + Home
- Auto
- Home
- Renters
- Health

The site must support:

- English and Spanish
- A/B/C hero variants
- Product-specific form flows
- Tracking by product, language, variant, and CTA entry point
- ZIP-first conversion flow
- IP-based personalization
- Bot prevention with reCAPTCHA or Cloudflare Turnstile
- LeadProsper + Go High Level placeholders
- TCPA consent capture

## Tech Stack

Use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- React components
- Server Route Handlers for lead submission and bot verification
- Environment variables for all secrets

If the project is not already initialized, create a Next.js app with App Router, TypeScript, and Tailwind.

## Files To Create / Organize

Create or refactor into this structure:

```text
app/
  layout.tsx
  page.tsx
  es/page.tsx
  quote/[product]/page.tsx
  es/quote/[product]/page.tsx
  thank-you/page.tsx
  api/
    lead/route.ts
    geo/route.ts
components/
  Header.tsx
  Hero.tsx
  ProductSelector.tsx
  ZipEntry.tsx
  TrustStrip.tsx
  ProductCards.tsx
  HowItWorks.tsx
  ExpertHelp.tsx
  MidPageCta.tsx
  ResourceTabs.tsx
  FAQ.tsx
  BottomCta.tsx
  Footer.tsx
  QuoteFlow.tsx
  FormStep.tsx
  BotProtection.tsx
  StickyMobileCta.tsx
lib/
  products.ts
  formSteps.ts
  tracking.ts
  geo.ts
  botProtection.ts
  leadPayload.ts
  validators.ts
  i18n.ts
  abTesting.ts
types/
  lead.ts
  tracking.ts
```

## Preserve Existing Design

Use the exported HTML design as visual reference. Do not discard the structure.

Preserve:

- Header
- Hero
- Product selector
- Quote preview/app-like module
- Trust strip
- Product cards
- How it works
- Self-serve vs expert help
- Mid-page CTA
- Resource/blog tabs
- FAQ
- Bottom CTA
- Footer

But convert all repeated/static pieces into clean React components.

## Visual Change Required

The current right-side hero mockup feels too fake/static:

- "Maria R."
- "3 partners available"
- generic carrier A/B/C rows
- floating testimonial card

Replace or improve it.

Preferred direction:

1. Use a real-looking visual block with a person using a phone and a car in the background, OR
2. Use a richer app-like quote dashboard that feels dynamic and believable.

If image assets are not available, build a polished placeholder component called `HeroVisual` with:

- app dashboard card
- licensed partner mini-card
- "ZIP-based matches" badge
- "No SSN requested" security badge
- subtle animated progress line
- no fake prices
- no fake real names unless clearly illustrative

Do not show unsupported claims like real reviews, BBB rating, or exact savings unless provided.

## Product Model

Create a product config:

```ts
type ProductType = 'bundle' | 'auto' | 'home' | 'renters' | 'health'
```

Each product must define:

- id
- English label
- Spanish label
- short description
- icon
- recommended flag
- route
- Spanish route
- tracking value

Default product:

```ts
bundle
```

## Form Entry Points

Every CTA or product click must pass:

- productType
- language
- abVariant
- entryPoint

Entry point values:

```ts
'header' |
'hero' |
'product_card' |
'mid_cta' |
'blog_card' |
'sticky_mobile' |
'bottom_cta' |
'footer' |
'quote_recovery'
```

When a user clicks:

- Header CTA: open default Bundle flow.
- Product card CTA: open that product flow.
- Hero CTA: open selected product flow.
- Mid-page CTA: open selected product flow.
- Blog card "Compare quotes": open relevant product flow.
- Sticky mobile CTA: open current/default product flow.
- Bottom CTA: open selected product flow.

Use routes like:

```text
/quote/bundle?entryPoint=hero&variant=A&lang=en
/quote/auto?entryPoint=product_card&variant=B&lang=en
/es/quote/home?entryPoint=mid_cta&variant=C&lang=es
```

## Quote Flow Logic

Implement dedicated form flows for each product using shared `QuoteFlow`.

Required UX:

- One question per screen.
- Progress bar.
- Back button.
- Continue button.
- Large tap-friendly controls.
- Mobile-first.
- Clear validation.
- "Why do we ask?" helper text for sensitive questions.
- Final TCPA consent checkbox.
- Bot protection token on submit.

Do not submit until:

- required fields are valid
- TCPA consent is checked
- bot protection token is present/verified server-side

### Bundle Steps

1. ZIP code / location
2. Own or rent your home?
3. Property type
4. Currently have auto insurance?
5. Number of vehicles
6. Number of drivers
7. Desired coverage start date
8. First and last name
9. Email and phone
10. TCPA consent + submit

### Auto Steps

1. ZIP code
2. Currently insured?
3. Number of vehicles
4. Number of drivers
5. Recent accidents/tickets?
6. Desired coverage start date
7. First and last name
8. Email and phone
9. TCPA consent + submit

### Home Steps

1. ZIP code / property location
2. Own or rent?
3. Property type
4. Approximate year built or home age range
5. Current insurance status
6. Desired coverage start date
7. First and last name
8. Email and phone
9. TCPA consent + submit

### Renters Steps

1. ZIP code
2. Apartment, house, condo, other
3. Move-in or policy start date
4. Desired coverage amount range
5. First and last name
6. Email and phone
7. TCPA consent + submit

### Health Steps

1. ZIP code
2. Individual or family coverage?
3. Age range
4. Current coverage status
5. Desired start date
6. First and last name
7. Email and phone
8. TCPA consent + submit

## Dynamic Geo / ZIP Personalization

Implement a safe IP-based personalization layer.

Important:

- Do not treat IP geolocation as verified user input.
- IP geolocation is approximate.
- Use it to personalize copy, not to silently submit data.
- If a ZIP/postal code is available, show it as an editable suggestion.
- If the user edits ZIP, the user's ZIP overrides the detected ZIP.

Implement `/api/geo`:

1. First read Vercel geolocation headers when deployed:
   - `x-vercel-ip-country`
   - `x-vercel-ip-country-region`
   - `x-vercel-ip-city`
2. If ZIP/postal is needed and not available from Vercel headers, optionally call an IP geolocation provider such as ipapi.co server-side.
3. Return:

```ts
{
  city?: string
  region?: string
  country?: string
  postal?: string
  source: 'vercel' | 'ipapi' | 'none'
  confidence: 'city' | 'region' | 'postal-estimated' | 'none'
}
```

Use geo data in the UI:

- Header chip: "Quotes near Miami, FL" or "ZIP-based matching"
- Hero copy: "Compare local options in Florida" if region exists
- ZIP field placeholder/suggestion: detected postal if available, otherwise blank
- Trust text: "Local matches update after ZIP"

Do not force exact ZIP.
Do not block user if geo fails.
Do not ask browser geolocation permission on page load.

Optional:

- Add "Use my location" button later, but only after user clicks it.

## Bot Protection

Implement bot protection using an adapter so we can choose either:

- Cloudflare Turnstile preferred, or
- Google reCAPTCHA v3 if requested.

Preferred implementation: Cloudflare Turnstile because it is less intrusive.

Environment variables:

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

BOT_PROTECTION_PROVIDER=turnstile
```

Create `components/BotProtection.tsx` that renders the selected provider.

Create `lib/botProtection.ts`:

- `verifyBotToken(token, provider, remoteIp?)`
- Validate server-side only.
- Never expose secret keys to client.
- If token validation fails, reject lead submit with a friendly error.

For Turnstile:

- Client token name: `cf-turnstile-response` or controlled React token.
- Server verify endpoint:

```text
POST https://challenges.cloudflare.com/turnstile/v0/siteverify
```

For Google reCAPTCHA:

- Server verify endpoint:

```text
POST https://www.google.com/recaptcha/api/siteverify
```

For v3, validate:

- `success`
- `score >= 0.5` initially
- expected action like `lead_submit`

Make threshold configurable:

```env
RECAPTCHA_MIN_SCORE=0.5
```

## Lead Submit API

Implement `POST /api/lead`.

Server should:

1. Parse payload.
2. Validate product-specific required fields.
3. Validate TCPA consent.
4. Validate bot token server-side.
5. Build normalized lead payload.
6. Send to placeholder integrations:
   - LeadProsper
   - Go High Level
7. Return success/failure.

Environment variables:

```env
LEADPROSPER_ENDPOINT=
LEADPROSPER_API_KEY=
GHL_WEBHOOK_URL=
NEXT_PUBLIC_GTM_ID=
```

If env vars are missing:

- Do not crash.
- Log a clear warning in development.
- Return mock success only in development.
- In production, return a controlled integration error unless configured.

## TCPA Consent

Final step must include:

```text
By clicking submit, I agree to be contacted by NIAG and/or its insurance partners at the phone number and email provided, including by automated technology, prerecorded message, SMS, and email, even if my number is on a do-not-call list. Consent is not a condition of purchase. Message and data rates may apply.
```

Store in payload:

- `tcpaConsent: true`
- `tcpaConsentText`
- `tcpaConsentTimestamp`
- `leadSourceUrl`
- `ipAddress`
- `userAgent`
- `language`
- `abVariant`
- `entryPoint`
- `productType`

## Tracking

Implement a `trackEvent()` helper that pushes to `window.dataLayer`.

Events:

- `page_view`
- `product_select`
- `zip_entered`
- `form_start`
- `form_step_view`
- `form_step_complete`
- `form_back_click`
- `form_abandon`
- `tcpa_consent_checked`
- `form_submit`
- `lead_submit_success`
- `lead_submit_error`
- `phone_click`
- `language_toggle`
- `blog_tab_click`
- `quote_recovery_click`

Payload:

```ts
{
  productType,
  language,
  abVariant,
  entryPoint,
  zipCode,
  city,
  region,
  geoSource,
  stepName,
  stepIndex,
  utm_source,
  utm_medium,
  utm_campaign,
  utm_content,
  utm_term,
  gclid,
  fbclid,
  affiliate_id
}
```

Capture UTM params from URL and persist in sessionStorage.

## A/B/C Variant Logic

Implement variant config:

```ts
type ABVariant = 'A' | 'B' | 'C'
```

Variant may come from:

1. URL param `?variant=A`
2. Existing cookie/sessionStorage
3. Random assignment

Persist the assigned variant.

Variants:

### Variant A - Bundle First

Headline:
`Bundle & save on auto + home insurance.`

Default product:
`bundle`

CTA:
`Get my free quote`

### Variant B - No Spam

Headline:
`Compare insurance quotes without the spam.`

Default product:
`auto`

CTA:
`Start my quote`

### Variant C - Local Expert

Headline:
`Compare coverage with local experts you can trust.`

Default product:
`bundle`

CTA:
`Talk to a quote expert`

Spanish variants:

- A: `Combina y ahorra en seguro de auto + hogar.`
- B: `Compara seguros sin enredos.`
- C: `Compara cobertura con expertos locales.`

## Spanish Version

Implement language config.

Routes:

- `/`
- `/es`
- `/quote/[product]`
- `/es/quote/[product]`

Spanish must be natural, not literal.

Spanish examples:

- `Gratis · 60 segundos · Sin SSN · Sin compromiso`
- `Compara sin enredos`
- `Te conectamos con expertos locales`
- `Obtener mi cotización`

## Validation

Implement basic validators:

- ZIP: US ZIP, 5 digits
- Email format
- US phone format
- Required fields per product
- TCPA required
- Bot token required

Use friendly error copy:

- "That ZIP doesn’t look right. Mind double-checking?"
- "Enter a phone number where a licensed partner can reach you."
- "Please confirm consent before submitting."

Spanish equivalents too.

## Thank You Page

Create `/thank-you`.

Content:

Headline:
`Thanks. We’re matching your request now.`

Subcopy:
`Watch for a call, text, or email from a licensed insurance partner.`

Next steps:

1. Keep your current policy handy.
2. Compare options before switching.
3. Ask about bundle savings.

Show selected product and ZIP if available.

## Responsive QA

Test at:

- 375px mobile
- 390px mobile
- 768px tablet
- 1024px laptop
- 1440px desktop

Must pass:

- No horizontal overflow.
- Header does not wrap awkwardly.
- Sticky CTA does not cover form controls.
- ZIP input uses numeric keyboard.
- Product cards are easy to tap.
- Multi-step form works on mobile.
- Hero visual does not dominate mobile before form.
- Forms preserve tracking params.

## Security / Privacy

Do:

- Keep secrets server-side only.
- Verify bot token server-side.
- Do not submit IP-derived ZIP unless user confirms or edits.
- Do not log full PII in production console.
- Do not expose LeadProsper/GHL keys to client.

Do not:

- Put secret keys in `NEXT_PUBLIC_`.
- Trust client-side reCAPTCHA/Turnstile alone.
- Use exact location claims from IP geolocation.
- Add fake reviews, fake prices, or unsupported carrier logos.

## Acceptance Criteria

Done means:

1. Static HTML is converted into maintainable Next.js components.
2. All product CTAs open the correct quote flow.
3. Bundle is default/recommended.
4. EN and ES routes work.
5. A/B/C variants work.
6. Geo personalization displays city/region or editable ZIP suggestion.
7. Bot protection is rendered and verified server-side.
8. Lead submission route validates and builds normalized payload.
9. Tracking events fire with product/language/variant/entryPoint.
10. Thank-you page works.
11. Mobile UX is polished and fast.
12. No fake claims are introduced.

Build this now.
