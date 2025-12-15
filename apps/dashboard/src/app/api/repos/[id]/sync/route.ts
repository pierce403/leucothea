import { NextResponse } from "next/server";

import { syncRepo } from "@/lib/repos/service";

export const runtime = "nodejs";

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await context.params;
  if (!id) return NextResponse.json({ error: "Missing repo id" }, { status: 400 });

  try {
    const result = await syncRepo(id);
    return NextResponse.json({ result }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to sync repo";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

