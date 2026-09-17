import { NextResponse } from "next/server";
import { validateEnquiry } from "@/lib/enquiry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;

/**
 * Small in-memory throttle. It only covers a single warm serverless instance,
 * which is enough to stop a form being hammered; the honeypot and the database
 * CHECK constraints do the rest.
 */
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

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

export async function POST(request: Request) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("Supabase environment variables are not set.");
    return NextResponse.json(
      { error: "We could not save your details. Please WhatsApp or call us." },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  // Honeypot: a real person never sees this field, so anything in it is a bot.
  // Answer 200 so the bot has nothing to learn from the response.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages just now. Please call or WhatsApp us." },
      { status: 429 }
    );
  }

  const parsed = validateEnquiry(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/website_enquiries`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(parsed.value),
  });

  if (!response.ok) {
    console.error("Supabase insert failed", response.status, await response.text());
    return NextResponse.json(
      { error: "We could not save your details. Please WhatsApp or call us." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
