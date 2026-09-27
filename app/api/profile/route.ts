import { NextResponse } from "next/server";
import { eq, and, ne } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import { editProfileSchema } from "@/lib/validation/auth";
import { getCurrentUser } from "@/lib/auth/session";

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = editProfileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  const normalizedUsername = parsed.data.username.toLowerCase();

  const [conflict] = await db
    .select({ id: users.id })
    .from(users)
    .where(
      and(
        eq(users.username, normalizedUsername),
        ne(users.id, currentUser.id),
      ),
    )
    .limit(1);

  if (conflict) {
    return NextResponse.json(
      { error: "That username is already taken." },
      { status: 409 },
    );
  }

  const [updated] = await db
    .update(users)
    .set({
      username: normalizedUsername,
      displayName: parsed.data.displayName || null,
      avatarUrl: parsed.data.avatarUrl || null,
      bio: parsed.data.bio || null,
      updatedAt: new Date(),
    })
    .where(eq(users.id, currentUser.id))
    .returning({ username: users.username });

  return NextResponse.json({ username: updated.username });
}

export async function DELETE() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  await db.delete(users).where(eq(users.id, currentUser.id));
  // Sessions and reset tokens cascade-delete via the FK constraints.

  const response = NextResponse.json({ ok: true });
  response.cookies.delete("dc_session");
  return response;
}
