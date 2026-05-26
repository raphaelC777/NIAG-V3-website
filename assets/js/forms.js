/* =========================================================
   NIAG — Multi-step product form flows
   Bundle, Auto, Home, Renters, Health
   ========================================================= */
(function () {
  "use strict";

  const t = () => window.NIAG_I18N.t;
  const track = () => window.NIAG_TRACK.track;
  const Events = () => window.NIAG_TRACK.Events;

  // ---- Step type definitions ----
  // type: "choice" | "text" | "number" | "name" | "contact" | "consent"
  const commonZip = {
    id: "zip",
    type: "text",
    inputType: "tel",
    pattern: /^\d{5}$/,
    qKey: "step.zip.q",
    helperKey: "step.zip.helper",
    placeholderKey: "hero.zipPlaceholder",
    maxLength: 5,
    errorKey: "form.invalidZip",
  };
  const commonName = {
    id: "name",
    type: "name",
    qKey: "step.name.q",
  };
  const commonContact = {
    id: "contact",
    type: "contact",
    qKey: "step.contact.q",
    helperKey: "step.contact.helper",
  };
  const commonConsent = {
    id: "consent",
    type: "consent",
    qKey: "step.consent.q",
  };

  const startDateStep = {
    id: "startDate",
    type: "choice",
    qKey: "step.startDate.q",
    options: [
      { value: "asap", labelKey: "step.startDate.asap" },
      { value: "7", labelKey: "step.startDate.7" },
      { value: "30", labelKey: "step.startDate.30" },
      { value: "later", labelKey: "step.startDate.later" },
    ],
  };

  // ---- Per-product flows ----
  const flows = {
    bundle: {
      titleKey: "form.bundle.title",
      steps: [
        commonZip,
        {
          id: "ownRent",
          type: "choice",
          qKey: "step.ownRent.q",
          options: [
            { value: "own", labelKey: "step.ownRent.own" },
            { value: "rent", labelKey: "step.ownRent.rent" },
            { value: "other", labelKey: "step.ownRent.other" },
          ],
        },
        {
          id: "propertyType",
          type: "choice",
          qKey: "step.propertyType.q",
          options: [
            { value: "single", labelKey: "step.propertyType.single" },
            { value: "condo", labelKey: "step.propertyType.condo" },
            { value: "multi", labelKey: "step.propertyType.multi" },
            { value: "mobile", labelKey: "step.propertyType.mobile" },
          ],
        },
        {
          id: "currentlyInsuredAuto",
          type: "choice",
          qKey: "step.currentlyInsuredAuto.q",
          options: [
            { value: "yes", labelKey: "step.currentlyInsuredAuto.yes" },
            { value: "no", labelKey: "step.currentlyInsuredAuto.no" },
            { value: "lapsed", labelKey: "step.currentlyInsuredAuto.lapsed" },
          ],
        },
        {
          id: "vehicleCount",
          type: "choice",
          qKey: "step.vehicleCount.q",
          options: [
            { value: "1", labelKey: null, label: "1" },
            { value: "2", labelKey: null, label: "2" },
            { value: "3", labelKey: null, label: "3" },
            { value: "4+", labelKey: null, label: "4+" },
          ],
        },
        {
          id: "driverCount",
          type: "choice",
          qKey: "step.driverCount.q",
          options: [
            { value: "1", labelKey: null, label: "1" },
            { value: "2", labelKey: null, label: "2" },
            { value: "3", labelKey: null, label: "3" },
            { value: "4+", labelKey: null, label: "4+" },
          ],
        },
        startDateStep,
        commonName,
        commonContact,
        commonConsent,
      ],
    },
    auto: {
      titleKey: "form.auto.title",
      steps: [
        commonZip,
        {
          id: "currentlyInsured",
          type: "choice",
          qKey: "step.currentlyInsuredAuto.q",
          options: [
            { value: "yes", labelKey: "step.currentlyInsuredAuto.yes" },
            { value: "no", labelKey: "step.currentlyInsuredAuto.no" },
            { value: "lapsed", labelKey: "step.currentlyInsuredAuto.lapsed" },
          ],
        },
        {
          id: "vehicleCount",
          type: "choice",
          qKey: "step.vehicleCount.q",
          options: [
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4+", label: "4+" },
          ],
        },
        {
          id: "driverCount",
          type: "choice",
          qKey: "step.driverCount.q",
          options: [
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4+", label: "4+" },
          ],
        },
        {
          id: "incidents",
          type: "choice",
          qKey: "step.incidents.q",
          options: [
            { value: "none", labelKey: "step.incidents.none" },
            { value: "one", labelKey: "step.incidents.one" },
            { value: "two", labelKey: "step.incidents.two" },
          ],
        },
        startDateStep,
        commonName,
        commonContact,
        commonConsent,
      ],
    },
    home: {
      titleKey: "form.home.title",
      steps: [
        commonZip,
        {
          id: "ownRent",
          type: "choice",
          qKey: "step.ownRent.q",
          options: [
            { value: "own", labelKey: "step.ownRent.own" },
            { value: "rent", labelKey: "step.ownRent.rent" },
            { value: "other", labelKey: "step.ownRent.other" },
          ],
        },
        {
          id: "propertyType",
          type: "choice",
          qKey: "step.propertyType.q",
          options: [
            { value: "single", labelKey: "step.propertyType.single" },
            { value: "condo", labelKey: "step.propertyType.condo" },
            { value: "multi", labelKey: "step.propertyType.multi" },
            { value: "mobile", labelKey: "step.propertyType.mobile" },
          ],
        },
        {
          id: "yearBuilt",
          type: "choice",
          qKey: "step.yearBuilt.q",
          options: [
            { value: "2010+", labelKey: "step.yearBuilt.2010+" },
            { value: "1990-2009", labelKey: "step.yearBuilt.1990-2009" },
            { value: "1970-1989", labelKey: "step.yearBuilt.1970-1989" },
            { value: "pre1970", labelKey: "step.yearBuilt.pre1970" },
          ],
        },
        {
          id: "currentlyInsured",
          type: "choice",
          qKey: "step.currentlyInsuredHome.q",
          options: [
            { value: "yes", labelKey: "step.currentlyInsuredAuto.yes" },
            { value: "no", labelKey: "step.currentlyInsuredAuto.no" },
            { value: "lapsed", labelKey: "step.currentlyInsuredAuto.lapsed" },
          ],
        },
        startDateStep,
        commonName,
        commonContact,
        commonConsent,
      ],
    },
    renters: {
      titleKey: "form.renters.title",
      steps: [
        commonZip,
        {
          id: "rentalType",
          type: "choice",
          qKey: "step.rentalType.q",
          options: [
            { value: "apt", labelKey: "step.rentalType.apt" },
            { value: "house", labelKey: "step.rentalType.house" },
            { value: "condo", labelKey: "step.rentalType.condo" },
            { value: "other", labelKey: "step.rentalType.other" },
          ],
        },
        startDateStep,
        {
          id: "coverageAmount",
          type: "choice",
          qKey: "step.coverageAmount.q",
          options: [
            { value: "low", labelKey: "step.coverageAmount.low" },
            { value: "mid", labelKey: "step.coverageAmount.mid" },
            { value: "high", labelKey: "step.coverageAmount.high" },
            { value: "top", labelKey: "step.coverageAmount.top" },
          ],
        },
        commonName,
        commonContact,
        commonConsent,
      ],
    },
    health: {
      titleKey: "form.health.title",
      steps: [
        commonZip,
        {
          id: "coverageFor",
          type: "choice",
          qKey: "step.healthFor.q",
          options: [
            { value: "self", labelKey: "step.healthFor.self" },
            { value: "couple", labelKey: "step.healthFor.couple" },
            { value: "family", labelKey: "step.healthFor.family" },
          ],
        },
        {
          id: "ageRange",
          type: "choice",
          qKey: "step.age.q",
          options: [
            { value: "under35", labelKey: "step.age.under35" },
            { value: "35to54", labelKey: "step.age.35to54" },
            { value: "55to64", labelKey: "step.age.55to64" },
            { value: "65+", labelKey: "step.age.65+" },
          ],
        },
        {
          id: "currentlyInsured",
          type: "choice",
          qKey: "step.currentlyInsuredHealth.q",
          options: [
            { value: "yes", labelKey: "step.currentlyInsuredHealth.yes" },
            { value: "cobra", labelKey: "step.currentlyInsuredHealth.cobra" },
            { value: "no", labelKey: "step.currentlyInsuredHealth.no" },
          ],
        },
        startDateStep,
        commonName,
        commonContact,
        commonConsent,
      ],
    },
  };

  // ---- State ----
  const state = {
    product: null,
    entryPoint: null,
    stepIndex: 0,
    answers: {},
    startedAt: null,
    overlay: null,
  };

  // ---- DOM helpers ----
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach((k) => {
        if (k === "class") node.className = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else if (k.startsWith("on") && typeof attrs[k] === "function")
          node.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
        else if (k === "dataset") Object.assign(node.dataset, attrs[k]);
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach((c) => {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function I() { return window.NIAG_I18N.t; }

  // ---- Validation ----
  function validateStep(step, value) {
    const i = I();
    if (step.type === "choice") {
      return value ? null : i("form.required");
    }
    if (step.type === "text") {
      if (!value) return i("form.required");
      if (step.pattern && !step.pattern.test(value)) return i(step.errorKey || "form.required");
      return null;
    }
    if (step.type === "name") {
      if (!value || !value.first || !value.last) return i("form.required");
      return null;
    }
    if (step.type === "contact") {
      if (!value || !value.email || !value.phone) return i("form.required");
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email);
      const phoneOk = /^\+?1?[\s().-]*\d{3}[\s().-]*\d{3}[\s().-]*\d{4}$/.test(value.phone);
      if (!emailOk) return i("form.invalidEmail");
      if (!phoneOk) return i("form.invalidPhone");
      return null;
    }
    if (step.type === "consent") {
      return value === true ? null : i("form.consentRequired");
    }
    return null;
  }

  // ---- Render ----
  function buildOverlay() {
    if (state.overlay) return state.overlay;

    const overlay = el("div", { class: "form-overlay", id: "form-overlay", role: "dialog", "aria-modal": "true" });

    const header = el("div", { class: "form-header" }, [
      el("div", { class: "form-header-inner" }, [
        el("div", { class: "logo", html: 'NIAG <small data-i18n="form.minHeader"></small>' }),
        el("button", {
          class: "close",
          type: "button",
          onclick: closeFlow,
          "aria-label": "Close",
        }, [
          el("span", { html: "&times;" }),
          el("span", { "data-i18n": "form.close" }),
        ]),
      ]),
      el("div", { class: "form-progress" }, [
        el("div", { class: "form-progress-bar", id: "form-progress-bar" }),
      ]),
    ]);

    const stage = el("div", { class: "form-stage", id: "form-stage" });

    overlay.appendChild(header);
    overlay.appendChild(stage);
    document.body.appendChild(overlay);
    state.overlay = overlay;
    return overlay;
  }

  function renderStep() {
    const overlay = buildOverlay();
    const stage = overlay.querySelector("#form-stage");
    const flow = flows[state.product];
    if (!flow) return;
    const step = flow.steps[state.stepIndex];
    const total = flow.steps.length;
    const i = I();

    // Update progress
    const pct = ((state.stepIndex) / total) * 100;
    overlay.querySelector("#form-progress-bar").style.width = pct + "%";

    // Clear stage
    stage.innerHTML = "";

    // Header label
    stage.appendChild(el("div", {
      class: "form-progress-label",
      html: `${i("form.step")} ${state.stepIndex + 1} ${i("form.of")} ${total} · ${i(flow.titleKey)}`,
    }));

    stage.appendChild(el("h2", { html: i(step.qKey) }));
    if (step.helperKey) {
      stage.appendChild(el("p", { class: "form-helper", html: i(step.helperKey) }));
    }

    // Field area
    if (step.type === "choice") {
      const stack = el("div", { class: "answer-stack" });
      step.options.forEach((opt) => {
        const label = opt.labelKey ? i(opt.labelKey) : opt.label;
        const selected = state.answers[step.id] === opt.value;
        const btn = el("button", {
          type: "button",
          class: "answer-card" + (selected ? " selected" : ""),
          onclick: () => {
            state.answers[step.id] = opt.value;
            track()(Events().FORM_STEP_COMPLETE, currentEventPayload({ stepName: step.id, value: opt.value }));
            advance();
          },
          html: label,
        });
        stack.appendChild(btn);
      });
      stage.appendChild(stack);
    } else if (step.type === "text") {
      const input = el("input", {
        type: step.inputType || "text",
        class: "form-input",
        id: "input-" + step.id,
        inputmode: step.inputType === "tel" ? "numeric" : "text",
        maxlength: step.maxLength || 100,
      });
      input.placeholder = step.placeholderKey ? i(step.placeholderKey) : "";
      input.value = state.answers[step.id] || "";
      stage.appendChild(input);
      const err = el("div", { class: "field-error", id: "err-" + step.id });
      stage.appendChild(err);
      setTimeout(() => input.focus(), 60);
    } else if (step.type === "name") {
      const row = el("div", { class: "form-row" }, [
        wrap(i("step.name.first"), el("input", { type: "text", class: "form-input", id: "input-first", value: (state.answers.name && state.answers.name.first) || "" })),
        wrap(i("step.name.last"), el("input", { type: "text", class: "form-input", id: "input-last", value: (state.answers.name && state.answers.name.last) || "" })),
      ]);
      stage.appendChild(row);
      stage.appendChild(el("div", { class: "field-error", id: "err-name" }));
    } else if (step.type === "contact") {
      const c = state.answers.contact || {};
      const wrapEmail = wrap(i("step.contact.email"), el("input", { type: "email", class: "form-input", id: "input-email", value: c.email || "", autocomplete: "email" }));
      const wrapPhone = wrap(i("step.contact.phone"), el("input", { type: "tel", class: "form-input", id: "input-phone", inputmode: "tel", value: c.phone || "", autocomplete: "tel" }));
      stage.appendChild(wrapEmail);
      stage.appendChild(wrapPhone);
      stage.appendChild(el("div", { class: "field-error", id: "err-contact" }));
    } else if (step.type === "consent") {
      const consentText = i_consent();
      const box = el("div", { class: "tcpa-box" }, [
        el("label", {}, [
          el("input", {
            type: "checkbox",
            id: "consent-checkbox",
            onchange: (e) => {
              if (e.target.checked) {
                track()(Events().TCPA_CONSENT_CHECKED, currentEventPayload());
              }
            },
          }),
          el("span", { html: consentText }),
        ]),
      ]);
      stage.appendChild(box);
      const links = el("p", { class: "small muted" });
      links.innerHTML = `<a href="#privacy">${i("footer.privacy")}</a> · <a href="#terms">${i("footer.terms")}</a> · <a href="#donotsell">${i("footer.donotsell")}</a>`;
      stage.appendChild(links);
      stage.appendChild(el("div", { class: "field-error", id: "err-consent" }));
    }

    // Actions
    const actions = el("div", { class: "form-actions" });
    const isFirst = state.stepIndex === 0;
    const isLast = state.stepIndex === total - 1;

    const backBtn = el("button", {
      type: "button",
      class: "btn btn-secondary",
      onclick: goBack,
      disabled: isFirst ? "" : null,
      style: isFirst ? "visibility:hidden;" : "",
      html: i("form.back"),
    });
    actions.appendChild(backBtn);

    // For "choice", advance is auto, so we hide continue. For others show Continue / Submit
    if (step.type !== "choice") {
      const ctaText = isLast ? i("form.submit") : i("form.continue");
      const continueBtn = el("button", {
        type: "button",
        class: "btn btn-primary",
        id: "form-continue",
        onclick: () => collectAndAdvance(step, isLast),
        html: ctaText,
      });
      actions.appendChild(continueBtn);
    } else {
      actions.appendChild(el("div", { class: "flex-spacer" }));
    }

    stage.appendChild(actions);

    // Fire step view
    track()(Events().FORM_STEP_VIEW, currentEventPayload({
      stepName: step.id,
      stepIndex: state.stepIndex,
      stepCount: total,
    }));
  }

  function wrap(labelText, inputNode) {
    const div = el("div", {});
    div.appendChild(el("label", { class: "field-label", html: labelText }));
    div.appendChild(inputNode);
    return div;
  }

  function i_consent() {
    const lang = (window.NIAG_CONFIG && window.NIAG_CONFIG.language) || "en";
    if (lang === "es") {
      return `Al hacer clic en enviar, acepto ser contactado por NIAG y/o sus socios de seguros en el número de teléfono y correo proporcionados, incluyendo por tecnología automatizada, mensajes pregrabados, SMS y correo, incluso si mi número está en una lista de no llamar. El consentimiento no es condición de compra. Pueden aplicar cargos por mensajes y datos.`;
    }
    return `By clicking submit, I agree to be contacted by NIAG and/or its insurance partners at the phone number and email provided, including by automated technology, prerecorded message, SMS, and email, even if my number is on a do-not-call list. Consent is not a condition of purchase. Message and data rates may apply.`;
  }

  function collectAndAdvance(step, isLast) {
    let value;
    if (step.type === "text") {
      const input = document.getElementById("input-" + step.id);
      value = input.value.trim();
      const err = validateStep(step, value);
      const errEl = document.getElementById("err-" + step.id);
      if (err) { errEl.textContent = err; errEl.classList.add("show"); input.classList.add("error"); return; }
      state.answers[step.id] = value;
      if (step.id === "zip") {
        track()(Events().ZIP_ENTERED, currentEventPayload({ zipCode: value }));
      }
    } else if (step.type === "name") {
      value = {
        first: document.getElementById("input-first").value.trim(),
        last: document.getElementById("input-last").value.trim(),
      };
      const err = validateStep(step, value);
      const errEl = document.getElementById("err-name");
      if (err) { errEl.textContent = err; errEl.classList.add("show"); return; }
      state.answers.name = value;
    } else if (step.type === "contact") {
      value = {
        email: document.getElementById("input-email").value.trim(),
        phone: document.getElementById("input-phone").value.trim(),
      };
      const err = validateStep(step, value);
      const errEl = document.getElementById("err-contact");
      if (err) { errEl.textContent = err; errEl.classList.add("show"); return; }
      state.answers.contact = value;
    } else if (step.type === "consent") {
      value = document.getElementById("consent-checkbox").checked;
      const err = validateStep(step, value);
      const errEl = document.getElementById("err-consent");
      if (err) { errEl.textContent = err; errEl.classList.add("show"); return; }
      state.answers.consent = true;
      state.answers.consentText = i_consent();
      state.answers.consentTimestamp = new Date().toISOString();
      state.answers.ipPlaceholder = "{client-ip-resolved-server-side}";
      state.answers.userAgent = navigator.userAgent;
    }

    track()(Events().FORM_STEP_COMPLETE, currentEventPayload({
      stepName: step.id,
      value: typeof value === "object" ? "(captured)" : value,
    }));

    if (isLast) {
      submit();
    } else {
      advance();
    }
  }

  function advance() {
    const flow = flows[state.product];
    if (state.stepIndex < flow.steps.length - 1) {
      state.stepIndex += 1;
      renderStep();
    } else {
      submit();
    }
  }

  function goBack() {
    if (state.stepIndex > 0) {
      track()(Events().FORM_BACK_CLICK, currentEventPayload({ fromStep: flows[state.product].steps[state.stepIndex].id }));
      state.stepIndex -= 1;
      renderStep();
    }
  }

  function currentEventPayload(extra) {
    return Object.assign({
      productType: state.product,
      entryPoint: state.entryPoint,
      zipCode: state.answers.zip || null,
    }, extra || {});
  }

  function openFlow(product, entryPoint) {
    if (!flows[product]) product = "auto";
    state.product = product;
    state.entryPoint = entryPoint || "unknown";
    state.stepIndex = 0;
    state.answers = {};
    state.startedAt = Date.now();

    // Update URL hash so the form route is shareable (e.g. #/quote/auto)
    try {
      const lang = window.NIAG_CONFIG.language;
      const langPrefix = lang === "es" ? "/es" : "";
      history.replaceState(null, "", `#${langPrefix}/quote/${product}`);
    } catch (e) { /* no-op */ }

    buildOverlay();
    state.overlay.classList.add("open");
    document.body.style.overflow = "hidden";

    track()(Events().FORM_START, {
      productType: product,
      entryPoint: state.entryPoint,
    });

    renderStep();
  }

  function closeFlow() {
    if (!state.overlay) return;
    const isAbandon = !state.answers.consent;
    if (isAbandon && state.product) {
      track()(Events().FORM_ABANDON, currentEventPayload({
        atStep: flows[state.product].steps[state.stepIndex] && flows[state.product].steps[state.stepIndex].id,
        elapsedMs: state.startedAt ? Date.now() - state.startedAt : null,
      }));
    }
    state.overlay.classList.remove("open");
    document.body.style.overflow = "";
    try { history.replaceState(null, "", window.location.pathname + window.location.search); } catch (e) { /* no-op */ }
  }

  // ---- Submit (placeholder, no real network call) ----
  function submit() {
    const payload = buildLeadPayload();

    track()(Events().FORM_SUBMIT, {
      productType: state.product,
      entryPoint: state.entryPoint,
      zipCode: state.answers.zip,
    });

    // PLACEHOLDER: integrations would post here. Skip real fetch in prototype.
    const stage = state.overlay.querySelector("#form-stage");
    stage.innerHTML = '<div class="form-helper">Submitting…</div>';

    setTimeout(() => {
      try {
        // simulate success
        track()(Events().LEAD_SUBMIT_SUCCESS, {
          productType: state.product,
          leadId: "PLACEHOLDER-" + Date.now(),
        });
        renderSuccess(payload);
      } catch (e) {
        track()(Events().LEAD_SUBMIT_ERROR, { error: String(e) });
        stage.innerHTML = '<div class="form-helper">Sorry, something went wrong. Please try again.</div>';
      }
    }, 600);
  }

  function buildLeadPayload() {
    const c = window.NIAG_CONFIG;
    return {
      product: state.product,
      entryPoint: state.entryPoint,
      language: c.language,
      abVariant: c.abVariant,
      answers: state.answers,
      consent: {
        accepted: !!state.answers.consent,
        text: state.answers.consentText,
        timestamp: state.answers.consentTimestamp,
        ip: state.answers.ipPlaceholder,
        userAgent: state.answers.userAgent,
      },
      tracking: {
        jornayaLeadId: "{jornaya-lead-id-placeholder}",
        trustedFormCertUrl: "{trustedform-cert-placeholder}",
        gclid: c.utm.gclid,
        fbclid: c.utm.fbclid,
        utm_source: c.utm.utm_source,
        utm_medium: c.utm.utm_medium,
        utm_campaign: c.utm.utm_campaign,
        utm_content: c.utm.utm_content,
        utm_term: c.utm.utm_term,
        affiliate_id: c.utm.affiliate_id,
      },
      integrations: {
        leadProsperEndpoint: c.integrations.leadProsperEndpoint,
        gohighlevelWebhook: c.integrations.gohighlevelWebhook,
      },
      submittedAt: new Date().toISOString(),
    };
  }

  function renderSuccess(payload) {
    const stage = state.overlay.querySelector("#form-stage");
    const i = I();
    // Make full progress bar
    state.overlay.querySelector("#form-progress-bar").style.width = "100%";

    stage.innerHTML = "";
    const wrap = el("div", { class: "form-success" }, [
      el("div", { class: "check", html: "&check;" }),
      el("h2", { html: i("success.title") }),
      el("p", { class: "form-helper", html: i("success.body") }),
      el("div", { class: "next-steps" }, [
        (function () {
          const ul = el("ul", {});
          [i("success.next1"), i("success.next2"), i("success.next3")].forEach((s) => {
            ul.appendChild(el("li", { html: s }));
          });
          return ul;
        })(),
      ]),
      el("div", { style: "margin-top:24px;" }, [
        el("button", {
          type: "button",
          class: "btn btn-secondary",
          onclick: closeFlow,
          html: i("success.back"),
        }),
      ]),
    ]);
    stage.appendChild(wrap);

    // Debug: surface the would-be lead payload to console
    if (window.NIAG_DEBUG_TRACKING) {
      // eslint-disable-next-line no-console
      console.log("[lead payload — placeholder, not sent to server]", payload);
    }
  }

  // ---- Public API ----
  window.NIAG_FORMS = {
    open: openFlow,
    close: closeFlow,
    flows,
  };

  // Handle deep-link URL like /quote/auto, /es/quote/home, or #/quote/auto
  document.addEventListener("DOMContentLoaded", function () {
    const pathMatch = window.location.pathname.match(/\/(?:es\/)?quote\/(bundle|auto|home|renters|health)/);
    const hashMatch = window.location.hash.match(/#\/(?:es\/)?quote\/(bundle|auto|home|renters|health)/);
    const match = pathMatch || hashMatch;
    if (match) {
      openFlow(match[1], "deep_link");
    }
  });
})();
