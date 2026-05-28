import { notFound } from "next/navigation";
import LanderPage from "@/components/LanderPage";
import { getLander, listLanderSlugs } from "@/lib/landers";

export function generateStaticParams() {
  return listLanderSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const spec = getLander(params.slug);
  if (!spec) return {};
  return {
    title: `NIAG · ${spec.es.headline}`,
    description: spec.es.sub,
    openGraph: { title: spec.es.headline, description: spec.es.sub },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const spec = getLander(params.slug);
  if (!spec) notFound();
  return <LanderPage language="es" spec={spec} />;
}
