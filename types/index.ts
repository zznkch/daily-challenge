export type Difficulty = "easy" | "medium" | "hard";

export interface Game {
  slug: string;
  name: string;
  description: string;
  difficulty: Difficulty;
  durationSeconds: number;
  icon: "zap" | "mouse-pointer-click" | "brain" | "calculator" | "help-circle";
}

export interface DailyChallenge {
  id: string;
  date: string; // ISO date, server-assigned
  game: Game;
  participantCount: number;
  userBestScore: number | null;
  userRank: number | null;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatarInitials: string;
  score: number;
  isCurrentUser?: boolean;
}

export interface FriendActivity {
  username: string;
  avatarInitials: string;
  action: string;
  timeAgo: string;
}

export interface UserProgress {
  level: number;
  xp: number;
  xpForNextLevel: number;
  currentStreak: number;
  bestScore: number;
  challengesCompleted: number;
}
