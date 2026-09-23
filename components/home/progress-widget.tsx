import { Flame, Trophy, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { formatNumber } from "@/lib/utils";
import type { UserProgress } from "@/types";

export function ProgressWidget({ progress }: { progress: UserProgress }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>

      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">
          Level {progress.level}
        </span>
        <span className="text-foreground-faint">
          {progress.xp} / {progress.xpForNextLevel} XP
        </span>
      </div>
      <ProgressBar
        value={progress.xp}
        max={progress.xpForNextLevel}
        className="mt-2"
      />

      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl border border-border-subtle bg-surface-raised py-3">
          <Flame className="mx-auto h-4 w-4 text-warning" />
          <p className="mt-1 text-sm font-semibold text-foreground">
            {progress.currentStreak}
          </p>
          <p className="text-[11px] text-foreground-faint">Streak</p>
        </div>
        <div className="rounded-xl border border-border-subtle bg-surface-raised py-3">
          <Trophy className="mx-auto h-4 w-4 text-primary" />
          <p className="mt-1 text-sm font-semibold text-foreground">
            {formatNumber(progress.bestScore)}
          </p>
          <p className="text-[11px] text-foreground-faint">Best score</p>
        </div>
        <div className="rounded-xl border border-border-subtle bg-surface-raised py-3">
          <CheckCircle2 className="mx-auto h-4 w-4 text-success" />
          <p className="mt-1 text-sm font-semibold text-foreground">
            {progress.challengesCompleted}
          </p>
          <p className="text-[11px] text-foreground-faint">Completed</p>
        </div>
      </div>
    </Card>
  );
}
