/** Server-side bot verification. Never expose secrets to the client. */
export type BotProvider = "turnstile" | "recaptcha";

export function activeProvider(): BotProvider {
  const p = (process.env.BOT_PROTECTION_PROVIDER || "turnstile").toLowerCase();
  return p === "recaptcha" ? "recaptcha" : "turnstile";
}

export interface BotVerifyResult {
  ok: boolean;
  provider: BotProvider;
  score?: number;
  action?: string;
  reason?: string;
}

export async function verifyBotToken(
  token: string | undefined,
  provider: BotProvider = activeProvider(),
  remoteIp?: string,
): Promise<BotVerifyResult> {
  if (!token) return { ok: false, provider, reason: "missing_token" };

  if (provider === "turnstile") {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) {
      // Dev fallback: do not silently pass in production.
      if (process.env.NODE_ENV !== "production") return { ok: true, provider, reason: "dev_no_secret" };
      return { ok: false, provider, reason: "server_misconfigured" };
    }
    const body = new URLSearchParams();
    body.set("secret", secret);
    body.set("response", token);
    if (remoteIp) body.set("remoteip", remoteIp);
    try {
      const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST", body, cache: "no-store",
      });
      const data: { success: boolean; "error-codes"?: string[] } = await r.json();
      return data.success
        ? { ok: true, provider }
        : { ok: false, provider, reason: (data["error-codes"] || []).join(",") };
    } catch (e) {
      return { ok: false, provider, reason: "verify_request_failed" };
    }
  }

  // reCAPTCHA v3
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const minScore = parseFloat(process.env.RECAPTCHA_MIN_SCORE || "0.5");
  if (!secret) {
    if (process.env.NODE_ENV !== "production") return { ok: true, provider, reason: "dev_no_secret" };
    return { ok: false, provider, reason: "server_misconfigured" };
  }
  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteIp) body.set("remoteip", remoteIp);
  try {
    const r = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST", body, cache: "no-store",
    });
    const data: { success: boolean; score?: number; action?: string; "error-codes"?: string[] } = await r.json();
    if (!data.success) return { ok: false, provider, reason: (data["error-codes"] || []).join(",") };
    if (typeof data.score === "number" && data.score < minScore) {
      return { ok: false, provider, score: data.score, action: data.action, reason: "low_score" };
    }
    if (data.action && data.action !== "lead_submit") {
      // Soft warn — still allow; uncomment to enforce
      // return { ok: false, provider, action: data.action, reason: "unexpected_action" };
    }
    return { ok: true, provider, score: data.score, action: data.action };
  } catch {
    return { ok: false, provider, reason: "verify_request_failed" };
  }
}
