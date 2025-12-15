"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

type Repo = {
  id: string;
  url: string;
  name: string | null;
  default_branch: string | null;
  last_commit: string | null;
  last_synced_at: string | null;
  created_at: string;
};

type AttackSurfaceEvent = {
  id: string;
  repo_id: string;
  commit_hash: string | null;
  kind: string;
  severity: number;
  summary: string;
  details: unknown;
  file_path: string | null;
  created_at: string;
};

function badgeForKind(kind: string): string {
  switch (kind) {
    case "exposure":
      return "bg-rose-600/15 text-rose-200 ring-1 ring-inset ring-rose-500/30";
    case "privilege":
      return "bg-orange-600/15 text-orange-200 ring-1 ring-inset ring-orange-500/30";
    case "ci-security":
      return "bg-fuchsia-600/15 text-fuchsia-200 ring-1 ring-inset ring-fuchsia-500/30";
    case "supply-chain":
      return "bg-amber-600/15 text-amber-200 ring-1 ring-inset ring-amber-500/30";
    case "security-control":
      return "bg-emerald-600/15 text-emerald-200 ring-1 ring-inset ring-emerald-500/30";
    case "repo-history":
      return "bg-zinc-600/20 text-zinc-200 ring-1 ring-inset ring-zinc-500/30";
    case "sync":
    case "info":
      return "bg-sky-600/15 text-sky-200 ring-1 ring-inset ring-sky-500/30";
    default:
      return "bg-zinc-600/20 text-zinc-200 ring-1 ring-inset ring-zinc-500/30";
  }
}

function severityLabel(sev: number): string {
  if (sev >= 5) return "S5";
  if (sev >= 4) return "S4";
  if (sev >= 3) return "S3";
  if (sev >= 2) return "S2";
  return "S1";
}

export default function DashboardClient(props: { initialRepos: Repo[]; initialEvents: AttackSurfaceEvent[] }) {
  const [repos, setRepos] = useState<Repo[]>(props.initialRepos);
  const [events, setEvents] = useState<AttackSurfaceEvent[]>(props.initialEvents);
  const [repoUrl, setRepoUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const seenEventIds = useRef(new Set<string>());

  useEffect(() => {
    for (const e of props.initialEvents) seenEventIds.current.add(e.id);
  }, [props.initialEvents]);

  const hasRepos = repos.length > 0;

  async function refresh(): Promise<void> {
    const [reposRes, eventsRes] = await Promise.all([
      fetch("/api/repos", { cache: "no-store" }),
      fetch("/api/events?limit=50", { cache: "no-store" }),
    ]);
    const reposJson = await reposRes.json();
    const eventsJson = await eventsRes.json();
    setRepos(reposJson.repos || []);
    setEvents(eventsJson.events || []);
    for (const e of eventsJson.events || []) seenEventIds.current.add(e.id);
  }

  async function onAddRepo(e: FormEvent): Promise<void> {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/repos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: repoUrl }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to add repo");
      setRepoUrl("");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add repo");
    } finally {
      setBusy(false);
    }
  }

  async function onSyncAll(): Promise<void> {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/sync", { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to sync");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sync");
    } finally {
      setBusy(false);
    }
  }

  async function onSyncRepo(id: string): Promise<void> {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/repos/${id}/sync`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to sync repo");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sync repo");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    const es = new EventSource("/api/events/stream?since=" + encodeURIComponent(new Date().toISOString()));
    es.onmessage = (msg) => {
      try {
        const payload = JSON.parse(msg.data);
        if (payload?.type !== "event") return;
        const ev: AttackSurfaceEvent = payload.event;
        if (!ev?.id) return;
        if (seenEventIds.current.has(ev.id)) return;
        seenEventIds.current.add(ev.id);
        setEvents((prev) => [ev, ...prev].slice(0, 200));
      } catch {
        // ignore
      }
    };
    es.onerror = () => {
      // browser will retry automatically
    };
    return () => {
      es.close();
    };
  }, []);

  useEffect(() => {
    if (!hasRepos) return;
    const id = setInterval(() => {
      void onSyncAll();
    }, 60_000);
    return () => clearInterval(id);
  }, [hasRepos]);

  const reposById = useMemo(() => new Map(repos.map((r) => [r.id, r])), [repos]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Leucothea</h1>
              <p className="mt-1 text-sm text-zinc-300">
                CNCF stack companion — repo tracking + attack surface commentary (heuristic, verify changes).
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onSyncAll}
                disabled={!hasRepos || busy}
                className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-inset ring-white/10 hover:bg-white/15 disabled:opacity-50"
              >
                Sync all
              </button>
              <button
                type="button"
                onClick={() => void refresh()}
                disabled={busy}
                className="rounded-md bg-white/5 px-4 py-2 text-sm font-medium text-white ring-1 ring-inset ring-white/10 hover:bg-white/10 disabled:opacity-50"
              >
                Refresh
              </button>
            </div>
          </div>

          <form onSubmit={onAddRepo} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <label className="sr-only" htmlFor="repoUrl">
                Git repository URL
              </label>
              <input
                id="repoUrl"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/org/repo.git"
                className="w-full rounded-md bg-white/5 px-4 py-2 text-sm text-white ring-1 ring-inset ring-white/10 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <button
              type="submit"
              disabled={busy || !repoUrl.trim()}
              className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500 disabled:opacity-50"
            >
              Add repo
            </button>
          </form>

          {error ? (
            <div className="mt-4 rounded-md border border-rose-500/30 bg-rose-600/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="rounded-lg border border-white/10 bg-white/[0.03] p-5 lg:col-span-1">
            <h2 className="text-sm font-semibold tracking-wide text-zinc-200">Tracked repositories</h2>
            <p className="mt-1 text-xs text-zinc-400">
              Stored locally by default (PGlite). Set <code className="text-zinc-200">DATABASE_URL</code> to use Postgres.
            </p>
            <div className="mt-4 space-y-3">
              {repos.length === 0 ? (
                <div className="rounded-md border border-white/10 bg-white/[0.02] p-4 text-sm text-zinc-300">
                  Add a repo to start tracking changes.
                </div>
              ) : (
                repos.map((r) => (
                  <div key={r.id} className="rounded-md border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-zinc-100">{r.name || r.url}</div>
                        <div className="mt-1 truncate text-xs text-zinc-400">{r.url}</div>
                        <div className="mt-2 text-xs text-zinc-400">
                          Branch: <span className="text-zinc-200">{r.default_branch || "unknown"}</span>
                        </div>
                        <div className="mt-1 text-xs text-zinc-400">
                          Last sync:{" "}
                          <span className="text-zinc-200">
                            {r.last_synced_at ? new Date(r.last_synced_at).toLocaleString() : "never"}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void onSyncRepo(r.id)}
                        className="shrink-0 rounded-md bg-white/5 px-3 py-2 text-xs font-semibold text-white ring-1 ring-inset ring-white/10 hover:bg-white/10 disabled:opacity-50"
                      >
                        Sync
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.03] p-5 lg:col-span-2">
            <h2 className="text-sm font-semibold tracking-wide text-zinc-200">Attack surface commentary</h2>
            <p className="mt-1 text-xs text-zinc-400">
              Signals are heuristic. Treat this feed as “review prompts”, not ground truth.
            </p>

            <div className="mt-4 space-y-3">
              {events.length === 0 ? (
                <div className="rounded-md border border-white/10 bg-white/[0.02] p-4 text-sm text-zinc-300">
                  No events yet. Sync a repo to generate signals.
                </div>
              ) : (
                events.map((ev) => {
                  const repo = reposById.get(ev.repo_id);
                  return (
                    <div key={ev.id} className="rounded-md border border-white/10 bg-white/[0.02] p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={
                            "inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium " +
                            badgeForKind(ev.kind)
                          }
                        >
                          {ev.kind}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-white/5 px-2 py-1 text-[11px] font-medium text-zinc-200 ring-1 ring-inset ring-white/10">
                          {severityLabel(ev.severity)}
                        </span>
                        <span className="text-xs text-zinc-400">
                          {repo?.name || repo?.url || ev.repo_id}
                        </span>
                        <span className="text-xs text-zinc-500">·</span>
                        <span className="text-xs text-zinc-400">{new Date(ev.created_at).toLocaleString()}</span>
                        {ev.file_path ? (
                          <>
                            <span className="text-xs text-zinc-500">·</span>
                            <span className="truncate text-xs text-zinc-400">{ev.file_path}</span>
                          </>
                        ) : null}
                      </div>
                      <div className="mt-2 text-sm text-zinc-100">{ev.summary}</div>
                      {ev.commit_hash ? (
                        <div className="mt-2 font-mono text-xs text-zinc-500">
                          commit {ev.commit_hash.slice(0, 12)}
                        </div>
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
