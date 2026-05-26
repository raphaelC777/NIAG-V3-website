/** Server-only geolocation helpers. */
import { headers as nextHeaders } from "next/headers";

export interface GeoResult {
  city?: string;
  region?: string;
  country?: string;
  postal?: string;
  source: "vercel" | "ipapi" | "none";
  confidence: "city" | "region" | "postal-estimated" | "none";
}

/** Read Vercel-provided headers in any RSC / route handler. */
export function geoFromVercelHeaders(): GeoResult {
  try {
    const h = nextHeaders();
    const country = h.get("x-vercel-ip-country") || undefined;
    const region  = h.get("x-vercel-ip-country-region") || undefined;
    const city    = h.get("x-vercel-ip-city")
      ? decodeURIComponent(h.get("x-vercel-ip-city") as string)
      : undefined;
    const postal  = h.get("x-vercel-ip-postal-code") || undefined;
    if (city || region || country || postal) {
      const confidence = postal ? "postal-estimated" : city ? "city" : region ? "region" : "none";
      return { city, region, country, postal, source: "vercel", confidence };
    }
  } catch { /* not available in this runtime */ }
  return { source: "none", confidence: "none" };
}

/** Optional fallback: query ipapi.co server-side with the caller IP. */
export async function geoFromIpapi(ip?: string): Promise<GeoResult> {
  if (!ip) return { source: "none", confidence: "none" };
  const token = process.env.IPAPI_TOKEN;
  const url = token
    ? `https://ipapi.co/${encodeURIComponent(ip)}/json/?key=${token}`
    : `https://ipapi.co/${encodeURIComponent(ip)}/json/`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return { source: "none", confidence: "none" };
    const data = await res.json();
    return {
      city: data.city, region: data.region, country: data.country,
      postal: data.postal,
      source: "ipapi",
      confidence: data.postal ? "postal-estimated" : data.city ? "city" : "none",
    };
  } catch {
    return { source: "none", confidence: "none" };
  }
}

export function clientIp(req: Request): string | undefined {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || undefined;
}
