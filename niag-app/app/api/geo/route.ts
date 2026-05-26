import { NextResponse } from "next/server";
import { clientIp, geoFromIpapi, geoFromVercelHeaders } from "@/lib/geo";

export const runtime = "edge";

export async function GET(req: Request) {
  // Try Vercel headers first
  const fromVercel = geoFromVercelHeaders();
  if (fromVercel.source !== "none") return NextResponse.json(fromVercel);

  // Optional fallback (server-side only, do not expose IP to client)
  const ip = clientIp(req);
  const fromIpapi = await geoFromIpapi(ip);
  return NextResponse.json(fromIpapi);
}
