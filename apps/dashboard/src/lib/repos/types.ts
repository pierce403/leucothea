export type RepoRecord = {
  id: string;
  url: string;
  name: string | null;
  default_branch: string | null;
  local_path: string;
  last_commit: string | null;
  last_synced_at: string | null;
  created_at: string;
};

export type AttackSurfaceEventRecord = {
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

