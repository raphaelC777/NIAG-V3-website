"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SiteProvider } from "./SiteContext";
import { QuoteFlowProvider, useQuoteFlow } from "./QuoteFlowProvider";
import { isProduct } from "@/lib/products";
import {
  loadDraftLocal,
  loadDraftRemote,
  type ClientDraft,
} from "@/lib/draftClient";
import type { EntryPoint, Language, ProductType } from "@/types/lead";

/**
 * Renders the quote form by itself (no homepage behind it). Use this for the
 * "open the intake form in a new tab" flow — Header CTAs and lander CTAs can
 * link to `/form/[product]?ep=hero` instead of opening the modal in-page.
 *
 * If the URL carries `?resume=<draftId>`, we look up that draft and resume
 * from the saved step. This is the landing target for SMS / email
 * abandonment recovery links.
 */
function AutoOpener({ product }: { product: ProductType }) {
  const { open } = useQuoteFlow();
  const params = useSearchParams();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;
    let alive = true;
    (async () => {
      const ep = (params.get("ep") || "deep_link") as EntryPoint;
      const zip = params.get("zip") || undefined;
      const resumeId = params.get("resume") || undefined;

      // If resume= is in the URL, fetch the server-side draft first.
      let draft: ClientDraft | null = null;
      if (resumeId) {
        draft = await loadDraftRemote(resumeId);
      }
      // Otherwise check localStorage for this product.
      if (!draft) {
        draft = loadDraftLocal(product);
      }

      if (!alive) return;
      open(product, ep, {
        zip,
        resumeFrom: draft && draft.product === product ? draft : null,
      });
      setReady(true);
    })();
    return () => { alive = false; };
  }, [product]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

export default function StandaloneForm({
  language,
  product,
}: {
  language: Language;
  product: string;
}) {
  if (!isProduct(product)) return null;
  return (
    <Suspense fallback={null}>
      <SiteProvider initialLanguage={language}>
        <QuoteFlowProvider>
          {/* Empty body — the form provider renders the full-screen modal. */}
          <main className="min-h-screen bg-cream" />
          <AutoOpener product={product} />
        </QuoteFlowProvider>
      </SiteProvider>
    </Suspense>
  );
}
