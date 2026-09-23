import { Users, Trophy, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import type { DailyChallenge } from "@/types";

const difficultyTone = {
  easy: "success",
  medium: "warning",
  hard: "danger",
} as const;

export function HeroChallenge({ challenge }: { challenge: DailyChallenge }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-surface bg-grid-fade px-6 py-10 sm:px-10 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
        Today&apos;s Challenge
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {challenge.game.name}
      </h1>
      <p className="mt-2 max-w-xl text-sm text-foreground-muted sm:text-base">
        {challenge.game.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Badge tone={difficultyTone[challenge.game.difficulty]}>
          {challenge.game.difficulty}
        </Badge>
        <Badge tone="neutral">
          <Timer className="mr-1 h-3 w-3" />
          {challenge.game.durationSeconds}s
        </Badge>
        <Badge tone="neutral">
          <Users className="mr-1 h-3 w-3" />
          {formatNumber(challenge.participantCount)} playing
        </Badge>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <Button size="lg" className="w-full sm:w-auto">
          Play Now
        </Button>

        <div className="flex items-center gap-6 text-sm">
          <div>
            <p className="text-foreground-faint">Your best</p>
            <p className="font-semibold text-foreground">
              {challenge.userBestScore ?? "—"}
            </p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-foreground-faint">
              <Trophy className="h-3.5 w-3.5" /> Your rank
            </p>
            <p className="font-semibold text-foreground">
              {challenge.userRank ? `#${challenge.userRank}` : "Unranked"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
