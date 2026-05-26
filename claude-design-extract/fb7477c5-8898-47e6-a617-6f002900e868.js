/* app.jsx — main App, routing state, Tweaks panel, mobile sticky CTA */

const { useState: useStateApp, useEffect: useEffectApp, useRef: useRefApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "language": "en",
  "abVariant": "A",
  "showStickyMobileCTA": true
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const language = tweaks.language;
  const abVariant = tweaks.abVariant;
  const t = COPY[language];

  // expose tracking context globally
  useEffectApp(() => {
    window.__niagCtx = window.__niagCtx || {};
    window.__niagCtx.language = language;
    window.__niagCtx.abVariant = abVariant;
  }, [language, abVariant]);

  // page_view fire once
  useEffectApp(() => {
    track("page_view", { entryPoint: "homepage" });
  }, []);

  // hero state shared (so user can pick product, ZIP, then bottom button uses it)
  const heroDefault = heroCopyFor(t, abVariant).defaultProduct;
  const [selectedProduct, setSelectedProduct] = useStateApp(heroDefault);
  const [zip, setZip] = useStateApp("");
  useEffectApp(() => { setSelectedProduct(heroCopyFor(t, abVariant).defaultProduct); }, [abVariant]);

  // form modal state
  const [formOpen, setFormOpen] = useStateApp(false);
  const [formProduct, setFormProduct] = useStateApp("bundle");
  const [formEntry, setFormEntry] = useStateApp("hero");
  const [formInitialZip, setFormInitialZip] = useStateApp("");
  const [thankYou, setThankYou] = useStateApp(null);

  function openForm(product, entryPoint = "hero", initialZip = "") {
    const p = product || selectedProduct || "bundle";
    setFormProduct(p);
    setFormEntry(entryPoint);
    setFormInitialZip(initialZip || zip || "");
    setFormOpen(true);
    track("product_select", { productType: p, entryPoint });
  }
  function closeForm() { setFormOpen(false); }
  function handleSuccess(result) { setFormOpen(false); setThankYou(result); window.scrollTo({ top: 0 }); }
  function handleBackHome() { setThankYou(null); }

  function toggleLang() {
    const next = language === "en" ? "es" : "en";
    track("language_toggle", { productType: null, entryPoint: "header" });
    setTweak("language", next);
  }

  // sticky mobile CTA
  const [showSticky, setShowSticky] = useStateApp(false);
  useEffectApp(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (thankYou) {
    return <ThankYou t={t} result={thankYou} onBack={handleBackHome} />;
  }

  return (
    <React.Fragment>
      <Header t={t} abVariant={abVariant} onOpenForm={openForm} onToggleLang={toggleLang} />
      <main>
        <Hero
          t={t} abVariant={abVariant}
          selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}
          zip={zip} setZip={setZip}
          onOpenForm={openForm}
        />
        <TrustStrip t={t} />
        <ProductCards t={t} onOpenForm={openForm} />
        <HowItWorks t={t} onOpenForm={openForm} />
        <SplitHelp t={t} onOpenForm={openForm} />
        <MidCta t={t} onOpenForm={openForm} />
        <BlogTabs t={t} onOpenForm={openForm} />
        <Faq t={t} />
        <BottomCta t={t} onOpenForm={openForm} />
      </main>
      <Footer t={t} onOpenForm={openForm} onToggleLang={toggleLang} />

      {tweaks.showStickyMobileCTA && (
        <div className={"mobile-cta" + (showSticky ? " visible" : "")}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 15 }}>{t.locale === "es" ? "Compara en 60s" : "Compare in 60s"}</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,.6)", fontFamily: "var(--font-mono)", letterSpacing: ".06em" }}>{t.locale === "es" ? "Gratis · Sin SSN" : "Free · No SSN"}</span>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => openForm(null, "sticky_mobile")}>
            {t.nav.getQuote}
          </button>
        </div>
      )}

      {formOpen && (
        <QuoteForm
          productType={formProduct}
          t={t} abVariant={abVariant}
          entryPoint={formEntry}
          initialZip={formInitialZip}
          onClose={closeForm}
          onSuccess={handleSuccess}
        />
      )}

      <NiagTweaksPanel tweaks={tweaks} setTweak={setTweak} t={t} />
    </React.Fragment>
  );
}

/* ---------- Tweaks panel ---------- */
function NiagTweaksPanel({ tweaks, setTweak, t }) {
  // tweaks-panel.jsx exports TweaksPanel, TweakSection, TweakRadio, TweakToggle
  if (!window.TweaksPanel) return null;
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="A/B/C variant">
        <TweakRadio
          label="Hero copy & default"
          value={tweaks.abVariant}
          onChange={(v) => setTweak("abVariant", v)}
          options={[
            { value: "A", label: "A" },
            { value: "B", label: "B" },
            { value: "C", label: "C" },
          ]}
        />
        <div style={{ padding: "0 12px 10px", fontSize: 11, color: "rgba(255,255,255,.6)", lineHeight: 1.5 }}>
          {tweaks.abVariant === "A" && "Bundle-first · attracts homeowners, lifts lead value."}
          {tweaks.abVariant === "B" && "Anti-spam framing · reduces anxiety, lifts form starts."}
          {tweaks.abVariant === "C" && "Human help framing · converts cautious users."}
        </div>
      </TweakSection>
      <TweakSection label="Language">
        <TweakRadio
          label="Locale"
          value={tweaks.language}
          onChange={(v) => { setTweak("language", v); track("language_toggle", { entryPoint: "tweaks" }); }}
          options={[
            { value: "en", label: "EN" },
            { value: "es", label: "ES" },
          ]}
        />
      </TweakSection>
      <TweakSection label="Mobile">
        <TweakToggle
          value={tweaks.showStickyMobileCTA}
          onChange={(v) => setTweak("showStickyMobileCTA", v)}
          label="Sticky bottom CTA"
        />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
