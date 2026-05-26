import { notFound } from "next/navigation";
import HomePage from "@/components/HomePage";
import { isProduct } from "@/lib/products";

export default function QuoteProductPage({ params }: { params: { product: string } }) {
  if (!isProduct(params.product)) notFound();
  return <HomePage language="en" product={params.product} />;
}
