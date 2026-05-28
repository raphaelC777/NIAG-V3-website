# GoHighLevel — Custom Fields setup

GHL is the **lead database + ping-post hub** for LeadProsper. The form
itself lives on the Next.js website, so no GHL Survey is needed —
create the contact custom fields directly under **Settings → Custom
Fields**.

## What to create

- **4 standard fields** — already exist in every GHL account, no setup.
- **37 custom fields** — listed below, grouped into 5 folders.
- **= 41 total** fields the webhook can deliver per lead.

## Folder structure (recommended)

GHL supports custom-field folders since 2023. Settings → Custom Fields
→ click the **+** next to "Folders" to create each one, then drag the
fields in. Folders keep the contact record readable and make webhook
mapping faster.

```
📁 NIAG · Qualifying Questions    (what the customer answered)
📁 NIAG · Attribution             (where the lead came from)
📁 NIAG · TCPA Compliance         (consent record)
📁 NIAG · Lead Certificates       (Jornaya + TrustedForm)
📁 NIAG · Audit                   (IP, UA — compliance only)
```

## How to read the tables below

- **Field Key** is the snake_case key the webhook sends. GHL generates
  the Field Key automatically from the Display Name — you can edit it
  after creation (click the field in Settings → Custom Fields).
- **The Field Key MUST match exactly**, otherwise GHL will silently
  ignore the value during webhook mapping.
- For Dropdowns, the `code` column shows the literal value our webhook
  sends. Use it as the **Value** in GHL; use any friendly label as the
  **Display Label**.

## Standard fields (no setup required)

These four are built-in GHL contact fields. The webhook payload uses the
keys on the left; in the webhook trigger, map each one to the standard
contact field on the right.

| Webhook key   | Maps to GHL standard field |
|---------------|----------------------------|
| `first_name`  | First Name                 |
| `last_name`   | Last Name                  |
| `email`       | Email                      |
| `phone`       | Phone                      |

---

## 📁 NIAG · Qualifying Questions

What the customer answered in the multi-step form. 13 fields.

| # | Display Name | Field Key | Type | Options (`code` → label) |
|---|---|---|---|---|
| 1 | NIAG ZIP Code | `zip` | Single Line | (5-digit US ZIP) |
| 2 | NIAG Own or Rent | `own_or_rent` | Dropdown | `own` → I own • `rent` → I rent • `other` → Other |
| 3 | NIAG Property Type | `property_type` | Dropdown | `single` → Single-family home • `condo` → Condo/townhouse • `multi` → Multi-family • `mobile` → Mobile/manufactured |
| 4 | NIAG Year Built | `year_built` | Dropdown | `2010+` → 2010 or later • `1990-2009` → 1990–2009 • `1970-1989` → 1970–1989 • `pre1970` → Before 1970 |
| 5 | NIAG Currently Insured | `currently_insured` | Dropdown | `yes` → Yes • `no` → No • `lapsed` → Recently lapsed • `cobra` → On COBRA |
| 6 | NIAG Vehicle Count | `vehicle_count` | Dropdown | `1` • `2` • `3` • `4+` |
| 7 | NIAG Driver Count | `driver_count` | Dropdown | `1` • `2` • `3` • `4+` |
| 8 | NIAG Incidents (3yr) | `incidents` | Dropdown | `none` → None • `one` → 1 incident • `two` → 2 or more |
| 9 | NIAG Rental Type | `rental_type` | Dropdown | `apt` → Apartment • `house` → House • `condo` → Condo • `other` → Other |
| 10 | NIAG Belongings Value | `coverage_amount` | Dropdown | `low` → Under $20k • `mid` → $20k–$50k • `high` → $50k–$100k • `top` → $100k+ |
| 11 | NIAG Coverage For | `coverage_for` | Dropdown | `self` → Just me • `couple` → Me + partner • `family` → My family |
| 12 | NIAG Age Range | `age_range` | Dropdown | `under35` → Under 35 • `35to54` → 35–54 • `55to64` → 55–64 • `65+` → 65+ |
| 13 | NIAG Start Date | `start_date` | Dropdown | `asap` → As soon as possible • `7` → Within 7 days • `30` → Within 30 days • `later` → Just exploring |

> Each lead only carries the fields relevant to its product — fields
> that don't apply arrive blank. That's expected and won't break the
> webhook.

---

## 📁 NIAG · Attribution

Where the lead came from. 15 fields.

| # | Display Name | Field Key | Type | Notes / Options |
|---|---|---|---|---|
| 14 | NIAG Product | `product` | Dropdown | `bundle` • `auto` • `home` • `renters` • `health` |
| 15 | NIAG Language | `language` | Dropdown | `en` • `es` |
| 16 | NIAG A/B Variant | `ab_variant` | Dropdown | `A` • `B` • `C` |
| 17 | NIAG Entry Point | `entry_point` | Single Line | `header`, `hero`, `product_card`, `mid_cta`, `blog_card`, `sticky_mobile`, `bottom_cta`, `footer`, `quote_recovery`, `mobile_drawer`, `deep_link` |
| 18 | NIAG Landing Page Slug | `lander_slug` | Single Line | e.g. `bundle-savings`, `auto-fast`; blank if user came from homepage |
| 19 | NIAG Lead Source URL | `lead_source_url` | Single Line | Full URL incl. query string |
| 20 | NIAG Submitted At | `submitted_at` | Single Line | ISO 8601 timestamp |
| 21 | UTM Source | `utm_source` | Single Line | |
| 22 | UTM Medium | `utm_medium` | Single Line | |
| 23 | UTM Campaign | `utm_campaign` | Single Line | |
| 24 | UTM Content | `utm_content` | Single Line | |
| 25 | UTM Term | `utm_term` | Single Line | |
| 26 | Google Click ID | `gclid` | Single Line | Required for Google Ads offline conversion |
| 27 | Facebook Click ID | `fbclid` | Single Line | Meta CAPI |
| 28 | Affiliate ID | `affiliate_id` | Single Line | Accepts `?affiliate_id=` or `?aff=` |

---

## 📁 NIAG · TCPA Compliance

Legal record of the consent the user gave. 3 fields. **All required**
for ping-post buyers like LeadProsper.

| # | Display Name | Field Key | Type | Notes |
|---|---|---|---|---|
| 29 | TCPA Consent | `tcpa_consent` | Checkbox | Webhook sends `true` / `false` |
| 30 | TCPA Consent Text | `tcpa_consent_text` | Multi Line | The exact text the user agreed to |
| 31 | TCPA Consent Timestamp | `tcpa_consent_timestamp` | Single Line | ISO 8601 — **do not use Date Picker** (fails on millisecond precision) |

---

## 📁 NIAG · Lead Certificates

Cert tokens for buyers. 4 fields. Required by most TCPA-aware buyers.

| # | Display Name | Field Key | Type | Notes |
|---|---|---|---|---|
| 32 | Jornaya LeadiD | `jornaya_leadid` | Single Line | Empty if Jornaya not enabled |
| 33 | TrustedForm Cert URL | `trustedform_cert_url` | Single Line | Buyers claim cert via this URL |
| 34 | TrustedForm Ping URL | `trustedform_ping_url` | Single Line | For ping-post lead flows |
| 35 | TrustedForm Cert Token | `trustedform_cert_token` | Single Line | Alternative to cert URL |

---

## 📁 NIAG · Audit

Compliance audit only. Never used for matching or marketing. 2 fields.

| # | Display Name | Field Key | Type | Notes |
|---|---|---|---|---|
| 36 | IP Address | `ip_address` | Single Line | Used in TCPA audit, not as identifier |
| 37 | User Agent | `user_agent` | Multi Line | Long strings — use text area |

---

## Final summary

```
Standard contact fields (built-in):    4   (first_name, last_name, email, phone)
📁 Qualifying Questions:              13
📁 Attribution:                       15
📁 TCPA Compliance:                    3
📁 Lead Certificates:                  4
📁 Audit:                              2
─────────────────────────────────────────
Custom fields to create:              37
Total webhook fields:                 41
```

## Inbound webhook setup

Once the 37 custom fields exist:

1. **Automations → Workflows → New Workflow → Inbound Webhook trigger**.
2. Copy the Webhook URL and paste it into your hosting env vars as
   `GHL_WEBHOOK_URL` (see `niag-app/.env.example`).
3. **Fire one test lead** from `/form/bundle` (or any `/lp/<slug>`) in
   dev — GHL detects the payload structure on first hit.
4. **Map fields**:
    - Find or Create Contact by **Email + Phone**
    - Update Contact Custom Fields → map each of the 37 keys above to
      the matching custom field
    - Map `first_name` / `last_name` / `email` / `phone` to the
      standard contact fields
5. **Add to pipeline** → stage by `product` (e.g., five separate
   pipelines, or one pipeline with `product` driving a stage filter)
6. **Conditional automations** — gate every outbound SMS / email on
   `tcpa_consent === true`.

## Ping-post to LeadProsper

LeadProsper accepts leads via direct webhook *and* via GHL passthrough.
Two options:

| Option | Setup | Trade-off |
|---|---|---|
| **A. Direct from our site** | Set `LEADPROSPER_ENDPOINT` + `LEADPROSPER_API_KEY` in env. Our `/api/lead` fans out to LeadProsper + GHL in parallel. | Fastest, no GHL latency in the loop. |
| **B. Via GHL workflow** | Workflow action "Send Webhook" → LeadProsper endpoint after the contact is created. | One workflow to debug, full audit trail in GHL even if LeadProsper rejects. |

Recommendation: **start with Option A**. Both endpoints already exist
in our code (`lib/leadPayload.ts` → `sendToLeadProsper` + `sendToGoHighLevel`)
and run in parallel. Move to Option B only if you need GHL to enrich
the payload (e.g., score, tag, route by carrier) before posting.

## Common gotchas

1. **Field Key mismatch silent fail.** If you rename the Display Name
   in GHL, the Field Key doesn't auto-update. Always verify Field Key
   matches the snake_case in the table above.
2. **Dropdown option values vs. labels.** The webhook sends `own`, not
   `I own`. If the dropdown only has `I own` as a label without `own`
   as the underlying value, the field arrives unselected.
3. **`tcpa_consent_timestamp` as Date Picker.** Don't. Our timestamp is
   ISO 8601 with milliseconds — Date Picker drops the milliseconds and
   can fail to parse the timezone. Single Line keeps it intact for
   audit.
4. **Find Contact by Email only.** Same email + different phone is a
   common scenario (family using one inbox). Match on Email + Phone
   to avoid collisions.
