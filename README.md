# Plan01

A 100-day study dashboard for switching jobs, kept with discipline: **40 hours a week**, every day from Mon 26/10/2026 to Tue 02/02/2027 (start date can be changed).

| Area | Track | Hours / week |
|---|---|---|
| I. NewJob | Rust: Learn Rust → Rust for Solana → Rust for core chain (Layer 2) | 20.5h |
| II. Solidity | Overview → upgrade knowledge (Foundry, security, DeFi) → interview | 6.75h |
| III. English | English for interviews | 5.75h |
| I.4 + II.3 | Technical interview prep | 3h |
| Upwork | Profile, proposals, client interviews | 3h |
| Discipline | Weekly review | 1h |

Daily schedule: Mon–Fri 04:00–08:00 · Sat & Sun 04:00–08:00, 09:00–12:00, 13:00–16:00.

## Features

- **Today**: today's time slots, the week's checklist for each track, resource links, a motivational line for every day, notes and a "Mark done" button per slot.
- **Roadmap**: 4 phases, 15 weeks, a chip for each of the 100 days (done / in progress / today).
- **Tracks**: hours planned vs. studied per track, every weekly checklist.
- **Rust course**: the 85-video [Rust for beginners (2025)](https://www.youtube.com/playlist?list=PLAscMa3kKhHjBYOTrT20kpYMNQX95KU6i) playlist split into 7 days (week 1), with an embedded player that marks a video watched when it ends and moves to the next one.
- **English / Tiếng Việt** switch (English by default).
- Built mobile-first for iPhone, with a bottom tab bar, large tap targets and "Add to Home Screen" support. Tablet and laptop get wider layouts.
- Progress lives in the browser's `localStorage`; **Export / Import** a JSON file to move it to another device.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import this repository.
2. Vercel detects Next.js; keep the default build settings.
3. Click **Deploy**. Every push to `main` redeploys automatically.

On iPhone, open the site in Safari → Share → **Add to Home Screen** to use it like an app.

## Editing the plan

| File | Content |
|---|---|
| `src/data/plan.ts` | Tracks, phases, daily time slots and the weekly focus + checklist of every track |
| `src/data/quotes.ts` | The 100 daily motivational lines |
| `src/data/course.ts` | The Rust course: videos per day, practice tasks, links |
| `src/lib/i18n.ts` | UI strings in English and Vietnamese |

All user-facing text is written as `bi("English", "Tiếng Việt")`; a plain string reads the same in both languages.
