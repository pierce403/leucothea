import { NextResponse } from "next/server";

import { listRecentAttackSurfaceEvents } from "@/lib/repos/store";

export const runtime = "nodejs";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const repoId = searchParams.get("repoId") || undefined;
  const limitRaw = Number.parseInt(searchParams.get("limit") || "50", 10);
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 200) : 50;

  const events = await listRecentAttackSurfaceEvents({ limit, repoId });
  return NextResponse.json({ events }, { headers: { "Cache-Control": "no-store" } });
}

