import "server-only";

import { getDbReady } from "@/lib/db/migrate";
import type { DbClient } from "@/lib/db";
import type { AttackSurfaceEventRecord, RepoRecord } from "./types";

export async function listRepos(): Promise<RepoRecord[]> {
  const db = await getDbReady();
  const result = await db.query<RepoRecord>("SELECT * FROM repos ORDER BY created_at DESC;");
  return result.rows;
}

export async function getRepoById(id: string): Promise<RepoRecord | null> {
  const db = await getDbReady();
  const result = await db.query<RepoRecord>("SELECT * FROM repos WHERE id = $1;", [id]);
  return result.rows[0] ?? null;
}

export async function getRepoByUrl(url: string): Promise<RepoRecord | null> {
  const db = await getDbReady();
  const result = await db.query<RepoRecord>("SELECT * FROM repos WHERE url = $1;", [url]);
  return result.rows[0] ?? null;
}

export async function insertRepo(repo: Omit<RepoRecord, "created_at">): Promise<void> {
  const db = await getDbReady();
  await db.query(
    `INSERT INTO repos (id, url, name, default_branch, local_path, last_commit, last_synced_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7);`,
    [
      repo.id,
      repo.url,
      repo.name,
      repo.default_branch,
      repo.local_path,
      repo.last_commit,
      repo.last_synced_at,
    ],
  );
}

export async function updateRepoSyncState(params: {
  id: string;
  defaultBranch?: string | null;
  lastCommit?: string | null;
  lastSyncedAt?: string | null;
}): Promise<void> {
  const db = await getDbReady();
  await db.query(
    `UPDATE repos
     SET default_branch = COALESCE($2, default_branch),
         last_commit = COALESCE($3, last_commit),
         last_synced_at = COALESCE($4, last_synced_at)
     WHERE id = $1;`,
    [params.id, params.defaultBranch ?? null, params.lastCommit ?? null, params.lastSyncedAt ?? null],
  );
}

export async function insertCommit(db: DbClient, commit: {
  repoId: string;
  hash: string;
  parentHash: string | null;
  authorName: string | null;
  authorEmail: string | null;
  authoredAt: string | null;
  message: string | null;
}): Promise<void> {
  await db.query(
    `INSERT INTO commits (repo_id, hash, parent_hash, author_name, author_email, authored_at, message)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (repo_id, hash) DO NOTHING;`,
    [
      commit.repoId,
      commit.hash,
      commit.parentHash,
      commit.authorName,
      commit.authorEmail,
      commit.authoredAt,
      commit.message,
    ],
  );
}

export async function insertAttackSurfaceEvent(
  db: DbClient,
  ev: Omit<AttackSurfaceEventRecord, "created_at">,
): Promise<void> {
  await db.query(
    `INSERT INTO attack_surface_events (id, repo_id, commit_hash, kind, severity, summary, details, file_path)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT (id) DO NOTHING;`,
    [ev.id, ev.repo_id, ev.commit_hash, ev.kind, ev.severity, ev.summary, ev.details ?? null, ev.file_path],
  );
}

export async function listRecentAttackSurfaceEvents(params: {
  limit: number;
  repoId?: string;
}): Promise<AttackSurfaceEventRecord[]> {
  const db = await getDbReady();
  if (params.repoId) {
    const result = await db.query<AttackSurfaceEventRecord>(
      `SELECT * FROM attack_surface_events
       WHERE repo_id = $1
       ORDER BY created_at DESC
       LIMIT $2;`,
      [params.repoId, params.limit],
    );
    return result.rows;
  }

  const result = await db.query<AttackSurfaceEventRecord>(
    `SELECT * FROM attack_surface_events
     ORDER BY created_at DESC
     LIMIT $1;`,
    [params.limit],
  );
  return result.rows;
}

