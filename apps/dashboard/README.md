# Leucothea dashboard (WIP)

Local web UI for tracking git repositories and generating a running, heuristic “attack surface change” feed over time.

## Running locally

```bash
cd apps/dashboard
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Storage defaults

- Default DB: **PGlite** stored on disk under `.data/pglite` at the repo root.
- Repo clones: stored under `.data/repos` at the repo root.
- Optional DB: set `DATABASE_URL` to use Postgres instead of PGlite.

### Environment variables

- `DATABASE_URL`: when set, uses Postgres via `pg`.
- `LEUCOTHEA_DB_DRIVER`: `pglite` or `postgres` (optional override).
- `LEUCOTHEA_DATA_DIR`: overrides the default `.data` location (absolute path recommended).
- `LEUCOTHEA_PGLITE_DIR`: overrides only the PGlite storage directory.

## Notes

- The “attack surface commentary” is intentionally conservative and heuristic. Treat it as a review prompt and verify changes in git and runtime configuration.
