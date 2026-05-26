# NIAG — Master Build Plan v3

**National Insurance Assistance Group — Optimized for Codex 5.5 + GHL + LeadProsper**

> "You build the product. Ryan creates the demand."

**Document version:** v3 (supersedes v2)
**Owner:** Raphael
**Last updated:** May 2026
**Status:** Approved for build — aligned with `NIAG_Brand_Guidelines_v1.md` and `NIAG_Competitive_Intelligence_v1.md`

---

## ⚡ Ryan's Mandate (context for every decision)

> "Within one day you're going to be able to create landers and an entire marketing plan and dashboard for us. This is going to take off very quickly. I will have extremely high expectations."
>
> "You will create the product and I will create the demand."

**This means:**

- **Speed is a feature.** Every technical decision favors shipping fast over perfection.
- **Dashboard is required.** Ryan needs real-time leads, conversion rates, and revenue — not just GA4.
- **GHL is the command center.** All automations and reporting feed Go High Level.
- **The lander IS the product.** Ryan sells traffic and buyers. You deliver a machine that converts.

---

## 1. Project Overview

- **Company:** National Insurance Assistance Group (NIAG)
- **Goal:** High-converting lead gen for US insurance (Auto + Home Bundle focus), sold via ping-post and shared model through LeadProsper
- **Primary benchmark:** **insurify.com** (market leader — form UX, mobile execution, growth strategy)
- **Secondary benchmark:** **compare.com** (best engagement / lowest bounce rate)
- **Tertiary benchmark:** **insurance.com** (clean visual trust signals — design inspiration only)
- **Affiliate model benchmark:** **insure.com** (13.95% affiliate channel — replicate)
- **Stack:** Next.js 14 (App Router) + Tailwind CSS + TypeScript
- **Languages:** English + Spanish (i18n from day one — Hispanic market is the biggest untapped opportunity)
- **Mobile-first assumption:** **85%+ mobile traffic** (matches Insurify 85.12% and compare 83.73%)
- **Deployment:** Vercel
- **Brand:** Navy `#0A1F44` + Money Green `#1FB573` + Warm Neutrals — see `NIAG_Brand_Guidelines_v1.md`

### ⚠️ Critical correction from v2

v2 incorrectly assigned insurance.com as primary visual benchmark. Competitive Intelligence data demolishes that: insurance.com has 9x less traffic than Insurify and ranks #741 vs Insurify #54. **Insurify is the primary benchmark for form UX, mobile execution, and copy strategy.** Insurance.com remains only as a clean visual reference — never the architectural model.

---

## 2. What Codex 5.5 Builds — Priority Order

### 🔴 P0 — Must ship Day 1

1. **Homepage lander (EN)** — hero + embedded multi-step form, trust signals, mobile-first
2. **Multi-step form** — fully working, 4 steps, Auto + Home Bundle focus (NO Health/Life in MVP)
3. **LeadProsper API integration** — POST lead on submit, handle ping-post response
4. **GHL webhook** — send lead to Go High Level pipeline simultaneously with LeadProsper
5. **GTM dataLayer events** — full funnel tracking + primary conversion event
6. **Results page** — post-submit redirect UI (carrier cards WITHOUT fake quote estimates)
7. **Privacy Policy + Terms + Do-Not-Sell** — required for paid ads to run
8. **Brand system applied** — Navy/Green/Cream tokens, Fraunces + Inter, per Brand Guidelines v1

### 🟡 P1 — Ship within 48 hours

9. **Spanish version (`/es`)** — i18n component, culturally adapted copy (not literal translation)
10. **Affiliate lander system** (`/lp/[slug]`) — data-driven via `affiliates.ts`
11. **Source tracking landers** (`/lp/google`, `/lp/facebook`)
12. **GHL pipeline configured** — lead stages mapped to form steps
13. **A/B test framework** — middleware variant assignment (single test active at launch)
14. **Jornaya + TrustedForm** — full integration on all forms

### 🟢 P2 — Week 2

15. `/auto` dedicated lander
16. `/bundle` dedicated lander (highest CPL — invest most copy time here)
17. Top 5 state landers via dynamic ZIP confirmation (`/texas`, `/florida`, `/california`, `/new-york`, `/georgia`)
18. Exit-intent popup (mobile-friendly)
19. GHL automation sequences (SMS + email follow-up for abandoned leads — see Section 3)

### 🔵 P3 — Week 3+

20. Geo-personalized headline by IP state (deferred from P1 — diminishing returns, do only after MVP validates)
21. All 50 state landers
22. Blog SEO foundation (only after paid validates conversion)
23. Exclusive lead product
24. Advanced quiz-style form A/B variant

---

## 3. Go High Level — Command Center Integration

**GHL is where Ryan lives.** Every lead, every stage change, every revenue event feeds GHL.

### GHL Pipeline Structure

```
Pipeline: "Insurance Leads"

Stage 1: "New Lead"             ← triggered on form_start (Step 1 selected)
Stage 2: "ZIP Captured"         ← triggered on form_step_2 complete
Stage 3: "Details Captured"     ← triggered on form_step_3 complete
Stage 4: "Contact Reached"      ← triggered on form_step_4 viewed (not submitted)
Stage 5: "CONVERTED"            ← triggered on form_submit ✅
Stage 6: "Sent to LeadProsper"  ← after successful LP API POST
Stage 7: "Quote Clicked"        ← user clicked a carrier on results page
Stage 8: "Abandoned"            ← inactivity webhook (see automations)
```

### GHL Webhook Payload

```typescript
// lib/ghl.ts
const GHL_WEBHOOK = process.env.GHL_WEBHOOK_URL;

export async function sendToGHL(data: LeadData, stage: string) {
  await fetch(GHL_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // Standard contact fields
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,

      // Custom fields
      insurance_type: data.insuranceType,        // 'auto' | 'home' | 'bundle'
      zip_code: data.zip,
      state: data.state,
      city: data.city,
      language: data.language,                    // 'en' | 'es'

      // Vehicle (if auto or bundle)
      vehicle_year: data.vehicleYear,
      vehicle_make: data.vehicleMake,
      vehicle_model: data.vehicleModel,
      drivers_count: data.driversCount,
      violations: data.violations,
      currently_insured: data.currentlyInsured,

      // Home (if home or bundle)
      property_type: data.propertyType,
      ownership: data.ownership,
      year_built: data.yearBuilt,
      home_value_range: data.homeValueRange,

      // Lead quality
      lead_stage: stage,
      lead_score: calculateLeadScore(data),

      // Attribution
      utm_source: data.utmSource,
      utm_medium: data.utmMedium,
      utm_campaign: data.utmCampaign,
      utm_content: data.utmContent,
      utm_term: data.utmTerm,
      gclid: data.gclid,
      fbclid: data.fbclid,
      affiliate_id: data.affiliateId,
      lander_id: data.landerId,
      lander_url: data.landerUrl,
      ab_variant: data.abVariant,

      // Certification (TCPA compliance)
      jornaya_lead_id: data.jornayaLeadId,
      trustedform_cert: data.trustedformCert,
      tcpa_consent_text: data.tcpaConsentText,    // archive exact text shown
      tcpa_consent_timestamp: data.tcpaTimestamp,

      // Timestamps
      form_started_at: data.formStartedAt,
      submitted_at: new Date().toISOString(),
    })
  });
}
```

### GHL Automation Sequences (configured in GHL UI, not in code)

**⚠️ Timing corrected from v2** — aggressive timings (15min/30min) trigger spam classifiers on Twilio/AT&T/Verizon. Below are TCPA-safer windows.

#### Sequence A — "Abandoned Step 2-3" (high volume)
```
Trigger: lead_stage = "ZIP Captured" or "Details Captured" + no update in 2 hours
→ Wait 2 hours → SMS: "Hi [name], still looking for insurance quotes?
                       Takes 60 seconds: [link] · Reply STOP to opt out"
→ Wait 22 hours → Email: "Your free quote is waiting..."
→ Total: 2 touches max, no third SMS attempt
```

#### Sequence B — "Abandoned Step 4" (highest value)
```
Trigger: lead_stage = "Contact Reached" + no form_submit in 1 hour
→ Wait 1 hour → SMS: "Hi [name]! You were close to your free quotes.
                      Finish now: [link] · STOP to opt out"
→ Wait 4 hours → Email with urgency
→ Total: 2 touches max
```

#### Sequence C — "Converted — bundle upsell"
```
Trigger: lead_stage = "CONVERTED" + insurance_type = 'auto'
→ Wait 3 days → Email: "Did you find a good rate? Also — bundling your home insurance saves 25% more"
```

#### Sequence D — "Spanish leads"
Same as A/B/C but in ES, triggered when `language = 'es'`. All TCPA disclosures must be in Spanish in addition to English.

#### Sequence E — "Cool-down" (TCPA safety)
```
Trigger: contact replied STOP or unsubscribed
→ Immediately remove from all sequences
→ Tag contact: "DO NOT CONTACT"
→ Suppress from all future campaigns
```

### GHL Dashboard for Ryan

Configure in GHL → Reporting → Custom Dashboard:
- Total leads today / this week / this month
- Conversion rate by lander (auto vs bundle vs affiliate)
- Conversion rate by language (EN vs ES)
- Estimated revenue (lead count × avg payout per buyer)
- Funnel visualization (Stage 1 → Stage 7)
- Top performing traffic source (UTM breakdown)
- Abandoned leads count (recovery opportunity)
- LeadProsper acceptance rate (lead quality signal)

---

## 4. Business Model

### Lead Flow

```
User → Lander → Multi-Step Form → Submit
                                    ↓
                          GHL (pipeline stage)
                                    ↓
                          LeadProsper API (ping)
                                    ↓
                  Real-time auction → buyer wins (post)
                                    ↓
                  Results page: "Your quotes are ready"
                  Carrier cards (logos + CTAs, NO fake estimates)
                                    ↓
                  User clicks carrier → redirected to buyer
                  GHL stage → "Quote Clicked"
```

### Revenue Model

- **Ping-post (primary):** real-time auction, $8–$45/lead for auto depending on quality
- **Shared:** sell same lead to 3–5 buyers, $3–$12/lead × 5 = $15–$60 total
- **Exclusive (Phase 3):** $25–$80/lead, 1 buyer
- **Bundle premium:** auto + home bundle leads worth 30–50% more than single-line — **this is why Bundle is the hero product**

### Lead Certification

Both required — Ryan activates per buyer requirements:
- **Jornaya LeadiD** — env var `JORNAYA_CAMPAIGN_ID`
- **TrustedForm** — env var `TRUSTEDFORM_KEY`
- Toggle: `LEAD_CERT=jornaya|trustedform|both` (default: `both`)

---

## 5. Site Architecture

### Route Map

```
/                     → Homepage (general, EN, strong brand)
/bundle               → Auto + Home bundle (PRIMARY — highest CPL) ⭐
/auto                 → Auto insurance
/home-insurance       → Home insurance

/[state]              → Geo-personalized (auto-routes by IP, or explicit)
                        MVP states: /texas /florida /california /new-york /georgia

/es                   → Spanish homepage
/es/bundle            → Spanish bundle (HISPANIC OPPORTUNITY) ⭐
/es/auto              → Spanish auto

/lp/google            → Google Ads source lander
/lp/facebook          → Facebook/Meta source lander
/lp/organic           → Organic source lander
/lp/[affiliate-slug]  → Each affiliate's unique lander

/results              → Post-submit quote results page (ping-post UI)
/thank-you            → Fallback if no ping-post matches

/about                → Trust + compliance
/privacy-policy       → REQUIRED for ads
/terms-of-service     → REQUIRED
/do-not-sell          → CCPA compliance
```

### Deferred from v2

- ❌ `/health` and `/life` removed from MVP — different carriers, different payouts, different forms. Health/Life only after Phase 4.
- ❌ Full geo-personalization (dynamic headlines per state) deferred to P3 — diminishing returns until structure is validated.

### What we DO geo-personalize in MVP

When user enters ZIP in Step 2 and we auto-detect state + city, the confirmation copy shows:
> "Great! We found 12 providers near [Dallas, TX]"

This is the high-ROI geo touch. No code complexity, big psychological lift.

---

## 6. Multi-Step Form (the most important component)

### Design Rules (Insurify benchmark)

- **Progress bar** fixed at top, always visible
- **Auto-advance** on single-select (no "Next" tap)
- **Back button** always available — never trap user
- **localStorage save** for Steps 1-3 ONLY (NEVER Step 4 — contact PII + DOB + TCPA)
- **Minimum 48px tap targets** on mobile
- **16px minimum input font** (prevents iOS auto-zoom)
- **Sticky CTA bar** on mobile bottom

### Step Flow

#### STEP 1 — "What would you like to insure?"

Large icon cards (auto-advance, 3 options only):

```
[🚗 My Car]   [🏠 My Home]   [🚗🏠 Both — Save 25%]
```

Design notes:
- "Both" card has Green 500 border + "Best Value" badge (Money Green from brand kit)
- 3 options only (NOT 5 — focus drives conversion)
- Hispanic version adapts: "Mi Auto / Mi Hogar / Ambos — Ahorra 25%"

#### STEP 2 — "Enter your ZIP code"

- Single large ZIP input, auto-formats to 5 digits
- On valid ZIP → auto-detects state + city via free API (zippopotam.us or similar)
- Confirmation copy: **"Great! We found 12 providers near [Dallas, TX]"**
- Trust line below: "No spam. No obligation. 100% free."
- ES: "¡Listo! Encontramos 12 aseguradoras cerca de [Dallas, TX]."

#### STEP 3 — Dynamic by Step 1 selection

**IF AUTO or BUNDLE:**
- Vehicle year (dropdown: 2026 → 2000)
- Make (dropdown: top 25 brands)
- Model (auto-populated from make)
- Number of drivers on policy (1 / 2 / 3+)
- Accidents or violations in last 3 years? (Yes / No)
- Currently insured? (Yes / No)
  - If Yes: current carrier + policy expiration month/year

**IF HOME or BUNDLE (additional):**
- Property type (House / Condo / Townhome / Mobile Home)
- Own or rent? (Own / Rent)
- Year built (dropdown of ranges)
- Estimated home value (ranges: <$150k / $150-300k / $300-500k / $500k+)
- Currently have home insurance? (Yes / No)

#### STEP 4 — "Almost done — where should we send your quotes?"

Fields:
- First Name *
- Last Name *
- Email *
- Phone * (required — core lead value)
- Date of Birth * (affects quote accuracy)

**TCPA Consent** (required, below submit button):
```
☐ By clicking "Get My Free Quotes", I expressly consent to National
  Insurance Assistance Group and its [marketing partners] to contact me
  via automated calls, texts, and emails at the number provided, even
  if on a National Do Not Call Registry. Not a condition of purchase.
  Msg & data rates may apply.

  Privacy Policy | Terms of Service
```
- Checkbox unchecked by default
- `[marketing partners]` is a clickable link revealing the full buyer list (TCPA 2023 1:1 consent requirement — confirm with Ryan's legal)
- Archive exact text + timestamp on submit (sent to GHL)

**ES version:** full Spanish TCPA disclosure required, not just translated UI.

**CTA:** `[ GET MY FREE QUOTES → ]` (Money Green 500, full-width on mobile)

### Results Page (ping-post UI) — corrected from v2

**⚠️ Critical changes from v2:**
- ❌ NO fake "$89-$124/mo" estimates (regulatory risk in CA, NY, MA, MN)
- ❌ NO countdown timer "expires in 14:59" (dark pattern, BBB risk)
- ❌ NO fake star ratings on carriers we don't control

**Approved layout:**

```
Header: "🎉 Great news, [First Name]! We matched you with [X] carriers."
Subhead: "Click any carrier below to view your personalized rate.
          We've saved your info — you can come back anytime via the
          secure link emailed to you."

Quote cards (3–5):
┌────────────────────────────────────┐
│ [PROGRESSIVE LOGO]                  │
│ Licensed in [State]                 │
│ [ VIEW MY RATE FROM PROGRESSIVE → ] │
└────────────────────────────────────┘

Below cards:
"Prefer to talk? Call us: 1-800-XXX-XXXX (Mon-Fri 8am-8pm CT)"
Small print: "By clicking a carrier, you'll be connected with a licensed
              insurance agent. Rates depend on your full profile."
```

Email a follow-up immediately with the secure link to return — this is the legitimate version of "saved for later," replacing the fake countdown.

---

## 7. GTM & Tracking

(See `NIAG_Tracking_Plan_v1.md` for the full event dictionary. The summary below is the implementation reference.)

### Initial Setup

1. Create GTM container → get `GTM-XXXXXXX`
2. Create GA4 property → link to GTM
3. Create Google Ads account → conversion actions via GTM
4. Create Meta Business Manager → install Pixel via GTM
5. Install GTM snippet in `app/layout.tsx`

### Full DataLayer Implementation

```typescript
// lib/gtm.ts
export const GTM = {
  // Page tracking
  pageView: (props) => push({ event: 'page_view', ...props }),

  // Engagement
  earlyExit: (seconds) => push({ event: 'early_exit', time_on_page: seconds }),
  scroll: (pct) => push({ event: `scroll_${pct}` }),
  firstClick: (element) => push({ event: 'first_click', element }),

  // Form funnel
  formStart: (insuranceType) => push({
    event: 'form_start', step: 1, insurance_type: insuranceType
  }),
  formStep2: (zip, state) => push({
    event: 'form_step_2', step: 2, zip, state
  }),
  formStep3: (insuranceType) => push({
    event: 'form_step_3', step: 3, insurance_type: insuranceType
  }),
  formStep4: () => push({ event: 'form_step_4', step: 4 }),
  formAbandon: (lastStep) => push({ event: 'form_abandon', last_step: lastStep }),

  // THE PRIMARY CONVERSION
  formSubmit: (data) => push({
    event: 'form_submit',
    insurance_type: data.insuranceType,
    state: data.state,
    zip: data.zip,
    language: data.language,
    traffic_source: data.utmSource,
    affiliate_id: data.affiliateId,
    ab_variant: data.abVariant,
    lead_id: data.leadProsperId,
    jornaya_lead_id: data.jornayaId,
    trustedform_cert: data.trustedformCert,
    // Hashed PII for enhanced conversions (server-side)
    hashed_email: data.hashedEmail,
    hashed_phone: data.hashedPhone,
  }),

  // Downstream
  resultsView: (quotesShown) => push({ event: 'results_view', quotes_shown: quotesShown }),
  quoteClick: (carrier, position) => push({
    event: 'quote_click', carrier, position
  }),
  leadAccepted: (buyerId, revenue) => push({
    event: 'lead_accepted', buyer_id: buyerId, revenue, currency: 'USD'
  }),
  leadSold: (buyerId, value) => push({
    event: 'lead_sold', buyer_id: buyerId, value, currency: 'USD'
  }),
};

function push(obj) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(obj);
}
```

### Remarketing Audiences (configure in GA4 → Google Ads + Meta)

| Audience | Trigger | Bid Strategy | Ad Message |
|---|---|---|---|
| Bounced < 60s | `early_exit` | Low | "Still shopping?" |
| Scrolled 50% | `scroll_50` | Medium | "You were close — finish your quote" |
| Scrolled 100% | `scroll_100` | High | "Ready to save on insurance?" |
| Started Form | `form_start` | High | "2 minutes to your free quotes" |
| Abandoned Step 2 | `form_step_2` no submit | Very High | "Your ZIP is saved — finish now" |
| Abandoned Step 3 | `form_step_3` no submit | Very High | "Your quotes are almost ready" |
| Abandoned Step 4 | `form_step_4` no submit | Max | "1 click away from your free quotes" |
| Converted | `form_submit` | Exclude OR upsell | "Bundle home + auto for 25% more savings" |

---

## 8. Integrations

### LeadProsper

```typescript
// lib/leadprosper.ts
export async function submitToLeadProsper(data: LeadData) {
  const response = await fetch(process.env.LEADPROSPER_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.LEADPROSPER_API_KEY}`,
    },
    body: JSON.stringify({
      campaign_id: process.env.LEADPROSPER_CAMPAIGN_ID,
      ...mapLeadToLeadProsperSchema(data),
    }),
  });

  const result = await response.json();
  return {
    leadId: result.lead_id,
    buyers: result.buyers || [],
    matched: result.matched,
  };
}
```

### Jornaya LeadiD

```html
<!-- In app/layout.tsx <head> — all pages -->
<script id="LeadiD-script" type="text/javascript">
(function() {
  var s = document.createElement('script');
  s.id = 'LeadiDscript_campaign';
  s.type = 'text/javascript';
  s.async = true;
  s.src = '//create.lidstatic.com/campaign/JORNAYA_CAMPAIGN_ID.js?snippet_version=2';
  document.getElementById('LeadiD-script').parentNode.insertBefore(s, document.getElementById('LeadiD-script'));
})();
</script>
<input id="leadid_token" name="universal_leadid" type="hidden" value=""/>
```

### TrustedForm

```html
<!-- In app/layout.tsx <head> — all pages -->
<script type="text/javascript">
(function() {
  var tf = document.createElement('script');
  tf.type = 'text/javascript';
  tf.async = true;
  tf.src = 'https://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&l=' + new Date().getTime() + Math.random();
  document.getElementsByTagName('script')[0].parentNode.insertBefore(tf, document.getElementsByTagName('script')[0]);
})();
</script>
<input id="xxTrustedFormCertUrl" name="xxTrustedFormCertUrl" type="hidden" value=""/>
```

### API Route — Form Submit

```typescript
// app/api/submit-lead/route.ts
export async function POST(request: Request) {
  const data = await request.json();

  // Capture cert IDs from hidden fields
  data.jornayaLeadId = data.leadid_token;
  data.trustedformCert = data.xxTrustedFormCertUrl;

  // Archive TCPA evidence
  data.tcpaConsentText = TCPA_TEXT_VERSIONED;
  data.tcpaTimestamp = new Date().toISOString();

  // Hash PII for enhanced conversions (server-side only)
  data.hashedEmail = await sha256(data.email.toLowerCase().trim());
  data.hashedPhone = await sha256(normalizePhone(data.phone));

  // Fire LP + GHL in parallel
  const [leadProsperResult, ghlResult] = await Promise.allSettled([
    submitToLeadProsper(data),
    sendToGHL(data, 'CONVERTED'),
  ]);

  // GHL never blocks user response — log failure async
  if (ghlResult.status === 'rejected') {
    console.error('GHL webhook failed', ghlResult.reason);
    // Optional: dead-letter queue for retry
  }

  if (leadProsperResult.status === 'fulfilled') {
    return Response.json({
      success: true,
      buyers: leadProsperResult.value.buyers,
      leadId: leadProsperResult.value.leadId,
    });
  }

  // LP fail fallback — still confirm to user
  return Response.json({
    success: true,
    buyers: [],
    leadId: null,
    fallback: true,
  });
}
```

### Environment Variables

```env
# GTM / Analytics
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXX

# Go High Level
GHL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/XXXXXXX

# LeadProsper
LEADPROSPER_ENDPOINT=https://app.leadprosper.io/api/v1/leads
LEADPROSPER_API_KEY=xxxxx
LEADPROSPER_CAMPAIGN_ID=xxxxx

# Lead Certification
JORNAYA_CAMPAIGN_ID=xxxxx
TRUSTEDFORM_KEY=xxxxx
LEAD_CERT=both

# Site
NEXT_PUBLIC_SITE_URL=https://niag.com
NEXT_PUBLIC_LEGAL_NAME="National Insurance Assistance Group"
```

---

## 9. A/B Testing

### Framework

```typescript
// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  if (!request.cookies.get('ab_variant')) {
    const variant = Math.random() < 0.5 ? 'A' : 'B';
    response.cookies.set('ab_variant', variant, { maxAge: 60 * 60 * 24 * 30 });
  }

  // Capture UTMs
  const url = request.nextUrl;
  ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid'].forEach(param => {
    const v = url.searchParams.get(param);
    if (v) response.cookies.set(param, v, { maxAge: 60 * 60 * 24 * 30 });
  });

  return response;
}
```

### Test Roadmap (one at a time, sequenced)

**Week 1 — Test 1: Form placement (highest expected impact)**
- A: Form embedded in hero (Insurify pattern)
- B: CTA button → scroll to form below
- Win condition: form_submit rate
- Min sample: 1,000 sessions/variant

**Week 2 — Test 2: Headline**
- A: "Compare insurance rates in minutes"
- B: "Americans save $400/year on average — see your rate"
- Win condition: form_start rate
- Min sample: 2,000 sessions/variant

**Week 3 — Test 3: Form style**
- A: Step-by-step with progress bar (default)
- B: Full-screen quiz (1 question per screen)
- Win condition: form_step_4 → form_submit completion rate

**Week 4 — Test 4: Bundle vs Auto landing**
- A: Bundle as primary entry
- B: Auto as primary entry, bundle upsell at Step 3
- Win condition: revenue per session (not just CPL)

**Rule:** ONE test active at a time. With $1k/day, parallel tests = unclear signal.

---

## 10. Design System (aligned with Brand Guidelines v1)

### Colors — from `NIAG_Brand_Guidelines_v1.md`

```css
:root {
  /* Navy — primary brand */
  --navy-50:   #E8EBF2;
  --navy-200:  #B4BED1;
  --navy-500:  #4A5C82;
  --navy-700:  #1E3360;
  --navy-900:  #0A1F44;  /* ⭐ Primary: headers, hero, logo */

  /* Money Green — CTA + success */
  --green-50:  #E2F7EE;
  --green-200: #9FE2C5;
  --green-500: #1FB573;  /* ⭐ Primary CTA */
  --green-700: #168B57;  /* CTA hover/pressed */
  --green-900: #0D5A39;

  /* Warm neutrals */
  --cream:     #FAF7F2;  /* ⭐ Default page bg */
  --sand:      #F1ECE0;
  --border:    #D3D1C7;
  --muted:     #888780;
  --body:      #5F5E5A;
  --ink:       #2C2C2A;  /* ⭐ Primary body text */

  /* Semantic */
  --warning:   #F4B942;
  --error:     #D94B4B;
  --info:      #3B82C9;
}
```

### Typography — from Brand Guidelines

- **Display headlines:** Fraunces 700 (serif — premium without stuffy)
- **Body + UI:** Inter 400/500
- **Numbers / mono:** JetBrains Mono (for premium estimator + MFA)
- Load via Google Fonts CDN (see Brand Guidelines for exact link)
- CTAs: NOT uppercase by default (Brand voice = direct, not shouty)

### Tailwind Config

Full config in `NIAG_Brand_Guidelines_v1.md` Section 9. Drop into `tailwind.config.ts` as-is.

### Trust Signals (honest version — corrected from v2)

**Row 1 — Carrier logos** (only carriers we actually deliver leads to):
Progressive | Geico | State Farm | Allstate | Nationwide | Liberty Mutual

(Confirm with Ryan which carriers are confirmed buyers. Only display logos you have rights to and that legitimately receive leads.)

**Row 2 — Verifiable trust badges:**
- 🔒 SSL Secure (real — Vercel provides)
- A+ BBB Rated (only if/when accredited)
- TCPA Compliant
- Licensed in [X] states (only after licensing confirmed)

**Row 3 — Honest social proof:**
- "Trusted by drivers in 50 states"
- Real customer testimonials with first name + last initial + city (only collected after launch from actual users)

**❌ Removed from v2 (deceptive):**
- ~~"847 people got quotes in the last 24 hours"~~ — fake counter = FTC risk
- ~~"⭐ 4.8/5 — 14,200 Reviews"~~ — fake rating without verifiable source = FTC risk
- ~~"2M+ Americans Helped"~~ — until verifiable, don't claim

When NIAG has 30 days of real data, replace with verifiable metrics from GHL/LeadProsper actual lead counts.

### Mobile Mandatories

- Sticky bottom CTA bar visible on scroll past hero
- Form steps: full viewport height on mobile
- No horizontal scroll anywhere
- Tap targets: 48×48px minimum
- Input font-size: 16px minimum (prevents iOS auto-zoom)
- Images: WebP only, lazy-loaded via `next/image`
- LCP target: <2.5s on 4G
- Total weight: <500KB initial load

---

## 11. Affiliate Lander System

```typescript
// data/affiliates.ts
export const affiliates: Record<string, AffiliateConfig> = {
  'partner-xyz': {
    slug: 'partner-xyz',
    partnerName: 'AutoSave Network',
    partnerLogo: '/logos/autosave.svg',
    headline: 'AutoSave Network members save an average of $412/year',
    insuranceType: 'auto', // pre-selects Step 1
    utmSource: 'autosave-network',
    primaryColor: '#0066CC', // optional brand override
    language: 'en', // or 'es'
  },
  // Add new affiliates here — no code changes needed
};

// app/lp/[slug]/page.tsx reads this config and renders
// the standard lander with overrides applied
```

**Each affiliate gets:**
- Dedicated URL: `niag.com/lp/[slug]`
- Custom headline + logo + co-branding
- Auto-tagged UTMs for revenue attribution
- Per-affiliate dashboard view in GHL

---

## 12. Compliance Checklist

- [ ] **Privacy Policy** — CCPA + TCPA + CAN-SPAM compliant, reviewed by legal
- [ ] **Terms of Service** — reviewed by legal
- [ ] **Do Not Sell My Personal Information** (CCPA) — functional opt-out
- [ ] **TCPA consent text** — unchecked by default, archived per lead, full buyer disclosure (1:1 consent rule effective 2024)
- [ ] **CAN-SPAM footer** — legal company name + physical mailing address on every page
- [ ] **SSL** — auto via Vercel
- [ ] **robots.txt + sitemap.xml**
- [ ] **Spanish-language compliance** — TCPA disclosure in ES (not just translated, legally adapted)
- [ ] **Insurance licensing** — confirm NIAG licensing per state where leads are accepted; disclose unlicensed states
- [ ] **State-specific disclosures** — CA, NY, MA, MN have insurance-specific disclosure requirements
- [ ] **DNC scrub** — ensure leads delivered are DNC-cleared OR have valid prior express written consent
- [ ] **Recording disclosure** — if calls are recorded post-submit, two-party consent states require notice

⚠️ **All compliance items must be confirmed with Ryan's legal counsel before paid traffic launches.** Lead gen is heavily regulated; "good enough" is not the standard.

---

## 13. Phase Roadmap

### Phase 1 — Day 1 (Codex Session)
- Homepage lander (EN) — embedded multi-step form
- 4-step form (Auto + Home + Bundle only — no Health/Life)
- Results page (honest carrier cards, no fake estimates)
- LeadProsper API integration
- GHL webhook + pipeline stages configured
- GTM dataLayer all events
- `/lp/google` + `/lp/facebook` source landers
- Privacy Policy + Terms + Do-Not-Sell pages
- Brand system applied (Navy/Green/Cream + Fraunces/Inter)
- Mobile-first responsive
- Deploy to Vercel

### Phase 2 — Day 2-3
- Spanish version (`/es`) — culturally adapted, not translated
- Affiliate lander system (`/lp/[slug]`)
- A/B framework (Test 1 live: form placement)
- ZIP-based city/state confirmation in Step 2
- GHL automation sequences (A, B, C, D, E)
- Jornaya + TrustedForm full integration

### Phase 3 — Week 2
- `/auto` dedicated lander
- `/bundle` dedicated lander (highest CPL focus)
- Top 5 state landers (TX, FL, CA, NY, GA)
- Exit-intent popup (mobile-friendly)
- GHL dashboard configured for Ryan

### Phase 4 — Month 2
- All 50 state landers
- Geo-personalized headline (deferred from P1)
- Exclusive lead product
- Blog SEO foundation (only after paid validates conversion)
- Health/Life products evaluated (separate buyer config required)

### Phase 5 — Month 3+
- Quote calculator (Auto + Home premium estimator) as form "reward"
- Display retargeting on realtor.com / zillow.com (Insurify model)
- Advanced quiz-style form variant
- Carrier exclusive partnership (Ryan business dev)

---

## 14. File Structure

```
/
├── app/
│   ├── layout.tsx              # GTM, Jornaya, TrustedForm, fonts, brand reset
│   ├── page.tsx                # Homepage
│   ├── auto/page.tsx
│   ├── bundle/page.tsx         # PRIMARY — Auto + Home bundle
│   ├── home-insurance/page.tsx
│   ├── [state]/page.tsx        # Dynamic geo lander
│   ├── lp/
│   │   └── [slug]/page.tsx     # Google / Facebook / Affiliate landers
│   ├── results/page.tsx        # Post-submit carrier cards (no fake quotes)
│   ├── thank-you/page.tsx
│   ├── es/
│   │   ├── page.tsx
│   │   ├── auto/page.tsx
│   │   └── bundle/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── terms/page.tsx
│   ├── do-not-sell/page.tsx
│   └── api/
│       ├── submit-lead/route.ts  # LeadProsper + GHL POST
│       ├── geo/route.ts
│       └── zip-lookup/route.ts   # ZIP → state/city
│
├── components/
│   ├── form/
│   │   ├── MultiStepForm.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── steps/
│   │   │   ├── Step1InsuranceType.tsx
│   │   │   ├── Step2Zip.tsx
│   │   │   ├── Step3Auto.tsx
│   │   │   ├── Step3Home.tsx
│   │   │   ├── Step3Bundle.tsx
│   │   │   └── Step4Contact.tsx
│   │   ├── TcpaConsent.tsx
│   │   └── ResultsPage.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileCtaBar.tsx
│   ├── sections/
│   │   ├── Hero.tsx            # A/B variant aware
│   │   ├── TrustBar.tsx        # Real carrier logos + verifiable badges only
│   │   ├── HowItWorks.tsx
│   │   ├── Testimonials.tsx    # Real testimonials only, post-launch
│   │   ├── FAQ.tsx
│   │   └── ExitIntentPopup.tsx
│   └── ui/
│       └── CTA.tsx             # Per Brand Guidelines spec
│
├── lib/
│   ├── leadprosper.ts
│   ├── ghl.ts
│   ├── jornaya.ts
│   ├── trustedform.ts
│   ├── gtm.ts
│   ├── geo.ts
│   ├── ab-testing.ts
│   ├── utm.ts
│   ├── hash.ts                 # SHA-256 for enhanced conversions
│   └── tcpa.ts                 # TCPA text versioning + archival
│
├── data/
│   ├── affiliates.ts
│   ├── states.ts
│   ├── carriers.ts             # Only confirmed buyer carriers
│   └── vehicle-makes.ts
│
├── i18n/
│   ├── en.json
│   └── es.json
│
├── middleware.ts               # A/B + UTM + geo capture
└── .env.local
```

---

## 15. Prompt to Start Codex 5.5

```
You are building a high-converting insurance lead generation website for
National Insurance Assistance Group (NIAG).

Follow this spec exactly: [paste NIAG_Master_Plan_v3.md]

Also load these supporting documents into your context:
- NIAG_Brand_Guidelines_v1.md (visual + token system)
- NIAG_Competitive_Intelligence_v1.md (strategic context)
- NIAG_Tracking_Plan_v1.md (event dictionary)

Start with Phase 1 (P0) priorities in order. After each component, confirm
it works before moving to the next.

Critical constraints:
- Mobile-first (85%+ mobile traffic assumed)
- Brand system per Brand Guidelines v1 — Navy #0A1F44, Green #1FB573, Cream #FAF7F2, Fraunces + Inter
- Primary benchmark for form UX: Insurify (NOT insurance.com — see CI doc)
- Every form submit fires GTM event + posts to LeadProsper + sends GHL webhook
- NO fake quote estimates, NO fake counters, NO fake countdown timers
- TCPA: checkbox unchecked default, archive text + timestamp per lead
- localStorage only for Steps 1-3 (never Step 4 PII)
- Ship to Vercel at end of session

Begin with MultiStepForm.tsx. Show me the component, then we'll integrate.
```

---

## 16. Changelog vs v2

### 🔴 Critical fixes
1. **Benchmark hierarchy corrected** — Insurify is primary (was incorrectly insurance.com in v2)
2. **Brand system replaced** — old palette (`#1B3F8B` + Sora + Plus Jakarta) → Brand Guidelines v1 (Navy 900, Money Green 500, Fraunces + Inter)
3. **Fake quote estimates removed** — "$89-$124/mo" eliminated (regulatory risk)
4. **Fake counter removed** — "847 people in last 24h" eliminated (FTC risk)
5. **Fake countdown timer removed** — "expires in 14:59" eliminated (dark pattern)
6. **Fake star ratings removed** — "⭐ 4.8/5 — 14,200 Reviews" eliminated until verifiable

### 🟡 Strategic adjustments
7. **Mobile % corrected** from 60% → 85%+ (matches CI data on Insurify/compare)
8. **MVP scope reduced** — Health/Life removed from Step 1 (was 5 options, now 3: Auto/Home/Bundle)
9. **localStorage scope limited** — Step 4 (contact PII + TCPA) never persisted
10. **Geo-personalization deferred** to P3 — full state landers only after MVP validates
11. **SMS automation timings extended** — 15min→1h, 30min→2h (TCPA + carrier spam safety)
12. **TCPA Sequence E added** — STOP/unsubscribe handling
13. **Hashed PII via SHA-256** added for enhanced conversions (Google Ads + Meta CAPI)

### 🟢 Operational additions
14. **A/B tests sequenced** — one at a time, not parallel (statistical clarity)
15. **Compliance checklist expanded** — state-specific disclosures, DNC scrub, recording consent, ES legal adaptation
16. **TCPA text archival** — exact disclosure text + timestamp stored per lead
17. **Three benchmark hierarchy** — Insurify (primary) / compare (engagement) / insurance.com (visual reference only)

---

*National Insurance Assistance Group — Internal — NIAG Team*
*v3 supersedes v2 — aligned with Brand Guidelines v1, Competitive Intelligence v1, Tracking Plan v1*
