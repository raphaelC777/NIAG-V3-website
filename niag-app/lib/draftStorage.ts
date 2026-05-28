/**
 * Partial-form draft storage.
 *
 * Backed by Vercel KV (or any Upstash-compatible REST endpoint). When the
 * env vars are not configured we fall back to an in-memory map so local dev
 * works without spinning up Redis. The fallback is process-scoped and
 * intentionally evaporates on restart — never use it in production.
 *
 * Compliance notes:
 *  - TTL is 7 days, then the draft is auto-deleted.
 *  - TCPA consent state is stripped before persistence — the user must
 *    re-accept consent each session.
 *  - ipAddress is stored as an audit field, NOT used as a lookup key.
 *    (Same-IP matching across users is a privacy leak — different people
 *    on the same NAT would see each other's progress.)
 */

export interface Draft {
  draftId: string;
  product: string;
  language: string;
  stepIndex: number;
  answers: Record<string, unknown>;
  utm?: Record<string, string | null | undefined>;
  abVariant?: string;
  entryPoint?: string;
  landerSlug?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
}

const TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

const memStore = new Map<string, { value: string; expiresAt: number }>();

function kvEnv(): { url: string; token: string } | null {
  const url =
    process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

/** Execute a single Redis command via the Upstash/Vercel KV REST API. */
async function kvCommand(command: unknown[]): Promise<unknown> {
  const env = kvEnv();
  if (!env) throw new Error("kv_not_configured");
  const r = await fetch(env.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`kv_${r.status}`);
  const data = (await r.json()) as { result?: unknown };
  return data.result;
}

function key(draftId: string) {
  return `niag:draft:${draftId}`;
}

export async function saveDraft(draft: Draft): Promise<void> {
  // Strip TCPA consent — must be re-accepted every session.
  const answers = { ...(draft.answers || {}) };
  delete (answers as Record<string, unknown>).consent;
  const clean: Draft = {
    ...draft,
    answers,
    updatedAt: new Date().toISOString(),
  };
  const value = JSON.stringify(clean);
  if (kvEnv()) {
    await kvCommand(["SET", key(draft.draftId), value, "EX", String(TTL_SECONDS)]);
    return;
  }
  memStore.set(key(draft.draftId), {
    value,
    expiresAt: Date.now() + TTL_SECONDS * 1000,
  });
}

export async function loadDraft(draftId: string): Promise<Draft | null> {
  let raw: unknown = null;
  if (kvEnv()) {
    try {
      raw = await kvCommand(["GET", key(draftId)]);
    } catch {
      return null;
    }
  } else {
    const cached = memStore.get(key(draftId));
    if (!cached) return null;
    if (cached.expiresAt < Date.now()) {
      memStore.delete(key(draftId));
      return null;
    }
    raw = cached.value;
  }
  if (!raw || typeof raw !== "string") return null;
  try {
    return JSON.parse(raw) as Draft;
  } catch {
    return null;
  }
}

export async function deleteDraft(draftId: string): Promise<void> {
  if (kvEnv()) {
    try {
      await kvCommand(["DEL", key(draftId)]);
    } catch { /* best-effort */ }
    return;
  }
  memStore.delete(key(draftId));
}
