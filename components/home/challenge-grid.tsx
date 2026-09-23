import {
  Brain,
  Calculator,
  HelpCircle,
  MousePointerClick,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Game } from "@/types";

const icons: Record<Game["icon"], LucideIcon> = {
  zap: Zap,
  "mouse-pointer-click": MousePointerClick,
  brain: Brain,
  calculator: Calculator,
  "help-circle": HelpCircle,
};

const difficultyTone = {
  easy: "success",
  medium: "warning",
  hard: "danger",
} as const;

export function ChallengeGrid({ games }: { games: Game[] }) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        Available Challenges
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => {
          const Icon = icons[game.icon];
          return (
            <Card
              key={game.slug}
              className="group cursor-pointer transition-colors hover:border-primary/50 hover:bg-surface-hover"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <Badge tone={difficultyTone[game.difficulty]}>
                  {game.difficulty}
                </Badge>
              </div>
              <h3 className="mt-4 font-semibold text-foreground">
                {game.name}
              </h3>
              <p className="mt-1 text-sm text-foreground-muted">
                {game.description}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-foreground-faint">
                <span>{game.durationSeconds}s round</span>
                <span className="font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Play →
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
