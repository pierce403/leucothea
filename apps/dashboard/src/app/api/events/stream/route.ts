import { getDbReady } from "@/lib/db/migrate";
import type { AttackSurfaceEventRecord } from "@/lib/repos/types";

export const runtime = "nodejs";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const repoId = searchParams.get("repoId");
  const sinceParam = searchParams.get("since");
  const since = sinceParam && !Number.isNaN(Date.parse(sinceParam)) ? sinceParam : new Date(0).toISOString();

  const db = await getDbReady();
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    start: async (controller) => {
      const send = (data: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      send({ type: "hello", since, repoId });

      let cursor = since;
      let idsAtCursor = new Set<string>();

      try {
        while (!request.signal.aborted) {
          const queryBase = repoId
            ? `SELECT * FROM attack_surface_events
               WHERE repo_id = $1 AND created_at >= $2
               ORDER BY created_at ASC
               LIMIT 200;`
            : `SELECT * FROM attack_surface_events
               WHERE created_at >= $1
               ORDER BY created_at ASC
               LIMIT 200;`;

          const params = repoId ? [repoId, cursor] : [cursor];
          const result = await db.query<AttackSurfaceEventRecord>(queryBase, params);

          let advanced = false;
          for (const row of result.rows) {
            if (row.created_at !== cursor) {
              cursor = row.created_at;
              idsAtCursor = new Set<string>();
              advanced = true;
            }
            if (idsAtCursor.has(row.id)) continue;
            idsAtCursor.add(row.id);
            send({ type: "event", event: row });
          }

          // Keep the connection alive even if nothing changes.
          if (!advanced) {
            send({ type: "ping", at: new Date().toISOString() });
          }

          await sleep(1000);
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Connection: "keep-alive",
    },
  });
}
