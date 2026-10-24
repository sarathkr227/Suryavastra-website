import type { MetadataRoute } from "next";
import { nav, site } from "@/lib/site";

// Written once at build time, because a static export has no server to
// generate it per request.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return nav.map((item) => ({
    url: new URL(item.href, site.url).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
