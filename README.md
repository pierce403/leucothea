# Leucothea

Leucothea is an agentic helper for CNCF-based infrastructure stacks. The goal is to help people **understand what they have**, **set up what they need**, and **continuously reduce risk** (especially security/attack surface) as systems evolve.

## What’s in this repo (right now)

- `AGENTS.md`: persona + repo directives for Leucothea.
- `notes/`: a Markdown knowledge base, including generated per-project notes for CNCF-hosted projects.
- `scripts/update_cncf_notes.py`: regenerates `notes/cncf/projects/*.md` and `notes/cncf/INDEX.md` from the CNCF Landscape snapshot.
- `apps/dashboard/`: Next.js dashboard (WIP) for repo tracking + attack surface commentary.

## Quick start

```bash
python3 scripts/update_cncf_notes.py
```

Then start in `notes/cncf/INDEX.md`.

## Dashboard (WIP)

```bash
cd apps/dashboard
npm install
npm run dev
```

By default the dashboard stores data in a local PGlite database under `.data/` (ignored by git). Set `DATABASE_URL` to use Postgres instead.
