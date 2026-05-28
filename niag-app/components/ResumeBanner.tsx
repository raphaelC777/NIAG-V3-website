"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSite } from "./SiteContext";
import { useQuoteFlow } from "./QuoteFlowProvider";
import {
  loadDraftRemote,
  loadMostRecentLocalDraft,
  clearDraftRemote,
  clearDraftLocal,
  type ClientDraft,
} from "@/lib/draftClient";
import { FLOWS } from "@/lib/formSteps";
import { isProduct } from "@/lib/products";
import { t } from "@/lib/i18n";

/**
 * Banner that asks "Continue where you left off?" when we detect a stored
 * draft. Three discovery paths, tried in order:
 *
 *   1. ?resume=<draftId> in the URL (SMS/email recovery link).
 *   2. The `niag_draft_id` cookie (same browser, server-stored draft).
 *   3. Most recent localStorage draft (same browser, offline-safe).
 *
 * The banner shows no PII — only the product label and step number. That
 * keeps it safe on shared devices: a passerby can't read the user's name
 * or ZIP from the banner.
 */
export default function ResumeBanner() {
  const { language } = useSite();
  const { resumeDraft } = useQuoteFlow();
  const params = useSearchParams();
  const [draft, setDraft] = useState<ClientDraft | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const fromUrl = params.get("resume") || undefined;
      // 1 + 2: server lookup (URL param wins; falls back to cookie).
      const remote = await loadDraftRemote(fromUrl);
      if (!alive) return;
      if (remote && isProduct(remote.product)) {
        setDraft(remote);
        return;
      }
      // 3: localStorage fallback.
      const local = loadMostRecentLocalDraft();
      if (alive && local && isProduct(local.product)) setDraft(local);
    })();
    return () => { alive = false; };
  }, [params]);

  if (!draft || hidden) return null;
  if (!isProduct(draft.product)) return null;

  const total = FLOWS[draft.product].length;
  const step = Math.min(Math.max(draft.stepIndex + 1, 1), total);
  const productLabel = t(language, `resume.product.${draft.product}`);
  const body = t(language, "resume.body")
    .replace("{product}", productLabel)
    .replace("{step}", String(step))
    .replace("{total}", String(total));

  function onContinue() {
    if (!draft) return;
    resumeDraft(draft, "quote_recovery" as never);
  }

  async function onDismiss() {
    setHidden(true);
    if (draft?.product) clearDraftLocal(draft.product);
    await clearDraftRemote();
  }

  return (
    <div className="container-wide pt-4">
      <div className="flex flex-col gap-3 rounded-lg border border-green/30 bg-green/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-green text-cream">
            ↩
          </div>
          <div>
            <div className="font-semibold text-navy">{t(language, "resume.title")}</div>
            <div className="text-sm text-ink-soft">{body}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onDismiss} className="btn-secondary btn-sm">
            {t(language, "resume.dismiss")}
          </button>
          <button onClick={onContinue} className="btn-primary btn-sm">
            {t(language, "resume.continue")}
          </button>
        </div>
      </div>
    </div>
  );
}
