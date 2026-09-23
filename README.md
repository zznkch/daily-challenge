# Daily Challenge

**One challenge. Every day.**

Daily Challenge is a competitive mini-games platform. Every day, players take
on a new challenge and compete against the global community, their friends,
and their private groups — building streaks, earning XP, leveling up, and
collecting badges along the way.

> **Status: Phase 1 of 8 complete.** This repository currently contains the
> project foundation — design system, responsive layout, navigation, and a
> fully static homepage. Authentication, the game engine, leaderboards,
> friends/groups, and the rest of the platform are being built in the
> following phases. See [`docs/ROADMAP.md`](./docs/ROADMAP.md) for the full
> plan and current progress.

## Tech stack

| Layer          | Choice                                    |
| -------------- | ------------------------------------------ |
| Framework      | Next.js 14 (App Router) + TypeScript       |
| Styling        | Tailwind CSS                               |
| Icons          | lucide-react                               |
| Database (Ph.2+) | PostgreSQL via Prisma                    |
| Auth (Ph.2)    | Auth.js (NextAuth)                         |
| Hosting        | Vercel (free tier) + Neon/Supabase Postgres|

Chosen for: free/low cost to start, first-class GitHub + Vercel deployment,
strong TypeScript support, and a clear upgrade path to Postgres, real-time
features, and payments (Stripe) later without a rewrite.

## Project structure

```text
app/                  Next.js App Router routes (pages)
  login/ register/    Auth placeholders (Phase 2)
  challenges/         Game hub placeholder (Phase 3)
  rankings/           Leaderboards placeholder (Phase 4)
  friends/ groups/    Social placeholders (Phase 5)
  profile/            Public profile placeholder (Phase 2)
  privacy/ terms/     Legal placeholders (Phase 8)
components/
  layout/             Header, mobile bottom nav, footer
  ui/                 Reusable primitives (Button, Card, Badge, ProgressBar)
  home/               Homepage sections (hero, challenge grid, rankings, etc.)
lib/
  utils.ts            Shared helpers (cn, formatNumber)
  data/mock.ts         TEMPORARY mock data — removed in Phase 3
types/                 Shared TypeScript types
docs/
  ROADMAP.md           Full phase-by-phase plan and progress tracker
```

## Local development

Requirements: Node.js 20+, npm.

```bash
npm install
cp .env.example .env.local   # fill in values as later phases require them
npm run dev
```

Visit `http://localhost:3000`.

Other commands:

```bash
npm run build       # production build
npm run start       # run the production build
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
```

## Environment variables

See [`.env.example`](./.env.example) for the full list with descriptions.
Nothing in Phase 1 requires real environment variables — the homepage runs
entirely on local mock data (`lib/data/mock.ts`). Database and auth variables
become required starting in Phase 2.

**Never commit `.env`, `.env.local`, or any file containing real secrets.**
`.gitignore` already excludes these.

## Database setup

Not yet implemented — arriving in Phase 2/3 with Prisma + PostgreSQL. The
planned entities (User, Profile, Game, DailyChallenge, GameResult,
FriendRequest, Group, Badge, etc.) are listed in `docs/ROADMAP.md`.

## Deployment

Once later phases add a database, the intended path is:

1. Push to `main` on GitHub (this repo).
2. Import the repo into Vercel — it will auto-detect Next.js.
3. Provision a free PostgreSQL database (Neon or Supabase) and set
   `DATABASE_URL` plus the other required variables from `.env.example` in
   Vercel's project settings.
4. Deploy.

## GitHub workflow

This project is developed directly in this repository, incrementally, phase
by phase (see `docs/ROADMAP.md`). Each phase is implemented, built and
verified locally, then committed with a descriptive message — no "wip" or
"fix stuff" commits.

## Contributing / development process

This is a solo project built in public phases:

1. **Phase 1 — Foundation** ✅ design system, responsive layout, navigation, homepage
2. **Phase 2** — Authentication, profiles
3. **Phase 3** — Mini-games, scoring, daily challenge engine
4. **Phase 4** — Leaderboards, XP, levels, streaks, badges
5. **Phase 5** — Friends, invitations, groups, private challenges
6. **Phase 6** — Notifications, sharing, SEO
7. **Phase 7** — Advertising & Premium architecture
8. **Phase 8** — Security review, performance, accessibility, docs, launch polish

Full detail and a live checklist are in [`docs/ROADMAP.md`](./docs/ROADMAP.md).
