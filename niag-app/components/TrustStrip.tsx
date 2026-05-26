"use client";
import { useSite } from "./SiteContext";
import { t } from "@/lib/i18n";
import { ShieldIcon, LockIcon, CheckIcon, TeamIcon } from "./icons";

export default function TrustStrip() {
  const { language } = useSite();
  return (
    <div className="border-t border-b border-line bg-white py-7">
      <div className="container-wide grid items-center gap-6 md:grid-cols-[auto_1fr]">
        <div className="max-w-xs text-xs font-semibold uppercase tracking-[0.08em] text-ink-soft">
          {t(language, "trust.label")}
        </div>
        <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-3 md:justify-end">
          {[
            { Icon: ShieldIcon, key: "trust.secure" },
            { Icon: LockIcon, key: "trust.nossn" },
            { Icon: CheckIcon, key: "trust.noobligation" },
            { Icon: TeamIcon, key: "trust.licensed" },
          ].map(({ Icon, key }) => (
            <span key={key} className="inline-flex items-center gap-2 text-sm font-medium text-ink">
              <Icon className="h-[18px] w-[18px] text-green" />
              <span>{t(language, key)}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
