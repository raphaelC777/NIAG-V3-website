import ThankYou from "@/app/thank-you/page";

export default function Page({ searchParams }: { searchParams: { product?: string; zip?: string } }) {
  return <ThankYou searchParams={{ ...searchParams, lang: "es" }} />;
}
