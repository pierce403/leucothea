import { NextResponse } from "next/server";

import { syncAllRepos } from "@/lib/repos/service";

export const runtime = "nodejs";

export async function POST(): Promise<NextResponse> {
  try {
    const result = await syncAllRepos();
    return NextResponse.json({ result }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to sync repos";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

