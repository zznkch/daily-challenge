import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import { resetPasswordSchema } from "@/lib/validation/auth";
import { hashPassword } from "@/lib/auth/password";
import {
  validatePasswordResetToken,
  consumePasswordResetToken,
} from "@/lib/auth/reset-token";
import { invalidateAllSessionsForUser } from "@/lib/auth/session";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = resetPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  const { token, password } = parsed.data;

  const result = await validatePasswordResetToken(token);
  if (!result) {
    return NextResponse.json(
      { error: "This reset link is invalid or has expired." },
      { status: 400 },
    );
  }

  const passwordHash = await hashPassword(password);

  await db
    .update(users)
    .set({ passwordHash, updatedAt: new Date() })
    .where(eq(users.id, result.userId));

  await consumePasswordResetToken(token);
  await invalidateAllSessionsForUser(result.userId);

  return NextResponse.json({
    message: "Your password has been reset. You can now log in.",
  });
}
