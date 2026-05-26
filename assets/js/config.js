/* =========================================================
   NIAG — Site Config
   A/B/C variant config + integration placeholders
   ========================================================= */
(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);

  // ---- A/B/C Variant ----
  // Priority: URL ?ab=A|B|C  >  localStorage  >  random assignment
  let variant = (params.get("ab") || "").toUpperCase();
  if (!["A", "B", "C"].includes(variant)) {
    variant = localStorage.getItem("niag_ab");
    if (!["A", "B", "C"].includes(variant)) {
      const roll = Math.random();
      variant = roll < 0.34 ? "A" : roll < 0.67 ? "B" : "C";
    }
  }
  localStorage.setItem("niag_ab", variant);

  // ---- Language ----
  // Priority: URL ?lang=es  >  /es/ path prefix  >  localStorage  >  navigator
  let language = params.get("lang");
  if (!["en", "es"].includes(language)) {
    if (window.location.pathname.startsWith("/es/") || window.location.pathname.includes("/es.")) {
      language = "es";
    } else {
      language = localStorage.getItem("niag_lang");
      if (!["en", "es"].includes(language)) {
        language = (navigator.language || "en").toLowerCase().startsWith("es") ? "es" : "en";
      }
    }
  }
  localStorage.setItem("niag_lang", language);

  // ---- Capture marketing params ----
  const utm = {
    utm_source: params.get("utm_source") || null,
    utm_medium: params.get("utm_medium") || null,
    utm_campaign: params.get("utm_campaign") || null,
    utm_content: params.get("utm_content") || null,
    utm_term: params.get("utm_term") || null,
    gclid: params.get("gclid") || null,
    fbclid: params.get("fbclid") || null,
    affiliate_id: params.get("aff") || params.get("affiliate_id") || null,
  };
  // Persist so they survive across pages
  Object.keys(utm).forEach((k) => {
    if (utm[k]) {
      sessionStorage.setItem("niag_" + k, utm[k]);
    } else {
      utm[k] = sessionStorage.getItem("niag_" + k);
    }
  });

  // ---- Variant content overrides ----
  const variants = {
    A: {
      defaultProduct: "bundle",
      en: {
        heroHeadline: "Bundle & save on auto + home insurance.",
        primaryCTA: "Get my free quote",
        hypothesis: "Bundle-first positioning increases lead value and attracts homeowners/drivers.",
      },
      es: {
        heroHeadline: "Combina y ahorra en seguro de auto + hogar.",
        primaryCTA: "Obtener mi cotización",
        hypothesis: "Posicionamiento bundle-first aumenta el valor del lead.",
      },
    },
    B: {
      defaultProduct: "auto",
      en: {
        heroHeadline: "Compare insurance quotes without the spam.",
        primaryCTA: "Start my quote",
        hypothesis: "Anti-spam trust copy reduces anxiety and increases form starts.",
      },
      es: {
        heroHeadline: "Compara seguros sin enredos.",
        primaryCTA: "Comenzar mi cotización",
        hypothesis: "Lenguaje anti-spam reduce ansiedad e incrementa form starts.",
      },
    },
    C: {
      defaultProduct: "bundle",
      en: {
        heroHeadline: "Compare coverage with local experts you can trust.",
        primaryCTA: "Talk to a quote expert",
        hypothesis: "Human support framing increases conversion for cautious users.",
      },
      es: {
        heroHeadline: "Compara cobertura con expertos locales.",
        primaryCTA: "Hablar con un experto",
        hypothesis: "Apoyo humano aumenta conversión para usuarios cautelosos.",
      },
    },
  };

  // ---- Integration endpoints (placeholders) ----
  const integrations = {
    leadProsperEndpoint: "/api/leads/leadprosper",       // PLACEHOLDER
    gohighlevelWebhook: "/api/webhooks/gohighlevel",     // PLACEHOLDER
    gtmContainerId: "GTM-XXXXXXX",                        // PLACEHOLDER
    jornayaAccountId: "00000000-0000-0000-0000-000000000000", // PLACEHOLDER
    trustedFormScript: "https://api.trustedform.com/trustedform.js", // PLACEHOLDER (not loaded)
  };

  window.NIAG_CONFIG = {
    abVariant: variant,
    language,
    utm,
    variants,
    integrations,
    defaultProduct: variants[variant].defaultProduct,
    copy: variants[variant][language],
  };

  // Reflect into <html lang>
  document.documentElement.lang = language;
})();
