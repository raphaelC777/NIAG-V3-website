import { notFound } from "next/navigation";
import StandaloneForm from "@/components/StandaloneForm";
import { isProduct } from "@/lib/products";

/**
 * Standalone intake form route. Designed to be opened in a new tab
 * (target="_blank") from landers / external ads / email.
 *
 * URL: /form/bundle?ep=email_cta&zip=33101
 */
export default function FormPage({ params }: { params: { product: string } }) {
  if (!isProduct(params.product)) notFound();
  return <StandaloneForm language="en" product={params.product} />;
}
