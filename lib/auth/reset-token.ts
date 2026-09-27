import { randomBytes, createHash } from "node:crypto";
import { and, eq, gt } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { passwordResetTokens } from "@/lib/db/schema";

const RESET_TOKEN_DURATION_MS = 60 * 60 * 1000; // 1 hour

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Creates a reset token for a user and returns the *raw* token (put it in the email link, never store it). */
export async function createPasswordResetToken(
  userId: string,
): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + RESET_TOKEN_DURATION_MS);

  await db.insert(passwordResetTokens).values({
    id: hashToken(token),
    userId,
    expiresAt,
  });

  return token;
}

/** Validates a raw token from a reset link. Does not mark it used — call `consumePasswordResetToken` after the password is actually updated. */
export async function validatePasswordResetToken(
  token: string,
): Promise<{ userId: string } | null> {
  const hashed = hashToken(token);

  const [row] = await db
    .select()
    .from(passwordResetTokens)
    .where(
      and(
        eq(passwordResetTokens.id, hashed),
        eq(passwordResetTokens.used, false),
        gt(passwordResetTokens.expiresAt, new Date()),
      ),
    )
    .limit(1);

  return row ? { userId: row.userId } : null;
}

export async function consumePasswordResetToken(token: string): Promise<void> {
  const hashed = hashToken(token);
  await db
    .update(passwordResetTokens)
    .set({ used: true })
    .where(eq(passwordResetTokens.id, hashed));
}
