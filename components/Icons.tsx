import type { ReactNode } from "react";

/** Icon wrapper matching the approved design's `.ic` span. */
export function Ic({ children, big = false }: { children: ReactNode; big?: boolean }) {
  return (
    <span className={big ? "ic big" : "ic"} aria-hidden="true">
      {children}
    </span>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z"
    />
  </svg>
);

export const PhoneIcon = () => (
  <svg viewBox="0 0 24 24">
    <path {...stroke} d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);

export const ArrowIcon = () => (
  <svg viewBox="0 0 24 24">
    <path {...stroke} d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const CheckIcon = () => (
  <svg viewBox="0 0 24 24">
    <path {...stroke} strokeWidth={2.4} d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const HomeSolarIcon = () => (
  <svg viewBox="0 0 32 32">
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M4 15 16 5l12 10M7 13v14h18V13" />
      <path d="M11 18h10M11 22h10M16 14v12" opacity=".6" />
    </g>
  </svg>
);

export const BusinessIcon = () => (
  <svg viewBox="0 0 32 32">
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M4 27V12l7 4v-4l7 4v-4l7 4v11Z" />
      <path d="M4 27h24M9 22h3M15 22h3M21 22h3" />
    </g>
  </svg>
);

export const StoreIcon = () => (
  <svg viewBox="0 0 32 32">
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M5 12 7 5h18l2 7M5 12v15h22V12M5 12h22" />
      <path d="M13 27v-8h6v8" />
    </g>
  </svg>
);

export const AmcIcon = () => (
  <svg viewBox="0 0 32 32">
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6a6 6 0 0 0-7.6 7.6L5 21a2.8 2.8 0 0 0 4 4l7.4-7.4A6 6 0 0 0 24 10l-3.5 3.5-3-1-1-3Z" />
    </g>
  </svg>
);

export const CctvIcon = () => (
  <svg viewBox="0 0 32 32">
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M4 9l18 5-2 6L4 15Z" />
      <path d="M20 17l4 1v5M24 23h4M9 16l-1 6H4" />
    </g>
  </svg>
);

export const VisitIcon = () => (
  <svg viewBox="0 0 32 32">
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="16" cy="16" r="5" />
      <path d="M16 3v4M16 25v4M3 16h4M25 16h4M6.8 6.8l2.8 2.8M22.4 22.4l2.8 2.8M6.8 25.2l2.8-2.8M22.4 9.6l2.8-2.8" />
    </g>
  </svg>
);

export const PinIcon = () => (
  <svg viewBox="0 0 24 24">
    <g {...stroke}>
      <path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </g>
  </svg>
);

export const MailIcon = () => (
  <svg viewBox="0 0 24 24">
    <g {...stroke}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </g>
  </svg>
);

/** The SuryaVastra mark: a half sun over three panels. */
export const Logo = ({ className = "logo" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 160 124" aria-hidden="true">
    <g stroke="#F5A800" strokeWidth="7" strokeLinecap="round">
      <path d="M80 6v22M36 22l11 18M124 22l-11 18M12 62h20M128 62h20" />
    </g>
    <path d="M38 82a42 42 0 0 1 84 0Z" fill="#F5A800" />
    <path d="M8 84h144" stroke="#F5A800" strokeWidth="6" />
    <g fill="none" stroke="#B08A3A" strokeWidth="4">
      <rect x="16" y="94" width="38" height="26" rx="5" />
      <rect x="61" y="94" width="38" height="26" rx="5" />
      <rect x="106" y="94" width="38" height="26" rx="5" />
      <path d="M35 94v26M16 107h38M80 94v26M61 107h38M125 94v26M106 107h38" strokeWidth="2.5" />
    </g>
  </svg>
);
