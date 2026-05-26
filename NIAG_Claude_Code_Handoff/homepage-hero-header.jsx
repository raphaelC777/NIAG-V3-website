/* homepage.jsx â€” all homepage section components */

const { useState: useStateHP, useEffect: useEffectHP, useMemo: useMemoHP, useRef: useRefHP } = React;

/* ---------- Header ---------- */
function Header({ t, abVariant, onOpenForm, onToggleLang, onProductHover }) {
  const [scrolled, setScrolled] = useStateHP(false);
  const [open, setOpen] = useStateHP(false);
  useEffectHP(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const products = ["bundle", "auto", "home", "renters", "health"];

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 40,
      background: scrolled ? "rgba(250,247,242,0.92)" : "transparent",
      backdropFilter: scrolled ? "saturate(140%) blur(12px)" : "none",
      WebkitBackdropFilter: scrolled ? "saturate(140%) blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "background .2s, border-color .2s"
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px" }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--navy-900)", display: "grid", placeItems: "center", color: "var(--green-500)", fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 20 }}>N</div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 19, color: "var(--navy-900)", letterSpacing: ".04em" }}>NIAG</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--ink-soft)", letterSpacing: ".18em", marginTop: 4, textTransform: "uppercase" }}>QUOTES MADE EASY</span>
          </div>
        </a>

        <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {products.map((p) =>
          <button key={p} onClick={() => onOpenForm(p, "header")}
          onMouseEnter={() => onProductHover?.(p)}
          className="nav-btn">
              {t.nav[p]}
            </button>
          )}
          <a href="#resources" className="nav-btn" style={{ textDecoration: "none" }}>
            {t.nav.resources}
          </a>
        </nav>

        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={onToggleLang} className="btn btn-ghost btn-sm" style={{ padding: "8px 10px", border: "1px solid var(--border)" }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: ".12em" }}>{t.nav.language === "EspaÃ±ol" ? "ES" : "EN"}</span>
          </button>
          <a href="tel:+18005551234" onClick={() => track("phone_click", { entryPoint: "header" })} className="btn btn-ghost btn-sm">
            <ProductIcon kind="phone" size={15} /> {t.nav.callExpert}
          </a>
          <button className="btn btn-primary btn-sm" onClick={() => onOpenForm(null, "header")}>
            {t.nav.getQuote}
          </button>
        </div>

        {/* mobile */}
        <div className="show-mobile" style={{ display: "none", alignItems: "center", gap: 4 }}>
          <a href="tel:+18005551234" onClick={() => track("phone_click", { entryPoint: "header" })} aria-label="Call" style={{ padding: 10, borderRadius: 8, color: "var(--navy-900)", display: "grid", placeItems: "center" }}>
            <ProductIcon kind="phone" size={20} />
          </a>
          <button onClick={() => setOpen((s) => !s)} aria-label="Menu" style={{ padding: 10, borderRadius: 8, color: "var(--navy-900)" }}>
            <ProductIcon kind={open ? "x" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {open &&
      <div className="show-mobile" style={{ display: "none", borderTop: "1px solid var(--border)", background: "var(--cream)", padding: 16 }}>
          <div style={{ display: "grid", gap: 4 }}>
            {products.map((p) =>
          <button key={p} onClick={() => {setOpen(false);onOpenForm(p, "header");}} style={{ textAlign: "left", padding: "12px 8px", fontSize: 16, fontWeight: 500, color: "var(--ink)", borderBottom: "1px solid var(--border-soft)" }}>
                {t.nav[p]}
              </button>
          )}
            <a href="#resources" onClick={() => setOpen(false)} style={{ padding: "12px 8px", fontSize: 16, fontWeight: 500, color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--border-soft)" }}>
              {t.nav.resources}
            </a>
            <button onClick={() => {setOpen(false);onToggleLang();}} style={{ textAlign: "left", padding: "12px 8px", fontSize: 16, fontWeight: 500, color: "var(--ink)" }}>
              {t.nav.language}
            </button>
            <button className="btn btn-primary btn-lg" onClick={() => {setOpen(false);onOpenForm(null, "header");}} style={{ marginTop: 8 }}>
              {t.nav.getQuote}
            </button>
          </div>
        </div>
      }
    </header>);

}

/* ---------- Hero ---------- */

function HeroVisual({ t, hovered }) {
  // Claude Code handoff:
  // Replace /images/hero-driver-phone-car.jpg with a licensed lifestyle image:
  // adult using a phone, parked car visible behind them, bright natural daylight.
  // Keep the UI overlays. They show the quote experience without fake prices,
  // fake carrier names, fake reviews, or invented agent identities.
  const productName = t.products?.[hovered || "bundle"]?.label || "Bundle";
  const matchRows = t.locale === "es" ? [
    { title: "Coincidencia por ZIP", detail: "Opciones locales disponibles", icon: "check" },
    { title: "Apoyo licenciado", detail: "Un socio puede ayudarte", icon: "phone" },
    { title: "Sin SSN para empezar", detail: "Proceso seguro y editable", icon: "shield" },
  ] : [
    { title: "ZIP-based match", detail: "Local options available", icon: "check" },
    { title: "Licensed support", detail: "A partner can walk you through it", icon: "phone" },
    { title: "No SSN to start", detail: "Secure and editable process", icon: "shield" },
  ];

  return (
    <div className="hero-visual-modern" style={{ position: "relative", minHeight: 520 }}>
      <div
        aria-label={t.locale === "es" ? "Persona comparando seguro en el telefono" : "Person comparing insurance on a phone"}
        style={{
          position: "absolute", inset: "24px 0 42px 56px",
          borderRadius: 28, overflow: "hidden",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-lg)",
          backgroundImage:
            "linear-gradient(180deg, rgba(10,31,68,.08), rgba(10,31,68,.46)), url('/images/hero-driver-phone-car.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "var(--sand)"
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 74% 18%, rgba(31,181,115,.24), transparent 34%)" }}></div>
        <div style={{
          position: "absolute", left: 22, bottom: 22,
          background: "rgba(250,247,242,.92)", color: "var(--navy-900)",
          border: "1px solid rgba(255,255,255,.62)", borderRadius: 16,
          padding: "12px 14px", backdropFilter: "blur(10px)",
          maxWidth: 260
        }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--green-600)", fontWeight: 600 }}>
            {t.locale === "es" ? "Cotizacion guiada" : "Guided quote flow"}
          </div>
          <div className="serif" style={{ marginTop: 4, fontSize: 20, lineHeight: 1.15, fontWeight: 600 }}>
            {productName}
          </div>
          <div style={{ marginTop: 4, fontSize: 12, color: "var(--ink-soft)" }}>
            {t.locale === "es" ? "El ZIP confirma las opciones locales." : "Your ZIP confirms local options."}
          </div>
        </div>
      </div>

      <div style={{
        position: "absolute", top: 64, left: 0, width: 340,
        background: "#fff", border: "1px solid var(--border)", borderRadius: 18,
        boxShadow: "var(--shadow-lg)", padding: 16
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div className="mono" style={{ fontSize: 10, color: "var(--ink-soft)", letterSpacing: ".12em", textTransform: "uppercase" }}>
            {t.locale === "es" ? "Paso 1 de 4" : "Step 1 of 4"}
          </div>
          <div style={{ flex: 1, height: 3, background: "var(--sand)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ width: "25%", height: "100%", background: "var(--green-500)", borderRadius: 999 }}></div>
          </div>
        </div>

        <div className="eyebrow"><span className="dot"></span>{t.locale === "es" ? "Coincidencias por ZIP" : "ZIP-based matches"}</div>
        <div className="serif" style={{ fontSize: 21, color: "var(--navy-900)", fontWeight: 600, marginTop: 5, marginBottom: 14 }}>
          {t.locale === "es" ? "Opciones listas para revisar" : "Options ready to review"}
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {matchRows.map((row, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
              background: i === 0 ? "var(--sand)" : "var(--cream)",
              border: "1px solid " + (i === 0 ? "var(--navy-900)" : "var(--border-soft)"),
              borderRadius: 12
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 8,
                background: i === 0 ? "var(--navy-900)" : "var(--sand-deep)",
                color: i === 0 ? "var(--green-500)" : "var(--navy-900)",
                display: "grid", placeItems: "center"
              }}>
                <ProductIcon kind={row.icon} size={18} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "var(--navy-900)" }}>{row.title}</div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{row.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14, padding: "10px 12px", background: "var(--green-50)", border: "1px solid rgba(31,181,115,.25)", borderRadius: 10, display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--green-600)" }}>
          <ProductIcon kind="lock" size={16} /> <span style={{ fontWeight: 500 }}>{t.locale === "es" ? "Seguro - sin SSN para empezar" : "Secure - no SSN to start"}</span>
        </div>
      </div>

      <div className="hide-xs" style={{
        position: "absolute", right: 18, top: 16,
        background: "var(--navy-900)", color: "#fff", borderRadius: 16,
        padding: "13px 15px", boxShadow: "var(--shadow-lg)",
        border: "1px solid rgba(255,255,255,.12)",
        transform: "rotate(-1.5deg)"
      }}>
        <div className="mono" style={{ fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.55)" }}>
          {t.locale === "es" ? "Socio licenciado" : "Licensed partner"}
        </div>
        <div style={{ marginTop: 5, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--green-500)" }}></span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{t.locale === "es" ? "Disponible por ZIP" : "Available by ZIP"}</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-visual-modern { min-height: 420px !important; }
          .hero-visual-modern > div:first-child { inset: 0 0 54px 24px !important; }
          .hero-visual-modern > div:nth-child(2) { top: auto !important; bottom: 0 !important; left: 0 !important; width: min(92vw, 360px) !important; }
        }
        @media (max-width: 560px) {
          .hero-visual-modern { min-height: 360px !important; }
          .hero-visual-modern > div:first-child { inset: 0 0 68px 0 !important; border-radius: 20px !important; }
          .hero-visual-modern > div:nth-child(2) { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}

function Hero({ t, abVariant, selectedProduct, setSelectedProduct, onOpenForm, zip, setZip }) {
  const { headline, cta } = heroCopyFor(t, abVariant);
  const products = ["bundle", "auto", "home", "renters", "health"];
  const [error, setError] = useStateHP(null);

  function handleStart() {
    if (zip && !/^\d{5}$/.test(zip)) {setError(t.form.requiredZip);return;}
    onOpenForm(selectedProduct, "hero");
  }

  return (
    <section id="top" style={{ position: "relative", paddingTop: 24, paddingBottom: 64 }}>
      {/* faint top texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(900px 480px at 12% 0%, rgba(10,31,68,.05), transparent 60%), radial-gradient(700px 400px at 92% 8%, rgba(31,181,115,.05), transparent 60%)",
        pointerEvents: "none"
      }}></div>

      <div className="container" style={{ position: "relative", zIndex: 1, display: "grid", gap: 56, gridTemplateColumns: "1.1fr 1fr", alignItems: "center" }}>
        <div>
          <div className="eyebrow"><span className="dot"></span>{t.hero.eyebrow}</div>
          <h1 className="serif" style={{ marginTop: 16, fontWeight: 600, fontFamily: "\"Times New Roman\"" }}>
            {headline.map((line, i) =>
            <React.Fragment key={i}>
                {i > 0 && <br />}
                {i === headline.length - 1 && headline.length > 1 ?
              <span style={{ color: "var(--navy-700)" }}>{line}</span> :
              line}
              </React.Fragment>
            )}
          </h1>
          <p style={{ marginTop: 20, fontSize: 18, color: "var(--ink-soft)", maxWidth: "60ch", lineHeight: 1.55 }}>
            {t.hero.subhead}
          </p>

          {/* avatar stack + trust line */}
          <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <div className="avatars">
              <div className="ava s1">MR</div>
              <div className="ava s2">JT</div>
              <div className="ava s3">AS</div>
              <div className="ava s4">DK</div>
              <div className="ava s5" style={{ fontSize: 10 }}>+30</div>
            </div>
            <span style={{ fontSize: 13, color: "var(--ink-soft)", maxWidth: 320 }}>
              {t.locale === "es" ? "Apoyados por una red de 30+ socios licenciados." : "Backed by a network of 30+ licensed insurance partners."}
            </span>
          </div>

          <div className="proof-row" style={{ marginTop: 14 }}>
            {t.hero.trust.map((b, i) =>
            <span key={i} className="proof-chip">
                <span className="ic"><ProductIcon kind="check" size={12} /></span> {b}
              </span>
            )}
          </div>

          {/* form card */}
          <div style={{ marginTop: 28, background: "#fff", border: "1px solid var(--border)", borderRadius: 18, padding: 22, boxShadow: "var(--shadow-md)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: "var(--navy-900)" }}>{t.hero.pickCoverage}</div>
              <span className="pill hide-xs" style={{ fontSize: 11 }}>
                <span className="pill-dot"></span> {t.locale === "es" ? "Variante " : "Variant "}{abVariant}
              </span>
            </div>

            <div className="product-scroll">
              {products.map((p) =>
              <button key={p}
              className={"prod-card" + (selectedProduct === p ? " selected" : "")}
              onClick={() => {setSelectedProduct(p);track("product_select", { productType: p, entryPoint: "hero" });}}
              style={{ padding: 12, gap: 6 }}>
                
                  {p === "bundle" && <span className="pc-badge">{t.products.bundle.badge}</span>}
                  <div className="pc-icon" style={{ width: 22, height: 22 }}>
                    <ProductIcon kind={p} size={20} />
                  </div>
                  <div className="pc-title" style={{ fontSize: 13 }}>{t.products[p].label}</div>
                </button>
              )}
            </div>

            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr auto", gap: 10, alignItems: "stretch" }}>
              <div>
                <label className="field-label">{t.hero.zip}</label>
                <input
                  className={"input input-zip" + (error ? " error" : "")}
                  inputMode="numeric" maxLength={5} value={zip}
                  onChange={(e) => {setZip(e.target.value.replace(/\D/g, "").slice(0, 5));setError(null);}}
                  placeholder={t.hero.zipPh} />
                
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <button onClick={handleStart} className="btn btn-primary btn-lg" style={{ height: 51 }}>
                  {t.hero.startCompare} <ProductIcon kind="arrow-right" size={16} />
                </button>
              </div>
            </div>
            {error && <div style={{ color: "var(--danger)", fontSize: 13, marginTop: 8 }}>{error}</div>}

            <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <button className="btn-link" onClick={() => track("quote_recovery_click", { entryPoint: "hero" })} style={{ fontSize: 13, padding: 0, color: "var(--ink-soft)", border: 0, textDecoration: "underline", textUnderlineOffset: 3 }}>
                {t.hero.recovery}
              </button>
              <div style={{ fontSize: 11, color: "var(--ink-soft)", display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", letterSpacing: ".06em" }}>
                <ProductIcon kind="lock" size={13} /> SSL Â· 256-bit
              </div>
            </div>
          </div>

          <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 16, fontSize: 13, color: "var(--ink-soft)", flexWrap: "wrap" }}>
            <button onClick={() => onOpenForm(selectedProduct, "hero")} className="btn btn-navy btn-sm">
              {cta}
            </button>
            <span>{t.locale === "es" ? "o" : "or"} <a href="tel:+18005551234" onClick={() => track("phone_click", { entryPoint: "hero" })} style={{ color: "var(--navy-900)" }}>(800) 555-1234</a></span>
          </div>
        </div>

        <div className="hero-visual-slot" style={{ position: "relative" }}>
          <HeroVisual t={t} hovered={selectedProduct} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #top > .container { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 520px) {
          #top .prod-card .pc-title { font-size: 11px !important; }
        }
      `}</style>
    </section>);

}

window.Header = Header;
window.Hero = Hero;
