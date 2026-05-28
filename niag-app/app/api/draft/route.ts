import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { saveDraft, loadDraft, deleteDraft, type Draft } from "@/lib/draftStorage";
import { clientIp } from "@/lib/geo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE_NAME = "niag_draft_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function setDraftCookie(draftId: string) {
  cookies().set(COOKIE_NAME, draftId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

interface UpsertBody {
  draftId?: string;
  product: string;
  language?: string;
  stepIndex?: number;
  answers?: Record<string, unknown>;
  utm?: Record<string, string | null | undefined>;
  abVariant?: string;
  entryPoint?: string;
  landerSlug?: string;
  createdAt?: string;
}

export async function POST(req: Request) {
  let body: UpsertBody;
  try { body = (await req.json()) as UpsertBody; }
  catch { return NextResponse.json({ ok: false, reason: "invalid_json" }, { status: 400 }); }

  if (!body.product) {
    return NextResponse.json({ ok: false, reason: "missing_product" }, { status: 400 });
  }

  const existing = cookies().get(COOKIE_NAME)?.value;
  const draftId = body.draftId || existing || randomUUID();

  const draft: Draft = {
    draftId,
    product: body.product,
    language: body.language === "es" ? "es" : "en",
    stepIndex: typeof body.stepIndex === "number" ? body.stepIndex : 0,
    answers: body.answers || {},
    utm: body.utm,
    abVariant: body.abVariant,
    entryPoint: body.entryPoint,
    landerSlug: body.landerSlug,
    ipAddress: clientIp(req),
    userAgent: req.headers.get("user-agent") || undefined,
    createdAt: body.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    await saveDraft(draft);
  } catch {
    // Don't fail the form just because the draft store is down — the
    // client still has localStorage as a fallback.
    return NextResponse.json({ ok: false, reason: "store_unavailable", draftId });
  }

  if (existing !== draftId) setDraftCookie(draftId);

  return NextResponse.json({ ok: true, draftId });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const fromUrl = url.searchParams.get("draftId");
  const fromCookie = cookies().get(COOKIE_NAME)?.value;
  const draftId = fromUrl || fromCookie;
  if (!draftId) return NextResponse.json({ ok: true, draft: null });
  const draft = await loadDraft(draftId);
  // If user followed a resume link, re-bind the cookie to that draftId.
  if (fromUrl && draft && fromCookie !== fromUrl) setDraftCookie(fromUrl);
  return NextResponse.json({ ok: true, draft });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const draftId = url.searchParams.get("draftId") || cookies().get(COOKIE_NAME)?.value;
  if (draftId) await deleteDraft(draftId);
  // Clear the cookie regardless of whether we found a draft to delete.
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return NextResponse.json({ ok: true });
}
