"use client";
import { useEffect, useState } from "react";
import { useSite } from "./SiteContext";
import { PRODUCTS } from "@/lib/products";
import type { ProductType } from "@/types/lead";
import { ProductIcon } from "./icons";
import { t } from "@/lib/i18n";

interface Props {
  initialProduct?: ProductType;
  onChange?: (product: ProductType) => void;
  showRecommendedBadge?: boolean;
  className?: string;
}

export default function ProductSelector({ initialProduct, onChange, showRecommendedBadge = true, className }: Props) {
  const { language } = useSite();
  const [active, setActive] = useState<ProductType>(initialProduct || "bundle");

  useEffect(() => { if (initialProduct) setActive(initialProduct); }, [initialProduct]);

  return (
    <div className={`grid grid-cols-5 gap-2 ${className || ""}`}>
      {PRODUCTS.map((p) => {
        const isActive = active === p.id;
        return (
          <button key={p.id}
            type="button"
            onClick={() => { setActive(p.id); onChange?.(p.id); }}
            className={`relative rounded-[10px] border-[1.5px] px-1.5 py-3 text-center text-[13px] font-semibold transition ${
              isActive ? "border-navy bg-navy text-white" : "border-line bg-white text-ink hover:border-navy"
            }`}>
            {p.recommended && showRecommendedBadge ? (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-green px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white whitespace-nowrap">
                {t(language, "hero.recommended")}
              </span>
            ) : null}
            <span className="mx-auto mb-1.5 flex h-5 w-5 items-center justify-center">
              <ProductIcon product={p.id} className="h-5 w-5" />
            </span>
            <span className="block leading-tight">{language === "es" ? p.labelEs : p.labelEn}</span>
          </button>
        );
      })}
    </div>
  );
}
