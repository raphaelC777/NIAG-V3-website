import { notFound } from "next/navigation";
import HomePage from "@/components/HomePage";
import { isProduct } from "@/lib/products";

export default function QuoteProductPageEs({ params }: { params: { product: string } }) {
  if (!isProduct(params.product)) notFound();
  return <HomePage language="es" product={params.product} />;
}
