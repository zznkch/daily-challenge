import { NextResponse } from "next/server";
import { eq, or } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import { registerSchema } from "@/lib/validation/auth";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  const { username, email, password } = parsed.data;
  const normalizedUsername = username.toLowerCase();
  const normalizedEmail = email.toLowerCase();

  const [existing] = await db
    .select({ id: users.id, username: users.username, email: users.email })
    .from(users)
    .where(
      or(
        eq(users.username, normalizedUsername),
        eq(users.email, normalizedEmail),
      ),
    )
    .limit(1);

  if (existing) {
    const field = existing.username === normalizedUsername ? "username" : "email";
    return NextResponse.json(
      {
        error:
          field === "username"
            ? "That username is already taken."
            : "An account with that email already exists.",
      },
      { status: 409 },
    );
  }

  const passwordHash = await hashPassword(password);

  const [user] = await db
    .insert(users)
    .values({
      username: normalizedUsername,
      email: normalizedEmail,
      passwordHash,
      displayName: username,
    })
    .returning({ id: users.id, username: users.username });

  await createSession(user.id);

  return NextResponse.json({ username: user.username }, { status: 201 });
}
