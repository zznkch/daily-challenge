# Daily Challenge

**One challenge. Every day.**

Daily Challenge is a competitive mini-games platform. Every day, players take
on a new challenge and compete against the global community, their friends,
and their private groups — building streaks, earning XP, leveling up, and
collecting badges along the way.

> **Status: Phase 2 of 8 complete.** This repository has the project
> foundation (design system, responsive layout, navigation) plus a full
> authentication system: registration, login, logout, password reset, public
> profiles, profile editing, and account deletion — backed by a real
> PostgreSQL schema. The mini-games, daily challenge engine, leaderboards,
> friends/groups, and the rest of the platform are being built in the
> following phases. See [`docs/ROADMAP.md`](./docs/ROADMAP.md) for the full
> plan and current progress.

## Tech stack

| Layer          | Choice                                    |
| -------------- | ------------------------------------------ |
| Framework      | Next.js 14 (App Router) + TypeScript       |
| Styling        | Tailwind CSS                               |
| Icons          | lucide-react                               |
| Database       | PostgreSQL via Drizzle ORM (node-postgres) |
| Auth           | Custom sessions (bcrypt + hashed tokens in httpOnly cookies) |
| Hosting        | Vercel (free tier) + Neon/Supabase Postgres|

Chosen for: free/low cost to start, first-class GitHub + Vercel deployment,
strong TypeScript support, and a clear upgrade path to real-time features and
payments (Stripe) later without a rewrite.

**Why Drizzle instead of Prisma:** Prisma's query engine is a native binary
downloaded from Prisma's own CDN at install/generate time. That download is
blocked in some locked-down CI/sandboxed environments (it was blocked in the
one this project was built in), which would silently break `npm install` for
some contributors or deploy targets. Drizzle talks to Postgres directly
through the pure-JS `pg` driver and needs no native binary at all — same
type-safety, one less point of failure.

## Project structure

```text
app/                  Next.js App Router routes (pages)
  login/ register/    Real auth forms (Phase 2)
  forgot-password/    Password reset request (Phase 2)
  reset-password/     Password reset form, token from URL (Phase 2)
  profile/            Redirects to /u/[username] when logged in (Phase 2)
  profile/edit/       Edit profile, change password, delete account (Phase 2)
  u/[username]/       Public profile, DB-backed (Phase 2)
  challenges/         Game hub placeholder (Phase 3)
  rankings/           Leaderboards placeholder (Phase 4)
  friends/ groups/    Social placeholders (Phase 5)
  privacy/ terms/     Legal placeholders (Phase 8)
  api/auth/           register, login, logout, forgot-password, reset-password
  api/profile/        Update profile (PATCH), delete account (DELETE)
  api/account/password/  Change password while logged in
components/
  layout/             Header (auth-aware), mobile bottom nav, footer
  ui/                 Reusable primitives (Button, Card, Badge, Input, ProgressBar)
  home/               Homepage sections (hero, challenge grid, rankings, etc.)
  auth/               Auth forms and account-management UI
lib/
  utils.ts            Shared helpers (cn, formatNumber)
  data/mock.ts         TEMPORARY mock data for the homepage — removed in Phase 3
  db/                  Drizzle schema + client
  auth/                Password hashing, sessions, reset tokens, email
  validation/          Shared zod schemas for auth/profile forms
types/                 Shared TypeScript types
drizzle/               Generated SQL migrations (do not hand-edit)
scripts/migrate.ts     Applies pending migrations to DATABASE_URL
middleware.ts          Optimistic auth redirect for protected routes
docs/
  ROADMAP.md           Full phase-by-phase plan and progress tracker
```

## Local development

Requirements: Node.js 20+, npm, a PostgreSQL database (local or free-tier
cloud like Neon/Supabase).

```bash
npm install
cp .env.example .env.local   # set DATABASE_URL at minimum
npm run db:migrate           # applies drizzle/*.sql to your database
npm run dev
```

Visit `http://localhost:3000`.

Other commands:

```bash
npm run build         # production build
npm run start          # run the production build
npm run lint            # ESLint
npm run typecheck       # tsc --noEmit
npm run db:generate     # generate a new migration after editing lib/db/schema.ts
npm run db:migrate      # apply pending migrations to DATABASE_URL
npm run db:studio       # Drizzle Studio, a GUI for browsing your database
```

## Environment variables

See [`.env.example`](./.env.example) for the full list with descriptions.
`DATABASE_URL` is required as of Phase 2 — the app won't start meaningfully
without it, since registration/login/profiles all read and write real rows.
Everything else (email, ads, Stripe) is optional and only needed by later
phases; sensible dev fallbacks exist where possible (e.g. password reset
links are logged to the console when no email server is configured).

**Never commit `.env`, `.env.local`, or any file containing real secrets.**
`.gitignore` already excludes these.

## Database setup

Schema lives in `lib/db/schema.ts` (Drizzle ORM). Current tables: `users`,
`sessions`, `password_reset_tokens`. Later phases add more (Profile stats,
Game, DailyChallenge, GameResult, FriendRequest, Group, Badge, etc. — see
`docs/ROADMAP.md`).

```bash
npm run db:generate   # after changing schema.ts, generates SQL in drizzle/
npm run db:migrate    # applies drizzle/*.sql to DATABASE_URL
```

## Deployment

1. Push to `main` on GitHub (this repo).
2. Import the repo into Vercel — it will auto-detect Next.js.
3. Provision a free PostgreSQL database (Neon or Supabase) and set
   `DATABASE_URL` in Vercel's project settings, plus any other variables
   from `.env.example` you need.
4. Run `npm run db:migrate` once (locally, pointed at the production
   `DATABASE_URL`, or via a one-off script in your host) to create the
   tables.
5. Deploy.

## GitHub workflow

This project is developed directly in this repository, incrementally, phase
by phase (see `docs/ROADMAP.md`). Each phase is implemented, built and
verified locally, then committed with a descriptive message — no "wip" or
"fix stuff" commits.

## Contributing / development process

This is a solo project built in public phases:

1. **Phase 1 — Foundation** ✅ design system, responsive layout, navigation, homepage
2. **Phase 2 — Authentication & Profiles** ✅ registration, login, logout, password reset, public profiles, edit profile, account deletion
3. **Phase 3** — Mini-games, scoring, daily challenge engine
4. **Phase 4** — Leaderboards, XP, levels, streaks, badges
5. **Phase 5** — Friends, invitations, groups, private challenges
6. **Phase 6** — Notifications, sharing, SEO
7. **Phase 7** — Advertising & Premium architecture
8. **Phase 8** — Security review, performance, accessibility, docs, launch polish

Full detail and a live checklist are in [`docs/ROADMAP.md`](./docs/ROADMAP.md).
