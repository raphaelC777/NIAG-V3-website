# NIAG — Lead Gen Website Prototype

Mobile-first lead generation prototype for **NIAG — National Insurance Assistance Group**, built to the
spec in `NIAG_Claude_Design_Website_Creator_Prompt.md`.

## Run locally

A tiny PowerShell static server is included for Windows (Python/Node not required).

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .claude/serve.ps1 -Port 5173
```

Then open <http://localhost:5173>.

The same launch config is wired up under `.claude/launch.json` for Claude Code Preview.

## File map

```
index.html                       # Homepage (en/es via ?lang= toggle)
assets/
  css/styles.css                 # Full design system (navy/cream/green tokens)
  js/
    config.js                    # A/B/C variant + language + UTM capture + integrations
    tracking.js                  # dataLayer.push() events
    i18n.js                      # en/es strings + applyI18n()
    forms.js                     # Multi-step flows for bundle/auto/home/renters/health
    main.js                      # Hero, product cards, blog tabs, FAQ, sticky CTA
.claude/
  launch.json                    # Preview server config
  serve.ps1                      # Static file server (Windows / no deps)
```

## Variants

| Variant | URL                          | Hero headline                                                | Default product | CTA                     |
|--------:|------------------------------|--------------------------------------------------------------|-----------------|-------------------------|
| **A**   | `/?ab=A`                     | Bundle & save on auto + home insurance.                      | bundle          | Get my free quote       |
| **B**   | `/?ab=B`                     | Compare insurance quotes without the spam.                  | auto            | Start my quote          |
| **C**   | `/?ab=C`                     | Compare coverage with local experts you can trust.          | bundle          | Talk to a quote expert  |

Spanish variants: append `&lang=es`.

Variant assignment priority: `?ab=` query > `localStorage` > random 1/3 split. The chosen variant is
sticky in localStorage and surfaced in the small **dev pill** at the bottom-left of the viewport
(remove `.variant-tag` block from `index.html` for production).

## Form flows

Open any flow programmatically:

```js
NIAG_FORMS.open('auto', 'product_card');   // product, entryPoint
NIAG_FORMS.open('bundle', 'mid_cta');
```

Or deep-link via URL hash: `#/quote/auto`, `#/es/quote/bundle`.

| Product  | Steps | Tracking ID |
|----------|------:|-------------|
| Bundle   | 10    | `bundle`    |
| Auto     | 9     | `auto`      |
| Home     | 9     | `home`      |
| Renters  | 7     | `renters`   |
| Health   | 8     | `health`    |

Each flow ends with a TCPA consent step. Consent text, timestamp, IP placeholder, and user agent are
captured into the lead payload (see `forms.js → buildLeadPayload`).

## Tracking

All events fire via `dataLayer.push()`. Open devtools console to see them — `NIAG_DEBUG_TRACKING` is on.

Events emitted:

`page_view`, `product_select`, `zip_entered`, `form_start`, `form_step_view`, `form_step_complete`,
`form_back_click`, `form_abandon`, `tcpa_consent_checked`, `form_submit`, `lead_submit_success`,
`lead_submit_error`, `phone_click`, `language_toggle`, `blog_tab_click`, `quote_recovery_click`.

Payload always includes `productType`, `language`, `abVariant`, `entryPoint`, plus UTM and click-id
params captured from the URL (`gclid`, `fbclid`, `utm_*`, `affiliate_id`).

## Integration placeholders

`assets/js/config.js → integrations`:

```js
leadProsperEndpoint:  "/api/leads/leadprosper"
gohighlevelWebhook:   "/api/webhooks/gohighlevel"
gtmContainerId:       "GTM-XXXXXXX"
jornayaAccountId:     "00000000-..."
trustedFormScript:    "https://api.trustedform.com/trustedform.js"
```

Lead submit currently simulates with a 600ms delay and renders the inline success view (matches the
spec's thank-you copy). Replace `submit()` in `forms.js` with a real `fetch()` to LeadProsper / Go
High Level once credentials are provisioned.

## Compliance

- TCPA consent step is **required** to submit.
- Consent payload includes: text, timestamp (ISO), IP placeholder, user agent.
- Footer carries the Do Not Sell, Privacy, Terms, TCPA, and Advertising Disclosure links.
- Disclaimer copy is the exact spec language.

## Brand tokens

Defined as CSS variables in `assets/css/styles.css`:

```
--navy-primary  #0A1F44   --green        #1FB573
--navy-secondary#1E3360   --green-hover  #168B57
--cream         #FAF7F2   --border       #D3D1C7
--sand          #F1ECE0   --text         #2C2C2A
                          --text-secondary #5F5E5A
```

Fonts: **Fraunces** (headlines) + **Inter** (body/UI), via Google Fonts.
