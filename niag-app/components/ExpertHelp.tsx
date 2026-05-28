"use client";
import { useSite } from "./SiteContext";
import { useQuoteFlow } from "./QuoteFlowProvider";
import { t } from "@/lib/i18n";
import { trackEvent, Events } from "@/lib/tracking";
import { PhoneIcon } from "./icons";

export default function ExpertHelp() {
  const { language, variant, defaultProduct } = useSite();
  const { open } = useQuoteFlow();
  return (
    <section className="py-16">
      <div className="container-wide">
        <h2 className="mb-9 text-center font-serif text-3xl font-semibold text-navy">{t(language, "twocol.heading")}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-line bg-white p-8">
            <h3 className="font-serif text-2xl font-semibold text-navy">{t(language, "twocol.left.title")}</h3>
            <p className="mt-2 text-ink-soft">{t(language, "twocol.left.desc")}</p>
            <button onClick={() => open(defaultProduct, "mid_cta")} className="btn-primary mt-5">
              {t(language, "twocol.left.cta")}
            </button>
          </div>
          <div className="rounded-lg bg-navy p-8 text-cream">
            <h3 className="font-serif text-2xl font-semibold text-white">{t(language, "twocol.right.title")}</h3>
            <p className="mt-2 text-cream/85">{t(language, "twocol.right.desc")}</p>
            <a href="tel:18005551234"
               onClick={() => trackEvent(Events.PHONE_CLICK, { location: "twocol_expert", language, abVariant: variant })}
               className="btn-primary mt-5">
              <PhoneIcon className="h-4 w-4" />
              <span>{t(language, "twocol.right.cta")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
