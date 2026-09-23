import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatNumber } from "@/lib/utils";
import type { LeaderboardEntry } from "@/types";

const medalColor = ["text-warning", "text-foreground-muted", "text-[#C97A3D]"];

export function TodayRanking({ entries }: { entries: LeaderboardEntry[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today&apos;s Ranking</CardTitle>
      </CardHeader>
      <ul className="divide-y divide-border-subtle">
        {entries.map((entry, i) => (
          <li
            key={entry.username}
            className={cn(
              "flex items-center justify-between gap-3 py-2.5",
              entry.isCurrentUser && "rounded-lg bg-primary/5 px-2",
            )}
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "w-5 text-sm font-semibold",
                  i < 3 ? medalColor[i] : "text-foreground-faint",
                )}
              >
                {entry.rank}
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-raised text-xs font-semibold text-foreground-muted">
                {entry.avatarInitials}
              </span>
              <span
                className={cn(
                  "text-sm font-medium",
                  entry.isCurrentUser ? "text-primary" : "text-foreground",
                )}
              >
                {entry.isCurrentUser ? "You" : entry.username}
              </span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              {formatNumber(entry.score)}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
