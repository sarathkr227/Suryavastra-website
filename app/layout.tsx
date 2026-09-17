import type { Metadata } from "next";
import type { ReactNode } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Solar, service and security in Narsipatnam`,
    template: `%s — ${site.name}`,
  },
  description:
    "PM Suryaghar rooftop solar, business and farm solar, solar products store, AMC plans from ₹2,999, and CCTV in Narsipatnam, Andhra Pradesh.",
  applicationName: site.name,
  keywords: [
    "rooftop solar Narsipatnam",
    "PM Suryaghar vendor Anakapalli",
    "solar subsidy Andhra Pradesh",
    "solar AMC service",
    "solar store Narsipatnam",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  legalName: site.legalName,
  slogan: site.tagline,
  url: site.url,
  telephone: site.phoneE164,
  email: site.email,
  image: `${site.url}/opengraph-image`,
  description:
    "PM Suryaghar registered rooftop solar vendor in Narsipatnam, Andhra Pradesh. Home and business solar, solar products, AMC and service, CCTV and electrical work.",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  hasMap: site.mapsUrl,
  areaServed: site.areas.map((name) => ({ "@type": "Place", name })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  identifier: { "@type": "PropertyValue", name: "GSTIN", value: site.gstin },
  makesOffer: [
    "Rooftop solar installation under PM Suryaghar",
    "Business and farm solar",
    "Solar products store",
    "Solar annual maintenance contracts",
    "CCTV and electrical work",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
