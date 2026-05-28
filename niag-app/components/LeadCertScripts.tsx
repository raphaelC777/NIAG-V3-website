"use client";
import { useEffect } from "react";

/**
 * Injects Jornaya LeadiD + ActiveProspect TrustedForm capture scripts and
 * exposes their cert tokens via hidden inputs the form reads at submit.
 *
 * Behavior:
 *  - Jornaya renders only when `NEXT_PUBLIC_JORNAYA_CAMPAIGN_ID` is set
 *    (it is a public-safe Campaign ID — *not* a secret).
 *  - TrustedForm renders only when `NEXT_PUBLIC_TRUSTEDFORM_ENABLED=1`.
 *    (TrustedForm is configured purely client-side; cert URL is public.)
 *  - Both scripts only fire once per page load, even if the modal opens
 *    multiple times.
 *
 * The hidden inputs are read by QuoteFlowProvider.doSubmit() and merged
 * into `LeadPayload.compliance` for server-side storage / partner forward.
 */
export default function LeadCertScripts() {
  const jornayaId = process.env.NEXT_PUBLIC_JORNAYA_CAMPAIGN_ID;
  const trustedFormOn = process.env.NEXT_PUBLIC_TRUSTEDFORM_ENABLED === "1";

  useEffect(() => {
    if (jornayaId && !document.getElementById("LeadiDscript_campaign")) {
      const s = document.createElement("script");
      s.id = "LeadiDscript_campaign";
      s.type = "text/javascript";
      s.async = true;
      s.src =
        "//create.leadid.com/campaign/" +
        encodeURIComponent(jornayaId) +
        ".js?snippet_version=2";
      document.body.appendChild(s);
    }

    if (trustedFormOn && !document.getElementById("tf-script")) {
      const tf = document.createElement("script");
      tf.id = "tf-script";
      tf.type = "text/javascript";
      tf.async = true;
      const field = "xxTrustedFormCertUrl";
      const provideRef = "src";
      const l =
        "https://api.trustedform.com/trustedform.js?field=" +
        field +
        "&ping_field=xxTrustedFormPingUrl&l=" +
        new Date().getTime() +
        Math.random() +
        "&provide_referrer=" +
        provideRef;
      tf.src = l;
      document.body.appendChild(tf);
      const noscript = document.createElement("noscript");
      noscript.innerHTML =
        '<img src="https://api.trustedform.com/ns.gif" alt="" />';
      document.body.appendChild(noscript);
    }
  }, [jornayaId, trustedFormOn]);

  return (
    <>
      {/* Jornaya LeadiD token (auto-populated). Empty when Jornaya disabled. */}
      <input type="hidden" id="leadid_token" name="universal_leadid" />
      {/* TrustedForm cert URL (auto-populated). Empty when TrustedForm disabled. */}
      <input type="hidden" id="xxTrustedFormCertUrl_0" name="xxTrustedFormCertUrl" />
      <input type="hidden" id="xxTrustedFormPingUrl_0" name="xxTrustedFormPingUrl" />
      <input type="hidden" id="xxTrustedFormCertToken_0" name="xxTrustedFormCertToken" />
    </>
  );
}

/** Read the latest cert values from the DOM. Called at submit time. */
export function readLeadCerts(): {
  jornayaLeadId?: string;
  trustedFormCertUrl?: string;
  trustedFormPingUrl?: string;
  trustedFormCertToken?: string;
} {
  if (typeof document === "undefined") return {};
  const getVal = (id: string): string | undefined => {
    const el = document.getElementById(id) as HTMLInputElement | null;
    const v = el?.value?.trim();
    return v ? v : undefined;
  };
  // Jornaya writes into #leadid_token. Some integrations use #leadid_tcpa_disclosure.
  const jornayaLeadId = getVal("leadid_token");
  return {
    jornayaLeadId,
    trustedFormCertUrl: getVal("xxTrustedFormCertUrl_0"),
    trustedFormPingUrl: getVal("xxTrustedFormPingUrl_0"),
    trustedFormCertToken: getVal("xxTrustedFormCertToken_0"),
  };
}
