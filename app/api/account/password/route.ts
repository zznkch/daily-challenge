import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import { changePasswordSchema } from "@/lib/validation/auth";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { getCurrentUser, invalidateAllSessionsForUser } from "@/lib/auth/session";
import { createSession } from "@/lib/auth/session";

export async function POST(request: Request) {
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

  const parsed = changePasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  const valid = await verifyPassword(
    parsed.data.currentPassword,
    currentUser.passwordHash,
  );
  if (!valid) {
    return NextResponse.json(
      { error: "Your current password is incorrect." },
      { status: 401 },
    );
  }

  const passwordHash = await hashPassword(parsed.data.newPassword);

  await db
    .update(users)
    .set({ passwordHash, updatedAt: new Date() })
    .where(eq(users.id, currentUser.id));

  // Invalidate every session (including this one), then issue a fresh one
  // for the current device so the user isn't logged out by changing their
  // own password.
  await invalidateAllSessionsForUser(currentUser.id);
  await createSession(currentUser.id);

  return NextResponse.json({ ok: true });
}
