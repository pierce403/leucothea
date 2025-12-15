import "server-only";

import fs from "node:fs";
import path from "node:path";

let cachedRepoRoot: string | undefined;

export function repoRoot(): string {
  if (cachedRepoRoot) return cachedRepoRoot;

  let current = process.cwd();
  while (true) {
    if (fs.existsSync(path.join(current, ".git"))) {
      cachedRepoRoot = current;
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }

  cachedRepoRoot = process.cwd();
  return cachedRepoRoot;
}

export function dataDir(): string {
  return process.env.LEUCOTHEA_DATA_DIR || path.join(repoRoot(), ".data");
}

export function reposDir(): string {
  return path.join(dataDir(), "repos");
}

