import Link from "next/link";
import { t } from "@/lib/i18n";
import type { Language } from "@/types/lead";

interface SearchParams { product?: string; zip?: string; lang?: string }

export default function ThankYou({ searchParams }: { searchParams: SearchParams }) {
  const lang: Language = searchParams.lang === "es" ? "es" : "en";
  const product = searchParams.product || "";
  const zip = searchParams.zip || "";
  return (
    <main className="min-h-screen bg-cream">
      <header className="border-b border-line bg-white">
        <div className="container-wide flex items-center justify-between py-3.5">
          <Link href={lang === "es" ? "/es" : "/"} className="font-serif text-xl font-bold text-navy">NIAG</Link>
        </div>
      </header>
      <section className="mx-auto max-w-[640px] px-5 py-16 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green text-3xl text-white">✓</div>
        <h1 className="font-serif text-4xl font-semibold text-navy">{t(lang, "success.title")}</h1>
        <p className="mt-3 text-ink-soft">{t(lang, "success.sub")}</p>

        {(product || zip) ? (
          <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-sm text-ink-soft">
            {product ? <span><strong className="text-navy">{lang === "es" ? "Producto:" : "Product:"}</strong> {product}</span> : null}
            {zip ? <span><strong className="text-navy">ZIP:</strong> {zip}</span> : null}
          </div>
        ) : null}

        <ol className="mx-auto mt-8 max-w-md list-decimal rounded-lg border border-line bg-white p-6 pl-10 text-left">
          <li className="mb-2 text-ink">{t(lang, "success.next1")}</li>
          <li className="mb-2 text-ink">{t(lang, "success.next2")}</li>
          <li className="text-ink">{t(lang, "success.next3")}</li>
        </ol>

        <Link href={lang === "es" ? "/es" : "/"} className="btn-secondary mt-7 inline-flex">
          {t(lang, "success.back")}
        </Link>
      </section>
    </main>
  );
}
