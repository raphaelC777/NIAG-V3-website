/* homepage.jsx — all homepage section components */

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
            <span className="mono" style={{ fontSize: 11, letterSpacing: ".12em" }}>{t.nav.language === "Español" ? "ES" : "EN"}</span>
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
function HeroQuotePreview({ t, hovered }) {
  // app-like preview card showing matched-carrier rows (no fake prices)
  const carriers = [
  { letter: "M", name: t.locale === "es" ? "Aseguradora A" : "Carrier A", tag: t.locale === "es" ? "Coincidencia local" : "Local match" },
  { letter: "S", name: t.locale === "es" ? "Aseguradora B" : "Carrier B", tag: t.locale === "es" ? "Mejor cobertura" : "Best coverage" },
  { letter: "P", name: t.locale === "es" ? "Aseguradora C" : "Carrier C", tag: t.locale === "es" ? "Servicio rápido" : "Fast service" }];

  return (
    <div style={{
      background: "#fff", border: "1px solid var(--border)", borderRadius: 18,
      boxShadow: "var(--shadow-lg)", padding: 16, position: "relative"
    }}>
      {/* preview chrome: progress + product */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--ink-soft)", letterSpacing: ".12em", textTransform: "uppercase" }}>
          {t.locale === "es" ? "Paso 1 de 4" : "Step 1 of 4"}
        </div>
        <div style={{ flex: 1, height: 3, background: "var(--sand)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ width: "25%", height: "100%", background: "var(--green-500)", borderRadius: 999 }}></div>
        </div>
        <div className="mono" style={{ fontSize: 10, color: "var(--navy-900)", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 500 }}>
          {hovered || "bundle"}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div className="eyebrow"><span className="dot"></span>{t.locale === "es" ? "Coincidencias para 60601" : "Matches for 60601"}</div>
          <div className="serif" style={{ fontSize: 20, color: "var(--navy-900)", fontWeight: 600, marginTop: 4 }}>
            {t.locale === "es" ? "3 socios disponibles" : "3 partners available"}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--green-600)", fontWeight: 500, fontFamily: "var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase" }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--green-500)", animation: "pulse 1.6s infinite" }}></span>
          {t.locale === "es" ? "En vivo" : "Live"}
        </div>
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {carriers.map((c, i) =>
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
          background: i === 0 ? "var(--sand)" : "var(--cream)",
          border: "1px solid " + (i === 0 ? "var(--navy-900)" : "var(--border-soft)"),
          borderRadius: 12, position: "relative"
        }}>
            <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: i === 0 ? "var(--navy-900)" : "var(--sand-deep)",
            color: i === 0 ? "var(--green-500)" : "var(--navy-900)",
            display: "grid", placeItems: "center",
            fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 16
          }}>{c.letter}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: "var(--navy-900)" }}>{c.name}</div>
              <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{c.tag} · {t.locale === "es" ? "Experto local" : "Local expert available"}</div>
            </div>
            <div style={{ fontSize: 11, color: "var(--ink-soft)", fontFamily: "var(--font-mono)", letterSpacing: ".06em" }}>
              {t.locale === "es" ? "Opciones de cobertura" : "Coverage options"}
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 14, padding: "10px 12px", background: "var(--green-50)", border: "1px solid rgba(31,181,115,.25)", borderRadius: 10, display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--green-600)" }}>
        <ProductIcon kind="shield" size={16} /> <span style={{ fontWeight: 500 }}>{t.locale === "es" ? "Datos cifrados · sin SSN solicitado" : "Encrypted · no SSN requested"}</span>
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }`}</style>
    </div>);

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
                <ProductIcon kind="lock" size={13} /> SSL · 256-bit
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

        <div style={{ position: "relative" }}>
          <HeroQuotePreview t={t} hovered={selectedProduct} />

          {/* layered expert mini-card overlapping top-right */}
          <div className="hide-xs" style={{
            position: "absolute", top: -22, right: -10, width: 220,
            background: "var(--navy-900)", color: "#fff", borderRadius: 14,
            padding: 14, display: "flex", gap: 10, alignItems: "center",
            boxShadow: "var(--shadow-lg)", transform: "rotate(-2deg)"
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 999, background: "var(--green-500)",
              color: "#fff", display: "grid", placeItems: "center",
              fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 15, flexShrink: 0
            }}>MR</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.55)" }}>
                {t.locale === "es" ? "Experto licenciado" : "Licensed partner"}
              </div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 600, marginTop: 2 }}>
                Maria R.
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", marginTop: 1 }}>
                {t.locale === "es" ? "Bilingüe · Disponible ahora" : "Bilingual · Available now"}
              </div>
            </div>
          </div>

          {/* testimonial / proof card overlapping bottom-left */}
          <div className="hide-xs testi-card" style={{
            position: "absolute", bottom: -28, left: -16, width: 260,
            transform: "rotate(1.5deg)"
          }}>
            <div className="quote">
              “{t.locale === "es" ? "Rápido, claro, sin presión." : "Fast, clear, no pressure."}”
            </div>
            <div className="who">
              <div className="avatars"><div className="ava s2" style={{ width: 22, height: 22, fontSize: 10 }}>MG</div></div>
              <span>Maria G. · FL · {t.locale === "es" ? "Compradora" : "Shopper"}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #top > .container { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 720px) {
          #top .testi-card, #top [style*="Licensed partner"], #top [style*="Experto licenciado"] { display: none !important; }
        }
        @media (max-width: 520px) {
          #top .prod-card .pc-title { font-size: 11px !important; }
        }
      `}</style>
    </section>);

}

window.Header = Header;
window.Hero = Hero;