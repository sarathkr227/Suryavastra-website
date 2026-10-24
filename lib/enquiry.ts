/**
 * The database CHECK constraint still accepts 'store' and 'cctv_electrical' from
 * when those pages existed. Leaving it alone keeps historical rows valid; the
 * site simply no longer sends either value.
 */
export const ENQUIRY_TYPES = [
  "home_solar",
  "business_solar",
  "amc",
  "general",
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number];

export type EnquiryInput = {
  enquiry_type: EnquiryType;
  full_name: string;
  mobile_number: string;
  village_town?: string;
  message?: string;
  details?: Record<string, string>;
  page_path?: string;
  /** Honeypot. Must stay empty — bots fill it in. */
  company?: string;
};

/**
 * Same rules as the website_enquiries CHECK constraints, so a bad submission is
 * rejected with a readable message instead of a database error.
 */
export function validateEnquiry(
  input: Partial<EnquiryInput>
): { ok: true; value: Required<Pick<EnquiryInput, "enquiry_type" | "full_name" | "mobile_number">> & EnquiryInput } | { ok: false; error: string } {
  const type = input.enquiry_type;
  if (!type || !ENQUIRY_TYPES.includes(type)) {
    return { ok: false, error: "Unknown enquiry type." };
  }

  const name = (input.full_name ?? "").trim();
  if (name.length < 2 || name.length > 120) {
    return { ok: false, error: "Please enter your name." };
  }

  // Accept 98765 43210, +91 98765 43210, 098765 43210 — store the bare 10 digits.
  const digits = (input.mobile_number ?? "").replace(/\D/g, "");
  const mobile = digits.length > 10 ? digits.slice(-10) : digits;
  if (!/^[6-9][0-9]{9}$/.test(mobile)) {
    return { ok: false, error: "Please enter a 10-digit mobile number." };
  }

  const village = (input.village_town ?? "").trim().slice(0, 120);
  const message = (input.message ?? "").trim().slice(0, 2000);

  const details: Record<string, string> = {};
  for (const [key, value] of Object.entries(input.details ?? {})) {
    if (typeof value === "string" && value.trim()) {
      details[key.slice(0, 60)] = value.trim().slice(0, 200);
    }
  }

  return {
    ok: true,
    value: {
      enquiry_type: type,
      full_name: name,
      mobile_number: mobile,
      village_town: village || undefined,
      message: message || undefined,
      details,
      page_path: (input.page_path ?? "").slice(0, 200) || undefined,
    },
  };
}
