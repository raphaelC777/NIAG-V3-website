"use client";
import { useSite } from "./SiteContext";
import { useQuoteFlow } from "./QuoteFlowProvider";
import { CheckIcon } from "./icons";
import ZipEntry from "./ZipEntry";
import HeroVisual from "./HeroVisual";
import type { LanderSpec } from "@/lib/landers";

export default function LanderHero({ spec }: { spec: LanderSpec }) {
  const { language } = useSite();
  const { open } = useQuoteFlow();
  const copy = spec[language];

  function start(zip: string) {
    open(spec.product, "hero", { zip: zip || undefined, mode: spec.formOpenMode });
  }

  return (
    <section className="border-b border-line bg-gradient-to-b from-cream to-sand pt-12 pb-16">
      <div className="container-wide grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          {copy.eyebrow ? (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-navy">
              <span className="h-1.5 w-1.5 rounded-full bg-green" />
              {copy.eyebrow}
            </div>
          ) : null}
          <h1 className="font-serif text-4xl font-semibold leading-tight text-navy md:text-5xl">
            {copy.headline}
          </h1>
          <p className="mt-4 max-w-[540px] text-lg text-ink-soft">{copy.sub}</p>
          {copy.trustBullets?.length ? (
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink-soft">
              {copy.trustBullets.map((b) => (
                <li key={b} className="inline-flex items-center gap-1.5 font-medium">
                  <CheckIcon className="h-3.5 w-3.5 text-green" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="card-pop mt-6">
            <h3 className="mb-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-ink-soft">
              {language === "es" ? "Tu código postal" : "Your ZIP code"}
            </h3>
            <ZipEntry
              onSubmit={start}
              ctaLabel={copy.ctaLabel}
              entryPoint="hero"
              productType={spec.product}
            />
            <p className="mt-3 text-xs text-ink-soft">
              {language === "es"
                ? "Sin spam. Sin SSN. Solo se comparte con socios licenciados que elijas."
                : "No spam. No SSN. Only shared with licensed partners you pick."}
            </p>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
