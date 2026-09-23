import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { FriendActivity } from "@/types";

export function FriendsActivityCard({
  activity,
}: {
  activity: FriendActivity[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Friends</CardTitle>
        <Link
          href="/friends"
          className="text-xs font-medium text-primary hover:text-primary-hover"
        >
          View all
        </Link>
      </CardHeader>
      {activity.length === 0 ? (
        <p className="py-6 text-center text-sm text-foreground-muted">
          You don&apos;t have any friends yet. Invite someone and start
          competing.
        </p>
      ) : (
        <ul className="space-y-3">
          {activity.map((item) => (
            <li key={`${item.username}-${item.timeAgo}`} className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-raised text-xs font-semibold text-foreground-muted">
                {item.avatarInitials}
              </span>
              <p className="text-sm text-foreground-muted">
                <span className="font-medium text-foreground">
                  {item.username}
                </span>{" "}
                {item.action}
                <span className="ml-1 text-xs text-foreground-faint">
                  · {item.timeAgo}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
