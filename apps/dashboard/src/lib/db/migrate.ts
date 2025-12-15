import "server-only";

import { getDb, type DbClient } from "./index";

type Migration = {
  version: number;
  name: string;
  up: (db: DbClient) => Promise<void>;
};

const migrations: Migration[] = [
  {
    version: 1,
    name: "initial schema",
    async up(db) {
      await db.query(`
        CREATE TABLE IF NOT EXISTS repos (
          id TEXT PRIMARY KEY,
          url TEXT NOT NULL UNIQUE,
          name TEXT,
          default_branch TEXT,
          local_path TEXT NOT NULL,
          last_commit TEXT,
          last_synced_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);

      await db.query(`
        CREATE TABLE IF NOT EXISTS commits (
          repo_id TEXT NOT NULL REFERENCES repos(id) ON DELETE CASCADE,
          hash TEXT NOT NULL,
          parent_hash TEXT,
          author_name TEXT,
          author_email TEXT,
          authored_at TIMESTAMPTZ,
          message TEXT,
          PRIMARY KEY (repo_id, hash)
        );
      `);

      await db.query(`
        CREATE TABLE IF NOT EXISTS attack_surface_events (
          id TEXT PRIMARY KEY,
          repo_id TEXT NOT NULL REFERENCES repos(id) ON DELETE CASCADE,
          commit_hash TEXT,
          kind TEXT NOT NULL,
          severity INTEGER NOT NULL,
          summary TEXT NOT NULL,
          details JSONB,
          file_path TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);

      await db.query(
        "CREATE INDEX IF NOT EXISTS attack_surface_events_repo_created_at_idx ON attack_surface_events (repo_id, created_at DESC);",
      );
      await db.query(
        "CREATE INDEX IF NOT EXISTS commits_repo_authored_at_idx ON commits (repo_id, authored_at DESC);",
      );
    },
  },
];

declare global {
  var __leucotheaDbReady: Promise<DbClient> | undefined;
}

async function ensureSchema(db: DbClient): Promise<void> {
  await db.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  const result = await db.query<{ version: number | null }>("SELECT MAX(version) AS version FROM schema_migrations;");
  const currentVersion = result.rows[0]?.version ?? 0;
  const pending = migrations.filter((m) => m.version > currentVersion).sort((a, b) => a.version - b.version);

  for (const m of pending) {
    await m.up(db);
    await db.query("INSERT INTO schema_migrations (version, name) VALUES ($1, $2);", [m.version, m.name]);
  }
}

export async function getDbReady(): Promise<DbClient> {
  if (!globalThis.__leucotheaDbReady) {
    globalThis.__leucotheaDbReady = (async () => {
      const db = await getDb();
      await ensureSchema(db);
      return db;
    })();
  }
  return globalThis.__leucotheaDbReady;
}
