import { validateEnquiry } from "../../lib/enquiry";

/**
 * Cloudflare Pages runs this at /api/enquiry. It replaces the Next.js route
 * handler, which a static export cannot keep, and does the same work: drop
 * bots, validate, throttle, insert one row.
 *
 * NEXT_PUBLIC_SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY have to be set as
 * Pages environment variables — a Function reads them from the request context,
 * not from process.env, so the values baked into the static build never reach it.
 */

type Env = {
  NEXT_PUBLIC_SUPABASE_URL?: string;
  SUPABASE_PUBLISHABLE_KEY?: string;
};

type RequestContext = {
  request: Request;
  env: Env;
};

const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;

/**
 * Deliberately generous. Most customers here reach us over Jio or Airtel
 * mobile, where carrier-grade NAT puts a whole town behind a handful of public
 * addresses, so a tight per-address limit locks out real people who have done
 * nothing wrong. The honeypot and the table's CHECK constraints carry the rest.
 */
const MAX_PER_WINDOW = 15;

/** Throttles per isolate, so this slows one address rather than capping the form. */
function rateLimited(ip: string): boolean {
  const now = Date.now();

  // Clear windows that have expired, so addresses seen once do not accumulate
  // for as long as the isolate happens to live.
  for (const [seenIp, seen] of hits) {
    if (now > seen.resetAt) hits.delete(seenIp);
  }

  const entry = hits.get(ip);
  if (!entry) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

/**
 * public/_headers only covers static assets, so a Function has to set its own.
 * The headers() block this migration removed from next.config.mjs matched
 * "/:path*", which included this endpoint.
 */
const RESPONSE_HEADERS = {
  "Content-Type": "application/json",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "Cache-Control": "no-store",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: RESPONSE_HEADERS });
}

const SAVE_FAILED = "We could not save your details. Please WhatsApp or call us.";

export async function onRequestPost(context: RequestContext): Promise<Response> {
  try {
    const { request, env } = context;
    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = env.SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase environment variables are not set.");
      return json({ error: SAVE_FAILED }, 503);
    }

    let body: Record<string, unknown>;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return json({ error: "Bad request." }, 400);
    }

    // Honeypot: a real person never sees this field, so anything in it is a bot.
    // Answer 200 so the bot has nothing to learn from the response.
    if (typeof body.company === "string" && body.company.trim() !== "") {
      return json({ ok: true });
    }

    const parsed = validateEnquiry(body);
    if (!parsed.ok) {
      return json({ error: parsed.error }, 400);
    }

    // Counted only once the submission is well formed, so a customer who
    // mistypes their mobile number a few times does not spend their own budget
    // and get told to stop. cf-connecting-ip is the address Cloudflare itself
    // saw, so unlike x-forwarded-for a client cannot set it.
    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    if (rateLimited(ip)) {
      return json(
        { error: "Too many messages just now. Please call or WhatsApp us." },
        429
      );
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/website_enquiries`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(parsed.value),
    });

    if (!response.ok) {
      console.error("Supabase insert failed", response.status, await response.text());
      return json({ error: SAVE_FAILED }, 502);
    }

    return json({ ok: true });
  } catch (error) {
    // Without this, a thrown fetch (Supabase unreachable rather than erroring)
    // or an unexpected field type answers with a plain-text 500. The form reads
    // JSON, so it would fall into its catch and show the wrong message.
    console.error("Enquiry function failed", error);
    return json({ error: SAVE_FAILED }, 502);
  }
}
