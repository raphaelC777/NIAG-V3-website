import { NextResponse } from "next/server";
import type { LeadPayload } from "@/types/lead";
import { isProduct } from "@/lib/products";
import { validateLeadAnswers } from "@/lib/validators";
import { verifyBotToken } from "@/lib/botProtection";
import { buildNormalizedLead, sendToGoHighLevel, sendToLeadProsper } from "@/lib/leadPayload";
import { clientIp } from "@/lib/geo";

export const runtime = "nodejs";

interface Resp { ok: boolean; leadId?: string; reason?: string; errors?: string[]; partner?: Record<string, unknown> }

export async function POST(req: Request): Promise<NextResponse<Resp>> {
  let body: LeadPayload;
  try { body = (await req.json()) as LeadPayload; }
  catch { return NextResponse.json({ ok: false, reason: "invalid_json" }, { status: 400 }); }

  if (!body || !isProduct(body.productType)) {
    return NextResponse.json({ ok: false, reason: "invalid_product" }, { status: 400 });
  }
  const fieldErrors = validateLeadAnswers(body.productType, body.answers || {});
  if (fieldErrors.length) {
    return NextResponse.json({ ok: false, reason: "invalid_fields", errors: fieldErrors }, { status: 400 });
  }
  if (!body.consent?.tcpaConsent) {
    return NextResponse.json({ ok: false, reason: "tcpa_required" }, { status: 400 });
  }

  // Bot verification (always server-side)
  const bot = await verifyBotToken(body.botToken, undefined, clientIp(req));
  if (!bot.ok) {
    return NextResponse.json({ ok: false, reason: `bot_check_failed:${bot.reason || "unknown"}` }, { status: 403 });
  }

  // Build normalized lead with server context
  const lead = buildNormalizedLead(body, {
    leadSourceUrl: req.headers.get("referer") || undefined,
    ipAddress: clientIp(req),
    userAgent: req.headers.get("user-agent") || undefined,
  });

  // Deliver to partners (best-effort; never block on a partner failing if the other succeeds)
  const [lp, ghl] = await Promise.all([
    sendToLeadProsper(lead.partnerPayload),
    sendToGoHighLevel(lead.partnerPayload),
  ]);

  // Treat the submission as successful if at least one configured partner accepted.
  // In dev, mock_dev counts as accepted.
  const accepted = lp.ok || ghl.ok;
  if (!accepted) {
    return NextResponse.json(
      { ok: false, reason: `delivery_failed:${lp.reason || ""}|${ghl.reason || ""}` },
      { status: 502 },
    );
  }

  const leadId = `NIAG-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`.toUpperCase();
  return NextResponse.json({
    ok: true,
    leadId,
    partner: { leadprosper: lp, gohighlevel: ghl },
  });
}
