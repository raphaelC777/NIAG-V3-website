/* quote-form.jsx — multi-step product quote modal */

const { useState, useEffect, useRef, useMemo } = React;

function NiagModalLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8, background: "var(--navy-900)",
        display: "grid", placeItems: "center", color: "var(--green-500)",
        fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 19,
      }}>N</div>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, color: "var(--navy-900)", letterSpacing: ".02em" }}>NIAG</div>
    </div>
  );
}

function ProgressBar({ value, max, label }) {
  const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ flex: 1, height: 6, background: "var(--sand-deep)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{
          width: pct + "%", height: "100%", background: "var(--green-500)",
          transition: "width .35s cubic-bezier(.2,.7,.3,1)",
          borderRadius: 999,
        }}></div>
      </div>
      <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", fontWeight: 500, letterSpacing: ".1em", whiteSpace: "nowrap" }}>{label}</div>
    </div>
  );
}

function OptionCard({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: "left", padding: "16px 18px",
        background: selected ? "var(--navy-900)" : "#fff",
        color: selected ? "#fff" : "var(--ink)",
        border: "1px solid " + (selected ? "var(--navy-900)" : "var(--border)"),
        borderRadius: "var(--radius)",
        boxShadow: selected ? "0 0 0 2px var(--navy-900) inset" : "none",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
        fontSize: 15, fontWeight: 500,
        transition: "background .15s ease, border-color .15s ease, color .15s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => { if (!selected) e.currentTarget.style.borderColor = "var(--navy-700)"; }}
      onMouseLeave={(e) => { if (!selected) e.currentTarget.style.borderColor = "var(--border)"; }}
    >
      <span>{label}</span>
      <span style={{
        width: 18, height: 18, borderRadius: 999,
        border: "1.5px solid " + (selected ? "#fff" : "var(--border)"),
        display: "grid", placeItems: "center", flexShrink: 0,
      }}>
        {selected && <span style={{ width: 8, height: 8, borderRadius: 999, background: "#fff" }}></span>}
      </span>
    </button>
  );
}

function StepHeader({ title, why, t, onShowWhy, showWhy }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", lineHeight: 1.15 }}>{title}</h2>
      {why && (
        <div style={{ marginTop: 8 }}>
          <button onClick={onShowWhy} className="btn-link" style={{ padding: 0, fontSize: 13, color: "var(--ink-soft)", border: 0, textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: 3 }}>
            {t.form.why}
          </button>
          {showWhy && (
            <div style={{ marginTop: 8, padding: "10px 12px", background: "var(--sand)", borderRadius: 8, fontSize: 13, color: "var(--ink-soft)", border: "1px solid var(--border-soft)" }}>
              {why}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ZipStep({ value, onChange, error, t }) {
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus(); }, []);
  return (
    <div style={{ maxWidth: 260 }}>
      <input
        ref={ref}
        className={"input input-zip" + (error ? " error" : "")}
        inputMode="numeric" pattern="\d*" maxLength={5}
        value={value} onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 5))}
        placeholder={t.hero.zipPh}
        aria-label={t.hero.zip}
      />
      {error && <div style={{ color: "var(--danger)", fontSize: 13, marginTop: 8 }}>{error}</div>}
    </div>
  );
}

function NameStep({ value, onChange, error, t }) {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 480 }}>
      <div>
        <label className="field-label">{t.locale === "es" ? "Nombre" : "First name"}</label>
        <input className={"input" + (error?.first ? " error" : "")} value={value.first || ""} onChange={(e) => onChange({ ...value, first: e.target.value })} />
      </div>
      <div>
        <label className="field-label">{t.locale === "es" ? "Apellido" : "Last name"}</label>
        <input className={"input" + (error?.last ? " error" : "")} value={value.last || ""} onChange={(e) => onChange({ ...value, last: e.target.value })} />
      </div>
      {error?.msg && <div style={{ color: "var(--danger)", fontSize: 13 }}>{error.msg}</div>}
    </div>
  );
}

function ContactStep({ value, onChange, errors, t }) {
  const formatPhone = (raw) => {
    const d = raw.replace(/\D/g, "").slice(0, 10);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `(${d.slice(0,3)}) ${d.slice(3)}`;
    return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
  };
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 480 }}>
      <div>
        <label className="field-label">Email</label>
        <input type="email" className={"input" + (errors?.email ? " error" : "")} value={value.email || ""} onChange={(e) => onChange({ ...value, email: e.target.value })} placeholder="you@example.com" />
        {errors?.email && <div style={{ color: "var(--danger)", fontSize: 13, marginTop: 6 }}>{errors.email}</div>}
      </div>
      <div>
        <label className="field-label">{t.locale === "es" ? "Teléfono" : "Phone"}</label>
        <input type="tel" className={"input" + (errors?.phone ? " error" : "")} value={value.phone || ""} onChange={(e) => onChange({ ...value, phone: formatPhone(e.target.value) })} placeholder="(555) 123-4567" />
        {errors?.phone && <div style={{ color: "var(--danger)", fontSize: 13, marginTop: 6 }}>{errors.phone}</div>}
      </div>
    </div>
  );
}

function ConsentStep({ value, onChange, error, t, summary, productType }) {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: 16 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}><span className="dot"></span>{t.locale === "es" ? "Resumen" : "Summary"}</div>
        <div style={{ display: "grid", gap: 8, fontSize: 14 }}>
          {summary.map((row, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 16, borderBottom: i < summary.length - 1 ? "1px dashed var(--border-soft)" : "none", paddingBottom: 8 }}>
              <span style={{ color: "var(--ink-soft)" }}>{row[0]}</span>
              <span style={{ fontWeight: 500, textAlign: "right" }}>{row[1]}</span>
            </div>
          ))}
        </div>
      </div>

      <label style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: 16, background: "var(--sand)", border: "1px solid var(--border)", borderRadius: 12, cursor: "pointer" }}>
        <input
          type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)}
          style={{ marginTop: 3, width: 18, height: 18, accentColor: "var(--green-500)", flexShrink: 0 }}
        />
        <span style={{ fontSize: 12.5, color: "var(--ink)", lineHeight: 1.5 }}>{t.form.tcpa}</span>
      </label>
      {error && <div style={{ color: "var(--danger)", fontSize: 13 }}>{error}</div>}

      <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--ink-soft)", flexWrap: "wrap" }}>
        <a href="#" style={{ textDecoration: "underline" }}>{t.footer.legal[0]}</a>
        <a href="#" style={{ textDecoration: "underline" }}>{t.footer.legal[1]}</a>
        <a href="#" style={{ textDecoration: "underline" }}>{t.footer.legal[2]}</a>
      </div>

      {/* hidden compliance fields */}
      <div style={{ fontSize: 10, color: "var(--ink-soft)", fontFamily: "var(--font-mono)", opacity: 0.55, letterSpacing: ".04em" }}>
        jornaya_lead_id=__placeholder__ · trustedform_cert=__placeholder__ · consent_ts={new Date().toISOString()}
      </div>
    </div>
  );
}

function QuoteForm({ productType, onClose, onSuccess, t, abVariant, entryPoint, initialZip = "" }) {
  const steps = FORMS[t.locale][productType];
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({ zip: initialZip });
  const [errors, setErrors] = useState({});
  const [showWhy, setShowWhy] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const bodyRef = useRef(null);

  const step = steps[idx];
  const total = steps.length;
  const progressLabel = t.form.progress(idx + 1, total);

  // tracking on mount + step changes
  useEffect(() => {
    track("form_start", { productType, entryPoint });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    track("form_step_view", { productType, stepName: step.id });
    setShowWhy(false);
    setErrors({});
    bodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [idx, productType, step.id]);

  // close on esc + body scroll lock
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") doClose(); };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("modal-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
    };
  });

  function doClose() {
    if (idx > 0 && idx < total - 1) {
      track("form_abandon", { productType, stepName: step.id });
    }
    onClose();
  }

  function validateStep() {
    const e = {};
    if (step.kind === "zip") {
      if (!/^\d{5}$/.test(answers.zip || "")) e.zip = t.form.requiredZip;
    } else if (step.kind === "options") {
      if (!answers[step.id]) e.field = t.form.requiredField;
    } else if (step.kind === "name") {
      const n = answers.name || {};
      if (!n.first || !n.last) e.name = { first: !n.first, last: !n.last, msg: t.form.requiredName };
    } else if (step.kind === "contact") {
      const c = answers.contact || {};
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email || "");
      const phoneOk = (c.phone || "").replace(/\D/g, "").length === 10;
      const ce = {};
      if (!emailOk) ce.email = t.form.requiredEmail;
      if (!phoneOk) ce.phone = t.form.requiredPhone;
      if (Object.keys(ce).length) e.contact = ce;
    } else if (step.kind === "consent") {
      if (!answers.consent) e.consent = t.form.requiredConsent;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (!validateStep()) return;
    track("form_step_complete", { productType, stepName: step.id });
    if (step.kind === "zip") track("zip_entered", { productType, zipCode: answers.zip });
    if (step.kind === "consent") {
      track("tcpa_consent_checked", { productType });
      submitLead();
      return;
    }
    setIdx((i) => Math.min(i + 1, total - 1));
  }

  function handleBack() {
    if (idx === 0) { doClose(); return; }
    track("form_back_click", { productType, stepName: step.id });
    setIdx((i) => Math.max(0, i - 1));
  }

  async function submitLead() {
    setSubmitting(true);
    setSubmitError(null);
    track("form_submit", { productType, zipCode: answers.zip });

    // ----- API placeholders -----
    // LeadProsper, Go High Level webhook would be called here.
    // const res = await fetch("https://api.leadprosper.io/...", { method:"POST", body: JSON.stringify(payload) });
    // const ghl = await fetch("https://services.leadconnectorhq.com/hooks/...", ...);

    const payload = {
      productType, language: t.locale, abVariant,
      ...answers,
      consent_text: t.form.tcpa,
      consent_timestamp: new Date().toISOString(),
      ip: "__placeholder__", user_agent: navigator.userAgent,
      jornaya_lead_id: "__placeholder__",
      trustedform_cert: "__placeholder__",
      gtm_container: "GTM-XXXXXX",
    };

    // simulate latency
    await new Promise((r) => setTimeout(r, 900));

    // ~95% success in prototype; never fail in this demo
    const ok = true;
    if (ok) {
      track("lead_submit_success", { productType, zipCode: answers.zip });
      const refId = "NIAG-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      onSuccess({ refId, productType, zip: answers.zip, payload });
    } else {
      track("lead_submit_error", { productType });
      setSubmitError(t.locale === "es" ? "Algo falló. Intenta de nuevo." : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  // build summary for consent step
  const summary = useMemo(() => {
    const labels = t.locale === "es"
      ? { product: "Producto", zip: "Código postal", name: "Nombre", email: "Email", phone: "Teléfono" }
      : { product: "Product", zip: "ZIP", name: "Name", email: "Email", phone: "Phone" };
    return [
      [labels.product, t.products[productType].label],
      [labels.zip, answers.zip || "—"],
      [labels.name, [(answers.name?.first || ""), (answers.name?.last || "")].join(" ").trim() || "—"],
      [labels.email, answers.contact?.email || "—"],
      [labels.phone, answers.contact?.phone || "—"],
    ];
  }, [answers, productType, t]);

  // ----- render -----
  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) doClose(); }}>
      <div className="modal" role="dialog" aria-modal="true">
        {/* header */}
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid var(--border)" }}>
          <NiagModalLogo />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a href="tel:+18005551234" onClick={() => track("phone_click", { productType, entryPoint: "form_header" })} className="hide-mobile" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--ink-soft)", textDecoration: "none" }}>
              <ProductIcon kind="phone" size={16} /> {t.form.headerHelp} (800) 555-1234
            </a>
            <button onClick={doClose} aria-label="Close" style={{ width: 36, height: 36, display: "grid", placeItems: "center", borderRadius: 8, color: "var(--ink-soft)" }}>
              <ProductIcon kind="x" size={20} />
            </button>
          </div>
        </header>

        {/* progress */}
        <div style={{ padding: "14px 24px 18px", background: "var(--cream)" }}>
          <ProgressBar value={idx + 1} max={total} label={progressLabel} />
        </div>

        {/* body */}
        <div ref={bodyRef} className="form-body" style={{ padding: "8px 24px 28px", flex: 1, overflowY: "auto", minHeight: 320 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>
            <span className="dot"></span>{t.products[productType].label}
          </div>
          <StepHeader title={step.question} why={step.why} t={t} onShowWhy={() => setShowWhy((s) => !s)} showWhy={showWhy} />

          {step.kind === "zip" && (
            <ZipStep value={answers.zip || ""} onChange={(v) => setAnswers({ ...answers, zip: v })} error={errors.zip} t={t} />
          )}
          {step.kind === "options" && (
            <div className="form-options" style={{ display: "grid", gap: 10, gridTemplateColumns: step.options.length > 4 ? "1fr 1fr" : "1fr", maxWidth: 520 }}>
              {step.options.map((opt) => (
                <OptionCard key={opt} label={opt} selected={answers[step.id] === opt} onClick={() => {
                  setAnswers({ ...answers, [step.id]: opt });
                  setErrors({});
                  // auto-advance for single-choice ergonomics
                  setTimeout(() => {
                    track("form_step_complete", { productType, stepName: step.id });
                    setIdx((i) => Math.min(i + 1, total - 1));
                  }, 180);
                }} />
              ))}
              {errors.field && <div style={{ color: "var(--danger)", fontSize: 13 }}>{errors.field}</div>}
            </div>
          )}
          {step.kind === "name" && (
            <NameStep value={answers.name || {}} onChange={(v) => setAnswers({ ...answers, name: v })} error={errors.name} t={t} />
          )}
          {step.kind === "contact" && (
            <ContactStep value={answers.contact || {}} onChange={(v) => setAnswers({ ...answers, contact: v })} errors={errors.contact} t={t} />
          )}
          {step.kind === "consent" && (
            <ConsentStep value={answers.consent} onChange={(v) => setAnswers({ ...answers, consent: v })} error={errors.consent} t={t} summary={summary} productType={productType} />
          )}

          {submitError && (
            <div style={{ marginTop: 16, padding: 12, background: "rgba(181,48,30,.08)", border: "1px solid rgba(181,48,30,.3)", color: "var(--danger)", borderRadius: 8, fontSize: 14 }}>
              {submitError}
            </div>
          )}
        </div>

        {/* footer nav */}
        <div className="modal-foot" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "16px 24px", borderTop: "1px solid var(--border)", background: "#fff" }}>
          <button onClick={handleBack} className="btn btn-ghost" style={{ visibility: idx === 0 ? "hidden" : "visible" }}>
            ← {t.form.back}
          </button>
          <div className="secure-tag" style={{ fontSize: 12, color: "var(--ink-soft)", display: "flex", alignItems: "center", gap: 6 }}>
            <ProductIcon kind="lock" size={13} /> {t.locale === "es" ? "Seguro · sin SSN" : "Secure · no SSN"}
          </div>
          {/* hide next on auto-advance option steps */}
          {step.kind !== "options" && (
            <button onClick={handleNext} className="btn btn-primary" disabled={submitting}>
              {submitting ? (t.locale === "es" ? "Enviando…" : "Submitting…") : (step.kind === "consent" ? t.form.submit : t.form.next + " →")}
            </button>
          )}
          {step.kind === "options" && <div style={{ width: 1 }}></div>}
        </div>
      </div>
    </div>
  );
}

window.QuoteForm = QuoteForm;
window.NiagModalLogo = NiagModalLogo;
