import "server-only";

import { spawn } from "node:child_process";

export type RunOptions = {
  cwd: string;
};

export async function runGit(args: string[], opts: RunOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn("git", args, {
      cwd: opts.cwd,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");

    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });

    child.on("error", (err) => {
      reject(err);
    });

    child.on("close", (code) => {
      if (code === 0) return resolve(stdout);
      const error = new Error(`git ${args.join(" ")} failed (exit ${code}): ${stderr.trim()}`);
      reject(error);
    });
  });
}

