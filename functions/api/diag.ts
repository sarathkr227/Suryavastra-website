/**
 * TEMPORARY DIAGNOSTIC — delete once the enquiry form is proven working.
 *
 * The form returns 502, meaning functions/api/enquiry.ts could not complete its
 * call to Supabase. The identical request succeeds from a GitHub Actions runner
 * (HTTP 201), and this container cannot reach supabase.co at all, so there is no
 * way to see what Cloudflare's own egress gets back. This endpoint runs the same
 * calls from inside the Worker and reports exactly what happened, as plain JSON
 * in a browser tab.
 *
 * It is a GET so it can be opened by hand. It writes one obviously-marked row.
 */

const DEFAULT_SUPABASE_URL = "https://tyustemnubltqpvcfklm.supabase.co";
const DEFAULT_SUPABASE_KEY = "sb_publishable_CNcwLabAS6745iwrS2j-1A_z-BMUXrM";

type Env = {
  NEXT_PUBLIC_SUPABASE_URL?: string;
  SUPABASE_PUBLISHABLE_KEY?: string;
};

type RequestContext = { request: Request; env: Env };

async function attempt(label: string, run: () => Promise<Response>) {
  const started = Date.now();
  try {
    const res = await run();
    const text = await res.text();
    return {
      label,
      ok: res.ok,
      status: res.status,
      body: text.slice(0, 400),
      ms: Date.now() - started,
    };
  } catch (error) {
    // A throw here, rather than a status, means the Worker could not complete
    // the request at all — DNS, TLS or egress, not anything Supabase said.
    return {
      label,
      ok: false,
      threw: true,
      error: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
      ms: Date.now() - started,
    };
  }
}

export async function onRequestGet(context: RequestContext): Promise<Response> {
  const { env } = context;
  const url = env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const key = env.SUPABASE_PUBLISHABLE_KEY || DEFAULT_SUPABASE_KEY;

  const report = {
    // Which values the Function is actually using, without exposing the key.
    config: {
      urlFromEnv: Boolean(env.NEXT_PUBLIC_SUPABASE_URL),
      keyFromEnv: Boolean(env.SUPABASE_PUBLISHABLE_KEY),
      url,
      keyPrefix: key.slice(0, 18),
      keyLength: key.length,
    },
    checks: [
      // Can the Worker reach anything at all on the public internet?
      await attempt("GET example.com", () => fetch("https://example.com")),
      // Can it reach Supabase without authenticating?
      await attempt("GET supabase root", () => fetch(`${url}/rest/v1/`)),
      // Does the key authenticate, as the keep-alive workflow proves it does?
      await attempt("POST rpc/keepalive", () =>
        fetch(`${url}/rest/v1/rpc/keepalive`, {
          method: "POST",
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: "{}",
        })
      ),
      // The real thing: the exact insert the enquiry Function performs.
      await attempt("POST website_enquiries", () =>
        fetch(`${url}/rest/v1/website_enquiries`, {
          method: "POST",
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            enquiry_type: "general",
            full_name: "DIAG FROM WORKER - delete me",
            mobile_number: "9876500004",
            details: {},
            page_path: "/api/diag",
          }),
        })
      ),
    ],
  };

  return new Response(JSON.stringify(report, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
