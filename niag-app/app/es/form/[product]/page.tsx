import { notFound } from "next/navigation";
import StandaloneForm from "@/components/StandaloneForm";
import { isProduct } from "@/lib/products";

export default function FormPage({ params }: { params: { product: string } }) {
  if (!isProduct(params.product)) notFound();
  return <StandaloneForm language="es" product={params.product} />;
}
