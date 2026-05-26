"use client";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SiteProvider, useSite } from "./SiteContext";
import { QuoteFlowProvider, useQuoteFlow } from "./QuoteFlowProvider";
import Header from "./Header";
import Hero from "./Hero";
import TrustStrip from "./TrustStrip";
import ProductCards from "./ProductCards";
import HowItWorks from "./HowItWorks";
import ExpertHelp from "./ExpertHelp";
import MidPageCta from "./MidPageCta";
import ResourceTabs from "./ResourceTabs";
import FAQ from "./FAQ";
import BottomCta from "./BottomCta";
import Footer from "./Footer";
import StickyMobileCta from "./StickyMobileCta";
import { isProduct } from "@/lib/products";
import type { Language } from "@/types/lead";

function HomeContent() {
  return (
    <>
      <Header />
      <Hero />
      <TrustStrip />
      <ProductCards />
      <HowItWorks />
      <ExpertHelp />
      <MidPageCta />
      <ResourceTabs />
      <FAQ />
      <BottomCta />
      <Footer />
      <StickyMobileCta />
      <DeepLinkOpener />
    </>
  );
}

/** If a /quote/[product] route was already rendered server-side this is a no-op;
 *  this handles legacy hash deep-links like #/quote/auto. */
function DeepLinkOpener() {
  const { open } = useQuoteFlow();
  useEffect(() => {
    const m = window.location.hash.match(/#\/(?:es\/)?quote\/(bundle|auto|home|renters|health)/);
    if (m) open(m[1] as any, "deep_link");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

function ProductAutoOpen({ product }: { product: string }) {
  const { open } = useQuoteFlow();
  const params = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    if (!isProduct(product)) return;
    const ep = (params.get("entryPoint") || "deep_link") as any;
    open(product as any, ep);
    // Clean the URL back to home so close goes to /
    // (optional — we'd rather keep the URL so users can copy the link)
  }, [product]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export default function HomePage({
  language, product,
}: { language: Language; product?: string }) {
  return (
    <Suspense fallback={null}>
      <SiteProvider initialLanguage={language}>
        <QuoteFlowProvider>
          <HomeContent />
          {product ? <ProductAutoOpen product={product} /> : null}
        </QuoteFlowProvider>
      </SiteProvider>
    </Suspense>
  );
}
