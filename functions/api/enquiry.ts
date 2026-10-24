import { validateEnquiry } from "../../lib/enquiry";

/**
 * Cloudflare Pages runs this at /api/enquiry. It replaces the Next.js route
 * handler, which a static export cannot keep, and does the same three jobs in
 * the same order: drop bots, throttle a flood, insert one validated row.
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
const MAX_PER_WINDOW = 5;

/**
 * Throttles per isolate rather than per account, which is the same guarantee the
 * Vercel route gave: enough to stop one address hammering the form, while the
 * honeypot and the database CHECK constraints do the rest.
 */
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost(context: RequestContext): Promise<Response> {
  const { request, env } = context;
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase environment variables are not set.");
    return json(
      { error: "We could not save your details. Please WhatsApp or call us." },
      503
    );
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

  // cf-connecting-ip is the address Cloudflare itself saw, so it cannot be
  // spoofed by a client header the way x-forwarded-for can.
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

  const parsed = validateEnquiry(body);
  if (!parsed.ok) {
    return json({ error: parsed.error }, 400);
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
    return json(
      { error: "We could not save your details. Please WhatsApp or call us." },
      502
    );
  }

  return json({ ok: true });
}
