# Roadmap

Daily Challenge is being built incrementally, phase by phase. After each
phase: implement → build → fix errors → verify responsive behavior → commit.
This file is the single source of truth for what's done and what's next.

## Phase 1 — Foundation ✅ DONE

- [x] Next.js 14 + TypeScript + Tailwind project scaffolded
- [x] Dark, premium design system (colors, type, spacing, shadows) in `tailwind.config.ts`
- [x] Responsive shell: desktop header nav + mobile bottom nav (Home / Challenges / Rankings / Friends / Profile)
- [x] Footer with Privacy/Terms placeholders
- [x] Homepage: hero "Today's Challenge", challenge grid, today's ranking, friends activity, progress widget
- [x] Reusable UI primitives: Button, Card, Badge, ProgressBar
- [x] Placeholder routes for not-yet-built areas (login, register, challenges, rankings, friends, groups, profile, privacy, terms) so no navigation link is dead
- [x] Custom 404 page
- [x] SEO base metadata + Open Graph in root layout
- [x] `npm run typecheck` and `npm run build` verified clean
- [x] `.env.example`, README, this roadmap

## Phase 2 — Authentication & Profiles ✅ DONE

- [x] Drizzle ORM + PostgreSQL schema (`users`, `sessions`, `password_reset_tokens`) — see note below on why Drizzle instead of Prisma
- [x] Custom session auth: bcrypt password hashing, random session tokens (only the SHA-256 hash is ever stored), httpOnly/secure/sameSite cookies
- [x] Register, login, logout — real forms wired to real API routes
- [x] Forgot password / reset password flow, with a console-log fallback when no SMTP is configured
- [x] Change password (requires current password, invalidates other sessions)
- [x] Account deletion (cascades to sessions and reset tokens)
- [x] Public profile page `/u/[username]`, DB-backed
- [x] Edit profile (username, display name, avatar URL, bio)
- [x] Protected route (`/profile/edit`): middleware does an optimistic cookie check, the page itself does the authoritative session check
- [x] Auth-aware header (login/signup vs. username + logout)
- [x] `npm run typecheck`, `npm run lint`, and `npm run build` verified clean

**Why Drizzle instead of the Prisma originally planned in Phase 1:** Prisma's
query engine is a native binary fetched from Prisma's own CDN
(`binaries.prisma.sh`) during `npm install`/`prisma generate`. That domain
was blocked by the network policy in the environment this was built in —
and the same kind of allowlist-based restriction is common in corporate CI
and some serverless build environments. Rather than ship something that
might silently fail to install for some contributors, Drizzle was swapped in:
it talks to Postgres through the pure-JS `pg` driver, needs no native binary,
and gives the same compile-time type safety.

**Known limitation:** this environment could not verify Phase 2 against a
live Postgres database (no database was provisioned) — `npm run typecheck`,
`npm run lint`, and `npm run build` all pass, and none of them require a DB
connection, but the actual register → login → edit-profile → delete-account
flow has not been exercised end-to-end against a real database. Whoever sets
`DATABASE_URL` and runs `npm run db:migrate` first should do a manual pass
through that flow before trusting it in production.

All data on the homepage still comes from `lib/data/mock.ts` — untouched by
Phase 2, still replaced in Phase 3.

## Phase 3 — Mini-games & Daily Challenge Engine

- [ ] Modular game architecture under `/games/[slug]`
- [ ] Reaction Test, Click Speed, Memory, Math Rush, Quick Quiz (5 games, fully playable)
- [ ] Score submission API with server-side validation (impossible-score / timing checks)
- [ ] Daily challenge selection engine (server-side date handling, no hard-coded dates)
- [ ] Replace `lib/data/mock.ts` with real database-backed data fetching

## Phase 4 — Leaderboards, XP, Levels, Streaks, Badges

- [ ] Global / daily / weekly / monthly / friends / group leaderboards with pagination & filters
- [ ] XP + level progression formula
- [ ] Streak tracking + calendar view + milestone rewards
- [ ] Badge definitions + award logic + profile display

## Phase 5 — Friends & Groups

- [ ] User search, friend requests (send/accept/reject/remove)
- [ ] Unique invite links `/invite/[code]`
- [ ] Friend challenges (select friend(s)/group, private challenge, auto-close on expiry)
- [ ] Groups: create/join/leave, admin controls, group ranking, group invite links `/join/[code]`
- [ ] Notification triggers for all of the above

## Phase 6 — Notifications, Sharing, SEO

- [ ] Notification center (read/unread, timestamps, deep links)
- [ ] Share result / share profile with Open Graph image support
- [ ] Per-game SEO content, sitemap.xml, robots.txt

## Phase 7 — Advertising & Premium Architecture

- [ ] Modular ad slot components (never during gameplay or over controls)
- [ ] Premium data model + gating (no real payment integration without provided credentials)
- [ ] Stripe-ready architecture (not wired to real keys)

## Phase 8 — Hardening & Launch Polish

- [ ] Full security review (authz on every route/API, input validation, rate limiting)
- [ ] Accessibility pass (keyboard nav, focus states, contrast, reduced motion)
- [ ] Performance pass (bundle size, image/query/caching optimization)
- [ ] Real Privacy Policy & Terms of Service (GDPR-ready), replacing the Phase 1 placeholders
- [ ] Admin dashboard + reporting/moderation
- [ ] Full manual test pass (desktop + mobile) against the Phase 40 checklist in the original spec

## Notes for whoever (human or Claude) picks up the next phase

- Don't touch `lib/data/mock.ts` consumers without replacing them with real
  data fetching in the same change — no half-migrated screens.
- Every new route must be reachable from navigation or explicitly documented
  as unlinked (e.g. `/u/[username]`, `/invite/[code]`).
- Run `npm run typecheck && npm run build` before committing.
