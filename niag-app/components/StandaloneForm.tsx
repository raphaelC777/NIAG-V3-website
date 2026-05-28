"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SiteProvider } from "./SiteContext";
import { QuoteFlowProvider, useQuoteFlow } from "./QuoteFlowProvider";
import { isProduct } from "@/lib/products";
import type { EntryPoint, Language, ProductType } from "@/types/lead";

/**
 * Renders the quote form by itself (no homepage behind it). Use this for the
 * "open the intake form in a new tab" flow — Header CTAs and lander CTAs can
 * link to `/form/[product]?ep=hero` instead of opening the modal in-page.
 */
function AutoOpener({ product }: { product: ProductType }) {
  const { open } = useQuoteFlow();
  const params = useSearchParams();
  useEffect(() => {
    const ep = (params.get("ep") || "deep_link") as EntryPoint;
    const zip = params.get("zip") || undefined;
    open(product, ep, zip ? { zip } : undefined);
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
