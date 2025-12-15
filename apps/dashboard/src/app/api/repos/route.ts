import { NextResponse } from "next/server";

import { addRepo } from "@/lib/repos/service";
import { listRepos } from "@/lib/repos/store";

export const runtime = "nodejs";

export async function GET(): Promise<NextResponse> {
  const repos = await listRepos();
  return NextResponse.json({ repos }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json().catch(() => null);
  const url = typeof body?.url === "string" ? body.url : "";
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  try {
    const repo = await addRepo(url);
    return NextResponse.json({ repo }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to add repo";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

