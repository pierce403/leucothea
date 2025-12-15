# Notes

This directory is Leucothea’s evolving knowledge base for CNCF-style infrastructure stacks.

## Structure

- `notes/cncf/`: CNCF ecosystem overviews and per-project notes.
- `notes/_sources/`: snapshots and metadata for upstream sources used to generate/refresh notes.

## Updating CNCF project notes

Run:

```bash
python3 scripts/update_cncf_notes.py
```

That script reads from `notes/_sources/cncf-landscape/landscape.yml` and regenerates:

- `notes/cncf/projects/*.md`
- `notes/cncf/INDEX.md`

