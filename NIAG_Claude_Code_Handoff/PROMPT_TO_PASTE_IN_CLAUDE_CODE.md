# Prompt To Paste In Claude Code

Use the files in `NIAG_Claude_Code_Handoff` as the source reference for the NIAG site.

Do not reverse-engineer the packed export unless necessary. The original file `NIAG Homepage.html` is a bundled prototype. These handoff files are the readable source modules:

- `app.jsx`
- `config.jsx`
- `homepage-hero-header.jsx`
- `homepage-sections.jsx`
- `quote-form.jsx`

Convert this prototype into a production-ready Next.js App Router project with TypeScript and Tailwind CSS.

Follow the complete implementation spec in:

```text
NIAG_Claude_Code_Implementation_Prompt.md
```

Key requirements:

1. Preserve the current page structure and conversion flow.
2. Keep product-specific entry points for `bundle`, `auto`, `home`, `renters`, and `health`.
3. Convert modal quote flow into route-ready or componentized Next.js logic.
4. Implement `/quote/[product]` and `/es/quote/[product]`.
5. Implement EN/ES language support.
6. Implement A/B/C variant support.
7. Implement `dataLayer` tracking for product, language, variant, entry point, ZIP, and step.
8. Implement safe IP geolocation personalization:
   - use city/region as personalization;
   - suggest ZIP only if available;
   - never silently submit IP-derived ZIP as confirmed user input.
9. Implement server-side bot protection verification:
   - Cloudflare Turnstile preferred;
   - Google reCAPTCHA v3 acceptable as fallback.
10. Implement `/api/lead` with validation and placeholders for:
   - LeadProsper;
   - Go High Level;
   - Jornaya;
   - TrustedForm;
   - GTM.
11. Implement final TCPA consent capture with exact consent text, timestamp, IP, user agent, language, variant, product, and entry point.
12. Add `/thank-you`.

Important visual direction:

The hero visual was revised in `homepage-hero-header.jsx` as `HeroVisual`.

Use a real licensed image at:

```text
/public/images/hero-driver-phone-car.jpg
```

Image brief:

```text
Adult using a phone with a parked car visible behind them, bright natural daylight, trustworthy, modern, not overly staged.
```

Do not reintroduce:

- fake carrier names;
- fake prices;
- fake review counts;
- fake BBB claims;
- invented testimonials;
- invented agent identities.

If the image asset is unavailable, keep the `HeroVisual` UI composition and use a polished gradient/photo placeholder until the asset is supplied.
