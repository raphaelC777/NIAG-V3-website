import { notFound } from "next/navigation";
import LanderPage from "@/components/LanderPage";
import { LANDERS, getLander, listLanderSlugs } from "@/lib/landers";

/**
 * Per-product lander variations live at /lp/[slug].
 * The list of slugs is generated at build time from `lib/landers.ts`.
 *
 * To create a new lander: add an entry to `LANDERS` in `lib/landers.ts` —
 * the route renders automatically with no extra code.
 */
export function generateStaticParams() {
  return listLanderSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const spec = getLander(params.slug);
  if (!spec) return {};
  return {
    title: `NIAG · ${spec.en.headline}`,
    description: spec.en.sub,
    openGraph: { title: spec.en.headline, description: spec.en.sub },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const spec = getLander(params.slug);
  if (!spec) notFound();
  return <LanderPage language="en" spec={spec} />;
}

// Avoid build-time error from unused import in some configs.
export const _seed = LANDERS.length;
