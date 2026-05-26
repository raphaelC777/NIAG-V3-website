"use client";
import Link from "next/link";
import { useSite } from "./SiteContext";
import { useQuoteFlow } from "./QuoteFlowProvider";
import { PRODUCTS } from "@/lib/products";
import { t } from "@/lib/i18n";
import { trackEvent, Events } from "@/lib/tracking";

export default function Footer() {
  const { language, variant } = useSite();
  const { open } = useQuoteFlow();
  return (
    <footer className="bg-navy pt-14 pb-7 text-sm text-cream/80">
      <div className="container-wide">
        <div className="grid gap-10 border-b border-white/10 pb-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="font-serif text-2xl font-bold text-white">
              NIAG <span className="block text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-green">Insurance Assistance Group</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-cream/60">{t(language, "footer.trust")}</p>
          </div>
          <div>
            <h4 className="mb-3.5 text-xs font-bold uppercase tracking-[0.08em] text-white">{t(language, "footer.products")}</h4>
            {PRODUCTS.map((p) => (
              <button key={p.id} onClick={() => open(p.id, "footer")}
                className="block py-1 text-left text-cream/80 hover:text-green">
                {language === "es" ? p.labelEs : p.labelEn}
              </button>
            ))}
          </div>
          <div>
            <h4 className="mb-3.5 text-xs font-bold uppercase tracking-[0.08em] text-white">{t(language, "footer.resources")}</h4>
            <Link href={language === "es" ? "/es#blog" : "/#blog"} className="block py-1 text-cream/80 hover:text-green">{t(language, "footer.blog")}</Link>
            <a href="#" className="block py-1 text-cream/80 hover:text-green">{t(language, "footer.help")}</a>
            <a href="tel:18005551234"
               onClick={() => trackEvent(Events.PHONE_CLICK, { location: "footer", language, abVariant: variant })}
               className="block py-1 text-cream/80 hover:text-green">{t(language, "nav.callExpert")}</a>
            <button onClick={() => trackEvent(Events.QUOTE_RECOVERY_CLICK, { location: "footer", language, abVariant: variant })}
               className="block py-1 text-left text-cream/80 hover:text-green">{t(language, "hero.recovery")}</button>
          </div>
          <div>
            <h4 className="mb-3.5 text-xs font-bold uppercase tracking-[0.08em] text-white">{t(language, "footer.about")}</h4>
            <a href="#" className="block py-1 text-cream/80 hover:text-green">{t(language, "footer.privacy")}</a>
            <a href="#" className="block py-1 text-cream/80 hover:text-green">{t(language, "footer.terms")}</a>
            <a href="#" className="block py-1 text-cream/80 hover:text-green">{t(language, "footer.donotsell")}</a>
            <a href="#" className="block py-1 text-cream/80 hover:text-green">{t(language, "footer.prefs")}</a>
            <a href="#" className="block py-1 text-cream/80 hover:text-green">{t(language, "footer.tcpa")}</a>
            <a href="#" className="block py-1 text-cream/80 hover:text-green">{t(language, "footer.adv")}</a>
          </div>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-cream/55">{t(language, "footer.disclaimer")}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-xs text-cream/50">
          <span>{t(language, "footer.copyright")}</span>
          <span className="space-x-4">
            <a href="#" className="text-cream/60 hover:text-green">{t(language, "footer.privacy")}</a>
            <a href="#" className="text-cream/60 hover:text-green">{t(language, "footer.terms")}</a>
            <a href="#" className="text-cream/60 hover:text-green">{t(language, "footer.donotsell")}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
