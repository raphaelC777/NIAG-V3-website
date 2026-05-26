# NIAG Claude Code Handoff

This folder contains the extracted source modules from the Claude Design HTML export.

Use these files as the source reference instead of trying to reverse-engineer `NIAG Homepage.html` directly. The original HTML is a packed bundle with compressed embedded assets; these files are the readable app pieces.

## Files

- `app.jsx` - current prototype app shell, language/variant state, modal state, sticky CTA.
- `config.jsx` - products, icons, copy, EN/ES strings, tracking shim.
- `homepage-hero-header.jsx` - header and hero. This file has been edited for the new hero direction.
- `homepage-sections.jsx` - trust strip, product cards, how it works, expert help, mid CTA, resources, FAQ, footer, thank-you.
- `quote-form.jsx` - current multi-step quote modal prototype.

## Important Visual Change Already Applied

The original right-side hero used a fake-looking app card with:

- fake carrier rows;
- invented agent identity;
- invented testimonial.

That direction has been replaced in `homepage-hero-header.jsx` with `HeroVisual`.

`HeroVisual` expects this future asset:

```text
/public/images/hero-driver-phone-car.jpg
```

Image brief:

```text
Adult using a phone, parked car visible behind them, bright natural daylight, trustworthy and modern, not stocky, not overly posed.
```

The visual now uses overlays that are safer:

- ZIP-based match
- Licensed support
- No SSN to start
- Available by ZIP

Do not reintroduce fake prices, fake carrier names, fake reviews, or invented agent/person names.

## Build Target

Convert this prototype into a maintainable Next.js app:

- Next.js App Router
- TypeScript
- Tailwind CSS
- React components
- Route handlers for API logic
- Server-side bot verification
- Lead submission placeholders

## Must Implement

1. Real routes:
   - `/`
   - `/es`
   - `/quote/[product]`
   - `/es/quote/[product]`
   - `/thank-you`

2. Product flows:
   - `bundle`
   - `auto`
   - `home`
   - `renters`
   - `health`

3. Tracking payload on all CTA/form actions:
   - `productType`
   - `language`
   - `abVariant`
   - `entryPoint`
   - `zipCode`
   - UTM/click IDs

4. Geo personalization:
   - use IP location only as approximate personalization;
   - show city/region or editable ZIP suggestion;
   - never submit IP-derived ZIP as confirmed user input unless the user confirms/edits it.

5. Bot protection:
   - Cloudflare Turnstile preferred;
   - Google reCAPTCHA v3 acceptable;
   - verify token server-side before lead submission.

6. Integrations:
   - LeadProsper placeholder;
   - Go High Level webhook placeholder;
   - Jornaya placeholder;
   - TrustedForm placeholder;
   - GTM/dataLayer.

7. Compliance:
   - final TCPA consent checkbox;
   - store exact consent text;
   - store consent timestamp;
   - do not expose secrets in client code.

## Use The Main Implementation Prompt

Use the project-level prompt:

```text
../NIAG_Claude_Code_Implementation_Prompt.md
```

That prompt contains the complete technical spec.
