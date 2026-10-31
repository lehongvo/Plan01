# Plan01

A 100-day plan to win blockchain work on Upwork, kept with discipline: **45 hours a week**, every day from **Sunday 01/11/2026 (day 1)** to **Monday 08/02/2027 (day 100)**, 645 hours in total.

- **Day 1 (Sun 01/11)** is the kickoff: toolchain setup, Rust course day 1, Upwork job research, a baseline English recording and planning.
- **Weeks 1–14** run Monday to Sunday, so Sunday's client interview practice and weekly review always come after that week's learning.
- **Proposals start in week 3**: the market is tested early instead of after the study ends.
- **Day 100 (Mon 08/02)** is the wrap-up.

The start date is fixed: the kickoff, the phase boundaries and the Rust course split are calibrated for it.

| Time | Mon / Wed | Tue / Thu | Fri | Sat | Sun |
|---|---|---|---|---|---|
| 05:00–08:00 | EVM | Rust | EVM | EVM | Rust |
| 09:00–10:00 | English | English | English | Rust (09:00–12:00) | Client interview (09:00–12:00) |
| 10:00–11:00 | Security | Security | Upwork | | |
| 13:00–16:00 | | | | Upwork | English (13:00–15:00) + Weekly review (15:00–16:00) |
| 16:00–17:00 | | | | EVM | EVM |

| Track | Role | Hours / week | Hours in 100 days |
|---|---|---|---|
| Full-stack EVM | Solidity, wagmi/viem, backends, indexers, integrations, RPC: sells now | 14h | 200h |
| Rust | Rust → Solana → core chain reading: the long-term bet | 12h | 171h |
| English | Spoken answers, requirement and rate talk, mock client calls | 7h | 101h |
| Security review | Invariant tests, PoCs, verifying AI agent findings | 4h | 57h |
| Upwork | Profile, market log, proposals, then Arc.dev, direct applications and grants | 4h | 56h |
| Client interview | Client questions, code walkthroughs, mock calls | 3h | 45h |
| Weekly review | Hours, market numbers, next week's priorities | 1h | 15h |

| Phase | Days | Dates | Goal |
|---|---|---|---|
| 1. First bids | 1–22 | Sun 01/11 → Sun 22/11 | Profile live, dApp piece shipped, first 10 proposals |
| 2. First contract | 23–50 | Mon 23/11 → Sun 20/12 | 40 targeted proposals, integration and RPC pieces, Solana basics |
| 3. Reviews & proof | 51–85 | Mon 21/12 → Sun 24/01 | Upwork reviews, public security review, Solana program on mainnet, one small core chain PR |
| 4. Wider doors | 86–100 | Mon 25/01 → Mon 08/02 | Rust crate, higher rates, Arc.dev and direct applications |

Paid client work replaces the EVM block whenever there is a contract, and client calls override study slots. Decision gates sit in the weekly reviews of weeks 4, 7 and 14.

## Features

- **Today**: today's time slots, the week's checklist for each track, resource links, a motivational line for every day, notes and a "Mark done" button per slot.
- **Roadmap**: 4 phases; the kickoff day, weeks 1–14 and day 100, with a chip for each of the 100 days (done / in progress / today).
- **Tracks**: hours planned vs. studied per track, every weekly checklist.
- **Rust course**: the 85-video [Rust for beginners (2025)](https://www.youtube.com/playlist?list=PLAscMa3kKhHjBYOTrT20kpYMNQX95KU6i) playlist split into 7 course days, one per 3h Rust slot from Sun 01/11 to Thu 12/11, with an embedded player that marks a video watched when it ends and moves to the next one.
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
