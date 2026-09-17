"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import type { EnquiryType } from "@/lib/enquiry";
import { site, tel, wa } from "@/lib/site";
import { Ic, PhoneIcon, WhatsAppIcon } from "./Icons";

export type ExtraField = {
  name: string;
  label: string;
  options: readonly string[];
};

type Props = {
  enquiryType: EnquiryType;
  heading: string;
  intro: string;
  /** Dropdowns saved into the enquiry's details column, e.g. system size. */
  extraFields?: ExtraField[];
  messageLabel?: string;
  submitLabel?: string;
  /** Message pre-filled if the visitor would rather use WhatsApp. */
  whatsAppText: string;
  /**
   * Preselects one dropdown from a query string, so "Choose Complete Care" on a
   * plan card lands on the form with that plan already picked.
   */
  preselect?: { param: string; field: string };
};

/**
 * useSearchParams needs a Suspense boundary on a statically rendered page, so the
 * boundary lives here rather than being repeated on every page that uses the form.
 */
export default function EnquiryForm(props: Props) {
  return (
    <Suspense fallback={null}>
      <EnquiryFormInner {...props} />
    </Suspense>
  );
}

function EnquiryFormInner({
  enquiryType,
  heading,
  intro,
  extraFields = [],
  messageLabel = "Anything else we should know?",
  submitLabel = "Send my details",
  whatsAppText,
  preselect,
}: Props) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const chosen = preselect ? searchParams.get(preselect.param) : null;
  const defaultFor = (field: ExtraField) => {
    if (chosen && preselect?.field === field.name) {
      const match = field.options.find((option) =>
        option.toLowerCase().startsWith(chosen.toLowerCase())
      );
      if (match) return match;
    }
    return field.options[0];
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setState("sending");

    const data = new FormData(event.currentTarget);
    const details: Record<string, string> = {};
    for (const field of extraFields) {
      const value = data.get(field.name);
      if (typeof value === "string") details[field.label] = value;
    }

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiry_type: enquiryType,
          full_name: data.get("full_name"),
          mobile_number: data.get("mobile_number"),
          village_town: data.get("village_town"),
          message: data.get("message"),
          company: data.get("company"),
          details,
          page_path: window.location.pathname,
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        setError(payload.error ?? "Something went wrong. Please try again.");
        setState("idle");
        return;
      }
      setState("done");
    } catch {
      setError("We could not reach our server. Please WhatsApp or call us.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="form">
        <h2>{heading}</h2>
        <div className="alert alert-ok" role="status">
          <b>Thank you. We have your details.</b>
          <span>
            Our team will call you within one working day, Monday to Saturday, 9 AM to 7
            PM.
          </span>
        </div>
        <div className="done">
          <p className="formnote">Need us sooner? Call or message us directly.</p>
          <div className="btn-row">
            <a className="btn btn-wa" href={wa(whatsAppText)} target="_blank" rel="noopener">
              <Ic>
                <WhatsAppIcon />
              </Ic>
              <span>WhatsApp us</span>
            </a>
            <a className="btn btn-ghost" href={tel}>
              <Ic>
                <PhoneIcon />
              </Ic>
              <span>Call {site.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <h2>{heading}</h2>
      <p className="lede-d">{intro}</p>

      <div className="row">
        <label>
          Your name
          <input
            type="text"
            name="full_name"
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            placeholder="Full name"
          />
        </label>
        <label>
          Mobile number
          <input
            type="tel"
            name="mobile_number"
            required
            inputMode="numeric"
            pattern="[0-9+ ]{10,15}"
            autoComplete="tel"
            placeholder="10-digit number"
          />
        </label>
      </div>

      <label>
        Village or town <span className="req">(optional)</span>
        <input type="text" name="village_town" maxLength={120} placeholder="e.g. Narsipatnam" />
      </label>

      {extraFields.map((field) => (
        <label key={field.name}>
          {field.label}
          <select name={field.name} key={defaultFor(field)} defaultValue={defaultFor(field)}>
            {field.options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      ))}

      <label>
        {messageLabel} <span className="req">(optional)</span>
        <textarea name="message" maxLength={2000} rows={3} />
      </label>

      <label className="hp" aria-hidden="true">
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>

      {error && (
        <div className="alert alert-bad" role="alert">
          {error}
        </div>
      )}

      <button className="btn btn-gold" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : submitLabel}
      </button>

      <p className="formnote">
        We use your number only to reply to this enquiry. No charge for a site visit.
      </p>

      <div className="or">or</div>
      <div className="btn-row">
        <a className="btn btn-wa" href={wa(whatsAppText)} target="_blank" rel="noopener">
          <Ic>
            <WhatsAppIcon />
          </Ic>
          <span>Send on WhatsApp</span>
        </a>
        <a className="btn btn-ghost" href={tel}>
          <Ic>
            <PhoneIcon />
          </Ic>
          <span>Call {site.phoneDisplay}</span>
        </a>
      </div>
    </form>
  );
}
