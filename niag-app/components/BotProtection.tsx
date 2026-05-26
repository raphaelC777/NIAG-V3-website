"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  onToken: (token: string) => void;
  action?: string;
}

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => string; reset?: () => void; remove?: (id: string) => void };
    grecaptcha?: { ready: (fn: () => void) => void; execute: (key: string, opts: { action: string }) => Promise<string> };
    onTurnstileLoad?: () => void;
  }
}

/**
 * Bot protection adapter. Renders either Cloudflare Turnstile or Google reCAPTCHA v3
 * based on NEXT_PUBLIC_TURNSTILE_SITE_KEY / NEXT_PUBLIC_RECAPTCHA_SITE_KEY.
 * If neither is configured, renders a dev-mode bypass token (only effective in development).
 */
export default function BotProtection({ onToken, action = "lead_submit" }: Props) {
  const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const provider = turnstileKey ? "turnstile" : recaptchaKey ? "recaptcha" : "none";

  const ref = useRef<HTMLDivElement | null>(null);
  const [renderedId, setRenderedId] = useState<string | null>(null);

  useEffect(() => {
    // Dev: no provider configured. Emit a dev token so flow can complete.
    // Server-side bot verification will accept this only when NODE_ENV !== "production".
    if (provider === "none") {
      onToken("DEV_BYPASS");
      return;
    }

    if (provider === "turnstile") {
      // Load Turnstile script once
      const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      const existing = document.querySelector(`script[src="${SRC}"]`);
      function render() {
        if (!ref.current || !window.turnstile) return;
        const id = window.turnstile.render(ref.current, {
          sitekey: turnstileKey,
          callback: (token: string) => onToken(token),
          "error-callback": () => onToken(""),
          "expired-callback": () => onToken(""),
        });
        setRenderedId(id);
      }
      if (!existing) {
        const s = document.createElement("script");
        s.src = SRC;
        s.async = true;
        s.defer = true;
        s.onload = render;
        document.head.appendChild(s);
      } else if (window.turnstile) {
        render();
      } else {
        existing.addEventListener("load", render, { once: true });
      }
      return () => {
        if (renderedId && window.turnstile?.remove) window.turnstile.remove(renderedId);
      };
    }

    if (provider === "recaptcha") {
      const SRC = `https://www.google.com/recaptcha/api.js?render=${recaptchaKey}`;
      const existing = document.querySelector(`script[src^="https://www.google.com/recaptcha/api.js"]`);
      function execute() {
        window.grecaptcha?.ready(() => {
          window.grecaptcha!.execute(recaptchaKey!, { action }).then(onToken).catch(() => onToken(""));
        });
      }
      if (!existing) {
        const s = document.createElement("script");
        s.src = SRC; s.async = true; s.defer = true; s.onload = execute;
        document.head.appendChild(s);
      } else {
        execute();
      }
    }
  }, [provider, action]); // eslint-disable-line react-hooks/exhaustive-deps

  if (provider === "turnstile") return <div ref={ref} />;
  if (provider === "recaptcha") return (
    <p className="text-[11px] text-ink-soft">
      Protected by reCAPTCHA · <a href="https://policies.google.com/privacy" className="underline">Privacy</a> · <a href="https://policies.google.com/terms" className="underline">Terms</a>
    </p>
  );
  return <p className="text-[11px] text-ink-soft">Bot protection: dev mode (configure NEXT_PUBLIC_TURNSTILE_SITE_KEY for production)</p>;
}
