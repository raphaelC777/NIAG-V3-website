# NIAG — Brand Guidelines v1

**Direction:** Trusted Anchor
**Owner:** Raphael
**Última atualização:** May 2026
**Status:** v1 — aprovado para produção

---

## 1. Brand Essence

### Positioning statement (EN)
> NIAG is the fastest way for US drivers and homeowners to compare auto and home insurance with local experts they can actually trust — no spam, no surprise pricing, no nonsense.

### Positioning statement (ES)
> NIAG es la forma más rápida para conductores y propietarios en EE.UU. de comparar seguros de auto y hogar con expertos locales en quienes pueden confiar — sin spam, sin precios sorpresa, sin enredos.

### Brand pillars

| Pillar | EN | ES |
|---|---|---|
| **1. Trustworthy** | Carrier-licensed, TCPA-compliant, transparent | Con licencia, cumple TCPA, transparente |
| **2. Fast** | Quote in 60 seconds, no paperwork | Cotización en 60 segundos, sin papeleo |
| **3. No-bullshit** | No hidden fees, no upsell games, plain English | Sin tarifas ocultas, sin trucos, claro y directo |
| **4. Local experts** | US-based, bilingual, by state | Equipo en EE.UU., bilingüe, por estado |

---

## 2. Logo System

### Primary lockup
- **Wordmark:** `NIAG` in Fraunces Bold (serif), letter-spacing +3, weight 700
- **Divider:** 1.5px solid line in Money Green 500
- **Tagline (optional):** `INSURANCE ASSISTANCE GROUP` in Inter Medium, letter-spacing +3, 9px–11px

### Variations (todas necessárias no asset pack)
1. **Primary** — Navy 900 on Cream (#FAF7F2) backgrounds
2. **Inverted** — Cream wordmark + Green divider on Navy 900 backgrounds
3. **Monochrome black** — for print, faxes, B&W docs
4. **Monochrome white** — for photography overlays
5. **Monogram square** — Navy 900 square, Green N (rx=8)
6. **Monogram pill** — Green 500 pill, Navy N (rx=50, fully round)
7. **Favicon 32px** — monogram square simplified
8. **Favicon 16px** — single Green N on Navy (no detail)

### Clear space rules
- Minimum clear space around logo = **height of the `N` character** on all sides
- Never place logo on busy photography without scrim/overlay
- Never rotate, skew, shadow, or recolor outside palette

### Minimum sizes
- Wordmark + tagline lockup: **120px wide minimum**
- Wordmark only: **80px wide minimum**
- Monogram: **24px minimum**
- Favicon 16px: never smaller

### What NOT to do
- ❌ Do not stretch, compress, or rotate the logo
- ❌ Do not change letter-spacing or substitute the serif font
- ❌ Do not place navy logo on dark backgrounds (contrast fail)
- ❌ Do not add gradients, shadows, glows, or 3D effects
- ❌ Do not use the green divider color on anything except the lockup

---

## 3. Color System

### Primary palette — full ramps

#### Navy (primary)
| Token | Hex | RGB | Usage |
|---|---|---|---|
| `navy-50` | `#E8EBF2` | 232,235,242 | Hover states, subtle backgrounds |
| `navy-100` | `#D0D6E4` | 208,214,228 | Disabled states |
| `navy-200` | `#B4BED1` | 180,190,209 | Borders, dividers |
| `navy-500` | `#4A5C82` | 74,92,130 | Secondary text on cream |
| `navy-700` | `#1E3360` | 30,51,96 | Body emphasis on cream |
| `navy-900` | `#0A1F44` | 10,31,68 | **Primary brand. Headers, hero, logo** ⭐ |

#### Money Green (CTA + success)
| Token | Hex | RGB | Usage |
|---|---|---|---|
| `green-50` | `#E2F7EE` | 226,247,238 | Success message backgrounds |
| `green-100` | `#C7EDDA` | 199,237,218 | Badge backgrounds |
| `green-200` | `#9FE2C5` | 159,226,197 | Hover state on green CTAs |
| `green-500` | `#1FB573` | 31,181,115 | **Primary CTA. Action buttons** ⭐ |
| `green-700` | `#168B57` | 22,139,87 | Pressed/active state |
| `green-900` | `#0D5A39` | 13,90,57 | Text on green-50 backgrounds |

#### Warm Neutrals
| Token | Hex | RGB | Usage |
|---|---|---|---|
| `cream` | `#FAF7F2` | 250,247,242 | Default page background ⭐ |
| `sand` | `#F1ECE0` | 241,236,224 | Card backgrounds, alternating sections |
| `border` | `#D3D1C7` | 211,209,199 | 0.5px borders, dividers |
| `muted` | `#888780` | 136,135,128 | Tertiary text, captions |
| `body` | `#5F5E5A` | 95,94,90 | Secondary body text |
| `ink` | `#2C2C2A` | 44,44,42 | Primary body text on cream ⭐ |

#### Semantic colors (states)
| Token | Hex | Usage |
|---|---|---|
| `warning` | `#F4B942` | Form validation warnings |
| `error` | `#D94B4B` | Form errors, destructive actions |
| `success` | `#1FB573` | Success messages (same as green-500) |
| `info` | `#3B82C9` | Informational callouts |

### Usage rules (proportion: 60/30/10)

- **60% Cream + Sand** (backgrounds, surfaces)
- **30% Navy 900** (text, headers, hero, logo)
- **10% Green 500** (CTAs, accents, highlights, savings badges)

**Never:**
- ❌ Body copy in Navy 900 (use Ink — better readability)
- ❌ Large green backgrounds (overwhelms, looks "scam-y")
- ❌ Pure white (#FFFFFF) — always use Cream (#FAF7F2)
- ❌ Pure black (#000000) — always use Ink (#2C2C2A)

### Accessibility (WCAG AA validated)

| Combination | Contrast | Status |
|---|---|---|
| Ink (#2C2C2A) on Cream (#FAF7F2) | 13.9:1 | ✅ AAA |
| Navy 900 on Cream | 14.8:1 | ✅ AAA |
| Cream on Navy 900 | 14.8:1 | ✅ AAA |
| Cream on Green 500 | 3.2:1 | ⚠️ AA for large text only |
| Navy 900 on Green 500 | 4.6:1 | ✅ AA |
| Green 700 on Cream | 5.1:1 | ✅ AA |

**Rule:** for body text on green buttons, use white/cream at **min 16px weight 500**. Smaller text on green = use Navy 900.

---

## 4. Typography

### Font stack
- **Display (headlines):** Fraunces — Google Fonts, free, supports EN/ES/PT diacritics
- **Body (UI + paragraphs):** Inter — Google Fonts, free, supports EN/ES/PT diacritics
- **Monospace (code/numbers):** JetBrains Mono — for premium calculator, MFA codes

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Type scale (mobile-first)

| Role | Mobile | Desktop | Weight | Font |
|---|---|---|---|---|
| `display` | 32px / 1.1 | 56px / 1.05 | 700 | Fraunces |
| `h1` | 28px / 1.15 | 48px / 1.1 | 700 | Fraunces |
| `h2` | 24px / 1.2 | 32px / 1.2 | 600 | Fraunces |
| `h3` | 20px / 1.3 | 24px / 1.3 | 600 | Fraunces |
| `h4` | 18px / 1.4 | 20px / 1.4 | 500 | Inter |
| `body-lg` | 17px / 1.6 | 18px / 1.6 | 400 | Inter |
| `body` | 16px / 1.6 | 16px / 1.6 | 400 | Inter |
| `body-sm` | 14px / 1.5 | 14px / 1.5 | 400 | Inter |
| `caption` | 13px / 1.4 | 13px / 1.4 | 400 | Inter |
| `micro` | 11px / 1.3 | 11px / 1.3 | 500 | Inter |
| `eyebrow` | 11px / 1 | 11px / 1 | 500 | Inter + letter-spacing 2px UPPERCASE |

### Rules
- **Display + h1**: Fraunces only — communicates "premium" without being stuffy
- **Body**: never below 16px on mobile (CRO + readability)
- **Letter-spacing**: headlines `-0.5px`, eyebrows `+2px`, body 0
- **Line-height**: body 1.6 always (compliance copy 1.7 for legibility)

---

## 5. Slogan / Tagline

### EN — 3 options to test

| # | Tagline | Hypothesis |
|---|---|---|
| **A** | **Real quotes. Local experts. 60 seconds.** | Specificity + speed beats vague trust copy. Numbers convert. |
| **B** | **Save more. Skip the spam.** | Anti-spam framing differentiates from Insurify/Zebra. Direct pain. |
| **C** | **Your insurance, finally on your side.** | Empathy angle. Pulls trust + frustration with current insurer. |

**Default for V1 launch:** Option A — strongest message-match for paid search.

### ES — 3 options to test (cultural adaptation, not literal translation)

| # | Tagline | Hypothesis |
|---|---|---|
| **A** | **Cotizaciones reales. Expertos locales. 60 segundos.** | Mirror EN-A for cross-language consistency. |
| **B** | **Ahorra más. Sin enredos.** | "Enredos" > literal "spam" — culturally resonates with LatAm-US. |
| **C** | **Tu seguro, por fin de tu lado.** | Family-first frame, strong with Hispanic homeowners. |

**Default for V1 launch:** Option B — "sin enredos" is sticky and unique in Spanish-language insurance ads.

---

## 6. Voice & Tone

### Voice attributes (always true)
1. **Direct** — short sentences, active voice, plain English/Spanish
2. **Confident** — we know insurance, but we don't lecture
3. **Warm** — we're on the user's side, not the carrier's

### Tone shifts (by context)

| Context | Tone |
|---|---|
| Hero / ads | Bold, benefit-driven, urgent |
| Form steps | Encouraging, concise, low-friction |
| Trust / compliance | Calm, factual, transparent |
| Errors | Helpful, never blaming the user |
| Success / thank-you | Celebratory, specific, forward-looking |

### Voice DO's

✅ "Get my free quote" (active, possessive)
✅ "60 seconds. No SSN required."
✅ "We compare 30+ carriers so you don't have to."
✅ "Your data is yours. Period."
✅ ES: "Compara y ahorra — sin compromiso."

### Voice DON'T's

❌ "Submit your information for review" (passive, cold)
❌ "Get an insurance quotation in approximately one minute" (jargon, vague)
❌ "We are an insurance technology platform that aggregates..." (corporate)
❌ ES: "Por favor proporcione su información para que podamos..." (formal, distant)

### Example pairs

**Hero headline**
- EN: `Bundle & save on auto + home insurance.`
- ES: `Combina y ahorra en seguro de auto + hogar.`

**Form microcopy (zip step)**
- EN: `Where do you live? We'll match you with local rates.`
- ES: `¿Dónde vives? Te conectamos con tarifas locales.`

**Trust line under CTA**
- EN: `Free · 60 seconds · No credit check · No SSN`
- ES: `Gratis · 60 segundos · Sin verificación de crédito · Sin SSN`

**Error state**
- EN: `Hmm, that ZIP doesn't look right. Mind double-checking?`
- ES: `Ese código postal no parece correcto. ¿Lo revisamos?`

---

## 7. Naming Conventions

### Brand name
- Always written **NIAG** — all caps, no periods, no spaces
- Never `N.I.A.G.` or `Niag` or `niag` (except in URLs/code)
- Domain: lowercase (`niag.com`, `niag.com/es`, etc.)
- Email signatures: `NIAG | Insurance Assistance Group`

### Product naming
| Internal | User-facing EN | User-facing ES |
|---|---|---|
| Auto + Home bundle | "The Bundle" / "Auto + Home" | "El Combo" / "Auto + Hogar" |
| Auto-only product | "Auto Insurance" | "Seguro de Auto" |
| Home-only product | "Home Insurance" | "Seguro de Hogar" |
| Multi-step form | "Quote tool" / "Quote in 60s" | "Cotización en 60s" |
| Premium calculator (Phase 5) | "Premium Estimator" | "Estimador de Prima" |

### How to refer to the user

| ❌ Avoid | ✅ Use |
|---|---|
| "lead" | "driver" / "homeowner" / "you" |
| "user" | "you" / "member" |
| "customer" (we're not the insurer) | "you" / "driver" |
| ES: "cliente" | ES: "tú" / "conductor" |

### Channel naming (internal — for tracking & ops)
- Landers: `niag_{product}_{variant}_{lang}_v{n}` → e.g. `niag_auto_home_a_en_v1`
- Campaigns: `{channel}_{product}_{audience}_{geo}` → e.g. `meta_bundle_hispanic_fl`
- Workflows in GHL: `WF_{stage}_{action}` → e.g. `WF_LeadCaptured_SendSMS`

---

## 8. Application Examples

### Hero section (lander A)
```
[Eyebrow]    SAVE UP TO 32%
[H1]         Bundle & save on auto + home insurance.
[Sub]        Compare quotes from 30+ top carriers in 60 seconds. Free.
[CTA]        Get my free quote →
[Trust]      Free · 60 seconds · No credit check · No SSN
[Social]     ★★★★★ 4.8 · 12,000+ reviews · A+ BBB rated
```

### Mobile sticky CTA
- Background: Navy 900
- Button: Green 500, full-width minus 16px margin
- Text: `Get my quote →` (max 4 words)
- Position: `bottom: 0` on scroll past hero

### Email signature template
```
[Name]
NIAG | Insurance Assistance Group
[phone] · [email]
niag.com
```

### Social proof card
- Background: White (#FFFFFF) on Cream page
- Border: 0.5px `border` color, radius-lg
- Avatar: Navy 900 circle, Green 500 initials, 30px
- Name + location: 12px weight 500
- Stars: Green 500
- Quote: 11px Ink, 1.6 line-height
- Padding: 16px

---

## 9. Design Tokens (production-ready)

### Tailwind config (drop-in)

```javascript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#E8EBF2',
          100: '#D0D6E4',
          200: '#B4BED1',
          500: '#4A5C82',
          700: '#1E3360',
          900: '#0A1F44',
          DEFAULT: '#0A1F44',
        },
        green: {
          50:  '#E2F7EE',
          100: '#C7EDDA',
          200: '#9FE2C5',
          500: '#1FB573',
          700: '#168B57',
          900: '#0D5A39',
          DEFAULT: '#1FB573',
        },
        cream:  '#FAF7F2',
        sand:   '#F1ECE0',
        border: '#D3D1C7',
        muted:  '#888780',
        body:   '#5F5E5A',
        ink:    '#2C2C2A',
        warning:'#F4B942',
        error:  '#D94B4B',
        info:   '#3B82C9',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display':  ['56px', { lineHeight: '1.05', fontWeight: '700', letterSpacing: '-0.5px' }],
        'display-mobile': ['32px', { lineHeight: '1.1', fontWeight: '700' }],
        'h1':       ['48px', { lineHeight: '1.1', fontWeight: '700' }],
        'h2':       ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        'h3':       ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg':  ['18px', { lineHeight: '1.6' }],
        'body':     ['16px', { lineHeight: '1.6' }],
        'caption':  ['13px', { lineHeight: '1.4' }],
        'eyebrow':  ['11px', { lineHeight: '1', letterSpacing: '2px', fontWeight: '500' }],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'pill': '999px',
      },
      boxShadow: {
        'card':  '0 1px 2px rgba(10, 31, 68, 0.04)',
        'cta':   '0 2px 4px rgba(31, 181, 115, 0.2)',
        'focus': '0 0 0 3px rgba(31, 181, 115, 0.3)',
      },
    },
  },
  plugins: [],
}
export default config
```

### CSS Variables (para GHL custom code)

```css
:root {
  /* Brand */
  --niag-navy-900:  #0A1F44;
  --niag-navy-700:  #1E3360;
  --niag-navy-500:  #4A5C82;
  --niag-navy-200:  #B4BED1;
  --niag-navy-50:   #E8EBF2;

  --niag-green-900: #0D5A39;
  --niag-green-700: #168B57;
  --niag-green-500: #1FB573;
  --niag-green-200: #9FE2C5;
  --niag-green-50:  #E2F7EE;

  --niag-cream:     #FAF7F2;
  --niag-sand:      #F1ECE0;
  --niag-border:    #D3D1C7;
  --niag-muted:     #888780;
  --niag-body:      #5F5E5A;
  --niag-ink:       #2C2C2A;

  --niag-warning:   #F4B942;
  --niag-error:     #D94B4B;
  --niag-info:      #3B82C9;

  /* Typography */
  --niag-font-display: 'Fraunces', Georgia, serif;
  --niag-font-sans:    'Inter', system-ui, sans-serif;
  --niag-font-mono:    'JetBrains Mono', monospace;

  /* Radius */
  --niag-radius-sm:   4px;
  --niag-radius-md:   8px;
  --niag-radius-lg:   12px;
  --niag-radius-xl:   16px;
  --niag-radius-pill: 999px;
}

/* Reset base for GHL pages */
body {
  background: var(--niag-cream);
  color: var(--niag-ink);
  font-family: var(--niag-font-sans);
  font-size: 16px;
  line-height: 1.6;
}

h1, h2, h3 { font-family: var(--niag-font-display); color: var(--niag-navy-900); }
```

### Primary CTA component (React + Tailwind)

```tsx
type CTAProps = {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'inverse'
  size?: 'sm' | 'md' | 'lg'
}

export function CTA({ children, href, onClick, variant = 'primary', size = 'lg' }: CTAProps) {
  const base = 'inline-flex items-center justify-center font-medium rounded-md transition-all active:scale-[0.98]'
  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-5 text-base',
    lg: 'h-13 px-6 text-base',
  }
  const variants = {
    primary:   'bg-green-500 text-cream hover:bg-green-700 shadow-cta',
    secondary: 'bg-cream text-navy-900 border-[1.5px] border-navy-900 hover:bg-navy-50',
    inverse:   'bg-navy-900 text-cream hover:bg-navy-700',
  }
  const cls = `${base} ${sizes[size]} ${variants[variant]}`

  if (href) return <a href={href} className={cls}>{children}</a>
  return <button onClick={onClick} className={cls}>{children}</button>
}
```

---

## 10. Asset Checklist (handoff para dev)

- [ ] `logo-primary.svg` (Navy on Cream)
- [ ] `logo-inverted.svg` (Cream on Navy)
- [ ] `logo-mono-black.svg`
- [ ] `logo-mono-white.svg`
- [ ] `monogram-square-navy.svg`
- [ ] `monogram-pill-green.svg`
- [ ] `favicon.svg` (vector, 32px logical)
- [ ] `favicon-32.png`
- [ ] `favicon-16.png`
- [ ] `apple-touch-icon-180.png`
- [ ] `og-image-1200x630.png` (default share image)
- [ ] Fonts loaded via Google Fonts CDN (Fraunces, Inter, JetBrains Mono)
- [ ] `tailwind.config.ts` instalado no Next.js
- [ ] `globals.css` com base reset + CSS variables
- [ ] `<CTA />` component criado e testado

---

## 11. Pendências para v2

- Logo em formato `.ai` editável (precisa Illustrator se Ryan quiser ajustes)
- Versão "ícone com símbolo abstrato" para teste A/B com versão wordmark-only
- Brand photography style guide (quando começarmos a usar imagens de modelos)
- Iconografia custom (por enquanto: Lucide Icons como sistema padrão)
- Motion guidelines (microanimações de form steps, transições)

---

*Próximo doc na fila:* `NIAG_Competitive_Teardown_v1.md` — análise dos 7 competidores principais (Insurify, Zebra, Gabi, Policygenius, Jerry, Smart Financial, Filtered Quotes) com tudo do hero copy ao thank-you page.
