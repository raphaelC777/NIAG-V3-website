import type { ProductType } from "@/types/lead";

const baseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ProductIcon({ product, className }: { product: ProductType; className?: string }) {
  const cls = className || "h-6 w-6";
  switch (product) {
    case "bundle": return (
      <svg {...baseProps} className={cls}>
        <path d="M3 11l3-7h12l3 7" /><path d="M5 11h14v6H5z" />
        <circle cx="8" cy="17" r="1.5" /><circle cx="16" cy="17" r="1.5" />
      </svg>
    );
    case "auto": return (
      <svg {...baseProps} className={cls}>
        <path d="M5 14l1.5-5h11L19 14" /><path d="M3 14h18v5H3z" />
        <circle cx="7" cy="19" r="1.5" /><circle cx="17" cy="19" r="1.5" />
      </svg>
    );
    case "home": return (
      <svg {...baseProps} className={cls}>
        <path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" />
      </svg>
    );
    case "renters": return (
      <svg {...baseProps} className={cls}>
        <circle cx="8" cy="15" r="4" /><path d="M11 12l9-9" /><path d="M16 7l3 3" />
      </svg>
    );
    case "health": return (
      <svg {...baseProps} className={cls}>
        <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11z" />
      </svg>
    );
  }
}

export const CheckIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const PhoneIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.95.36 1.88.7 2.78a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.11-.45 13 13 0 0 0 2.78.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const ShieldIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z" />
  </svg>
);

export const LockIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const TeamIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" /><polyline points="17 11 19 13 23 9" />
  </svg>
);
