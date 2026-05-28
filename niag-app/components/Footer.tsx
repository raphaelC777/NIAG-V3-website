"use client";
import Link from "next/link";
import { useSite } from "./SiteContext";
import { useQuoteFlow } from "./QuoteFlowProvider";
import { PRODUCTS } from "@/lib/products";
import { t } from "@/lib/i18n";
import { trackEvent, Events } from "@/lib/tracking";

const socials = [
  { label: "Facebook", href: "#facebook", icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg> },
  { label: "X", href: "#x", icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.81-5.96 6.81H1.69l7.73-8.84L1.27 2.25h6.82l4.71 6.23 5.44-6.23zm-1.16 17.52h1.83L7.01 4.13H5.05L17.08 19.77z"/></svg> },
  { label: "Instagram", href: "#instagram", icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" /></svg> },
  { label: "YouTube", href: "#youtube", icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23 12s0-3.6-.46-5.32a2.78 2.78 0 0 0-1.96-1.96C18.86 4.25 12 4.25 12 4.25s-6.86 0-8.58.47A2.78 2.78 0 0 0 1.46 6.68C1 8.4 1 12 1 12s0 3.6.46 5.32a2.78 2.78 0 0 0 1.96 1.96c1.72.47 8.58.47 8.58.47s6.86 0 8.58-.47a2.78 2.78 0 0 0 1.96-1.96C23 15.6 23 12 23 12zM9.75 15.5v-7l6 3.5-6 3.5z"/></svg> },
];

export default function Footer() {
  const { language, variant } = useSite();
  const { open } = useQuoteFlow();
  return (
    <footer className="bg-navy" style={{ padding: "52px 0 28px", color: "#B4BED1" }}>
      <div className="mx-auto max-w-container px-5">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:gap-[60px]">
          <div style={{ maxWidth: 320 }}>
            <div className="font-serif text-2xl font-bold text-white leading-none mb-3.5">
              NIAG
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(250,247,242,.7)" }}>
              {t(language, "footer.trust")}
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="niag-social-icon"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-5 md:max-w-[560px] md:grid-cols-3 md:gap-14">
            <div>
              <h4 className="mb-2.5 text-xs font-bold uppercase text-white" style={{ letterSpacing: 1.5 }}>
                {t(language, "footer.products")}
              </h4>
              <ul className="flex flex-col gap-2 list-none m-0 p-0">
                {PRODUCTS.map((p) => (
                  <li key={p.id}>
                    <button onClick={() => open(p.id, "footer")} className="text-sm hover:text-green transition-colors" style={{ color: "rgba(250,247,242,.7)" }}>
                      {language === "es" ? p.labelEs : p.labelEn}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2.5 text-xs font-bold uppercase text-white" style={{ letterSpacing: 1.5 }}>
                {t(language, "footer.resources")}
              </h4>
              <ul className="flex flex-col gap-2 list-none m-0 p-0">
                <li><Link href={language === "es" ? "/es#blog" : "/#blog"} className="text-sm hover:text-green transition-colors" style={{ color: "rgba(250,247,242,.7)", textDecoration: "none" }}>{t(language, "footer.blog")}</Link></li>
                <li><a href="#" className="text-sm hover:text-green transition-colors" style={{ color: "rgba(250,247,242,.7)", textDecoration: "none" }}>{t(language, "footer.help")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2.5 text-xs font-bold uppercase text-white" style={{ letterSpacing: 1.5 }}>
                {t(language, "footer.about")}
              </h4>
              <ul className="flex flex-col gap-2 list-none m-0 p-0">
                <li><a href="#" className="text-sm hover:text-green transition-colors" style={{ color: "rgba(250,247,242,.7)", textDecoration: "none" }}>{t(language, "footer.privacy")}</a></li>
                <li><a href="#" className="text-sm hover:text-green transition-colors" style={{ color: "rgba(250,247,242,.7)", textDecoration: "none" }}>{t(language, "footer.terms")}</a></li>
                <li><a href="#" className="text-sm hover:text-green transition-colors" style={{ color: "rgba(250,247,242,.7)", textDecoration: "none" }}>{t(language, "footer.donotsell")}</a></li>
                <li><a href="#" className="text-sm hover:text-green transition-colors" style={{ color: "rgba(250,247,242,.7)", textDecoration: "none" }}>{t(language, "footer.tcpa")}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", marginTop: 36, paddingTop: 22, fontSize: 12, color: "rgba(180,190,209,.7)", lineHeight: 1.65, maxWidth: 920 }}>
          <p className="mb-2">{t(language, "footer.disclaimer")}</p>
          <p>{t(language, "footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
