import "server-only";

import { PGlite } from "@electric-sql/pglite";
import { Pool } from "pg";
import fs from "node:fs/promises";
import path from "node:path";

import { dataDir } from "@/lib/paths";

export type DbQueryResult<Row extends Record<string, unknown> = Record<string, unknown>> = {
  rows: Row[];
};

export interface DbClient {
  query<Row extends Record<string, unknown> = Record<string, unknown>>(
    sql: string,
    params?: unknown[],
  ): Promise<DbQueryResult<Row>>;
}

type DbDriver = "pglite" | "postgres";

function selectDbDriver(): DbDriver {
  const explicit = (process.env.LEUCOTHEA_DB_DRIVER || "").toLowerCase();
  if (explicit === "postgres" || explicit === "pglite") return explicit;
  if (process.env.DATABASE_URL) return "postgres";
  return "pglite";
}

async function createPgliteClient(): Promise<DbClient> {
  const dir = process.env.LEUCOTHEA_PGLITE_DIR || path.join(dataDir(), "pglite");
  await fs.mkdir(dir, { recursive: true });
  const db = new PGlite(dir);
  return db;
}

function createPostgresClient(): DbClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required when LEUCOTHEA_DB_DRIVER=postgres.");
  }
  const pool = new Pool({ connectionString });
  return {
    async query<Row extends Record<string, unknown>>(sql: string, params?: unknown[]) {
      const result = await pool.query(sql, params);
      return { rows: result.rows as unknown as Row[] };
    },
  };
}

declare global {
  var __leucotheaDb: DbClient | undefined;
}

export async function getDb(): Promise<DbClient> {
  if (globalThis.__leucotheaDb) return globalThis.__leucotheaDb;
  const driver = selectDbDriver();
  globalThis.__leucotheaDb =
    driver === "postgres" ? createPostgresClient() : await createPgliteClient();
  return globalThis.__leucotheaDb;
}
