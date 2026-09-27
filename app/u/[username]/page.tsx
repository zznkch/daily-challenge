import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/session";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/auth/logout-button";

function initials(name: string): string {
  return name.slice(0, 2).toUpperCase();
}

function formatJoinDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

async function getProfileUser(username: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, username.toLowerCase()))
    .limit(1);
  return user ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const user = await getProfileUser(params.username);
  if (!user) return { title: "Profile not found" };
  return {
    title: `${user.displayName ?? user.username} (@${user.username})`,
    description: user.bio ?? `${user.username}'s Daily Challenge profile.`,
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const [profileUser, currentUser] = await Promise.all([
    getProfileUser(params.username),
    getCurrentUser(),
  ]);

  if (!profileUser) notFound();

  const isOwnProfile = currentUser?.id === profileUser.id;
  const displayName = profileUser.displayName ?? profileUser.username;

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6 sm:py-10">
      <Card>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {profileUser.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profileUser.avatarUrl}
                alt={displayName}
                className="h-16 w-16 rounded-2xl object-cover"
              />
            ) : (
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-xl font-semibold text-primary">
                {initials(displayName)}
              </span>
            )}
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {displayName}
              </h1>
              <p className="text-sm text-foreground-faint">
                @{profileUser.username} · Joined{" "}
                {formatJoinDate(profileUser.createdAt)}
              </p>
            </div>
          </div>

          {isOwnProfile ? (
            <div className="flex items-center gap-2">
              <Link href="/profile/edit">
                <Button variant="secondary" size="sm">
                  Edit profile
                </Button>
              </Link>
              <LogoutButton />
            </div>
          ) : null}
        </div>

        {profileUser.bio ? (
          <p className="mt-4 text-sm text-foreground-muted">
            {profileUser.bio}
          </p>
        ) : null}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stats &amp; badges</CardTitle>
        </CardHeader>
        <p className="text-sm text-foreground-muted">
          XP, levels, streaks, and badges arrive in Phase 4 — once the game
          engine and scoring system exist, this section will show real
          numbers for {displayName}.
        </p>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <p className="text-sm text-foreground-muted">
          Game history will appear here starting in Phase 3, once the mini-games
          and score submissions are live.
        </p>
      </Card>
    </div>
  );
}
