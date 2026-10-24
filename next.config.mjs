/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Cloudflare Pages serves the build as plain static files, so every page is
   * exported at build time. The one dynamic endpoint the site needs lives in
   * functions/api/enquiry.ts, which Cloudflare runs at /api/enquiry.
   */
  output: "export",
  poweredByHeader: false,
  /**
   * A static export has no server to attach response headers, so the security
   * headers moved to public/_headers, which Cloudflare applies at the edge.
   */
};

export default nextConfig;
