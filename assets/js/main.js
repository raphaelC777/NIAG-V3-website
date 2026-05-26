/* =========================================================
   NIAG — Homepage interactions
   ========================================================= */
(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    const cfg = window.NIAG_CONFIG;
    const i = window.NIAG_I18N.t;
    const track = window.NIAG_TRACK.track;
    const Events = window.NIAG_TRACK.Events;

    // ---- Apply i18n to entire DOM ----
    window.NIAG_I18N.applyI18n(document);

    // ---- Variant-aware copy ----
    const heroEl = document.querySelector("[data-variant-headline]");
    if (heroEl) heroEl.textContent = cfg.copy.heroHeadline;
    document.querySelectorAll("[data-variant-cta]").forEach((el) => {
      el.textContent = cfg.copy.primaryCTA;
    });

    // ---- Variant indicator (dev tag) ----
    const tag = document.getElementById("variant-tag");
    if (tag) tag.textContent = `Variant ${cfg.abVariant} · ${cfg.language.toUpperCase()}`;

    // ---- Language toggle ----
    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      const lang = btn.dataset.lang;
      btn.classList.toggle("active", lang === cfg.language);
      btn.addEventListener("click", function () {
        if (lang === cfg.language) return;
        track(Events.LANGUAGE_TOGGLE, { from: cfg.language, to: lang });
        localStorage.setItem("niag_lang", lang);
        const url = new URL(window.location.href);
        url.searchParams.set("lang", lang);
        window.location.href = url.toString();
      });
    });

    // ---- Header CTA & mobile menu ----
    const menuToggle = document.getElementById("menu-toggle");
    const drawer = document.getElementById("mobile-drawer");
    if (menuToggle && drawer) {
      menuToggle.addEventListener("click", () => drawer.classList.add("open"));
      drawer.addEventListener("click", (e) => {
        if (e.target.classList.contains("mobile-drawer") || e.target.classList.contains("drawer-close")) {
          drawer.classList.remove("open");
        }
      });
    }

    // ---- Phone clicks tracking ----
    document.querySelectorAll('a[href^="tel:"]').forEach((a) => {
      a.addEventListener("click", () => {
        track(Events.PHONE_CLICK, { location: a.dataset.location || "unknown" });
      });
    });

    // ---- Quote recovery ----
    document.querySelectorAll("[data-recovery]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        track(Events.QUOTE_RECOVERY_CLICK, { location: el.dataset.recovery || "unknown" });
        alert(i("hero.recovery") + "\n\n(Recovery flow placeholder — would email a resume link.)");
      });
    });

    // ---- Hero product selector ----
    initProductSelector("#hero-selector", "hero");
    initProductSelector("#bottom-selector", "bottom_cta");

    // ---- Mid CTA ----
    const midForm = document.getElementById("mid-cta-form");
    if (midForm) {
      midForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const product = midForm.elements["product"].value || cfg.defaultProduct;
        const zip = midForm.elements["zip"].value.trim();
        track(Events.PRODUCT_SELECT, { productType: product, entryPoint: "mid_cta" });
        if (/^\d{5}$/.test(zip)) {
          track(Events.ZIP_ENTERED, { productType: product, zipCode: zip, entryPoint: "mid_cta" });
          // Pre-seed ZIP in form answers
          window.NIAG_FORMS.open(product, "mid_cta");
          // Stuff the zip into state after open
          setTimeout(() => {
            const zipInput = document.getElementById("input-zip");
            if (zipInput) {
              zipInput.value = zip;
            }
          }, 50);
        } else {
          window.NIAG_FORMS.open(product, "mid_cta");
        }
      });
    }

    // ---- Product cards CTAs ----
    document.querySelectorAll("[data-product-card]").forEach((el) => {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        const product = el.dataset.productCard;
        track(Events.PRODUCT_SELECT, { productType: product, entryPoint: "product_card" });
        window.NIAG_FORMS.open(product, "product_card");
      });
    });

    // ---- Header / nav CTAs ----
    document.querySelectorAll("[data-open-quote]").forEach((el) => {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        const product = el.dataset.product || cfg.defaultProduct;
        const ep = el.dataset.entry || "header";
        track(Events.PRODUCT_SELECT, { productType: product, entryPoint: ep });
        window.NIAG_FORMS.open(product, ep);
      });
    });

    // ---- Blog tabs ----
    initBlogTabs();

    // ---- FAQ accordion ----
    document.querySelectorAll(".faq-item .faq-q").forEach((q) => {
      q.addEventListener("click", () => {
        const item = q.parentElement;
        const wasOpen = item.classList.contains("open");
        item.parentElement.querySelectorAll(".faq-item.open").forEach((o) => o.classList.remove("open"));
        if (!wasOpen) item.classList.add("open");
      });
    });

    // ---- Sticky mobile CTA show after scroll ----
    let scrolled = false;
    function onScroll() {
      const shouldShow = window.scrollY > 380;
      if (shouldShow !== scrolled) {
        scrolled = shouldShow;
        document.body.classList.toggle("scrolled", scrolled);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ---- Set default selected product on the HERO selector based on variant ----
    // (Bottom CTA always defaults to Bundle per spec.)
    const heroSel = document.querySelector("#hero-selector");
    if (heroSel) {
      const targetPill = heroSel.querySelector(`.product-pill[data-product="${cfg.defaultProduct}"]`);
      if (targetPill) {
        heroSel.querySelectorAll(".product-pill").forEach((p) => p.classList.remove("active"));
        targetPill.classList.add("active");
      }
    }
  });

  // ---- Helpers ----
  function initProductSelector(scopeSel, entryPoint) {
    const scope = document.querySelector(scopeSel);
    if (!scope) return;
    const pills = scope.querySelectorAll(".product-pill");
    const zipInput = scope.querySelector('input[name="zip"]');
    const startBtn = scope.querySelector("[data-start-button]");

    pills.forEach((pill) => {
      pill.addEventListener("click", function () {
        pills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        const product = pill.dataset.product;
        window.NIAG_TRACK.track(window.NIAG_TRACK.Events.PRODUCT_SELECT, {
          productType: product,
          entryPoint: entryPoint,
        });
      });
    });

    if (startBtn) {
      startBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const active = scope.querySelector(".product-pill.active");
        const product = (active && active.dataset.product) || window.NIAG_CONFIG.defaultProduct;
        const zip = zipInput ? zipInput.value.trim() : "";
        if (zip) {
          window.NIAG_TRACK.track(window.NIAG_TRACK.Events.ZIP_ENTERED, {
            productType: product,
            zipCode: zip,
            entryPoint: entryPoint,
          });
        }
        window.NIAG_FORMS.open(product, entryPoint);
        // Pre-fill ZIP if provided
        if (zip && /^\d{5}$/.test(zip)) {
          setTimeout(() => {
            const zipField = document.getElementById("input-zip");
            if (zipField) {
              zipField.value = zip;
            }
          }, 50);
        }
      });
    }
  }

  function initBlogTabs() {
    const articles = {
      auto: [
        { tag: { en: "Auto", es: "Auto" }, title: { en: "How to compare car insurance quotes without the spam", es: "Cómo comparar seguros de auto sin spam" }, excerpt: { en: "A clear path to compare auto quotes that won't flood your inbox.", es: "Una ruta clara para comparar opciones sin llenar tu correo." } },
        { tag: { en: "Auto", es: "Auto" }, title: { en: "What affects your car insurance rate?", es: "¿Qué afecta tu tarifa de seguro de auto?" }, excerpt: { en: "ZIP code, driving record, vehicle, coverage — and what carriers actually weight.", es: "Código postal, historial, vehículo y cobertura — qué pesa más." } },
        { tag: { en: "Auto", es: "Auto" }, title: { en: "Do you need full coverage or liability only?", es: "¿Necesitas cobertura completa o solo responsabilidad?" }, excerpt: { en: "When liability is enough — and when it isn't.", es: "Cuándo la responsabilidad alcanza y cuándo no." } },
      ],
      bundle: [
        { tag: { en: "Bundle", es: "Combinado" }, title: { en: "How auto + home bundles can save money", es: "Cómo combinar auto + hogar puede ahorrar dinero" }, excerpt: { en: "Why bundles often beat two separate policies.", es: "Por qué un combinado supera dos pólizas separadas." } },
        { tag: { en: "Bundle", es: "Combinado" }, title: { en: "When bundling insurance makes sense", es: "Cuándo combinar tiene sentido" }, excerpt: { en: "It isn't always the right move — here's when to look.", es: "No siempre es la mejor opción — cuándo conviene." } },
        { tag: { en: "Bundle", es: "Combinado" }, title: { en: "Questions to ask before switching carriers", es: "Preguntas antes de cambiar de aseguradora" }, excerpt: { en: "Six things to ask before signing.", es: "Seis cosas que debes preguntar antes de firmar." } },
      ],
      home: [
        { tag: { en: "Home", es: "Hogar" }, title: { en: "What homeowners insurance usually covers", es: "Qué cubre normalmente el seguro de hogar" }, excerpt: { en: "Dwelling, contents, liability — and what's commonly excluded.", es: "Estructura, contenido, responsabilidad — y qué se suele excluir." } },
        { tag: { en: "Home", es: "Hogar" }, title: { en: "How to compare home insurance by ZIP code", es: "Cómo comparar seguro de hogar por ZIP" }, excerpt: { en: "Why your ZIP changes premium and coverage.", es: "Por qué tu ZIP cambia la prima y la cobertura." } },
        { tag: { en: "Home", es: "Hogar" }, title: { en: "Common home insurance discounts", es: "Descuentos comunes del seguro de hogar" }, excerpt: { en: "Bundling, security, claims-free — what to ask for.", es: "Combinar, seguridad, sin reclamos — qué pedir." } },
      ],
      renters: [
        { tag: { en: "Renters", es: "Inquilinos" }, title: { en: "What renters insurance covers", es: "Qué cubre el seguro para inquilinos" }, excerpt: { en: "Personal property, liability, additional living costs.", es: "Bienes personales, responsabilidad, costos adicionales." } },
        { tag: { en: "Renters", es: "Inquilinos" }, title: { en: "Is renters insurance worth it?", es: "¿Vale la pena el seguro para inquilinos?" }, excerpt: { en: "Why a small monthly premium beats replacing everything yourself.", es: "Por qué pagar poco mensual le gana a reponer todo solo." } },
        { tag: { en: "Renters", es: "Inquilinos" }, title: { en: "How much renters coverage do you need?", es: "¿Cuánta cobertura para inquilinos necesitas?" }, excerpt: { en: "Inventory, replacement value, liability limits.", es: "Inventario, valor de reposición, límites de responsabilidad." } },
      ],
      health: [
        { tag: { en: "Health", es: "Salud" }, title: { en: "How to compare health coverage options", es: "Cómo comparar opciones de seguro de salud" }, excerpt: { en: "Premium vs. deductible vs. network — the trade-offs that matter.", es: "Prima, deducible y red — los trade-offs que importan." } },
        { tag: { en: "Health", es: "Salud" }, title: { en: "What to know before choosing a health plan", es: "Qué saber antes de elegir un plan de salud" }, excerpt: { en: "Doctor networks, medications, and the real cost of care.", es: "Red de médicos, medicamentos y el costo real del cuidado." } },
        { tag: { en: "Health", es: "Salud" }, title: { en: "Questions to ask a licensed health partner", es: "Preguntas para un socio de salud licenciado" }, excerpt: { en: "Five questions that uncover the right plan for you.", es: "Cinco preguntas para encontrar tu plan correcto." } },
      ],
      es_resources: [
        { tag: { en: "Spanish", es: "Recursos" }, title: { en: "Cómo comparar seguros sin enredos", es: "Cómo comparar seguros sin enredos" }, excerpt: { en: "Una guía corta para comparar cobertura en EE. UU.", es: "Una guía corta para comparar cobertura en EE. UU." } },
        { tag: { en: "Spanish", es: "Recursos" }, title: { en: "Seguro de auto: qué revisar antes de elegir", es: "Seguro de auto: qué revisar antes de elegir" }, excerpt: { en: "Los seis puntos que debes confirmar antes de firmar.", es: "Los seis puntos que debes confirmar antes de firmar." } },
        { tag: { en: "Spanish", es: "Recursos" }, title: { en: "Auto + hogar: cómo combinar y ahorrar", es: "Auto + hogar: cómo combinar y ahorrar" }, excerpt: { en: "Cuándo combinar pólizas en EE. UU. realmente conviene.", es: "Cuándo combinar pólizas en EE. UU. realmente conviene." } },
      ],
    };

    const tabBar = document.getElementById("blog-tabs");
    const grid = document.getElementById("blog-grid");
    if (!tabBar || !grid) return;
    const lang = window.NIAG_CONFIG.language;
    const tabs = [
      { id: "auto", labelKey: "products.auto.title" },
      { id: "bundle", labelKey: "products.bundle.title" },
      { id: "home", labelKey: "products.home.title" },
      { id: "renters", labelKey: "products.renters.title" },
      { id: "health", labelKey: "products.health.title" },
      { id: "es_resources", labelKey: "nav.resources" },
    ];

    function render(tabId) {
      // tabs
      tabBar.innerHTML = "";
      tabs.forEach((t) => {
        const btn = document.createElement("button");
        btn.className = "tab" + (t.id === tabId ? " active" : "");
        btn.textContent = t.id === "es_resources"
          ? (lang === "es" ? "Recursos en Español" : "Spanish Resources")
          : window.NIAG_I18N.t(t.labelKey);
        btn.addEventListener("click", () => {
          window.NIAG_TRACK.track(window.NIAG_TRACK.Events.BLOG_TAB_CLICK, { tab: t.id });
          render(t.id);
        });
        tabBar.appendChild(btn);
      });
      // articles
      grid.innerHTML = "";
      const items = articles[tabId] || [];
      const i = window.NIAG_I18N.t;
      items.forEach((a) => {
        const card = document.createElement("article");
        card.className = "article";
        const productForCard = tabId === "es_resources" ? "bundle" : tabId;
        card.innerHTML = `
          <span class="article-tag">${a.tag[lang]}</span>
          <h3>${a.title[lang]}</h3>
          <p>${a.excerpt[lang]}</p>
          <div class="article-actions">
            <a href="#" class="read-link">${i("blog.readMore")} →</a>
            <a href="#" class="compare-link" data-blog-product="${productForCard}">${i("blog.compare")}</a>
          </div>
        `;
        grid.appendChild(card);
      });
      grid.querySelectorAll(".compare-link").forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          const product = link.dataset.blogProduct;
          window.NIAG_TRACK.track(window.NIAG_TRACK.Events.PRODUCT_SELECT, {
            productType: product,
            entryPoint: "blog_card",
          });
          window.NIAG_FORMS.open(product, "blog_card");
        });
      });
    }

    render("auto");
  }
})();
