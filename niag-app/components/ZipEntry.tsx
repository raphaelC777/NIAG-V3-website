"use client";
import { useEffect, useState } from "react";
import { useSite } from "./SiteContext";
import { t } from "@/lib/i18n";
import { isZip, getMsg } from "@/lib/validators";
import { trackEvent, Events } from "@/lib/tracking";

interface Props {
  onSubmit: (zip: string) => void;
  ctaLabel?: string;
  entryPoint: string;
  productType: string;
}

export default function ZipEntry({ onSubmit, ctaLabel, entryPoint, productType }: Props) {
  const { language, variant, geo } = useSite();
  const [zip, setZip] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Pre-fill with detected postal if available
    if (!zip && geo.postal && isZip(geo.postal)) setZip(geo.postal);
  }, [geo.postal]); // eslint-disable-line react-hooks/exhaustive-deps

  function submit() {
    const z = zip.trim();
    if (z && !isZip(z)) {
      setError(getMsg(language).invalidZip);
      return;
    }
    if (z) {
      trackEvent(Events.ZIP_ENTERED, { zipCode: z, productType: productType as any, entryPoint: entryPoint as any, language, abVariant: variant });
    }
    setError(null);
    onSubmit(z);
  }

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="tel" inputMode="numeric" maxLength={5}
          value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
          onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
          placeholder={t(language, "hero.zipPlaceholder")}
          aria-label="ZIP code"
          className="field-input flex-1"
        />
        <button onClick={submit} className="btn-primary">{ctaLabel || t(language, "hero.startBtn")}</button>
      </div>
      {error ? <div className="field-error">{error}</div> : null}
    </div>
  );
}
