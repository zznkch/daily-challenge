import { HeroChallenge } from "@/components/home/hero-challenge";
import { ChallengeGrid } from "@/components/home/challenge-grid";
import { TodayRanking } from "@/components/home/today-ranking";
import { FriendsActivityCard } from "@/components/home/friends-activity";
import { ProgressWidget } from "@/components/home/progress-widget";
import {
  dailyLeaderboard,
  friendsActivity,
  games,
  todaysChallenge,
  userProgress,
} from "@/lib/data/mock";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-6 sm:py-10">
      <HeroChallenge challenge={todaysChallenge} />

      <ChallengeGrid games={games} />

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <TodayRanking entries={dailyLeaderboard} />
        <FriendsActivityCard activity={friendsActivity} />
        <ProgressWidget progress={userProgress} />
      </section>
    </div>
  );
}
