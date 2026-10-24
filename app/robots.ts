import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Until the real domain is connected, the site runs on a temporary vercel.app
 * address. Search engines are kept off that address so it never competes with
 * suryavastrasolarenergy.com in Google. Set SITE_LIVE=true when the domain is live.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_LIVE !== "true") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
