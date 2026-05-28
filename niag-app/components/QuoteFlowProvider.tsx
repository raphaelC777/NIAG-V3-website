"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { EntryPoint, FormAnswers, LeadPayload, ProductType } from "@/types/lead";
import { FLOWS, FLOW_TITLES, getStepLabel } from "@/lib/formSteps";
import { useSite } from "./SiteContext";
import { isEmail, isUsPhone, isZip, getMsg } from "@/lib/validators";
import { trackEvent, Events } from "@/lib/tracking";
import { t } from "@/lib/i18n";
import FormStep from "./FormStep";
import BotProtection from "./BotProtection";
import LeadCertScripts, { readLeadCerts } from "./LeadCertScripts";

interface OpenOptions {
  zip?: string;
  /** "modal" (default) keeps the user on the current page. "tab" opens the
   * standalone /form/[product] route in a new tab. Configure per-CTA so
   * different lander variations can A/B the placement. */
  mode?: "modal" | "tab";
}
interface Ctx { open: (p: ProductType, ep: EntryPoint, opts?: OpenOptions) => void; close: () => void }
const QuoteCtx = createContext<Ctx | null>(null);

export function useQuoteFlow() {
  const v = useContext(QuoteCtx);
  if (!v) throw new Error("useQuoteFlow must be used inside QuoteFlowProvider");
  return v;
}

interface Submitting { state: "idle" | "submitting" | "success" | "error"; reason?: string }

export function QuoteFlowProvider({ children }: { children: React.ReactNode }) {
  const { language, variant } = useSite();
  const router = useRouter();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [entryPoint, setEntryPoint] = useState<EntryPoint>("hero");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<FormAnswers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [botToken, setBotToken] = useState<string>("");
  const [submit, setSubmit] = useState<Submitting>({ state: "idle" });
  const isOpen = product !== null;

  const open = useCallback((p: ProductType, ep: EntryPoint, opts?: OpenOptions) => {
    // Tab mode: open the standalone form route in a new tab and bail.
    // Useful for ads, email CTAs, or landers that want a clean session.
    if (opts?.mode === "tab" && typeof window !== "undefined") {
      const base = language === "es" ? "/es/form" : "/form";
      const qs = new URLSearchParams({ ep });
      if (opts.zip) qs.set("zip", opts.zip);
      trackEvent(Events.FORM_START, { productType: p, entryPoint: ep, language, abVariant: variant, mode: "tab" });
      window.open(`${base}/${p}?${qs.toString()}`, "_blank", "noopener,noreferrer");
      return;
    }
    setProduct(p); setEntryPoint(ep); setStepIndex(0);
    setAnswers({ zip: opts?.zip });
    setErrors({});
    setSubmit({ state: "idle" });
    trackEvent(Events.FORM_START, { productType: p, entryPoint: ep, language, abVariant: variant, mode: "modal" });
    document.body.style.overflow = "hidden";
  }, [language, variant]);

  const close = useCallback(() => {
    if (product && submit.state !== "success") {
      const step = FLOWS[product][stepIndex];
      trackEvent(Events.FORM_ABANDON, {
        productType: product, entryPoint, language, abVariant: variant,
        atStep: step.id, stepIndex,
      });
    }
    setProduct(null);
    setSubmit({ state: "idle" });
    document.body.style.overflow = "";
  }, [product, stepIndex, entryPoint, language, variant, submit.state]);

  // Fire step view
  useEffect(() => {
    if (!product) return;
    const step = FLOWS[product][stepIndex];
    trackEvent(Events.FORM_STEP_VIEW, {
      productType: product, entryPoint, language, abVariant: variant,
      stepName: step.id, stepIndex, stepCount: FLOWS[product].length,
    });
  }, [product, stepIndex, entryPoint, language, variant]);

  function validateStepAndCollect(): string | null {
    if (!product) return null;
    const step = FLOWS[product][stepIndex];
    const msg = getMsg(language);
    if (step.type === "choice") {
      const val = (answers as Record<string, unknown>)[step.id];
      if (!val) return msg.required;
      return null;
    }
    if (step.type === "zip") {
      if (!answers.zip) return msg.required;
      if (!isZip(answers.zip)) return msg.invalidZip;
      trackEvent(Events.ZIP_ENTERED, { productType: product, entryPoint, zipCode: answers.zip, language, abVariant: variant });
      return null;
    }
    if (step.type === "name") {
      if (!answers.name?.first || !answers.name?.last) return msg.required;
      return null;
    }
    if (step.type === "contact") {
      if (!answers.contact?.email || !answers.contact?.phone) return msg.required;
      if (!isEmail(answers.contact.email)) return msg.invalidEmail;
      if (!isUsPhone(answers.contact.phone)) return msg.invalidPhone;
      return null;
    }
    if (step.type === "consent") {
      if (!answers.consent) return msg.consentRequired;
      if (!botToken) return msg.botRequired;
      return null;
    }
    return null;
  }

  async function next() {
    if (!product) return;
    const err = validateStepAndCollect();
    const step = FLOWS[product][stepIndex];
    if (err) { setErrors((e) => ({ ...e, [step.id]: err })); return; }
    setErrors((e) => { const c = { ...e }; delete c[step.id]; return c; });

    trackEvent(Events.FORM_STEP_COMPLETE, {
      productType: product, entryPoint, language, abVariant: variant,
      stepName: step.id, stepIndex,
    });

    const isLast = stepIndex === FLOWS[product].length - 1;
    if (isLast) {
      await doSubmit();
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  function back() {
    if (!product || stepIndex === 0) return;
    trackEvent(Events.FORM_BACK_CLICK, {
      productType: product, entryPoint, language, abVariant: variant,
      fromStep: FLOWS[product][stepIndex].id,
    });
    setStepIndex((i) => i - 1);
  }

  function chooseValue(id: string, value: string) {
    setAnswers((a) => ({ ...a, [id]: value }));
    setErrors((e) => { const c = { ...e }; delete c[id]; return c; });
    // Auto-advance on choice
    if (!product) return;
    const step = FLOWS[product][stepIndex];
    trackEvent(Events.FORM_STEP_COMPLETE, {
      productType: product, entryPoint, language, abVariant: variant,
      stepName: step.id, stepIndex,
    });
    const isLast = stepIndex === FLOWS[product].length - 1;
    if (!isLast) setStepIndex((i) => i + 1);
  }

  function patchAnswers(patch: Partial<FormAnswers>) {
    setAnswers((a) => ({ ...a, ...patch }));
  }

  function setConsent(checked: boolean) {
    setAnswers((a) => ({ ...a, consent: checked }));
    if (checked) {
      trackEvent(Events.TCPA_CONSENT_CHECKED, {
        productType: product || undefined, entryPoint, language, abVariant: variant,
      });
    }
  }

  async function doSubmit() {
    if (!product) return;
    trackEvent(Events.FORM_SUBMIT, { productType: product, entryPoint, language, abVariant: variant });
    setSubmit({ state: "submitting" });

    const certs = readLeadCerts();
    const landerSlug =
      typeof window !== "undefined"
        ? (() => {
            const m = window.location.pathname.match(/\/(?:es\/)?lp\/([^/?#]+)/);
            return m ? m[1] : undefined;
          })()
        : undefined;
    const payload: LeadPayload = {
      productType: product,
      language, abVariant: variant, entryPoint,
      landerSlug,
      answers,
      consent: {
        tcpaConsent: !!answers.consent,
        tcpaConsentText: t(language, "form.consentText"),
        tcpaConsentTimestamp: new Date().toISOString(),
      },
      utm: {}, // server merges with cookies/headers if needed
      botToken,
      certs,
      submittedAt: new Date().toISOString(),
    };

    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) {
        trackEvent(Events.LEAD_SUBMIT_ERROR, { productType: product, language, abVariant: variant, reason: data.reason || `http_${r.status}` });
        setSubmit({ state: "error", reason: data.reason || `http_${r.status}` });
        return;
      }
      trackEvent(Events.LEAD_SUBMIT_SUCCESS, { productType: product, language, abVariant: variant, leadId: data.leadId });
      // Route to thank-you with product + zip in query
      const qs = new URLSearchParams({ product, zip: answers.zip || "" }).toString();
      const base = language === "es" ? "/es/thank-you" : "/thank-you";
      router.push(`${base}?${qs}`);
      setSubmit({ state: "success" });
      // Close overlay after navigation
      setTimeout(() => close(), 50);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "network";
      trackEvent(Events.LEAD_SUBMIT_ERROR, { productType: product, language, abVariant: variant, reason: msg });
      setSubmit({ state: "error", reason: msg });
    }
  }

  return (
    <QuoteCtx.Provider value={{ open, close }}>
      {children}
      {isOpen && product ? (
        <div className="fixed inset-0 z-[200] overflow-y-auto bg-cream">
          {/* Lead certification scripts — Jornaya + TrustedForm
              (rendered only while a form is open; emits hidden inputs that
              QuoteFlowProvider.readLeadCerts() reads at submit) */}
          <LeadCertScripts />
          {/* Minimal header */}
          <div className="sticky top-0 z-10 border-b border-line bg-white">
            <div className="mx-auto flex max-w-[720px] items-center justify-between px-5 py-3.5">
              <div className="font-serif text-xl font-bold text-navy">
                NIAG <span className="ml-1 align-middle text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-green">{t(language, "form.minHeader")}</span>
              </div>
              <button onClick={close} className="text-sm font-medium text-ink-soft hover:text-navy" aria-label="Close">
                <span className="mr-1.5 text-lg">×</span><span>{t(language, "form.close")}</span>
              </button>
            </div>
            <div className="h-1 bg-sand">
              <div className="h-full bg-green transition-[width] duration-300"
                style={{ width: `${(stepIndex / FLOWS[product].length) * 100}%` }} />
            </div>
          </div>

          <div className="mx-auto max-w-[560px] px-5 py-9 pb-16">
            <div className="mb-3.5 text-xs font-semibold uppercase tracking-[0.06em] text-ink-soft">
              {t(language, "form.step")} {stepIndex + 1} {t(language, "form.of")} {FLOWS[product].length} · {FLOW_TITLES[product][language]}
            </div>

            <FormStep
              step={FLOWS[product][stepIndex]}
              answers={answers}
              onChoose={chooseValue}
              onChange={patchAnswers}
              error={errors[FLOWS[product][stepIndex].id] || null}
              consentText={t(language, "form.consentText")}
              onConsentChange={setConsent}
            />

            {/* Bot protection on consent step */}
            {FLOWS[product][stepIndex].type === "consent" ? (
              <div className="mt-4">
                <BotProtection onToken={setBotToken} action="lead_submit" />
              </div>
            ) : null}

            {/* Actions */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <button onClick={back} disabled={stepIndex === 0}
                className={`btn-secondary ${stepIndex === 0 ? "invisible" : ""}`}>
                {t(language, "form.back")}
              </button>
              {FLOWS[product][stepIndex].type !== "choice" ? (
                <button onClick={next} disabled={submit.state === "submitting"} className="btn-primary">
                  {submit.state === "submitting"
                    ? (language === "es" ? "Enviando…" : "Submitting…")
                    : stepIndex === FLOWS[product].length - 1 ? t(language, "form.submit") : t(language, "form.continue")}
                </button>
              ) : <span />}
            </div>

            {submit.state === "error" ? (
              <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {language === "es"
                  ? `No pudimos enviar. ${submit.reason || ""}`
                  : `We couldn’t submit your form. ${submit.reason || ""}`}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </QuoteCtx.Provider>
  );
}
