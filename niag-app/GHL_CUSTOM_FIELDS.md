# GoHighLevel custom fields — full mapping spec

This is the complete list of fields the NIAG webhook sends to GHL. Use it
to build a Survey (which auto-creates the contact custom fields) and to
create the audit/attribution fields that don't belong in a survey.

## How GHL field keys work

- When you create a custom field in GHL, the **Field Key** is generated
  from the Display Name (e.g., "Own or Rent?" → `own_or_rent`).
- The webhook sends snake_case keys. **The GHL Field Key must match
  exactly** for auto-mapping to work — otherwise you'll need to map each
  field manually in the webhook trigger.
- If GHL ever munges a key differently than expected, you can edit the
  Field Key after creation (Settings → Custom Fields → click the field).

## Two-part setup

1. **Build a Survey** for everything customers conceptually answer.
   GHL Surveys auto-create the contact custom fields when you save.
2. **Create the audit fields manually** in Settings → Custom Fields.
   These are tracking/compliance fields the customer never sees — they
   come from our backend, UTMs, or the cert vendors.

---

## PART 1 — Build this Survey

Create a **Contact Survey** in GHL (Sites → Surveys → New Survey). Add
these fields in the order below. Most are standard contact fields — for
the rest, GHL will create a custom field automatically.

For dropdowns, the **values our webhook sends are listed in `code`** —
those values must be present in your GHL field's option list, otherwise
the value lands as the raw string but won't appear as a "selected"
option in the contact record.

> ⚠️ Tip: When creating a dropdown in GHL, you can set a separate
> "Display Label" and "Value". Use the `code` value as the **Value** and
> any friendly label you want as the **Display Label**.

### Step 1 — Location

| # | Display Name | Field Key (auto) | GHL Type | Required | Notes |
|---|---|---|---|---|---|
| 1 | ZIP Code | `zip` (custom) | Single Line / Numerical | ✅ | 5 digits, US ZIP only. We validate before submit. |

### Step 2 — Home / property qualification (used by Bundle + Home)

| # | Display Name | Field Key | GHL Type | Required | Options (value → label) |
|---|---|---|---|---|---|
| 2 | Own or Rent? | `own_or_rent` | Dropdown | conditional | `own` → I own • `rent` → I rent • `other` → Other / not sure |
| 3 | Property Type | `property_type` | Dropdown | conditional | `single` → Single-family home • `condo` → Condo / townhouse • `multi` → Multi-family • `mobile` → Mobile / manufactured |
| 4 | Year Built | `year_built` | Dropdown | conditional (Home) | `2010+` → 2010 or later • `1990-2009` → 1990–2009 • `1970-1989` → 1970–1989 • `pre1970` → Before 1970 |

### Step 3 — Insurance status

| # | Display Name | Field Key | GHL Type | Required | Options |
|---|---|---|---|---|---|
| 5 | Currently Insured? | `currently_insured` | Dropdown | conditional | `yes` → Yes • `no` → No • `lapsed` → Recently lapsed • `cobra` → On COBRA (health only) |

> The webhook collapses the auto-specific question `currentlyInsuredAuto`
> into this same field, so you only need one GHL field.

### Step 4 — Auto / Driving (Bundle + Auto)

| # | Display Name | Field Key | GHL Type | Required | Options |
|---|---|---|---|---|---|
| 6 | Vehicle Count | `vehicle_count` | Dropdown | conditional | `1` • `2` • `3` • `4+` |
| 7 | Driver Count | `driver_count` | Dropdown | conditional | `1` • `2` • `3` • `4+` |
| 8 | Incidents in last 3 years | `incidents` | Dropdown | conditional (Auto) | `none` → None • `one` → 1 incident • `two` → 2 or more |

### Step 5 — Renters

| # | Display Name | Field Key | GHL Type | Required | Options |
|---|---|---|---|---|---|
| 9 | Rental Type | `rental_type` | Dropdown | conditional (Renters) | `apt` → Apartment • `house` → House • `condo` → Condo • `other` → Other |
| 10 | Belongings Value | `coverage_amount` | Dropdown | conditional (Renters) | `low` → Under $20,000 • `mid` → $20,000–$50,000 • `high` → $50,000–$100,000 • `top` → More than $100,000 |

### Step 6 — Health

| # | Display Name | Field Key | GHL Type | Required | Options |
|---|---|---|---|---|---|
| 11 | Coverage For | `coverage_for` | Dropdown | conditional (Health) | `self` → Just me • `couple` → Me + partner • `family` → My family |
| 12 | Age Range | `age_range` | Dropdown | conditional (Health) | `under35` → Under 35 • `35to54` → 35–54 • `55to64` → 55–64 • `65+` → 65 or older |

### Step 7 — Timing (all products)

| # | Display Name | Field Key | GHL Type | Required | Options |
|---|---|---|---|---|---|
| 13 | Coverage Start Date | `start_date` | Dropdown | ✅ | `asap` → As soon as possible • `7` → Within 7 days • `30` → Within 30 days • `later` → Just exploring |

### Step 8 — Contact info (standard fields)

These four are **built-in** GHL contact fields. Just use the standard
First Name / Last Name / Email / Phone in the survey.

| # | Display Name | Field Key | GHL Type | Required |
|---|---|---|---|---|
| 14 | First Name | `first_name` | Standard | ✅ |
| 15 | Last Name | `last_name` | Standard | ✅ |
| 16 | Email | `email` | Standard | ✅ |
| 17 | Phone | `phone` | Standard | ✅ |

### Step 9 — TCPA consent

| # | Display Name | Field Key | GHL Type | Required |
|---|---|---|---|---|
| 18 | TCPA Consent | `tcpa_consent` | Checkbox / Single Line (`true` / `false`) | ✅ |
| 19 | TCPA Consent Text | `tcpa_consent_text` | Multi Line (Text Area) | ✅ |
| 20 | TCPA Consent Timestamp | `tcpa_consent_timestamp` | Single Line (ISO 8601) | ✅ |

> **Don't use the Date Picker type** for the timestamp — our webhook
> sends ISO 8601 with milliseconds (`2026-05-28T16:21:08.412Z`) and
> GHL's Date Picker may fail to parse it. Single Line stores it as-is
> for compliance audits.

---

## PART 2 — Create these manually in Settings → Custom Fields

These are **not** part of the survey UI — they come from our backend,
the user's URL, or the cert vendors. Create each as a **Contact Custom
Field** (Settings → Custom Fields → Add Field → Object type: Contact).

### Lead attribution (filled by our app on submit)

| # | Display Name | Field Key | GHL Type | Notes |
|---|---|---|---|---|
| 21 | Product | `product` | Dropdown or Single Line | Values: `bundle`, `auto`, `home`, `renters`, `health` |
| 22 | Language | `language` | Dropdown | Values: `en`, `es` |
| 23 | A/B Variant | `ab_variant` | Dropdown | Values: `A`, `B`, `C` |
| 24 | Entry Point | `entry_point` | Single Line | Where on the page the user clicked: `header`, `hero`, `product_card`, `mid_cta`, `blog_card`, `sticky_mobile`, `bottom_cta`, `footer`, `quote_recovery`, `mobile_drawer`, `deep_link` |
| 25 | Landing Page Slug | `lander_slug` | Single Line | E.g., `bundle-savings`, `auto-fast`. Empty if user came from the main homepage. |
| 26 | Lead Source URL | `lead_source_url` | Single Line (URL) | Full URL where the form was submitted, including query string. |
| 27 | Submitted At | `submitted_at` | Single Line | ISO 8601 timestamp from our server. |

### Marketing attribution (filled from URL params)

| # | Display Name | Field Key | GHL Type | Notes |
|---|---|---|---|---|
| 28 | UTM Source | `utm_source` | Single Line | Google `utm_source` param. |
| 29 | UTM Medium | `utm_medium` | Single Line | |
| 30 | UTM Campaign | `utm_campaign` | Single Line | |
| 31 | UTM Content | `utm_content` | Single Line | |
| 32 | UTM Term | `utm_term` | Single Line | |
| 33 | Google Click ID | `gclid` | Single Line | Required for Google Ads offline conversion uploads. |
| 34 | Facebook Click ID | `fbclid` | Single Line | Meta CAPI. |
| 35 | Affiliate ID | `affiliate_id` | Single Line | Custom partner ID (also accepts `?aff=` shortform). |

### Compliance & lead certs

| # | Display Name | Field Key | GHL Type | Notes |
|---|---|---|---|---|
| 36 | Jornaya LeadiD | `jornaya_leadid` | Single Line | Public-safe token. Most TCPA-aware buyers require this. |
| 37 | TrustedForm Cert URL | `trustedform_cert_url` | Single Line (URL) | Buyers claim the cert via this URL. |
| 38 | TrustedForm Ping URL | `trustedform_ping_url` | Single Line (URL) | For "ping & post" lead flows. |
| 39 | TrustedForm Cert Token | `trustedform_cert_token` | Single Line | Alternative to cert URL. |

### Audit (filled by server)

| # | Display Name | Field Key | GHL Type | Notes |
|---|---|---|---|---|
| 40 | IP Address | `ip_address` | Single Line | Used for TCPA audit, not as a user identifier. |
| 41 | User Agent | `user_agent` | Multi Line | Long strings — use text area. |

---

## Webhook trigger setup in GHL

Once the fields exist, configure the inbound webhook:

1. **Automations → Workflows → New Workflow → Inbound Webhook trigger**.
2. **Webhook URL** — copy it and paste it into your hosting provider's
   env vars as `GHL_WEBHOOK_URL`. (See `.env.example`.)
3. **First-fire mapping** — submit one test lead from `/form/bundle`
   in dev. GHL will detect the payload structure on the first hit.
4. **Mapping check** — open the webhook trigger → Sample Payload. Every
   field key from this doc should appear. If any are missing, GHL will
   ignore them silently; check the field name spelling.
5. **Workflow actions** — typical setup:
   - Find or Create Contact by Email + Phone
   - Update Contact Custom Fields (map every field from this doc)
   - Add to Pipeline → Stage based on `product` field
   - Conditional SMS / Email based on `tcpa_consent === true`

## Field count summary

- **20 fields** in the Survey
- **21 fields** to create manually in Settings → Custom Fields
- **= 41 total fields** the webhook may send

## What to leave out of the Survey

Don't add to the survey: `product`, `language`, `ab_variant`, `entry_point`,
`lander_slug`, `lead_source_url`, `submitted_at`, all `utm_*`, `gclid`,
`fbclid`, `affiliate_id`, all `jornaya_*` and `trustedform_*`,
`ip_address`, `user_agent`.

These are backend-populated. If they're in the survey, GHL will create
visible UI for them — which both clutters the form and exposes
attribution data to the user.

## Conditional logic in the Survey (recommended)

To match our app's product-specific flows, set survey conditions:

| If `product` is… | Show fields |
|---|---|
| `bundle` | `own_or_rent`, `property_type`, `currently_insured` (auto framing), `vehicle_count`, `driver_count`, `start_date` |
| `auto` | `currently_insured`, `vehicle_count`, `driver_count`, `incidents`, `start_date` |
| `home` | `own_or_rent`, `property_type`, `year_built`, `currently_insured`, `start_date` |
| `renters` | `rental_type`, `coverage_amount`, `start_date` |
| `health` | `coverage_for`, `age_range`, `currently_insured`, `start_date` |

Note: our app already sends only the relevant fields for each product —
fields that don't apply will arrive blank. The conditional logic above
is for the case where someone fills out the survey directly inside GHL.
