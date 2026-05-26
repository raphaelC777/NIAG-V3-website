"use client";
import { useEffect, useRef } from "react";
import type { FormStepDef } from "@/lib/formSteps";
import { getOptionLabel, getStepHelper, getStepLabel } from "@/lib/formSteps";
import { useSite } from "./SiteContext";
import { t } from "@/lib/i18n";
import type { FormAnswers } from "@/types/lead";

interface Props {
  step: FormStepDef;
  answers: FormAnswers;
  onChoose: (id: string, value: string) => void;
  // For text/name/contact: live answer updates
  onChange: (patch: Partial<FormAnswers>) => void;
  // Inline error keyed by step id
  error?: string | null;
  consentText: string;
  onConsentChange: (checked: boolean) => void;
}

export default function FormStep({ step, answers, onChoose, onChange, error, consentText, onConsentChange }: Props) {
  const { language } = useSite();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (step.type === "zip" && inputRef.current) inputRef.current.focus();
  }, [step.id, step.type]);

  return (
    <>
      <h2 className="font-serif text-2xl font-semibold text-navy">{getStepLabel(step, language)}</h2>
      {getStepHelper(step, language) ? (
        <p className="mt-1 text-sm text-ink-soft">{getStepHelper(step, language)}</p>
      ) : null}

      <div className="mt-5">
        {step.type === "choice" ? (
          <div className="grid gap-2.5">
            {step.options?.map((opt) => {
              const selected = (answers as Record<string, unknown>)[step.id] === opt.value;
              return (
                <button key={opt.value}
                  type="button"
                  onClick={() => onChoose(step.id, opt.value)}
                  className={`answer-card ${selected ? "selected" : ""}`}>
                  <span>{getOptionLabel(opt, language)}</span>
                  <span className="text-ink-soft">→</span>
                </button>
              );
            })}
          </div>
        ) : null}

        {step.type === "zip" ? (
          <>
            <input ref={inputRef}
              type="tel" inputMode="numeric" maxLength={5}
              className="field-input"
              value={answers.zip || ""}
              onChange={(e) => onChange({ zip: e.target.value.replace(/\D/g, "") })}
              placeholder={t(language, "hero.zipPlaceholder")} />
            {error ? <div className="field-error">{error}</div> : null}
          </>
        ) : null}

        {step.type === "name" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="field-label">{language === "es" ? "Nombre" : "First name"}</label>
              <input type="text" className="field-input"
                value={answers.name?.first || ""}
                onChange={(e) => onChange({ name: { first: e.target.value, last: answers.name?.last || "" } })} />
            </div>
            <div>
              <label className="field-label">{language === "es" ? "Apellido" : "Last name"}</label>
              <input type="text" className="field-input"
                value={answers.name?.last || ""}
                onChange={(e) => onChange({ name: { first: answers.name?.first || "", last: e.target.value } })} />
            </div>
            {error ? <div className="field-error sm:col-span-2">{error}</div> : null}
          </div>
        ) : null}

        {step.type === "contact" ? (
          <>
            <label className="field-label">{language === "es" ? "Correo electrónico" : "Email address"}</label>
            <input type="email" className="field-input mb-3" autoComplete="email"
              value={answers.contact?.email || ""}
              onChange={(e) => onChange({ contact: { email: e.target.value, phone: answers.contact?.phone || "" } })} />
            <label className="field-label">{language === "es" ? "Teléfono móvil" : "Mobile phone"}</label>
            <input type="tel" inputMode="tel" className="field-input" autoComplete="tel"
              value={answers.contact?.phone || ""}
              onChange={(e) => onChange({ contact: { email: answers.contact?.email || "", phone: e.target.value } })} />
            {error ? <div className="field-error">{error}</div> : null}
          </>
        ) : null}

        {step.type === "consent" ? (
          <div className="rounded-[10px] border border-line bg-sand p-4 text-sm leading-relaxed text-ink-soft">
            <label className="flex items-start gap-3">
              <input type="checkbox"
                className="mt-1 h-5 w-5 flex-none accent-green"
                checked={!!answers.consent}
                onChange={(e) => onConsentChange(e.target.checked)} />
              <span>{consentText}</span>
            </label>
            {error ? <div className="field-error">{error}</div> : null}
          </div>
        ) : null}
      </div>
    </>
  );
}
