export const site = {
  name: "SuryaVastra Solar Energy",
  legalName: "Sai Sireesha Vande",
  tagline: "Harness the sun. Save for life.",
  phoneDigits: "917680043727",
  phoneE164: "+917680043727",
  phoneDisplay: "76800 43727",
  email: "suryavastrasolar@gmail.com",
  gstin: "37CIHPV4696Q1ZW",
  mapsUrl: "https://maps.app.goo.gl/bG1QSXgwXS7YZN4Z9",
  address: {
    street: "D No 7-2-101/1, Kapu Veedhi, near Butchurajju shop",
    locality: "Narsipatnam",
    region: "Andhra Pradesh",
    district: "Anakapalli District",
    postalCode: "531116",
    country: "IN",
  },
  addressLine:
    "D No 7-2-101/1, Kapu Veedhi, near Butchurajju shop, Narsipatnam, Anakapalli District, Andhra Pradesh 531116",
  hours: "Monday to Saturday, 9 AM to 7 PM · Sunday closed",
  areas: ["Narsipatnam and Anakapalli district", "Kakinada", "Kurnool"],
  /** Set NEXT_PUBLIC_SITE_URL in Vercel once the domain is connected. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://suryavastrasolarenergy.com",
} as const;

/** Build a wa.me link with the message pre-filled, exactly as the approved design does. */
export function wa(text: string): string {
  return `https://wa.me/${site.phoneDigits}?text=${encodeURIComponent(text)}`;
}

export const tel = `tel:${site.phoneE164}`;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/home-solar", label: "Home Solar" },
  { href: "/business-solar", label: "Business & Farm" },
  { href: "/store", label: "Solar Store" },
  { href: "/amc-service", label: "AMC & Service" },
  { href: "/cctv-electrical", label: "CCTV & Electrical" },
  { href: "/contact", label: "Contact" },
] as const;
