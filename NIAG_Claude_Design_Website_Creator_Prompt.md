# NIAG - Prompt For Claude Design / Lovable Website Creator

Copy and paste the prompt below into Claude Design, Lovable, or another AI website creator.

---

## Prompt

You are building a high-converting insurance lead generation website for **NIAG - National Insurance Assistance Group**.

The site must feel like a premium, trustworthy quote engine, not a generic blog or brochure. The main goal is to generate qualified insurance leads through product-specific multi-step forms and send users through a clean, trackable journey.

## Business Goal

Build a responsive, mobile-first website for US insurance shoppers. The site must support:

- Auto insurance
- Auto + Home Bundle
- Home insurance
- Renters insurance
- Health insurance
- English and Spanish speaker variations
- A/B/C testing of hero, CTA copy, and form entry framing
- SEO-friendly content sections/blog tabs
- Multiple clickable form entry points across the page: top, middle, bottom, sticky mobile CTA, blog/content cards, and product cards

The user should be able to click any insurance product anywhere on the page and open the correct dedicated form flow for that product. Each product type must be trackable separately.

## Brand Direction

Use the NIAG brand direction: **Trusted Anchor**.

The brand should feel:

- trustworthy
- fast
- transparent
- direct
- local expert-driven
- no spam
- no nonsense
- bilingual-ready

Do not make the site feel like a cartoon, a crypto landing page, a generic SaaS landing page, or a blog-first insurance portal.

## Visual System

Use this design system:

- Primary navy: `#0A1F44`
- Secondary navy: `#1E3360`
- Money green CTA: `#1FB573`
- Green hover: `#168B57`
- Cream background: `#FAF7F2`
- Sand background: `#F1ECE0`
- Border: `#D3D1C7`
- Body text: `#2C2C2A`
- Secondary text: `#5F5E5A`

Typography:

- Headlines: Fraunces or a premium serif equivalent
- Body/UI: Inter or a clean modern sans-serif

Style rules:

- Mobile-first.
- Use cream/sand as the page base, navy for authority, green only for CTAs and positive trust accents.
- Do not use orange CTAs.
- Do not use fake quote prices unless clearly labeled as illustrative.
- Use real-looking UI elements, not decorative filler.
- Cards should be clean, compact, and trust-focused.
- CTAs must be clear, green, and action-oriented.
- Avoid excessive gradients and decorative blobs.

## Competitive References To Blend

Use competitor patterns only as inspiration, not as a clone.

### Insurify-inspired patterns

Use:

- Product selector in the hero before the user enters ZIP.
- ZIP-first entry.
- Dedicated form route/modal per product.
- One-question-at-a-time multi-step form.
- Progress bar with friendly copy.
- Minimal form header with logo only.
- Carrier logo strip near the CTA.
- Trust proof near the CTA.
- "Get your quotes back" recovery link.

Do not use:

- Orange CTA color.
- Pet as a priority product.
- Fake quote prices without disclaimer.

### Compare.com-inspired patterns

Use:

- Strong engagement structure after the hero.
- Benefits section.
- Quote recovery link.
- Repeated product CTAs.
- Anti-spam/no-fee/no-catch copy.
- FAQ and educational content below the conversion path.

Do not use:

- Unsupported review counts or rankings.
- SEO content above the main conversion experience.

### Insurance.com-inspired patterns

Use:

- Clean institutional trust feel.
- Strong footer/compliance structure.
- Editorial/blog tabs for SEO.
- Ask-the-expert or expert support section.
- Privacy/terms/do-not-sell links.

Do not use:

- Overly simple select + ZIP form as the main experience.
- Too many equivalent categories in the hero.

### SmartFinancial-inspired patterns

Use later/future-facing structure:

- How it works in 3 steps.
- SEO pages/categories.
- Product-specific pages.
- State/city content architecture.
- Repeated CTA modules inside educational content.

Do not use:

- Too many categories in the MVP.
- Mascot-heavy style.
- "Save up to 50%" claims unless disclaimer/source exists.

## Site Structure

Build the following main experience.

### 1. Header

Header should include:

- NIAG logo
- Product nav: Auto, Bundle, Home, Renters, Health
- Resources / Blog
- English/Español language toggle
- Phone CTA: "Call an expert"
- Primary CTA: "Get my quote"

On mobile:

- Logo left
- Call icon
- Menu icon
- Sticky bottom CTA after scroll: "Get my quote"

## 2. Homepage Hero

Hero must be the primary conversion area.

Recommended English hero copy:

Headline:
**Bundle & save on auto + home insurance.**

Subheadline:
Compare quotes from trusted insurance partners in 60 seconds. Free. No SSN. No spam.

Trust line:
Free · 60 seconds · No credit check · No SSN

Primary CTA:
Get my free quote

Secondary link:
Already started? Get your quotes back.

Hero form module:

- Product selector cards:
  - Bundle - Recommended
  - Auto
  - Home
  - Renters
  - Health
- ZIP code input
- CTA button: "Start comparing"

Default selected product should be **Bundle**.

When user clicks a product card or CTA, open the correct product-specific multi-step form.

Hero visual:

- Use a clean app-like quote preview mockup.
- Show generic carrier match cards without fake prices.
- Use text like "Matched carrier", "Local expert available", "Coverage options".
- Do not use made-up exact monthly rates.

## 3. Carrier / Trust Strip

Immediately below the hero, show a trust strip:

- "Compare options from trusted insurance partners"
- Placeholder carrier-style cards or text badges
- "30+ carrier partners" only if it is safe to represent as placeholder; otherwise say "Trusted insurance partners"
- Trust badges:
  - Secure process
  - No SSN required
  - No obligation
  - Licensed partner support

Do not include fake logos unless assets are provided or legally safe.

## 4. Product Entry Section

Add a section titled:

**What kind of insurance can we help you with?**

Cards:

- Bundle
  - Badge: Recommended
  - Copy: Combine auto + home and compare smarter.
  - CTA: Start bundle quote
- Auto
  - Copy: Compare options for your car in minutes.
  - CTA: Start auto quote
- Home
  - Copy: Protect your home with trusted coverage options.
  - CTA: Start home quote
- Renters
  - Copy: Simple protection for your apartment or rental.
  - CTA: Start renters quote
- Health
  - Copy: Explore health coverage options with help from licensed partners.
  - CTA: Start health quote

Every CTA must trigger product-specific tracking and open the matching form flow.

## 5. How It Works

Create a 3-step section:

1. Choose your coverage
2. Answer a few quick questions
3. Get matched with insurance options

Add microcopy:

"No paperwork. No SSN. No obligation."

## 6. Self-Serve vs Expert Help

Create a two-column section:

Left:

Title: Compare online
Copy: Move fast with a simple quote tool built for auto, home, renters, bundle, and health coverage.
CTA: Compare online

Right:

Title: Talk to an expert
Copy: Prefer help? Connect with a licensed insurance partner who can walk you through your options.
CTA: Call an expert

## 7. Mid-Page CTA

Create a strong mid-page CTA module:

Headline:
**Rates and coverage options, matched to your ZIP.**

Fields:

- Product dropdown
- ZIP code input
- CTA: Get started

This is a secondary entry point. It must open the correct form flow based on selected product.

## 8. SEO / Blog Tabs Section

Create a content section that supports SEO without taking priority over conversion.

Title:
**Insurance guidance without the jargon**

Use tabs:

- Auto
- Bundle
- Home
- Renters
- Health
- Spanish Resources

Each tab should show 3 article cards with:

- Category tag
- SEO title
- Short excerpt
- "Read guide" link
- Small inline CTA inside or under the card: "Compare quotes"

Example article titles:

Auto:

- How to compare car insurance quotes without the spam
- What affects your car insurance rate?
- Do you need full coverage or liability only?

Bundle:

- How auto + home bundles can save money
- When bundling insurance makes sense
- Questions to ask before switching carriers

Home:

- What homeowners insurance usually covers
- How to compare home insurance by ZIP code
- Common home insurance discounts

Renters:

- What renters insurance covers
- Is renters insurance worth it?
- How much renters coverage do you need?

Health:

- How to compare health coverage options
- What to know before choosing a health plan
- Questions to ask a licensed health insurance partner

Spanish Resources:

- Cómo comparar seguros sin enredos
- Seguro de auto: qué revisar antes de elegir
- Auto + hogar: cómo combinar y ahorrar

Important: blog content must sit below the conversion-first sections. It should support SEO and trust, not replace the form.

## 9. FAQ

Create FAQ accordion with these questions:

- Is NIAG an insurance company?
- How does NIAG match me with insurance options?
- Will I get spammed?
- Do I need to provide my SSN?
- Is this free?
- Can I compare auto and home together?
- Do you support Spanish speakers?
- Who may contact me after I submit the form?

Answers must be transparent and compliance-friendly.

## 10. Bottom CTA

Create a final conversion section:

Headline:
**Ready to compare without the runaround?**

Subheadline:
Start with your ZIP. We’ll guide you from there.

Product selector + ZIP + CTA.

Default product: Bundle.

CTA: Get my free quote

## 11. Footer

Footer must include:

- NIAG logo
- Short trust statement
- Product links
- Resource/blog links
- Language toggle
- Contact
- Privacy Policy
- Terms of Use
- Do Not Sell or Share My Personal Information
- Privacy Preferences
- TCPA consent/disclosure placeholder
- Advertising disclosure placeholder

Footer disclaimer copy:

"NIAG is not a government agency or insurance carrier. We help connect consumers with insurance partners and licensed professionals. Availability, pricing, and coverage options vary by location, carrier, and individual eligibility. Submitting a form does not guarantee coverage or savings."

## Product-Specific Form Flows

Forms can be built as dedicated pages, modals, or route-like panels, but each product must have its own flow and tracking ID.

Routes or IDs:

- `/quote/bundle`
- `/quote/auto`
- `/quote/home`
- `/quote/renters`
- `/quote/health`
- `/es/quote/bundle`
- `/es/quote/auto`
- `/es/quote/home`
- `/es/quote/renters`
- `/es/quote/health`

Form design:

- Minimal header with NIAG logo
- Optional phone CTA
- Progress bar
- One question per screen
- Large tap-friendly answer cards
- "Why do we ask?" helper text for sensitive questions
- Back button
- Continue button
- Clear validation states
- Final TCPA consent checkbox
- Submit button

## Form Fields By Product

### Bundle Flow

Step 1: ZIP code / location
Step 2: Do you currently own or rent your home?
Step 3: Property type
Step 4: Do you currently have auto insurance?
Step 5: Number of vehicles
Step 6: Number of drivers
Step 7: Desired coverage start date
Step 8: Name
Step 9: Email + phone
Step 10: TCPA consent + submit

### Auto Flow

Step 1: ZIP code
Step 2: Currently insured?
Step 3: Number of vehicles
Step 4: Number of drivers
Step 5: Any recent accidents/tickets?
Step 6: Desired coverage start date
Step 7: Name
Step 8: Email + phone
Step 9: TCPA consent + submit

### Home Flow

Step 1: ZIP code / property location
Step 2: Own or rent?
Step 3: Property type
Step 4: Year built or approximate age
Step 5: Current insurance status
Step 6: Desired coverage start date
Step 7: Name
Step 8: Email + phone
Step 9: TCPA consent + submit

### Renters Flow

Step 1: ZIP code
Step 2: Apartment, house, condo, other
Step 3: Move-in or policy start date
Step 4: Desired coverage amount range
Step 5: Name
Step 6: Email + phone
Step 7: TCPA consent + submit

### Health Flow

Step 1: ZIP code
Step 2: Individual or family coverage?
Step 3: Age range
Step 4: Current coverage status
Step 5: Desired start date
Step 6: Name
Step 7: Email + phone
Step 8: TCPA consent + submit

## Spanish Version

Create Spanish-language variant with culturally natural copy, not literal translation.

Spanish hero:

Headline:
**Combina y ahorra en seguro de auto + hogar.**

Subheadline:
Compara opciones con expertos locales en 60 segundos. Gratis. Sin SSN. Sin enredos.

Trust line:
Gratis · 60 segundos · Sin verificación de crédito · Sin SSN

CTA:
Obtener mi cotización

Product labels:

- Bundle: Auto + Hogar
- Auto: Seguro de Auto
- Home: Seguro de Hogar
- Renters: Seguro para Inquilinos
- Health: Seguro de Salud

Voice:

- Use "tú", not overly formal language.
- Use "sin enredos" instead of literal "sin spam" when it sounds better.
- Keep copy short and reassuring.

## A/B/C Testing Requirements

Build the site so hero copy and product framing can support three variants.

Variant A - Bundle First

Headline:
Bundle & save on auto + home insurance.

Hypothesis:
Bundle-first positioning increases lead value and attracts homeowners/drivers.

Default selected product:
Bundle

CTA:
Get my free quote

Variant B - No Spam / No SSN

Headline:
Compare insurance quotes without the spam.

Hypothesis:
Anti-spam trust copy reduces anxiety and increases form starts.

Default selected product:
Auto

CTA:
Start my quote

Variant C - Local Expert

Headline:
Compare coverage with local experts you can trust.

Hypothesis:
Human support framing increases conversion for cautious users.

Default selected product:
Bundle

CTA:
Talk to a quote expert

Spanish variants:

Variant A ES:
Combina y ahorra en seguro de auto + hogar.

Variant B ES:
Compara seguros sin enredos.

Variant C ES:
Compara cobertura con expertos locales.

Implementation requirement:

- Include a variable or config called `abVariant` with values `A`, `B`, or `C`.
- Include language value: `en` or `es`.
- Every CTA click and form start must include product type, language, and A/B/C variant.

## Tracking Requirements

Add a tracking plan using `dataLayer.push()` or equivalent event placeholders.

Track these events:

1. `page_view`
2. `product_select`
3. `zip_entered`
4. `form_start`
5. `form_step_view`
6. `form_step_complete`
7. `form_back_click`
8. `form_abandon`
9. `tcpa_consent_checked`
10. `form_submit`
11. `lead_submit_success`
12. `lead_submit_error`
13. `phone_click`
14. `language_toggle`
15. `blog_tab_click`
16. `quote_recovery_click`

Each event payload should include:

- `productType`: bundle, auto, home, renters, health
- `language`: en, es
- `abVariant`: A, B, C
- `entryPoint`: hero, header, product_card, mid_cta, blog_card, sticky_mobile, bottom_cta, footer
- `zipCode` when available
- `stepName` when applicable
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` placeholders
- `gclid`, `fbclid`, `affiliate_id` placeholders

## Integrations Placeholder

Do not actually connect APIs unless credentials are provided. Create clear placeholders for:

- LeadProsper submit endpoint
- Go High Level webhook
- Jornaya lead ID
- TrustedForm certificate
- GTM container

Show clean success and error states.

On successful submit:

- Route to a thank-you/results page.
- Message: "Thanks. We’re matching your request now."
- Show next steps:
  - Watch for a call/text from a licensed insurance partner.
  - Keep your current policy handy.
  - Compare options before switching.

## Compliance Requirements

Final form step must include TCPA-style consent placeholder:

"By clicking submit, I agree to be contacted by NIAG and/or its insurance partners at the phone number and email provided, including by automated technology, prerecorded message, SMS, and email, even if my number is on a do-not-call list. Consent is not a condition of purchase. Message and data rates may apply."

Also include:

- Privacy Policy link
- Terms link
- Do Not Sell link
- Consent timestamp placeholder
- IP/user agent placeholder
- Exact consent text should be stored in the lead payload placeholder

## Deliverables

Build a polished, responsive website prototype with:

1. Homepage
2. Product-specific form flows for Bundle, Auto, Home, Renters, Health
3. English and Spanish language variants
4. A/B/C variant config
5. SEO/blog tab section
6. FAQ
7. Compliance footer
8. Thank-you/results page
9. Tracking/dataLayer placeholders
10. API integration placeholders

Prioritize conversion, clarity, and trust. The final website should feel like a premium quote tool designed for paid traffic, not a generic insurance content site.
