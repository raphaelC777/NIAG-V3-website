/* config.jsx - product config, i18n strings, A/B/C variants, tracking shim */

// ---------- tracking ----------
window.dataLayer = window.dataLayer || [];
function track(event, payload = {}) {
  const ctx = window.__niagCtx || {};
  const evt = {
    event,
    productType: payload.productType ?? null,
    language: ctx.language ?? "en",
    abVariant: ctx.abVariant ?? "A",
    entryPoint: payload.entryPoint ?? null,
    zipCode: payload.zipCode ?? null,
    stepName: payload.stepName ?? null,
    timestamp: new Date().toISOString(),
    // UTM + click ID placeholders
    utm_source: ctx.utm_source ?? null,
    utm_medium: ctx.utm_medium ?? null,
    utm_campaign: ctx.utm_campaign ?? null,
    utm_content: ctx.utm_content ?? null,
    utm_term: ctx.utm_term ?? null,
    gclid: ctx.gclid ?? null,
    fbclid: ctx.fbclid ?? null,
    affiliate_id: ctx.affiliate_id ?? null,
    ...payload,
  };
  window.dataLayer.push(evt);
  // surface to console for prototype visibility
  console.log("[track]", event, evt);
}
window.niagTrack = track;

// ---------- product config ----------
const PRODUCTS = ["bundle", "auto", "home", "renters", "health"];

// inline SVG icon set (original, simple shapes only)
const ProductIcon = ({ kind, size = 24 }) => {
  const s = size;
  const stroke = "currentColor";
  const sw = 1.6;
  switch (kind) {
    case "bundle":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2.5" y="9" width="9" height="9" rx="1.5"></rect>
          <rect x="12.5" y="6" width="9" height="12" rx="1.5"></rect>
        </svg>
      );
    case "auto":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 14h18"></path>
          <path d="M5 14l2-6h10l2 6"></path>
          <rect x="3" y="14" width="18" height="4" rx="1"></rect>
          <circle cx="7" cy="19" r="1.2"></circle>
          <circle cx="17" cy="19" r="1.2"></circle>
        </svg>
      );
    case "home":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11l9-7 9 7"></path>
          <path d="M5 10v9h14v-9"></path>
          <path d="M10 19v-5h4v5"></path>
        </svg>
      );
    case "renters":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="1.5"></rect>
          <path d="M4 12h16"></path>
          <path d="M12 4v16"></path>
        </svg>
      );
    case "health":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s-7-4.5-7-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 16.5 12 21 12 21z"></path>
          <path d="M9.5 11h5M12 8.5v5"></path>
        </svg>
      );
    case "shield":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l8 3v6c0 4.5-3.5 8-8 9-4.5-1-8-4.5-8-9V6l8-3z"></path>
          <path d="M9 12l2.2 2.2L15 10.5"></path>
        </svg>
      );
    case "lock":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="10" width="16" height="10" rx="1.5"></rect>
          <path d="M8 10V7a4 4 0 0 1 8 0v3"></path>
        </svg>
      );
    case "check":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12.5l5 5L20 7"></path>
        </svg>
      );
    case "phone":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"></path>
        </svg>
      );
    case "arrow-right":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14"></path><path d="M13 6l6 6-6 6"></path>
        </svg>
      );
    case "menu":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7h16M4 12h16M4 17h16"></path>
        </svg>
      );
    case "x":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 6l12 12M18 6l-12 12"></path>
        </svg>
      );
    case "plus":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14"></path>
        </svg>
      );
    default:
      return null;
  }
};

// ---------- copy ----------
// keyed by language. Most strings live here so EN/ES switch is one toggle.
const COPY = {
  en: {
    locale: "en",
    nav: { auto: "Auto", bundle: "Bundle", home: "Home", renters: "Renters", health: "Health", resources: "Resources", language: "Español", callExpert: "Call an expert", getQuote: "Get my quote", menu: "Menu" },
    hero: {
      eyebrow: "Trusted by US households",
      // headlines per variant
      headlineA: ["Bundle & save on auto", "+ home insurance."],
      headlineB: ["Compare insurance quotes", "without the spam."],
      headlineC: ["Compare coverage with", "local experts you can trust."],
      subhead: "Compare quotes from trusted insurance partners in 60 seconds. Free. No SSN. No spam.",
      trust: ["Free", "60 seconds", "No credit check", "No SSN"],
      ctaA: "Get my free quote",
      ctaB: "Start my quote",
      ctaC: "Talk to a quote expert",
      pickCoverage: "Pick your coverage",
      zip: "ZIP code",
      zipPh: "00000",
      startCompare: "Start comparing",
      recovery: "Already started? Get your quotes back.",
    },
    products: {
      bundle: { label: "Bundle", sub: "Auto + Home", badge: "Recommended", desc: "Combine auto + home and compare smarter.", cta: "Start bundle quote" },
      auto:   { label: "Auto", sub: "Cars & trucks", desc: "Compare options for your car in minutes.", cta: "Start auto quote" },
      home:   { label: "Home", sub: "Owned property", desc: "Protect your home with trusted coverage options.", cta: "Start home quote" },
      renters:{ label: "Renters", sub: "Apt / condo", desc: "Simple protection for your apartment or rental.", cta: "Start renters quote" },
      health: { label: "Health", sub: "Individual / family", desc: "Explore health coverage options with help from licensed partners.", cta: "Start health quote" },
    },
    trustStrip: {
      title: "Compare options from trusted insurance partners",
      partners: "Trusted insurance partners",
      badges: ["Secure process", "No SSN required", "No obligation", "Licensed partner support"],
    },
    productSection: { eyebrow: "Pick your lane", title: "What kind of insurance can we help you with?", killer: "We line up 30+ vetted insurance partners so you don't have to. Real quotes back inside a minute — no SSN, no phone-tree maze, no surprise auto-dialers.", microCta: "Pick a coverage type below" },
    howItWorks: {
      eyebrow: "How it works",
      title: "Three steps. No paperwork.",
      steps: [
        { n: "01", t: "Choose your coverage", d: "Auto, home, renters, bundle, or health." },
        { n: "02", t: "Answer a few quick questions", d: "About 60 seconds. One question at a time." },
        { n: "03", t: "Get matched with insurance options", d: "From licensed insurance partners in your area." },
      ],
      micro: "No paperwork. No SSN. No obligation.",
    },
    splitHelp: {
      eyebrow: "Two ways to compare",
      onlineT: "Compare online",
      onlineD: "Move fast with a simple quote tool built for auto, home, renters, bundle, and health coverage.",
      onlineCta: "Compare online",
      expertT: "Talk to an expert",
      expertD: "Prefer help? Connect with a licensed insurance partner who can walk you through your options.",
      expertCta: "Call an expert",
      hours: "Mon–Fri · 9am–5pm ET",
    },
    midCta: {
      eyebrow: "Match by ZIP",
      title: "Rates and coverage options, matched to your ZIP.",
      sub: "Choose a product, drop your ZIP — we open the right flow.",
      product: "Product",
      zip: "ZIP code",
      cta: "Get started",
    },
    seo: {
      eyebrow: "Resources",
      title: "Insurance guidance without the jargon.",
      sub: "Plain-English answers, written for shoppers — not adjusters.",
      tabs: { auto: "Auto", bundle: "Bundle", home: "Home", renters: "Renters", health: "Health", es: "Spanish Resources" },
      readGuide: "Read guide",
      inlineCta: "Compare quotes",
      articles: {
        auto: [
          { tag: "Shopping", title: "How to compare car insurance quotes without the spam", excerpt: "Five questions to ask before you give any quote tool your phone number." },
          { tag: "Rates", title: "What affects your car insurance rate?", excerpt: "The factors carriers actually weigh — ZIP, driving record, vehicle, and more." },
          { tag: "Coverage", title: "Do you need full coverage or liability only?", excerpt: "A short framework for matching coverage to your car's value and your risk tolerance." },
        ],
        bundle: [
          { tag: "Savings", title: "How auto + home bundles can save money", excerpt: "When carriers reward bundling — and when shopping separately wins." },
          { tag: "Strategy", title: "When bundling insurance makes sense", excerpt: "A homeowner's quick guide to evaluating combined policies." },
          { tag: "Switching", title: "Questions to ask before switching carriers", excerpt: "Cancellation timing, mid-term changes, and how to avoid coverage gaps." },
        ],
        home: [
          { tag: "Basics", title: "What homeowners insurance usually covers", excerpt: "Dwelling, personal property, liability, and what's typically excluded." },
          { tag: "Compare", title: "How to compare home insurance by ZIP code", excerpt: "Why your ZIP can move your premium more than your credit." },
          { tag: "Savings", title: "Common home insurance discounts", excerpt: "Bundling, claims-free, security systems, and more often-missed savings." },
        ],
        renters: [
          { tag: "Basics", title: "What renters insurance covers", excerpt: "Belongings, liability, additional living expenses — explained simply." },
          { tag: "Decide", title: "Is renters insurance worth it?", excerpt: "A simple cost-benefit for tenants under 30." },
          { tag: "Coverage", title: "How much renters coverage do you need?", excerpt: "A quick way to estimate replacement value without an inventory app." },
        ],
        health: [
          { tag: "Compare", title: "How to compare health coverage options", excerpt: "Premium, deductible, network — the three numbers that matter most." },
          { tag: "Plan types", title: "What to know before choosing a health plan", excerpt: "HMO vs PPO vs HDHP, in plain English." },
          { tag: "Expert help", title: "Questions to ask a licensed health insurance partner", excerpt: "A printable checklist for your first call." },
        ],
        es: [
          { tag: "Comparar", title: "Cómo comparar seguros sin enredos", excerpt: "Una guía corta para evaluar coberturas sin perder tiempo." },
          { tag: "Auto", title: "Seguro de auto: qué revisar antes de elegir", excerpt: "Cinco puntos esenciales antes de firmar una póliza nueva." },
          { tag: "Combinar", title: "Auto + hogar: cómo combinar y ahorrar", excerpt: "Cuándo combinar te ahorra y cuándo no vale la pena." },
        ],
      },
    },
    faq: {
      eyebrow: "Frequently asked",
      title: "Straight answers.",
      items: [
        { q: "Is NIAG an insurance company?", a: "No. NIAG is a comparison service. We connect you with licensed insurance partners who can quote and bind coverage. We do not underwrite policies ourselves." },
        { q: "How does NIAG match me with insurance options?", a: "We use your ZIP, the product you select, and a short set of questions to match you with insurance partners that operate in your area for that line of coverage." },
        { q: "Will I get spammed?", a: "Only the partners matched to your request and the contacts you consent to will reach out. You can opt out at any time, and your information is governed by our Privacy Policy." },
        { q: "Do I need to provide my SSN?", a: "No. NIAG never asks for your Social Security number to start a comparison." },
        { q: "Is this free?", a: "Yes. There is no fee to use NIAG. Insurance partners may pay us when you connect with them — that does not change your rate." },
        { q: "Can I compare auto and home together?", a: "Yes. The Bundle flow asks for both auto and home details so partners can return combined options." },
        { q: "Do you support Spanish speakers?", a: "Yes. Use the Español toggle in the header, or call our bilingual support team. Forms and confirmations are available in Spanish." },
        { q: "Who may contact me after I submit the form?", a: "Licensed insurance partners matched to your request, and NIAG support if you ask for help. Exact partners can vary by ZIP and product." },
      ],
    },
    bottomCta: { eyebrow: "Start now", title: "Ready to compare without the runaround?", sub: "Start with your ZIP. We'll guide you from there." },
    footer: {
      tagline: "A trusted anchor for insurance shoppers — independent, transparent, and built for clarity.",
      productsH: "Coverage", resourcesH: "Resources", companyH: "Company", legalH: "Legal",
      resources: ["Guides", "ZIP-based rates", "Carrier directory", "Glossary"],
      company: ["About NIAG", "Contact", "Press"],
      legal: ["Privacy Policy", "Terms of Use", "Do Not Sell or Share My Personal Information", "Privacy Preferences", "TCPA Disclosures", "Advertising Disclosure"],
      disclaimer: "NIAG is not a government agency or insurance carrier. We help connect consumers with insurance partners and licensed professionals. Availability, pricing, and coverage options vary by location, carrier, and individual eligibility. Submitting a form does not guarantee coverage or savings.",
      copyright: "© 2026 National Insurance Assistance Group. All rights reserved.",
    },
    form: {
      progress: (a, b) => `Step ${a} of ${b}`,
      back: "Back",
      next: "Continue",
      submit: "Submit & get matched",
      why: "Why do we ask?",
      requiredZip: "Please enter a valid 5-digit ZIP.",
      requiredField: "Please make a selection to continue.",
      requiredName: "Please share your first and last name.",
      requiredEmail: "Please enter a valid email.",
      requiredPhone: "Please enter a valid 10-digit phone.",
      requiredConsent: "Please agree to the contact terms to continue.",
      tcpa: "By clicking submit, I agree to be contacted by NIAG and/or its insurance partners at the phone number and email provided, including by automated technology, prerecorded message, SMS, and email, even if my number is on a do-not-call list. Consent is not a condition of purchase. Message and data rates may apply.",
      headerHelp: "Need help?",
    },
    thankYou: {
      eyebrow: "Submission received",
      title: "Thanks. We're matching your request now.",
      sub: "A licensed insurance partner will reach out shortly with options for your ZIP.",
      steps: [
        { t: "Watch for a call or text", d: "Calls usually come within one business day from a local insurance partner." },
        { t: "Keep your current policy handy", d: "Comparing apples-to-apples is easier with your existing declarations page." },
        { t: "Compare before switching", d: "Ask about effective dates so you don't end up with a coverage gap." },
      ],
      reference: "Reference",
      backHome: "Back to homepage",
    },
  },
  es: {
    locale: "es",
    nav: { auto: "Auto", bundle: "Auto + Hogar", home: "Hogar", renters: "Inquilinos", health: "Salud", resources: "Recursos", language: "English", callExpert: "Llamar a un experto", getQuote: "Mi cotización", menu: "Menú" },
    hero: {
      eyebrow: "Confiable para hogares en EE. UU.",
      headlineA: ["Combina y ahorra en seguro", "de auto + hogar."],
      headlineB: ["Compara seguros", "sin enredos."],
      headlineC: ["Compara cobertura con", "expertos locales de confianza."],
      subhead: "Compara opciones con expertos locales en 60 segundos. Gratis. Sin SSN. Sin enredos.",
      trust: ["Gratis", "60 segundos", "Sin verificación de crédito", "Sin SSN"],
      ctaA: "Obtener mi cotización",
      ctaB: "Empezar mi cotización",
      ctaC: "Hablar con un experto",
      pickCoverage: "Elige tu cobertura",
      zip: "Código postal",
      zipPh: "00000",
      startCompare: "Empezar a comparar",
      recovery: "¿Ya empezaste? Recupera tu cotización.",
    },
    products: {
      bundle: { label: "Auto + Hogar", sub: "Combinado", badge: "Recomendado", desc: "Combina auto + hogar y compara mejor.", cta: "Empezar cotización combinada" },
      auto:   { label: "Seguro de Auto", sub: "Carros y camionetas", desc: "Compara opciones para tu carro en minutos.", cta: "Empezar cotización de auto" },
      home:   { label: "Seguro de Hogar", sub: "Propiedad propia", desc: "Protege tu hogar con coberturas confiables.", cta: "Empezar cotización de hogar" },
      renters:{ label: "Seguro para Inquilinos", sub: "Apto / condo", desc: "Protección simple para tu apartamento.", cta: "Empezar cotización de inquilinos" },
      health: { label: "Seguro de Salud", sub: "Individual / familiar", desc: "Explora cobertura de salud con apoyo de socios licenciados.", cta: "Empezar cotización de salud" },
    },
    trustStrip: {
      title: "Compara opciones con socios de seguros de confianza",
      partners: "Socios de seguros de confianza",
      badges: ["Proceso seguro", "Sin SSN", "Sin compromiso", "Apoyo de socios licenciados"],
    },
    productSection: { eyebrow: "Elige tu cobertura", title: "¿En qué tipo de seguro te podemos ayudar?", killer: "Conectamos con 30+ socios verificados para que tú no tengas que hacerlo. Cotizaciones reales en menos de un minuto — sin SSN, sin laberintos de centralita, sin auto-marcadores sorpresa.", microCta: "Elige una cobertura abajo" },
    howItWorks: {
      eyebrow: "Cómo funciona",
      title: "Tres pasos. Sin papeleo.",
      steps: [
        { n: "01", t: "Elige tu cobertura", d: "Auto, hogar, inquilinos, combinado o salud." },
        { n: "02", t: "Responde unas preguntas rápidas", d: "Unos 60 segundos. Una pregunta a la vez." },
        { n: "03", t: "Recibe opciones de seguros", d: "De socios licenciados en tu zona." },
      ],
      micro: "Sin papeleo. Sin SSN. Sin compromiso.",
    },
    splitHelp: {
      eyebrow: "Dos formas de comparar",
      onlineT: "Comparar en línea",
      onlineD: "Avanza rápido con una herramienta simple para auto, hogar, inquilinos, combinado y salud.",
      onlineCta: "Comparar en línea",
      expertT: "Hablar con un experto",
      expertD: "¿Prefieres ayuda? Conéctate con un socio licenciado que te guía por tus opciones.",
      expertCta: "Llamar a un experto",
      hours: "Lun–Vie · 9am–5pm ET",
    },
    midCta: {
      eyebrow: "Por código postal",
      title: "Tarifas y coberturas según tu código postal.",
      sub: "Elige un producto, escribe tu código postal — abrimos el flujo correcto.",
      product: "Producto",
      zip: "Código postal",
      cta: "Empezar",
    },
    seo: {
      eyebrow: "Recursos",
      title: "Guía de seguros sin enredos.",
      sub: "Respuestas claras, escritas para compradores — no para ajustadores.",
      tabs: { auto: "Auto", bundle: "Combinado", home: "Hogar", renters: "Inquilinos", health: "Salud", es: "Recursos en Español" },
      readGuide: "Leer guía",
      inlineCta: "Comparar cotizaciones",
      articles: {
        auto: [
          { tag: "Compras", title: "Cómo comparar seguro de auto sin spam", excerpt: "Cinco preguntas antes de dar tu teléfono a cualquier comparador." },
          { tag: "Tarifas", title: "¿Qué afecta tu tarifa de auto?", excerpt: "Los factores reales que pesan las aseguradoras." },
          { tag: "Cobertura", title: "¿Cobertura completa o solo responsabilidad?", excerpt: "Un marco corto para decidir según el valor del auto." },
        ],
        bundle: [
          { tag: "Ahorro", title: "Cómo combinar auto + hogar te puede ahorrar", excerpt: "Cuándo combinar te ahorra y cuándo no." },
          { tag: "Estrategia", title: "Cuándo conviene combinar pólizas", excerpt: "Guía rápida para propietarios." },
          { tag: "Cambio", title: "Preguntas antes de cambiar de aseguradora", excerpt: "Cómo evitar lagunas en cobertura." },
        ],
        home: [
          { tag: "Básicos", title: "Qué cubre el seguro de hogar", excerpt: "Vivienda, propiedad personal, responsabilidad." },
          { tag: "Comparar", title: "Cómo comparar seguro de hogar por código postal", excerpt: "Por qué el ZIP mueve la prima." },
          { tag: "Descuentos", title: "Descuentos comunes en seguro de hogar", excerpt: "Combinar, sin reclamos, sistemas de seguridad." },
        ],
        renters: [
          { tag: "Básicos", title: "Qué cubre el seguro para inquilinos", excerpt: "Pertenencias, responsabilidad, gastos adicionales." },
          { tag: "Decidir", title: "¿Vale la pena el seguro de inquilinos?", excerpt: "Un costo-beneficio simple para inquilinos." },
          { tag: "Cobertura", title: "Cuánta cobertura de inquilinos necesitas", excerpt: "Cómo estimar el valor de reemplazo." },
        ],
        health: [
          { tag: "Comparar", title: "Cómo comparar planes de salud", excerpt: "Prima, deducible, red — los tres números clave." },
          { tag: "Planes", title: "Qué saber antes de elegir un plan de salud", excerpt: "HMO vs PPO vs HDHP en pocas palabras." },
          { tag: "Apoyo", title: "Preguntas a un socio licenciado de salud", excerpt: "Lista corta para tu primera llamada." },
        ],
        es: [
          { tag: "Comparar", title: "Cómo comparar seguros sin enredos", excerpt: "Guía corta para evaluar coberturas sin perder tiempo." },
          { tag: "Auto", title: "Seguro de auto: qué revisar antes de elegir", excerpt: "Cinco puntos esenciales antes de firmar." },
          { tag: "Combinar", title: "Auto + hogar: cómo combinar y ahorrar", excerpt: "Cuándo combinar te ahorra y cuándo no." },
        ],
      },
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Respuestas directas.",
      items: [
        { q: "¿NIAG es una aseguradora?", a: "No. NIAG es un servicio de comparación. Te conectamos con socios licenciados que cotizan y emiten pólizas. No emitimos pólizas propias." },
        { q: "¿Cómo me empareja NIAG con opciones?", a: "Usamos tu código postal, el producto que eliges y unas preguntas cortas para emparejarte con socios que operan en tu zona." },
        { q: "¿Me van a llenar de spam?", a: "Solo los socios emparejados y los contactos que tú autorizas te van a contactar. Puedes optar por no recibir en cualquier momento." },
        { q: "¿Necesito dar mi SSN?", a: "No. NIAG nunca pide tu número de Seguro Social para empezar una comparación." },
        { q: "¿Es gratis?", a: "Sí. No hay costo para usar NIAG. Los socios nos pagan cuando te conectas — eso no cambia tu tarifa." },
        { q: "¿Puedo comparar auto y hogar juntos?", a: "Sí. El flujo combinado pide datos de auto y hogar para devolver opciones combinadas." },
        { q: "¿Atienden en español?", a: "Sí. Usa el botón Español arriba o llama a nuestro equipo bilingüe." },
        { q: "¿Quién me puede contactar después de enviar?", a: "Socios licenciados emparejados a tu solicitud, y el equipo NIAG si pides ayuda." },
      ],
    },
    bottomCta: { eyebrow: "Empieza ahora", title: "¿Listo para comparar sin enredos?", sub: "Empieza con tu código postal. Te guiamos desde ahí." },
    footer: {
      tagline: "Un ancla de confianza para compradores de seguros — independiente, transparente, claro.",
      productsH: "Coberturas", resourcesH: "Recursos", companyH: "Empresa", legalH: "Legal",
      resources: ["Guías", "Tarifas por ZIP", "Directorio de aseguradoras", "Glosario"],
      company: ["Sobre NIAG", "Contacto", "Prensa"],
      legal: ["Política de Privacidad", "Términos de Uso", "No vender mi información personal", "Preferencias de privacidad", "Avisos TCPA", "Aviso de publicidad"],
      disclaimer: "NIAG no es una agencia gubernamental ni una aseguradora. Conectamos consumidores con socios y profesionales licenciados. Disponibilidad, precio y cobertura varían por ubicación, aseguradora y elegibilidad. Enviar el formulario no garantiza cobertura ni ahorros.",
      copyright: "© 2026 National Insurance Assistance Group. Todos los derechos reservados.",
    },
    form: {
      progress: (a, b) => `Paso ${a} de ${b}`,
      back: "Atrás",
      next: "Continuar",
      submit: "Enviar y comparar",
      why: "¿Por qué lo preguntamos?",
      requiredZip: "Ingresa un código postal de 5 dígitos.",
      requiredField: "Elige una opción para continuar.",
      requiredName: "Por favor comparte tu nombre y apellido.",
      requiredEmail: "Ingresa un email válido.",
      requiredPhone: "Ingresa un teléfono de 10 dígitos.",
      requiredConsent: "Por favor acepta los términos para continuar.",
      tcpa: "Al hacer clic en enviar, autorizo a NIAG y/o sus socios de seguros a contactarme al teléfono y email proporcionados, incluso por tecnología automatizada, mensajes pregrabados, SMS y email, aunque mi número esté en una lista de no llamar. El consentimiento no es condición de compra. Pueden aplicar tarifas de mensajes y datos.",
      headerHelp: "¿Necesitas ayuda?",
    },
    thankYou: {
      eyebrow: "Solicitud recibida",
      title: "Gracias. Estamos emparejando tu solicitud.",
      sub: "Un socio licenciado se comunicará pronto con opciones para tu código postal.",
      steps: [
        { t: "Espera una llamada o texto", d: "Generalmente llaman dentro de un día hábil." },
        { t: "Ten tu póliza actual a mano", d: "Comparar es más fácil con tu declaración actual." },
        { t: "Compara antes de cambiar", d: "Pregunta por la fecha efectiva para evitar lagunas de cobertura." },
      ],
      reference: "Referencia",
      backHome: "Volver al inicio",
    },
  },
};

// ---------- variant headline picker ----------
function heroCopyFor(t, variant) {
  if (variant === "B") return { headline: t.hero.headlineB, cta: t.hero.ctaB, defaultProduct: "auto" };
  if (variant === "C") return { headline: t.hero.headlineC, cta: t.hero.ctaC, defaultProduct: "bundle" };
  return { headline: t.hero.headlineA, cta: t.hero.ctaA, defaultProduct: "bundle" };
}

// ---------- form step definitions ----------
// each step: { id, kind, question, why?, options?, validate? }
// kind: "options" | "zip" | "name" | "contact" | "consent"
const FORMS = {
  en: {
    bundle: [
      { id: "zip", kind: "zip", question: "What's your ZIP code?", why: "Insurance rates and partners are matched by location." },
      { id: "own", kind: "options", question: "Do you currently own or rent your home?", options: ["Own", "Rent", "Other"] },
      { id: "ptype", kind: "options", question: "What type of property is it?", options: ["Single family", "Townhouse", "Condo", "Apartment", "Mobile home"] },
      { id: "autoInsured", kind: "options", question: "Do you currently have auto insurance?", options: ["Yes", "No"] },
      { id: "vehicles", kind: "options", question: "How many vehicles?", options: ["1", "2", "3", "4+"] },
      { id: "drivers", kind: "options", question: "How many drivers?", options: ["1", "2", "3", "4+"] },
      { id: "start", kind: "options", question: "When do you need coverage to start?", options: ["Right away", "Within 7 days", "Within 30 days", "Not sure yet"] },
      { id: "name", kind: "name", question: "What's your name?" },
      { id: "contact", kind: "contact", question: "Where should we send your matches?", why: "Partners need a way to reach you with quotes." },
      { id: "consent", kind: "consent", question: "Almost done. Review and submit." },
    ],
    auto: [
      { id: "zip", kind: "zip", question: "What's your ZIP code?", why: "Auto rates vary by location." },
      { id: "currentlyInsured", kind: "options", question: "Are you currently insured?", options: ["Yes", "No"] },
      { id: "vehicles", kind: "options", question: "How many vehicles?", options: ["1", "2", "3", "4+"] },
      { id: "drivers", kind: "options", question: "How many drivers?", options: ["1", "2", "3", "4+"] },
      { id: "incidents", kind: "options", question: "Any accidents or tickets in the last 3 years?", options: ["None", "1", "2", "3+"] },
      { id: "start", kind: "options", question: "When do you need coverage to start?", options: ["Right away", "Within 7 days", "Within 30 days", "Not sure yet"] },
      { id: "name", kind: "name", question: "What's your name?" },
      { id: "contact", kind: "contact", question: "Where should we send your matches?" },
      { id: "consent", kind: "consent", question: "Almost done. Review and submit." },
    ],
    home: [
      { id: "zip", kind: "zip", question: "Property ZIP code?" },
      { id: "own", kind: "options", question: "Do you own or rent?", options: ["Own", "Rent"] },
      { id: "ptype", kind: "options", question: "Property type?", options: ["Single family", "Townhouse", "Condo", "Mobile home", "Other"] },
      { id: "yearBuilt", kind: "options", question: "Approximate age of the property?", options: ["New (≤5 years)", "5–20 years", "20–50 years", "50+ years"] },
      { id: "currentlyInsured", kind: "options", question: "Current insurance status?", options: ["Insured now", "Lapsed", "Never insured"] },
      { id: "start", kind: "options", question: "When do you need coverage?", options: ["Right away", "Within 7 days", "Within 30 days", "Not sure yet"] },
      { id: "name", kind: "name", question: "What's your name?" },
      { id: "contact", kind: "contact", question: "Where should we send your matches?" },
      { id: "consent", kind: "consent", question: "Almost done. Review and submit." },
    ],
    renters: [
      { id: "zip", kind: "zip", question: "What's your ZIP code?" },
      { id: "rType", kind: "options", question: "What kind of rental?", options: ["Apartment", "House", "Condo", "Other"] },
      { id: "start", kind: "options", question: "Move-in or policy start date?", options: ["This week", "This month", "Next month", "Flexible"] },
      { id: "coverage", kind: "options", question: "Desired coverage amount?", options: ["Up to $15k", "$15k–$30k", "$30k–$50k", "Not sure"] },
      { id: "name", kind: "name", question: "What's your name?" },
      { id: "contact", kind: "contact", question: "Where should we send your matches?" },
      { id: "consent", kind: "consent", question: "Almost done. Review and submit." },
    ],
    health: [
      { id: "zip", kind: "zip", question: "What's your ZIP code?" },
      { id: "coverageType", kind: "options", question: "Individual or family coverage?", options: ["Just me", "Me + partner", "Family"] },
      { id: "ageRange", kind: "options", question: "Age range?", options: ["Under 26", "26–39", "40–54", "55–64", "65+"] },
      { id: "currentlyInsured", kind: "options", question: "Current coverage status?", options: ["Insured now", "Between plans", "Never insured"] },
      { id: "start", kind: "options", question: "When do you need coverage?", options: ["Right away", "Next month", "Open enrollment", "Not sure"] },
      { id: "name", kind: "name", question: "What's your name?" },
      { id: "contact", kind: "contact", question: "Where should we send your matches?" },
      { id: "consent", kind: "consent", question: "Almost done. Review and submit." },
    ],
  },
};

// Spanish forms — map same shapes with translated copy
FORMS.es = {
  bundle: [
    { id: "zip", kind: "zip", question: "¿Cuál es tu código postal?", why: "Las tarifas y socios se emparejan por ubicación." },
    { id: "own", kind: "options", question: "¿Eres propietario o inquilino?", options: ["Propietario", "Inquilino", "Otro"] },
    { id: "ptype", kind: "options", question: "¿Qué tipo de propiedad?", options: ["Casa familiar", "Townhouse", "Condo", "Apartamento", "Casa móvil"] },
    { id: "autoInsured", kind: "options", question: "¿Tienes seguro de auto actualmente?", options: ["Sí", "No"] },
    { id: "vehicles", kind: "options", question: "¿Cuántos vehículos?", options: ["1", "2", "3", "4+"] },
    { id: "drivers", kind: "options", question: "¿Cuántos conductores?", options: ["1", "2", "3", "4+"] },
    { id: "start", kind: "options", question: "¿Cuándo necesitas la cobertura?", options: ["Cuanto antes", "Dentro de 7 días", "Dentro de 30 días", "No estoy seguro"] },
    { id: "name", kind: "name", question: "¿Cómo te llamas?" },
    { id: "contact", kind: "contact", question: "¿A dónde te enviamos las opciones?", why: "Los socios necesitan una forma de enviarte las cotizaciones." },
    { id: "consent", kind: "consent", question: "Casi listo. Revisa y envía." },
  ],
  auto: [
    { id: "zip", kind: "zip", question: "¿Cuál es tu código postal?" },
    { id: "currentlyInsured", kind: "options", question: "¿Tienes seguro actualmente?", options: ["Sí", "No"] },
    { id: "vehicles", kind: "options", question: "¿Cuántos vehículos?", options: ["1", "2", "3", "4+"] },
    { id: "drivers", kind: "options", question: "¿Cuántos conductores?", options: ["1", "2", "3", "4+"] },
    { id: "incidents", kind: "options", question: "¿Accidentes o multas en los últimos 3 años?", options: ["Ninguno", "1", "2", "3+"] },
    { id: "start", kind: "options", question: "¿Cuándo necesitas la cobertura?", options: ["Cuanto antes", "Dentro de 7 días", "Dentro de 30 días", "No estoy seguro"] },
    { id: "name", kind: "name", question: "¿Cómo te llamas?" },
    { id: "contact", kind: "contact", question: "¿A dónde te enviamos las opciones?" },
    { id: "consent", kind: "consent", question: "Casi listo. Revisa y envía." },
  ],
  home: [
    { id: "zip", kind: "zip", question: "¿Código postal de la propiedad?" },
    { id: "own", kind: "options", question: "¿Propietario o inquilino?", options: ["Propietario", "Inquilino"] },
    { id: "ptype", kind: "options", question: "¿Tipo de propiedad?", options: ["Casa familiar", "Townhouse", "Condo", "Casa móvil", "Otro"] },
    { id: "yearBuilt", kind: "options", question: "¿Edad aproximada?", options: ["Nueva (≤5 años)", "5–20 años", "20–50 años", "50+ años"] },
    { id: "currentlyInsured", kind: "options", question: "¿Estado actual del seguro?", options: ["Asegurado", "Caducado", "Nunca asegurado"] },
    { id: "start", kind: "options", question: "¿Cuándo necesitas cobertura?", options: ["Cuanto antes", "Dentro de 7 días", "Dentro de 30 días", "No estoy seguro"] },
    { id: "name", kind: "name", question: "¿Cómo te llamas?" },
    { id: "contact", kind: "contact", question: "¿A dónde te enviamos las opciones?" },
    { id: "consent", kind: "consent", question: "Casi listo. Revisa y envía." },
  ],
  renters: [
    { id: "zip", kind: "zip", question: "¿Cuál es tu código postal?" },
    { id: "rType", kind: "options", question: "¿Qué tipo de alquiler?", options: ["Apartamento", "Casa", "Condo", "Otro"] },
    { id: "start", kind: "options", question: "¿Fecha de mudanza o inicio?", options: ["Esta semana", "Este mes", "El próximo mes", "Flexible"] },
    { id: "coverage", kind: "options", question: "¿Monto de cobertura deseado?", options: ["Hasta $15k", "$15k–$30k", "$30k–$50k", "No estoy seguro"] },
    { id: "name", kind: "name", question: "¿Cómo te llamas?" },
    { id: "contact", kind: "contact", question: "¿A dónde te enviamos las opciones?" },
    { id: "consent", kind: "consent", question: "Casi listo. Revisa y envía." },
  ],
  health: [
    { id: "zip", kind: "zip", question: "¿Cuál es tu código postal?" },
    { id: "coverageType", kind: "options", question: "¿Cobertura individual o familiar?", options: ["Solo yo", "Yo + pareja", "Familia"] },
    { id: "ageRange", kind: "options", question: "¿Rango de edad?", options: ["Menos de 26", "26–39", "40–54", "55–64", "65+"] },
    { id: "currentlyInsured", kind: "options", question: "¿Estado de cobertura actual?", options: ["Asegurado", "Entre planes", "Nunca asegurado"] },
    { id: "start", kind: "options", question: "¿Cuándo necesitas cobertura?", options: ["Cuanto antes", "El próximo mes", "Inscripción abierta", "No estoy seguro"] },
    { id: "name", kind: "name", question: "¿Cómo te llamas?" },
    { id: "contact", kind: "contact", question: "¿A dónde te enviamos las opciones?" },
    { id: "consent", kind: "consent", question: "Casi listo. Revisa y envía." },
  ],
};

// expose to window so other Babel scripts can import
Object.assign(window, { COPY, PRODUCTS, ProductIcon, heroCopyFor, FORMS, track });
