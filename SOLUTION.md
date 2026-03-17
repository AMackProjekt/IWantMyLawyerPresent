# Solution File

## Current Locked State
- Project mode: Vite landing app only
- Current commit: 61695a1
- Backup tag: backup-20260316-181247
- Backup zip: backups/iwantmylawyerpresent-20260316-181247.zip

## Latest Updates Applied
- Navbar brand updated to: I want My Lawyer Present.
- Browser tab icon wired to: /images/Bold%20%20Cover.JPG.
- Cart drawer expanded for easier reading of line items and totals.
- Cart breakdown now includes subtotal, tax, shipping, handling, and total.
- Added more women's tees product images and product entries.
- Removed this wording from Support section: Space-saving update: full gallery sets are now transformed into animated marketing reels in the Video Clips section.

## What This Solves
- Prevents Next.js/TypeScript conflicts from legacy app structure.
- Keeps lint/build/dev focused on Vite files.
- Preserves a known-good restore point in both git tag and zip form.

## Run Commands
1. Install dependencies:
   - npm install
2. Start dev server (fixed port):
   - npm run dev -- --port 5173 --strictPort
3. Lint:
   - npm run lint
4. Build:
   - npm run build

## Restore Options
### Option A: Restore exact tagged state
1. Fetch tags:
   - git fetch --tags
2. Check out backup tag:
   - git checkout backup-20260316-181247

### Option B: Restore from zip snapshot
1. Extract:
   - backups/iwantmylawyerpresent-20260316-181247.zip
2. Open extracted folder and run:
   - npm install
   - npm run dev -- --port 5173 --strictPort

## Verification Checklist
- Landing opens at http://localhost:5173/
- npm run lint exits with code 0
- npm run build exits with code 0

## Important Notes
- If port 5173 is busy, stop old dev processes and rerun with strictPort.
- If browser shows stale behavior, hard refresh once.
- Keep this file in the repo root as the single source of recovery steps.
