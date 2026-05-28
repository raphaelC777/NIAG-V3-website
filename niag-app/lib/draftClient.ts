/**
 * Client-side draft helpers.
 *
 * Two layers:
 *   - localStorage (instant, per-browser; survives reloads, tab close)
 *   - /api/draft   (cross-device via cookie, recoverable via ?resume=)
 *
 * On a step change we write both in parallel. On open() we prefer the
 * remote draft (more likely to be fresh after a device switch); we fall
 * back to localStorage if the network call fails.
 */

export interface ClientDraft {
  draftId?: string;
  product: string;
  language: string;
  stepIndex: number;
  answers: Record<string, unknown>;
  abVariant?: string;
  entryPoint?: string;
  landerSlug?: string;
  updatedAt: string;
  createdAt?: string;
}

const LS_PREFIX = "niag_draft_";

function lsKey(product: string) {
  return LS_PREFIX + product;
}

export function saveDraftLocal(draft: ClientDraft): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(lsKey(draft.product), JSON.stringify(draft));
  } catch {
    /* quota / private mode — ignore */
  }
}

export function loadDraftLocal(product: string): ClientDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(lsKey(product));
    if (!raw) return null;
    const d = JSON.parse(raw) as ClientDraft;
    return d && d.product === product ? d : null;
  } catch {
    return null;
  }
}

export function clearDraftLocal(product?: string): void {
  if (typeof window === "undefined") return;
  try {
    if (product) {
      localStorage.removeItem(lsKey(product));
      return;
    }
    // Clear every product's draft.
    Object.keys(localStorage)
      .filter((k) => k.startsWith(LS_PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  } catch {
    /* ignore */
  }
}

/** Look across all stored products for the most recent draft. */
export function loadMostRecentLocalDraft(): ClientDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const candidates: ClientDraft[] = [];
    for (const k of Object.keys(localStorage)) {
      if (!k.startsWith(LS_PREFIX)) continue;
      const raw = localStorage.getItem(k);
      if (!raw) continue;
      try {
        const d = JSON.parse(raw) as ClientDraft;
        if (d && d.product) candidates.push(d);
      } catch { /* skip */ }
    }
    if (!candidates.length) return null;
    candidates.sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));
    return candidates[0];
  } catch {
    return null;
  }
}

export async function saveDraftRemote(
  payload: ClientDraft,
): Promise<{ draftId?: string }> {
  try {
    const r = await fetch("/api/draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    if (!r.ok) return {};
    const data = (await r.json()) as { draftId?: string };
    return { draftId: data.draftId };
  } catch {
    return {};
  }
}

export async function loadDraftRemote(
  draftId?: string,
): Promise<ClientDraft | null> {
  try {
    const qs = draftId ? `?draftId=${encodeURIComponent(draftId)}` : "";
    const r = await fetch("/api/draft" + qs, { cache: "no-store" });
    if (!r.ok) return null;
    const data = (await r.json()) as { draft?: ClientDraft | null };
    return data.draft || null;
  } catch {
    return null;
  }
}

export async function clearDraftRemote(): Promise<void> {
  try {
    await fetch("/api/draft", { method: "DELETE" });
  } catch {
    /* best effort */
  }
}
