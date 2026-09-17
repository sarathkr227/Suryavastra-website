import type { ReactNode } from "react";
import { site, tel, wa } from "@/lib/site";
import { Ic, PhoneIcon, WhatsAppIcon } from "./Icons";

export function WaButton({
  text,
  label,
  variant = "wa",
}: {
  text: string;
  label: string;
  variant?: "wa" | "gold";
}) {
  return (
    <a
      className={variant === "gold" ? "btn btn-gold" : "btn btn-wa"}
      href={wa(text)}
      target="_blank"
      rel="noopener"
    >
      <Ic>
        <WhatsAppIcon />
      </Ic>
      <span>{label}</span>
    </a>
  );
}

export function CallButton({ light = false }: { light?: boolean }) {
  return (
    <a className={light ? "btn btn-ghost-light" : "btn btn-ghost"} href={tel}>
      <Ic>
        <PhoneIcon />
      </Ic>
      <span>Call {site.phoneDisplay}</span>
    </a>
  );
}

export function PageHeader({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="phead">
      <div className="wrap">
        <p className="kicker">{kicker}</p>
        <h1>{title}</h1>
        <p className="lede">{lede}</p>
      </div>
    </header>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="steps">
      {items.map((item) => (
        <li key={item.title}>
          <div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Ticks({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="ticks">
      {items.map((item) => (
        <li key={item.title}>
          <Ic>
            <CheckMark />
          </Ic>
          <div>
            <b>{item.title}</b>
            <span>{item.body}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function CheckMark() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m5 12.5 4.5 4.5L19 7.5"
      />
    </svg>
  );
}

export function Section({
  band = false,
  children,
}: {
  band?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={band ? "band" : undefined}>
      <div className="wrap">{children}</div>
    </section>
  );
}
