/* homepage-2.jsx — remaining homepage sections (split for file-size discipline) */

const { useState: useStateHP2, useMemo: useMemoHP2, useEffect: useEffectHP2 } = React;

/* ---------- Trust Strip ---------- */
function TrustStrip({ t }) {
  // Original, neutral partner-style tiles. NOT real carrier marks.
  const partnerTiles = t.locale === "es" ? [
    { mark: "A", name: "Aseguradora del Norte", role: "Auto · Hogar" },
    { mark: "B", name: "Beacon Mutual", role: "Auto · Combinado" },
    { mark: "C", name: "Cardinal Coverage", role: "Hogar · Inquilinos" },
    { mark: "M", name: "Meridian Partners", role: "Auto · Salud" },
    { mark: "P", name: "Pillar Insurance Co.", role: "Combinado" },
    { mark: "S", name: "Summit Underwriters", role: "Hogar · Auto" },
  ] : [
    { mark: "A", name: "Anchor Mutual", role: "Auto · Home" },
    { mark: "B", name: "Beacon Insurance Co.", role: "Auto · Bundle" },
    { mark: "C", name: "Cardinal Coverage", role: "Home · Renters" },
    { mark: "M", name: "Meridian Partners", role: "Auto · Health" },
    { mark: "P", name: "Pillar Underwriters", role: "Bundle" },
    { mark: "S", name: "Summit Insurance Group", role: "Home · Auto" },
  ];
  return (
    <section style={{ background: "var(--sand)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "44px 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 40, alignItems: "center" }} className="trust-grid">
          <div>
            <div className="eyebrow"><span className="dot"></span>{t.locale === "es" ? "Red de socios" : "Partner network"}</div>
            <div className="serif" style={{ fontSize: 22, color: "var(--navy-900)", fontWeight: 600, lineHeight: 1.2, marginTop: 10, letterSpacing: "-0.015em" }}>
              {t.locale === "es" ? "Conectamos con socios licenciados verificados." : "Matched with vetted, licensed insurance partners."}
            </div>
            <div className="proof-row" style={{ marginTop: 14 }}>
              {t.trustStrip.badges.map((b, i) => (
                <span key={i} className="proof-chip">
                  <span className="ic"><ProductIcon kind="check" size={12} /></span> {b}
                </span>
              ))}
            </div>
          </div>
          <div className="partner-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {partnerTiles.map((p, i) => (
              <div key={i} className="partner-tile" title={t.locale === "es" ? "Disponibilidad varía por ZIP" : "Availability varies by ZIP"}>
                <div className="mark">{p.mark}</div>
                <div className="meta">
                  <div className="name">{p.name}</div>
                  <div className="role">{p.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 18, fontSize: 11, color: "var(--ink-soft)", fontFamily: "var(--font-mono)", letterSpacing: ".06em", maxWidth: "76ch" }}>
          {t.locale === "es" ? "Socios mostrados como ejemplo de la red. Disponibilidad varía por ZIP, producto y elegibilidad." : "Partners shown are representative of the network. Availability varies by ZIP, product, and eligibility."}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          section .trust-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 560px) {
          .partner-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .partner-tile .meta .name { font-size: 12px !important; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Product Entry Cards ---------- */
function ProductCards({ t, onOpenForm }) {
  const order = ["bundle", "auto", "home", "renters", "health"];
  const bestFor = t.locale === "es" ? {
    bundle: "Ideal para propietarios con vehículos",
    auto: "Autos, camionetas, uso diario",
    home: "Casas propias y condos",
    renters: "Apartamentos y rentas",
    health: "Individual y familiar",
  } : {
    bundle: "Best for homeowners with vehicles",
    auto: "Cars, trucks, daily drivers",
    home: "Owned homes and condos",
    renters: "Apartments and rentals",
    health: "Individual and family options",
  };
  return (
    <section className="section" id="products" style={{ position: "relative", background: "var(--cream)" }}>
      <div className="container" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 48, alignItems: "end", marginBottom: 32 }}>
          <div>
            <div className="eyebrow"><span className="dot"></span>{t.productSection.eyebrow}</div>
            <h2 style={{ marginTop: 12, maxWidth: "18ch" }}>{t.productSection.title}</h2>
          </div>
          <div style={{ paddingBottom: 4 }}>
            <p style={{ fontSize: 17, color: "var(--ink)", lineHeight: 1.55, fontWeight: 500, maxWidth: "44ch" }}>
              {t.productSection.killer}
            </p>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10, color: "var(--green-600)", fontSize: 13, fontWeight: 500 }}>
              <span style={{ display: "inline-flex", width: 28, height: 1.5, background: "var(--green-500)" }}></span>
              <span style={{ fontFamily: "var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", fontSize: 11 }}>
                {t.productSection.microCta}
              </span>
            </div>
          </div>
        </div>

        {/* asymmetric grid: bundle hero spans, 4 children in 2x2 to avoid orphan */}
        <div className="prod-grid">
          {order.map((p) => {
            const cfg = t.products[p];
            const featured = p === "bundle";
            return (
              <article key={p} className={"prod-tile" + (featured ? " featured" : "")}
                style={{
                  background: featured ? "var(--navy-900)" : "#fff",
                  color: featured ? "#fff" : "var(--ink)",
                  border: "1px solid " + (featured ? "var(--navy-900)" : "var(--border)"),
                  borderRadius: 16,
                  padding: featured ? 28 : 22,
                  display: "flex", flexDirection: "column", gap: 14,
                  position: "relative",
                  transition: "transform .15s ease, box-shadow .15s ease, border-color .15s ease",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; if (!featured) e.currentTarget.style.borderColor = "var(--navy-700)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; if (!featured) e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                {featured && (
                  <React.Fragment>
                    <span style={{
                      position: "absolute", top: 16, right: 16, fontSize: 10, fontWeight: 600,
                      background: "var(--green-500)", color: "#fff", padding: "4px 10px", borderRadius: 999,
                      letterSpacing: ".06em", textTransform: "uppercase",
                    }}>{cfg.badge}</span>
                    <div aria-hidden="true" style={{
                      position: "absolute", right: -80, bottom: -80, width: 240, height: 240,
                      borderRadius: 999, border: "1px dashed rgba(31,181,115,0.22)",
                    }}></div>
                    <div aria-hidden="true" style={{
                      position: "absolute", right: -120, bottom: -120, width: 320, height: 320,
                      borderRadius: 999, border: "1px dashed rgba(31,181,115,0.12)",
                    }}></div>
                  </React.Fragment>
                )}
                <div style={{
                  width: featured ? 52 : 44, height: featured ? 52 : 44, borderRadius: 12,
                  background: featured ? "rgba(255,255,255,.08)" : "var(--sand)",
                  color: featured ? "var(--green-500)" : "var(--navy-900)",
                  display: "grid", placeItems: "center",
                  position: "relative", zIndex: 1,
                }}>
                  <ProductIcon kind={p} size={featured ? 30 : 26} />
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: featured ? 28 : 22, fontWeight: 600, letterSpacing: "-.015em", lineHeight: 1.1 }}>{cfg.label}</div>
                  <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: featured ? "rgba(255,255,255,.55)" : "var(--ink-soft)", letterSpacing: ".1em", marginTop: 4, textTransform: "uppercase" }}>{cfg.sub}</div>
                </div>
                <p style={{ fontSize: featured ? 15 : 14, color: featured ? "rgba(255,255,255,.78)" : "var(--ink-soft)", flex: 1, lineHeight: 1.5, position: "relative", zIndex: 1 }}>
                  {cfg.desc}
                </p>
                <div style={{
                  position: "relative", zIndex: 1,
                  display: "flex", alignItems: "center", gap: 8,
                  fontSize: 12, fontWeight: 500,
                  color: featured ? "var(--green-200)" : "var(--green-600)",
                  paddingTop: 12, borderTop: "1px dashed " + (featured ? "rgba(255,255,255,.15)" : "var(--border-soft)"),
                }}>
                  <span style={{ width: 14, height: 1.5, background: "currentColor", display: "inline-block" }}></span>
                  <span style={{ fontFamily: "var(--font-mono)", letterSpacing: ".06em", fontSize: 11 }}>{bestFor[p]}</span>
                </div>
                <button
                  className="btn"
                  onClick={() => onOpenForm(p, "product_card")}
                  style={{
                    background: featured ? "var(--green-500)" : "transparent",
                    color: featured ? "#fff" : "var(--navy-900)",
                    border: featured ? "0" : "1px solid var(--border)",
                    padding: "12px 14px", fontSize: 14,
                    justifyContent: "space-between", width: "100%",
                    position: "relative", zIndex: 1,
                  }}
                  onMouseEnter={(e) => { if (!featured) { e.currentTarget.style.background = "var(--navy-900)"; e.currentTarget.style.color = "#fff"; } else { e.currentTarget.style.background = "var(--green-700)"; } }}
                  onMouseLeave={(e) => { if (!featured) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--navy-900)"; } else { e.currentTarget.style.background = "var(--green-500)"; } }}
                >
                  <span>{cfg.cta}</span>
                  <ProductIcon kind="arrow-right" size={16} />
                </button>
              </article>
            );
          })}
        </div>
      </div>
      <style>{`
        .prod-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: auto auto;
          gap: 14px;
        }
        .prod-grid > .prod-tile.featured {
          grid-column: span 2;
          grid-row: span 2;
          min-height: 420px;
        }
        .prod-grid > .prod-tile { min-height: 200px; }
        @media (max-width: 980px) {
          .prod-grid { grid-template-columns: repeat(2, 1fr); grid-template-rows: auto; }
          .prod-grid > .prod-tile.featured { grid-column: span 2; grid-row: auto; min-height: 280px; }
        }
        @media (max-width: 560px) {
          .prod-grid { grid-template-columns: 1fr; }
          .prod-grid > .prod-tile.featured { grid-column: span 1; }
        }
        @media (max-width: 800px) {
          #products > .container > div:first-child { grid-template-columns: 1fr !important; gap: 18px !important; align-items: start !important; }
        }
      `}</style>
    </section>
  );
}

/* ---------- How It Works ---------- */
function HowItWorks({ t, onOpenForm }) {
  const stepIcons = ["bundle", "check", "shield"];
  return (
    <section className="section bg-greentint" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 56, alignItems: "start" }} className="hiw-grid">
          <div>
            <div className="eyebrow"><span className="dot"></span>{t.howItWorks.eyebrow}</div>
            <h2 style={{ marginTop: 12 }}>{t.howItWorks.title}</h2>
            <p style={{ marginTop: 16, fontSize: 15, color: "var(--ink-soft)", maxWidth: "32ch" }}>{t.howItWorks.micro}</p>
            <div className="proof-row" style={{ marginTop: 18 }}>
              <span className="proof-chip"><span className="ic"><ProductIcon kind="lock" size={11} /></span>{t.locale === "es" ? "Sin SSN" : "No SSN"}</span>
              <span className="proof-chip"><span className="ic"><ProductIcon kind="check" size={11} /></span>{t.locale === "es" ? "Sin compromiso" : "No obligation"}</span>
            </div>
            <button onClick={() => onOpenForm(null, "how_it_works")} className="btn btn-navy" style={{ marginTop: 22 }}>
              {t.nav.getQuote} <ProductIcon kind="arrow-right" size={15} />
            </button>
          </div>
          <ol className="steps-stack" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {t.howItWorks.steps.map((s, i) => (
              <li key={i} className="step-card">
                <div className="step-num">{s.n}</div>
                <div className="step-body">
                  <div className="step-title">{s.t}</div>
                  <p className="step-desc">{s.d}</p>
                </div>
                <div className="step-icon" aria-hidden="true">
                  <ProductIcon kind={stepIcons[i]} size={18} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .hiw-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .step-card { grid-template-columns: auto 1fr !important; }
          .step-card .step-icon { display: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Split Help ---------- */
function SplitHelp({ t, onOpenForm }) {
  const bestOnline = t.locale === "es" ? "Mejor si quieres velocidad" : "Best if you want speed";
  const bestExpert = t.locale === "es" ? "Mejor si quieres ayuda al elegir" : "Best if you want help choosing";
  return (
    <section className="section" style={{ background: "var(--cream)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}><span className="dot"></span>{t.splitHelp.eyebrow}</div>
          <h2 style={{ marginTop: 12, maxWidth: "20ch", marginLeft: "auto", marginRight: "auto" }}>
            {t.locale === "es" ? "Dos caminos. Tú decides el ritmo." : "Two paths. You pick the pace."}
          </h2>
        </div>
        <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <article style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 16, padding: 32, display: "flex", flexDirection: "column", gap: 16, position: "relative", overflow: "hidden" }}>
            <span className="pill pill-sand" style={{ alignSelf: "flex-start", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase" }}>
              {bestOnline}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--sand)", color: "var(--navy-900)", display: "grid", placeItems: "center" }}>
                <ProductIcon kind="bundle" size={26} />
              </div>
              <h3 style={{ fontSize: 24 }}>{t.splitHelp.onlineT}</h3>
            </div>
            <p style={{ color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.55 }}>{t.splitHelp.onlineD}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "4px 0 0", display: "grid", gap: 8 }}>
              {[t.locale === "es" ? "60 segundos de principio a fin" : "60 seconds end-to-end",
                t.locale === "es" ? "Sin SSN, sin papeleo" : "No SSN, no paperwork",
                t.locale === "es" ? "Resultados en pantalla" : "Results on screen"].map((it, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--ink)" }}>
                  <span style={{ width: 18, height: 18, borderRadius: 999, background: "var(--green-50)", color: "var(--green-600)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <ProductIcon kind="check" size={12} />
                  </span>
                  {it}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "auto", paddingTop: 8 }}>
              <button onClick={() => onOpenForm(null, "split_help_online")} className="btn btn-primary">
                {t.splitHelp.onlineCta} <ProductIcon kind="arrow-right" size={15} />
              </button>
            </div>
          </article>
          <article style={{ background: "var(--navy-900)", color: "#fff", borderRadius: 16, padding: 32, display: "flex", flexDirection: "column", gap: 16, position: "relative", overflow: "hidden" }}>
            <div aria-hidden="true" style={{ position: "absolute", right: -100, top: -100, width: 260, height: 260, borderRadius: 999, background: "radial-gradient(circle, rgba(31,181,115,.18), transparent 70%)" }}></div>
            <span style={{
              alignSelf: "flex-start", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase",
              padding: "5px 10px", borderRadius: 999, background: "rgba(31,181,115,.15)", color: "var(--green-200)", border: "1px solid rgba(31,181,115,.3)",
              position: "relative", zIndex: 1
            }}>
              {bestExpert}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 1 }}>
              <div className="avatars">
                <div className="ava s1">MR</div>
                <div className="ava s2">JT</div>
                <div className="ava s4">DK</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: 24, color: "#fff" }}>{t.splitHelp.expertT}</h3>
                <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: ".1em", color: "rgba(255,255,255,.55)", textTransform: "uppercase", marginTop: 2 }}>
                  {t.locale === "es" ? "Socios licenciados bilingües" : "Licensed bilingual partners"}
                </span>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,.8)", fontSize: 15, lineHeight: 1.55, position: "relative", zIndex: 1 }}>
              {t.locale === "es" ? "¿Prefieres una segunda opinión? Un socio licenciado te guía por las opciones — sin presión, sin laberinto de centralita."
                : "Prefer a second set of eyes? A licensed partner can walk you through the options — no pressure, no phone-tree maze."}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", marginTop: "auto", position: "relative", zIndex: 1 }}>
              <a href="tel:+18005551234" onClick={() => track("phone_click", { entryPoint: "split_help_expert" })} className="btn btn-primary">
                <ProductIcon kind="phone" size={16} /> (800) 555-1234
              </a>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,.65)", fontFamily: "var(--font-mono)", letterSpacing: ".06em" }}>{t.splitHelp.hours}</span>
            </div>
          </article>
        </div>
      </div>
      <style>{`@media (max-width: 800px) { .split-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ---------- Mid-page CTA ---------- */
function MidCta({ t, onOpenForm }) {
  const [product, setProduct] = useStateHP2("bundle");
  const [zip, setZip] = useStateHP2("");
  const [err, setErr] = useStateHP2(null);
  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container">
        <div style={{
          position: "relative", overflow: "hidden",
          background: "var(--navy-900)", color: "#fff", borderRadius: 24,
          padding: "44px 48px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 32, alignItems: "center",
        }}>
          <div aria-hidden="true" style={{
            position: "absolute", right: -80, top: -80, width: 300, height: 300, borderRadius: 999,
            background: "radial-gradient(circle, rgba(31,181,115,.18), transparent 70%)",
          }}></div>
          <div style={{ position: "relative" }}>
            <div className="eyebrow" style={{ color: "rgba(255,255,255,.6)" }}><span className="dot"></span>{t.midCta.eyebrow}</div>
            <h2 style={{ color: "#fff", marginTop: 14, maxWidth: "20ch" }}>{t.midCta.title}</h2>
            <p style={{ marginTop: 14, color: "rgba(255,255,255,.78)", maxWidth: "40ch", fontSize: 16 }}>{t.midCta.sub}</p>
            <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[t.locale === "es" ? "Gratis" : "Free", t.locale === "es" ? "60 segundos" : "60 seconds", t.locale === "es" ? "Sin SSN" : "No SSN"].map((b, i) => (
                <span key={i} style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.16)",
                  color: "#fff", fontSize: 12, padding: "6px 12px", borderRadius: 999,
                  fontFamily: "var(--font-mono)", letterSpacing: ".06em",
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: 999, background: "var(--green-500)" }}></span> {b}
                </span>
              ))}
            </div>
          </div>
          <div style={{ position: "relative", background: "var(--cream)", color: "var(--ink)", borderRadius: 14, padding: 22, border: "1px solid rgba(255,255,255,.08)" }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 10 }}>
              {t.locale === "es" ? "Siguiente: 3 preguntas rápidas · ~60 segundos" : "Next: 3 quick questions · about 60 seconds"}
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              <div>
                <label className="field-label">{t.midCta.product}</label>
                <select value={product} onChange={(e) => { setProduct(e.target.value); track("product_select", { productType: e.target.value, entryPoint: "mid_cta" }); }} className="select">
                  {["bundle", "auto", "home", "renters", "health"].map((p) => (
                    <option key={p} value={p}>{t.products[p].label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="field-label">{t.midCta.zip}</label>
                <input className={"input input-zip" + (err ? " error" : "")} value={zip} maxLength={5}
                  onChange={(e) => { setZip(e.target.value.replace(/\D/g, "").slice(0, 5)); setErr(null); }}
                  placeholder="00000" />
              </div>
              <button className="btn btn-primary btn-lg" onClick={() => {
                if (zip && !/^\d{5}$/.test(zip)) { setErr(t.form.requiredZip); return; }
                onOpenForm(product, "mid_cta", zip);
              }}>
                {t.midCta.cta} <ProductIcon kind="arrow-right" size={16} />
              </button>
              {err && <div style={{ color: "var(--danger)", fontSize: 13 }}>{err}</div>}
              <div style={{ fontSize: 12, color: "var(--ink-soft)", fontFamily: "var(--font-mono)", letterSpacing: ".06em", textAlign: "center", marginTop: 4 }}>
                {t.locale === "es" ? "Sin SSN · Sin compromiso · Sin llamadas sorpresa" : "No SSN · No obligation · No surprise calls"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 800px) { section > .container > div[style*="navy-900"] { grid-template-columns: 1fr !important; padding: 28px !important; } }`}</style>
    </section>
  );
}

/* ---------- SEO Blog Tabs ---------- */
function BlogIllustration({ kind, tab }) {
  // map article index to a deterministic illustration style; varies by tab so tabs feel distinct
  if (kind === "chart") {
    return (
      <div className="blog-illust" style={{ background: "var(--sand)" }}>
        <span className="category-mark">{tab}</span>
        <div className="illust-chart" style={{ position: "relative" }}>
          <span className="head">{tab} · rate factors</span>
          <div className="bars">
            <span style={{ height: "35%" }}></span>
            <span className="mid" style={{ height: "55%" }}></span>
            <span style={{ height: "42%" }}></span>
            <span className="hi" style={{ height: "78%" }}></span>
            <span style={{ height: "48%" }}></span>
            <span className="mid" style={{ height: "62%" }}></span>
          </div>
          <div className="axis"></div>
        </div>
        <span className="corner-stamp">fig.01</span>
      </div>
    );
  }
  if (kind === "checklist") {
    return (
      <div className="blog-illust" style={{ background: "var(--cream)" }}>
        <span className="category-mark">{tab}</span>
        <div className="illust-check">
          <div className="row"><span className="box done"><ProductIcon kind="check" size={9} /></span><span className="txt">ZIP & vehicle details</span></div>
          <div className="row"><span className="box done"><ProductIcon kind="check" size={9} /></span><span className="txt">Coverage preferences</span></div>
          <div className="row"><span className="box"></span><span className="txt">Compare 3 partner matches</span></div>
          <div className="row"><span className="box"></span><span className="txt">Choose effective date</span></div>
        </div>
        <span className="corner-stamp">checklist</span>
      </div>
    );
  }
  if (kind === "card") {
    return (
      <div className="blog-illust" style={{ background: "var(--green-50)" }}>
        <span className="category-mark">{tab}</span>
        <div className="illust-card">
          <span className="badge">Bundle</span>
          <span className="lbl">Coverage type</span>
          <span className="val">Auto + Home</span>
          <span className="lbl" style={{ marginTop: 4 }}>Effective</span>
          <span className="val" style={{ fontSize: 13 }}>Within 7 days</span>
        </div>
        <span className="corner-stamp">card</span>
      </div>
    );
  }
  if (kind === "list") {
    return (
      <div className="blog-illust" style={{ background: "var(--sand)" }}>
        <span className="category-mark">{tab}</span>
        <div className="illust-list">
          <div className="item"><span className="dot"></span><span>Liability limits</span></div>
          <div className="item"><span className="dot navy"></span><span>Comprehensive</span></div>
          <div className="item"><span className="dot sand"></span><span>Collision</span></div>
          <div className="item"><span className="dot"></span><span>Uninsured motorist</span></div>
        </div>
        <span className="corner-stamp">overview</span>
      </div>
    );
  }
  // doc default
  return (
    <div className="blog-illust" style={{ background: "var(--cream)" }}>
      <span className="category-mark">{tab}</span>
      <div className="illust-doc">
        <div className="ln h-thick w70"></div>
        <div className="ln w85"></div>
        <div className="ln w70"></div>
        <div className="ln w50"></div>
        <div style={{ height: 8 }}></div>
        <div className="ln w40"></div>
      </div>
      <span className="corner-stamp">guide</span>
    </div>
  );
}

function BlogTabs({ t, onOpenForm }) {
  const tabs = [
    { id: "auto", label: t.seo.tabs.auto },
    { id: "bundle", label: t.seo.tabs.bundle },
    { id: "home", label: t.seo.tabs.home },
    { id: "renters", label: t.seo.tabs.renters },
    { id: "health", label: t.seo.tabs.health },
    { id: "es", label: t.seo.tabs.es },
  ];
  const [active, setActive] = useStateHP2("auto");
  const articles = t.seo.articles[active] || [];
  // map article index → illustration kind so each card gets a different visual
  const illustOrder = ["doc", "chart", "checklist", "card", "list"];
  return (
    <section className="section" id="resources" style={{ background: "var(--sand)", borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "end", marginBottom: 28 }} className="seo-head">
          <div style={{ maxWidth: 640 }}>
            <div className="eyebrow"><span className="dot"></span>{t.seo.eyebrow}</div>
            <h2 style={{ marginTop: 12 }}>{t.seo.title}</h2>
            <p style={{ marginTop: 12, fontSize: 17, color: "var(--ink-soft)" }}>{t.seo.sub}</p>
          </div>
        </div>
        <div className="scroll-tabs pill-tabs" style={{ marginBottom: 24, border: 0, gap: 6, padding: "4px", background: "#fff", display: "inline-flex", borderRadius: 999, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border)" }}>
          {tabs.map((tab) => (
            <button key={tab.id}
              onClick={() => { setActive(tab.id); track("blog_tab_click", { entryPoint: "blog_tabs", productType: tab.id === "es" ? null : tab.id }); }}
              style={{
                padding: "10px 18px", fontSize: 13, fontWeight: 500,
                color: active === tab.id ? "#fff" : "var(--ink-soft)",
                background: active === tab.id ? "var(--navy-900)" : "transparent",
                borderRadius: 999,
                whiteSpace: "nowrap",
                transition: "background .15s ease, color .15s ease",
              }}
            >{tab.label}</button>
          ))}
        </div>
        <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {articles.map((a, i) => (
            <article key={i} className="blog-tile">
              <BlogIllustration kind={illustOrder[i % illustOrder.length]} tab={active} />
              <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <span className="pill pill-sand" style={{ alignSelf: "flex-start", fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase" }}>{a.tag}</span>
                <h3 style={{ fontSize: 18, lineHeight: 1.3 }}>{a.title}</h3>
                <p style={{ fontSize: 13, color: "var(--ink-soft)", flex: 1, lineHeight: 1.55 }}>{a.excerpt}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6, paddingTop: 12, borderTop: "1px solid var(--border-soft)" }}>
                  <a href="#" style={{ fontSize: 13, fontWeight: 500, color: "var(--navy-900)", textDecoration: "underline", textUnderlineOffset: 3 }}>{t.seo.readGuide} →</a>
                  <button className="btn btn-ghost btn-sm" style={{ padding: "6px 10px", fontSize: 12 }}
                    onClick={() => onOpenForm(active === "es" ? "bundle" : active, "blog_card")}
                  >{t.seo.inlineCta}</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .pill-tabs { flex-wrap: nowrap !important; overflow-x: auto; -webkit-overflow-scrolling: touch; max-width: 100%; }
          .pill-tabs::-webkit-scrollbar { display: none; }
        }
      `}</style>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq({ t }) {
  const [openIdx, setOpenIdx] = useStateHP2(0);
  return (
    <section className="section" style={{ background: "var(--cream)" }}>
      <div className="container">
        <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 56, alignItems: "start" }}>
          <div>
            <div style={{ marginBottom: 18 }}>
              <div className="eyebrow"><span className="dot"></span>{t.faq.eyebrow}</div>
              <h2 style={{ marginTop: 12 }}>{t.faq.title}</h2>
            </div>
            <div>
              {t.faq.items.map((item, i) => {
                const open = openIdx === i;
                return (
                  <div key={i} className={"acc-item" + (open ? " open" : "")}>
                    <button className="acc-trigger" onClick={() => setOpenIdx(open ? -1 : i)} aria-expanded={open}>
                      <span>{item.q}</span>
                      <span className="acc-icon" style={{ width: 22, height: 22, display: "grid", placeItems: "center", color: "var(--navy-900)" }}>
                        <ProductIcon kind="plus" size={18} />
                      </span>
                    </button>
                    {open && <div className="acc-content">{item.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
          <aside className="faq-side">
            <div className="faq-sidecard">
              <div className="eyebrow" style={{ color: "rgba(255,255,255,.6)" }}><span className="dot"></span>{t.locale === "es" ? "Apoyo en vivo" : "Live support"}</div>
              <div className="serif" style={{ fontSize: 22, fontWeight: 600, color: "#fff", lineHeight: 1.25, letterSpacing: "-0.015em" }}>
                {t.locale === "es" ? "¿Preguntas antes de comparar?" : "Questions before comparing?"}
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.78)", lineHeight: 1.55 }}>
                {t.locale === "es" ? "Un socio licenciado responde — sin presión, sin SSN, en inglés o español." : "A licensed partner can help — no pressure, no SSN, English or Spanish."}
              </p>
              <div className="avatar-stack" style={{ marginTop: 4 }}>
                <div className="ava">MR</div>
                <div className="ava b">JT</div>
                <div className="ava c">DK</div>
              </div>
              <a href="tel:+18005551234" onClick={() => track("phone_click", { entryPoint: "faq_sidecard" })} className="btn btn-primary" style={{ width: "100%" }}>
                <ProductIcon kind="phone" size={16} /> (800) 555-1234
              </a>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.55)", fontFamily: "var(--font-mono)", letterSpacing: ".08em", textAlign: "center" }}>
                {t.splitHelp.hours}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .faq-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .faq-side { order: -1; }
          .faq-sidecard { position: static !important; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Bottom CTA ---------- */
function BottomCta({ t, onOpenForm }) {
  const [product, setProduct] = useStateHP2("bundle");
  const [zip, setZip] = useStateHP2("");
  const [err, setErr] = useStateHP2(null);
  return (
    <section style={{ padding: "80px 0", borderTop: "1px solid var(--border)", background: "var(--sand)", position: "relative", overflow: "hidden" }}>
      {/* faint anchor mark */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(640px 320px at 50% 0%, rgba(31,181,115,.07), transparent 60%)",
      }}></div>
      <div className="container-narrow" style={{ textAlign: "center", position: "relative" }}>
        <div className="eyebrow" style={{ justifyContent: "center", display: "inline-flex" }}><span className="dot"></span>{t.bottomCta.eyebrow}</div>
        <h2 style={{ marginTop: 14 }}>{t.bottomCta.title}</h2>
        <p style={{ marginTop: 14, fontSize: 17, color: "var(--ink-soft)", maxWidth: "48ch", margin: "14px auto 0" }}>{t.bottomCta.sub}</p>

        <div style={{ marginTop: 32, background: "#fff", border: "1px solid var(--border)", borderRadius: 20, padding: 24, boxShadow: "var(--shadow-md)", textAlign: "left" }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 12 }}>
            {t.locale === "es" ? "Elige producto y código postal" : "Choose product + ZIP"}
          </div>
          <div className="product-scroll" style={{ marginBottom: 16 }}>
            {["bundle", "auto", "home", "renters", "health"].map((p) => (
              <button key={p} onClick={() => { setProduct(p); track("product_select", { productType: p, entryPoint: "bottom_cta" }); }}
                className={"prod-card" + (product === p ? " selected" : "")}
                style={{ padding: 10, alignItems: "center", textAlign: "center", flexDirection: "column" }}
              >
                <div className="pc-icon"><ProductIcon kind={p} size={20} /></div>
                <div className="pc-title" style={{ fontSize: 12 }}>{t.products[p].label}</div>
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10, alignItems: "end" }}>
            <div>
              <label className="field-label">{t.hero.zip}</label>
              <input className={"input input-zip" + (err ? " error" : "")} value={zip} maxLength={5}
                onChange={(e) => { setZip(e.target.value.replace(/\D/g, "").slice(0, 5)); setErr(null); }}
                placeholder={t.hero.zipPh} />
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => {
              if (zip && !/^\d{5}$/.test(zip)) { setErr(t.form.requiredZip); return; }
              onOpenForm(product, "bottom_cta", zip);
            }} style={{ height: 51 }}>
              {heroCopyFor(t, window.__niagCtx?.abVariant || "A").cta} <ProductIcon kind="arrow-right" size={16} />
            </button>
          </div>
          {err && <div style={{ color: "var(--danger)", fontSize: 13, marginTop: 8 }}>{err}</div>}
        </div>

        <div style={{ marginTop: 18, fontSize: 12, color: "var(--ink-soft)", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap", fontFamily: "var(--font-mono)", letterSpacing: ".06em" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><ProductIcon kind="lock" size={12} /> SSL · 256-bit</span>
          <span>·</span>
          <span>{t.locale === "es" ? "Sin SSN" : "No SSN"}</span>
          <span>·</span>
          <span>{t.locale === "es" ? "Sin compromiso" : "No obligation"}</span>
          <span>·</span>
          <span>{t.locale === "es" ? "Sin llamadas sorpresa" : "No surprise calls"}</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer({ t, onOpenForm, onToggleLang }) {
  return (
    <footer style={{ background: "var(--navy-900)", color: "rgba(255,255,255,.82)", padding: "56px 0 28px" }}>
      <div className="container">
        <div style={{ display: "grid", gap: 40, gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,.08)", display: "grid", placeItems: "center", color: "var(--green-500)", fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 20 }}>N</div>
              <div>
                <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: "#fff", fontSize: 20, letterSpacing: ".04em" }}>NIAG</div>
                <div className="mono" style={{ fontSize: 9, letterSpacing: ".18em", color: "rgba(255,255,255,.55)", textTransform: "uppercase", marginTop: 2 }}>
                  {t.locale === "es" ? "Grupo Nacional de Asistencia en Seguros" : "National Insurance Assistance Group"}
                </div>
              </div>
            </div>
            <p style={{ marginTop: 16, maxWidth: "34ch", fontSize: 14, color: "rgba(255,255,255,.78)", lineHeight: 1.6 }}>
              {t.footer.tagline}
            </p>
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              <button onClick={onToggleLang} className="btn btn-sm" style={{ background: "rgba(255,255,255,.08)", color: "#fff" }}>
                {t.nav.language === "Español" ? "Español" : "English"}
              </button>
              <a href="tel:+18005551234" onClick={() => track("phone_click", { entryPoint: "footer" })} className="btn btn-sm" style={{ background: "rgba(255,255,255,.08)", color: "#fff" }}>
                <ProductIcon kind="phone" size={14} /> (800) 555-1234
              </a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.65)", marginBottom: 14 }}>{t.footer.productsH}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
              {["bundle", "auto", "home", "renters", "health"].map((p) => (
                <li key={p}>
                  <button onClick={() => onOpenForm(p, "footer")} style={{ color: "#fff", fontSize: 14 }}
                    onMouseOver={(e) => e.currentTarget.style.color = "var(--green-500)"}
                    onMouseOut={(e) => e.currentTarget.style.color = "#fff"}
                  >{t.products[p].label}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.65)", marginBottom: 14 }}>{t.footer.resourcesH}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
              {t.footer.resources.map((r) => <li key={r}><a href="#resources" style={{ color: "#fff", fontSize: 14, textDecoration: "none" }}>{r}</a></li>)}
            </ul>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.65)", marginBottom: 14 }}>{t.footer.companyH}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
              {t.footer.company.map((r) => <li key={r}><a href="#" style={{ color: "#fff", fontSize: 14, textDecoration: "none" }}>{r}</a></li>)}
            </ul>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.65)", marginBottom: 14 }}>{t.footer.legalH}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
              {t.footer.legal.map((r) => <li key={r}><a href="#" style={{ color: "rgba(255,255,255,.85)", fontSize: 13, textDecoration: "none", lineHeight: 1.4, display: "inline-block" }}>{r}</a></li>)}
            </ul>
          </div>
        </div>
        <div style={{ marginTop: 40, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,.12)", display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.7)", lineHeight: 1.6, maxWidth: "90ch" }}>{t.footer.disclaimer}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", fontFamily: "var(--font-mono)", letterSpacing: ".06em" }}>{t.footer.copyright}</div>
            <div style={{ display: "flex", gap: 16, fontSize: 11, color: "rgba(255,255,255,.55)", fontFamily: "var(--font-mono)", letterSpacing: ".08em" }}>
              <span>GTM-XXXXXX</span>
              <span>Jornaya</span>
              <span>TrustedForm</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { footer .container > div:first-child { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { footer .container > div:first-child { grid-template-columns: 1fr !important; gap: 28px !important; } }`}</style>
    </footer>
  );
}

/* ---------- Thank You ---------- */
function ThankYou({ t, result, onBack }) {
  return (
    <div style={{ minHeight: "100dvh", background: "var(--cream)", display: "flex", flexDirection: "column" }}>
      <header style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px" }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--navy-900)", display: "grid", placeItems: "center", color: "var(--green-500)", fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 20 }}>N</div>
            <span style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 19, color: "var(--navy-900)", letterSpacing: ".04em" }}>NIAG</span>
          </button>
          <a href="tel:+18005551234" className="btn btn-ghost btn-sm">
            <ProductIcon kind="phone" size={15} /> {t.nav.callExpert}
          </a>
        </div>
      </header>
      <main style={{ flex: 1, display: "grid", placeItems: "center", padding: "48px 24px" }}>
        <div className="container-narrow" style={{ maxWidth: 720 }}>
          <div style={{
            background: "#fff", border: "1px solid var(--border)", borderRadius: 24, padding: 40,
            boxShadow: "var(--shadow-lg)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 999, background: "var(--green-50)", color: "var(--green-600)", display: "grid", placeItems: "center" }}>
                <ProductIcon kind="check" size={26} />
              </div>
              <div className="eyebrow"><span className="dot"></span>{t.thankYou.eyebrow}</div>
            </div>
            <h1 className="serif" style={{ marginTop: 18, fontSize: "clamp(1.8rem, 3.4vw, 2.4rem)" }}>{t.thankYou.title}</h1>
            <p style={{ marginTop: 12, fontSize: 17, color: "var(--ink-soft)" }}>{t.thankYou.sub}</p>

            <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap", padding: 16, background: "var(--sand)", border: "1px solid var(--border)", borderRadius: 12 }}>
              <div style={{ flex: 1, minWidth: 140 }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-soft)" }}>{t.thankYou.reference}</div>
                <div className="mono" style={{ fontSize: 16, fontWeight: 500, color: "var(--navy-900)", marginTop: 4 }}>{result.refId}</div>
              </div>
              <div style={{ flex: 1, minWidth: 140 }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-soft)" }}>{t.locale === "es" ? "Producto" : "Product"}</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--navy-900)", marginTop: 4 }}>{t.products[result.productType].label}</div>
              </div>
              <div style={{ flex: 1, minWidth: 100 }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-soft)" }}>ZIP</div>
                <div className="mono" style={{ fontSize: 15, fontWeight: 500, color: "var(--navy-900)", marginTop: 4, letterSpacing: ".15em" }}>{result.zip || "—"}</div>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <div className="eyebrow"><span className="dot"></span>{t.locale === "es" ? "Próximos pasos" : "Next steps"}</div>
              <ol style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "grid", gap: 12 }}>
                {t.thankYou.steps.map((s, i) => (
                  <li key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "start", padding: "14px 16px", background: "var(--cream)", border: "1px solid var(--border-soft)", borderRadius: 10 }}>
                    <div className="mono" style={{ fontSize: 14, fontWeight: 600, color: "var(--green-600)", letterSpacing: ".05em" }}>0{i + 1}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15, color: "var(--navy-900)" }}>{s.t}</div>
                      <p style={{ marginTop: 4, fontSize: 14, color: "var(--ink-soft)" }}>{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div style={{ marginTop: 32, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <a href="tel:+18005551234" className="btn btn-navy">
                <ProductIcon kind="phone" size={16} /> {t.nav.callExpert}
              </a>
              <button onClick={onBack} className="btn-link" style={{ fontSize: 14 }}>← {t.thankYou.backHome}</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

Object.assign(window, { TrustStrip, ProductCards, HowItWorks, SplitHelp, MidCta, BlogTabs, Faq, BottomCta, Footer, ThankYou });
