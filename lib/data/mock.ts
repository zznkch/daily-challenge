/**
 * TEMPORARY MOCK DATA — Phase 1 only.
 *
 * This file exists so the homepage and layout can be built and reviewed
 * before the database and API layer exist (Phase 3). Every export here
 * will be replaced by real server-side data fetching (Prisma + Postgres)
 * in Phase 3, and none of it is wired to any persistence layer.
 *
 * Do not add real user data here. Do not treat this as a source of truth.
 */

import type {
  DailyChallenge,
  FriendActivity,
  Game,
  LeaderboardEntry,
  UserProgress,
} from "@/types";

export const games: Game[] = [
  {
    slug: "reaction-test",
    name: "Reaction Test",
    description: "How fast can you react when the screen changes?",
    difficulty: "easy",
    durationSeconds: 15,
    icon: "zap",
  },
  {
    slug: "click-speed",
    name: "Click Speed",
    description: "Click as many times as you can before time runs out.",
    difficulty: "easy",
    durationSeconds: 10,
    icon: "mouse-pointer-click",
  },
  {
    slug: "memory",
    name: "Memory",
    description: "Match every pair before you run out of moves.",
    difficulty: "medium",
    durationSeconds: 60,
    icon: "brain",
  },
  {
    slug: "math-rush",
    name: "Math Rush",
    description: "Solve as many quick calculations as possible.",
    difficulty: "medium",
    durationSeconds: 45,
    icon: "calculator",
  },
  {
    slug: "quick-quiz",
    name: "Quick Quiz",
    description: "Answer trivia questions before the timer hits zero.",
    difficulty: "hard",
    durationSeconds: 30,
    icon: "help-circle",
  },
];

export const todaysChallenge: DailyChallenge = {
  id: "mock-today",
  date: new Date().toISOString().slice(0, 10),
  game: games[1],
  participantCount: 4821,
  userBestScore: 184,
  userRank: 342,
};

export const dailyLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: "vexlyn", avatarInitials: "VX", score: 412 },
  { rank: 2, username: "orion.k", avatarInitials: "OK", score: 398 },
  { rank: 3, username: "nadia_", avatarInitials: "ND", score: 385 },
  {
    rank: 342,
    username: "you",
    avatarInitials: "YO",
    score: 184,
    isCurrentUser: true,
  },
];

export const friendsActivity: FriendActivity[] = [
  {
    username: "marcusd",
    avatarInitials: "MD",
    action: "beat your Click Speed score",
    timeAgo: "12m ago",
  },
  {
    username: "sofia.b",
    avatarInitials: "SB",
    action: "reached a 14-day streak",
    timeAgo: "1h ago",
  },
  {
    username: "yanis_k",
    avatarInitials: "YK",
    action: "completed today's challenge",
    timeAgo: "3h ago",
  },
];

export const userProgress: UserProgress = {
  level: 7,
  xp: 640,
  xpForNextLevel: 750,
  currentStreak: 5,
  bestScore: 412,
  challengesCompleted: 63,
};
