# Plan01

A 100-day study dashboard for switching jobs, kept with discipline: **40 hours a week**, every day from **Sunday 25/10/2026 (day 1)** to **Monday 01/02/2027 (day 100)**, 574 hours in total.

- **Day 1 (Sun 25/10)** is the kickoff: toolchain setup, Rust course day 1, job research, a baseline English recording and planning.
- **Weeks 1–14** run Monday to Sunday, so Sunday's interview practice, mock and weekly review always come after that week's learning.
- **Day 100 (Mon 01/02)** is the wrap-up.

The start date is fixed: the kickoff, the phase boundaries and the Rust course split are calibrated for it.

| Area | Track | Hours / week | Hours in 100 days |
|---|---|---|---|
| I. NewJob | Rust: Learn Rust → Rust for Solana → Rust for core chain (Layer 2) | 20.5h | 293.5h |
| II. Solidity | Overview → upgrade knowledge (Foundry, security, DeFi) → interview | 6.75h | 95.25h |
| III. English | English for interviews | 5.75h | 83.25h |
| I.4 + II.3 | Technical interview prep | 3h | 45h |
| Upwork | Profile, proposals, client interviews | 3h | 42h |
| Discipline | Weekly review | 1h | 15h |

| Phase | Days | Dates |
|---|---|---|
| 1. Learn Rust | 1–22 | Sun 25/10 → Sun 15/11 |
| 2. Rust for Solana | 23–50 | Mon 16/11 → Sun 13/12 |
| 3. Rust for core chain (Layer 2) | 51–85 | Mon 14/12 → Sun 17/01 |
| 4. Interview & job | 86–100 | Mon 18/01 → Mon 01/02 |

Daily schedule: Mon–Fri 04:00–08:00 · Sat & Sun 04:00–08:00, 09:00–12:00, 13:00–16:00.

## Features

- **Today**: today's time slots, the week's checklist for each track, resource links, a motivational line for every day, notes and a "Mark done" button per slot.
- **Roadmap**: 4 phases; the kickoff day, weeks 1–14 and day 100, with a chip for each of the 100 days (done / in progress / today).
- **Tracks**: hours planned vs. studied per track, every weekly checklist.
- **Rust course**: the 85-video [Rust for beginners (2025)](https://www.youtube.com/playlist?list=PLAscMa3kKhHjBYOTrT20kpYMNQX95KU6i) playlist split into plan days 1–7 to fit the Rust slots (4h on Sun 25/10 and Sat 31/10, 2.5h Mon–Fri), with an embedded player that marks a video watched when it ends and moves to the next one.
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
