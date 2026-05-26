# NIAG - Visual Refresh Script For Claude Design

Use this prompt/script to improve the current NIAG homepage design without breaking the conversion architecture, product-specific forms, tracking, or responsive behavior.

---

## Prompt To Paste Into Claude Design

You are improving an existing NIAG insurance lead-generation homepage.

The current page structure is good, but the visual design feels too plain, too AI-generated, and not dynamic enough. Keep the conversion architecture intact, but make the website feel more alive, premium, trustworthy, and mobile-first.

## Non-Negotiables

Do not remove or weaken:

- Product-specific form entry points.
- Product types: Bundle, Auto, Home, Renters, Health.
- Default product: Bundle.
- ZIP-first flow.
- Multi-step form architecture.
- A/B/C variant support.
- English/Spanish language support.
- Tracking placeholders and event naming.
- Compliance footer.
- Mobile responsiveness.
- Current brand palette.

Keep the site conversion-first. Do not turn it into a blog, brochure, or decorative landing page.

## Current Problem

The current design has good structure but feels flat because:

- Too much empty cream space.
- Too many identical white cards.
- Dotted background is overused and makes the page feel templated.
- Hero visual is too generic and lacks emotional pull.
- No real human/customer context.
- Trust section feels like placeholder stats.
- Product cards are functional but not memorable.
- Blog cards look unfinished because the top image area is just a pattern.
- Mobile needs to feel more app-like, compact, and thumb-friendly.
- The page needs more rhythm: stronger contrast between sections, better depth, and more visual storytelling.

## Desired Visual Direction

Make the design feel like:

**A premium, mobile-first insurance quote tool with human trust and product clarity.**

Keywords:

- trustworthy
- warm
- local
- modern
- fast
- app-like
- editorial but not boring
- polished
- conversion-focused
- human

Avoid:

- generic AI landing page
- stock SaaS template
- corporate insurance portal
- overly decorative gradients
- fake quote prices
- cartoon mascot
- cluttered SEO portal

## Brand System To Keep

Colors:

- Navy: `#0A1F44`
- Navy secondary: `#1E3360`
- Green CTA: `#1FB573`
- Green hover: `#168B57`
- Cream: `#FAF7F2`
- Sand: `#F1ECE0`
- Border: `#D3D1C7`
- Ink: `#2C2C2A`
- Body: `#5F5E5A`

Typography:

- Headlines: Fraunces or premium serif.
- UI/body: Inter or clean sans-serif.

CTA rule:

- Primary CTAs must be green.
- Secondary CTAs can be navy or outline.
- Keep CTAs visually consistent.

## Visual Refresh Parameters

### 1. Global Layout Rhythm

Add stronger section rhythm:

- Alternate between cream, sand, navy, and soft green-tinted sections.
- Use fewer huge empty spaces.
- Add section-level visual anchors: badges, small proof bars, quote cards, mini UI mockups.
- Keep content width constrained but make sections feel intentionally composed.
- Use subtle border lines and shallow shadows, not heavy shadows.

Recommended section flow:

1. Hero with app preview + human trust cue.
2. Carrier/trust strip.
3. Product cards.
4. How it works.
5. Self-serve vs expert help.
6. Mid-page quote module.
7. Blog/resources tabs.
8. FAQ.
9. Bottom CTA.
10. Compliance footer.

### 2. Hero Refresh

The hero needs the biggest improvement.

Keep:

- Headline
- Product selector
- ZIP input
- CTA
- Trust pills
- Quote recovery link
- App-like quote preview

Improve:

- Add a stronger split layout: left conversion form, right richer visual story.
- Add a human trust cue: small customer/expert avatar stack, licensed partner badge, or friendly expert card.
- Replace the plain mock quote card with a layered "quote dashboard" preview:
  - Top: "Matches for your ZIP"
  - Three partner match rows
  - Trust tags: "Local expert", "No SSN", "No obligation"
  - Small progress indicator: "Step 1 of 4"
- Add one small testimonial/proof card near the hero visual:
  - "Fast, clear, no pressure."
  - Name/location placeholder like "Maria G. · FL" only if clearly illustrative.
- Add soft depth: layered cards, slight overlaps, one navy panel, one cream panel, one green badge.

Do not add fake exact prices.

Suggested hero composition:

- Left column:
  - Eyebrow: "LOCAL QUOTE MATCHING"
  - H1
  - subcopy
  - trust pills
  - product/ZIP form card
- Right column:
  - App-style quote preview
  - licensed expert mini-card
  - "No SSN requested" security badge
  - subtle state/ZIP personalization visual

Mobile hero:

- Stack hero content.
- Form card appears before large visual.
- App preview can become a compact horizontal card under the form.
- Sticky bottom CTA appears after hero.

### 3. Header Refresh

Current header is clean but too plain.

Improve:

- Make header sticky with slight blur or solid cream background and bottom border.
- Add active nav underline or pill on hover.
- Make "Call an expert" visually distinct but secondary.
- Keep "Get my quote" as the strongest button.
- Mobile:
  - Logo left.
  - Language toggle as compact pill.
  - Phone icon button.
  - Menu icon.
  - Sticky bottom CTA: "Get my quote".

Do not overcrowd mobile header.

### 4. Carrier / Trust Strip Refresh

Current carrier logo strip feels like placeholder boxes.

Improve:

- Present as "Trusted partner network" instead of pretending official logos if assets are not licensed.
- Use small monochrome partner-style badges or simple text pills.
- Add a "How it works" mini-proof next to it:
  - Secure process
  - No SSN required
  - No obligation
  - Licensed partner support
- Replace unsupported stats like "12,000 reviews" or "A+ BBB" unless real.

Use safer proof placeholders:

- "Secure process"
- "No SSN required"
- "No obligation"
- "Licensed partner support"
- "ZIP-based matching"

### 5. Product Cards Refresh

Product cards need more personality and hierarchy.

Keep:

- Bundle first and recommended.
- Auto, Home, Renters, Health.
- Product-specific CTA on every card.

Improve:

- Make Bundle card wider or visually elevated.
- Add product-specific micro-benefits:
  - Bundle: "Best for homeowners with vehicles"
  - Auto: "Cars, trucks, daily drivers"
  - Home: "Owned homes and condos"
  - Renters: "Apartments and rentals"
  - Health: "Individual and family options"
- Add small "best for" line on each card.
- Add hover/tap state.
- Add mobile horizontal swipe or stacked cards with Bundle first.
- Avoid orphan layout where Health card sits alone awkwardly on desktop.

Desktop layout:

- Bundle can span 2 columns.
- Other products can sit in a clean grid.

Mobile layout:

- Bundle full-width first.
- Other cards stacked or swipeable.
- CTAs full-width and thumb-friendly.

### 6. How It Works Refresh

Current section is clear but flat.

Improve:

- Add a visual step connector on desktop.
- On mobile, make steps look like a vertical progress timeline.
- Add small icons for each step.
- Add microcopy under each step.
- Add one CTA after the steps.

Keep it short:

1. Choose coverage.
2. Answer quick questions.
3. Get matched.

### 7. Self-Serve vs Expert Help Refresh

This section is strategically strong. Make it feel more human.

Improve:

- Add expert avatar stack or licensed partner badge.
- Add "Best if..." labels:
  - Compare online: "Best if you want speed."
  - Talk to expert: "Best if you want help choosing."
- Keep one green CTA and one navy/outline CTA.
- Make expert card navy and warm, not cold.

Mobile:

- Stack cards.
- Expert card should be highly tappable with phone CTA.

### 8. Mid-Page CTA Refresh

Current mid-page CTA is good but can feel heavy.

Improve:

- Make it feel like an embedded quote tool, not a random banner.
- Add a small preview of the next step:
  - "Next: 3 quick questions"
  - "Takes about 60 seconds"
- Add trust text below form:
  - "No SSN. No obligation. No surprise calls."
- On mobile, make form fields full-width and CTA sticky inside card.

### 9. Blog / SEO Tabs Refresh

Current blog cards look unfinished.

Improve:

- Replace patterned image placeholders with editorial-style visual blocks:
  - simple category illustration
  - icon + category label
  - mini chart
  - checklist preview
  - document/card UI
- Make article cards feel useful, not decorative.
- Add a small CTA footer in each card:
  - "Read guide"
  - "Compare quotes"
- Keep tabs but make active tab more obvious.
- Add Spanish Resources tab with culturally adapted copy.

Avoid:

- Generic diagonal stripes.
- Empty image placeholders.
- Blog cards taller than necessary on mobile.

### 10. FAQ Refresh

Current FAQ is clean but too sparse.

Improve:

- Add a trust/sidebar card on desktop:
  - "Questions before comparing?"
  - "Call a licensed partner"
  - "No SSN required"
- Keep accordion simple.
- On mobile, accordion full-width and easy to tap.

### 11. Bottom CTA Refresh

Current bottom CTA is structurally good.

Improve:

- Add stronger contrast before footer.
- Make the CTA feel like the final quote tool checkpoint.
- Add product selector + ZIP + trust line.
- Keep it compact on mobile.

### 12. Footer Refresh

Footer is good. Improve legibility:

- Increase contrast for footer text.
- Make legal/disclosure text readable.
- Add bilingual support links.
- Keep legal links visible.

## Motion / Interaction

Add subtle interaction only where it helps conversion:

- Button hover: lift 1-2px, darker green.
- Product cards: border/navy accent on hover/tap.
- Active product card: navy border + green badge.
- Form card: focus ring in green.
- Sticky mobile CTA: appears after scrolling past hero.
- Blog tabs: smooth tab switch.
- FAQ: smooth accordion open/close.

Avoid:

- Large animations.
- Parallax.
- Auto-rotating carousels.
- Anything that slows mobile.

## Mobile-First Requirements

Mobile is the priority.

At 375px width:

- Header must not wrap.
- Hero headline must not overflow.
- Product selector must be easy to tap.
- ZIP field must use numeric keyboard.
- CTA must be full-width.
- Sticky CTA must not cover form fields.
- Cards should not require tiny taps.
- Form entry points must remain obvious.
- No horizontal overflow.
- Page should feel like an app-like quote flow.

Suggested mobile order:

1. Header
2. Hero headline
3. Trust pills
4. Product + ZIP card
5. Compact quote preview
6. Trust strip
7. Product cards
8. How it works
9. Expert help
10. Mid-page CTA
11. Resources
12. FAQ
13. Bottom CTA
14. Footer

## Desktop Requirements

At desktop width:

- Hero should fill first viewport without feeling empty.
- Show a hint of next trust section below the fold.
- Product cards should align cleanly.
- Avoid orphan cards.
- Right-side hero visual should be richer than a single plain card.
- Keep nav and CTA visible.

## Copy Tweaks To Make It Less Generic

Use sharper copy:

Hero eyebrow:
`LOCAL QUOTE MATCHING`

Hero trust line:
`Free · 60 seconds · No SSN · No obligation`

CTA:
`Get my free quote`

Product section intro:
`Pick the coverage lane. We’ll open the right quote flow.`

No-spam proof:
`No phone-tree maze. No surprise auto-dialers.`

Expert section:
`Prefer a second set of eyes? A licensed partner can walk you through the options.`

Spanish:
`Gratis · 60 segundos · Sin SSN · Sin compromiso`
`Compara sin enredos`
`Te conectamos con expertos locales`

## Remove Or Replace

Remove or replace:

- Generic dotted background across too many sections.
- Unsupported stats: "12,000+", "A+", "30+" unless real.
- Fake carrier logos if not legally safe.
- Empty striped blog image placeholders.
- Orphaned Health card layout.
- Excessive whitespace between sections.
- Repeated plain white cards with identical styling.

## Add

Add:

- Human trust cue in hero.
- App-like quote dashboard preview.
- Licensed partner badge.
- Stronger Bundle hierarchy.
- Mobile sticky CTA.
- Better section contrast.
- Editorial-style blog card visuals.
- FAQ support card.
- More purposeful hover/tap states.

## Final Acceptance Criteria

The refreshed design is successful only if:

- It still converts clearly.
- The product-specific forms are easier to find, not harder.
- Bundle remains the default/recommended path.
- Mobile feels faster and more app-like.
- The site no longer looks like a generic AI template.
- The page still follows NIAG brand guidelines.
- No unsupported claims or fake quote prices are introduced.
- All CTAs and form entry points remain trackable by product, language, variant, and entry point.

---

## Short Version For Quick Tweaks

If the tool only accepts a shorter prompt, use this:

Improve this NIAG homepage visually while preserving structure, tracking, product-specific forms, EN/ES support, and A/B/C variants. The current design is too flat and AI-looking. Make it feel more premium, human, dynamic, and mobile-first. Keep the NIAG palette: navy `#0A1F44`, green `#1FB573`, cream `#FAF7F2`, sand `#F1ECE0`. Make the hero richer with a human trust cue, layered app-like quote dashboard, licensed partner badge, and stronger Bundle-first hierarchy. Replace generic dotted/striped placeholders with purposeful editorial visuals, quote UI elements, badges, and trust modules. Make product cards more distinctive, avoid orphan layout, and make Bundle prominent. Add section rhythm with cream/sand/navy contrast, less empty space, better mobile stacking, sticky mobile CTA, and tap-friendly controls. Do not add fake prices, fake reviews, unsupported stats, or fake carrier logos. Keep the site conversion-first: product selector + ZIP at top, repeated CTA modules mid/bottom/blog, dedicated flows for Bundle/Auto/Home/Renters/Health, and tracking by product/language/variant/entry point.
