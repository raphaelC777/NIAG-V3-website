/* =========================================================
   NIAG — Tracking layer
   dataLayer.push() placeholders for GTM / equivalent
   ========================================================= */
(function () {
  "use strict";

  window.dataLayer = window.dataLayer || [];

  function basePayload() {
    const c = window.NIAG_CONFIG || {};
    return {
      timestamp: new Date().toISOString(),
      abVariant: c.abVariant,
      language: c.language,
      ...(c.utm || {}),
    };
  }

  function track(eventName, payload) {
    const data = Object.assign({ event: eventName }, basePayload(), payload || {});
    window.dataLayer.push(data);
    // Surface in console for prototype visibility
    if (window.NIAG_DEBUG_TRACKING) {
      // eslint-disable-next-line no-console
      console.log("[track]", eventName, data);
    }
  }

  // Allowed event names for prototype clarity
  const Events = {
    PAGE_VIEW: "page_view",
    PRODUCT_SELECT: "product_select",
    ZIP_ENTERED: "zip_entered",
    FORM_START: "form_start",
    FORM_STEP_VIEW: "form_step_view",
    FORM_STEP_COMPLETE: "form_step_complete",
    FORM_BACK_CLICK: "form_back_click",
    FORM_ABANDON: "form_abandon",
    TCPA_CONSENT_CHECKED: "tcpa_consent_checked",
    FORM_SUBMIT: "form_submit",
    LEAD_SUBMIT_SUCCESS: "lead_submit_success",
    LEAD_SUBMIT_ERROR: "lead_submit_error",
    PHONE_CLICK: "phone_click",
    LANGUAGE_TOGGLE: "language_toggle",
    BLOG_TAB_CLICK: "blog_tab_click",
    QUOTE_RECOVERY_CLICK: "quote_recovery_click",
  };

  window.NIAG_TRACK = { track, Events };
  window.NIAG_DEBUG_TRACKING = true; // turn off in prod

  // Fire page_view on load
  document.addEventListener("DOMContentLoaded", function () {
    track(Events.PAGE_VIEW, {
      path: window.location.pathname + window.location.search,
      referrer: document.referrer || null,
    });
  });
})();
