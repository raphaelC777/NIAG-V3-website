"use client";
import { Suspense } from "react";
import { SiteProvider } from "./SiteContext";
import { QuoteFlowProvider } from "./QuoteFlowProvider";
import Header from "./Header";
import ResumeBanner from "./ResumeBanner";
import LanderHero from "./LanderHero";
import TrustStrip from "./TrustStrip";
import HowItWorks from "./HowItWorks";
import ExpertHelp from "./ExpertHelp";
import FAQ from "./FAQ";
import Footer from "./Footer";
import StickyMobileCta from "./StickyMobileCta";
import type { LanderSpec } from "@/lib/landers";
import type { Language } from "@/types/lead";

export default function LanderPage({
  language,
  spec,
}: {
  language: Language;
  spec: LanderSpec;
}) {
  return (
    <Suspense fallback={null}>
      <SiteProvider initialLanguage={language}>
        <QuoteFlowProvider>
          <Header />
          <ResumeBanner />
          <LanderHero spec={spec} />
          {spec.sections.trustStrip ? <TrustStrip /> : null}
          {spec.sections.howItWorks ? <HowItWorks /> : null}
          {spec.sections.expertHelp ? <ExpertHelp /> : null}
          {spec.sections.faq ? <FAQ /> : null}
          {spec.sections.footer ? <Footer /> : null}
          <StickyMobileCta />
        </QuoteFlowProvider>
      </SiteProvider>
    </Suspense>
  );
}
