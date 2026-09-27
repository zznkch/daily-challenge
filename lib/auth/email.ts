import nodemailer from "nodemailer";

const smtpConfigured = Boolean(
  process.env.EMAIL_SERVER_HOST &&
    process.env.EMAIL_SERVER_USER &&
    process.env.EMAIL_SERVER_PASSWORD,
);

function getTransport() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT ?? 587),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
}

/**
 * Sends a password reset email. If EMAIL_SERVER_* env vars aren't configured
 * (the default until Phase 2/6 config is filled in), the link is logged to
 * the server console instead so the flow is still fully testable locally —
 * this is a clearly-labeled development fallback, not a substitute for real
 * delivery in production.
 */
export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string,
): Promise<void> {
  if (!smtpConfigured) {
    console.log(
      `\n[dev-only: no EMAIL_SERVER_* configured] Password reset link for ${to}:\n${resetUrl}\n`,
    );
    return;
  }

  const transport = getTransport();
  await transport.sendMail({
    from: process.env.EMAIL_FROM ?? "noreply@dailychallenge.app",
    to,
    subject: "Reset your Daily Challenge password",
    text: `Reset your password: ${resetUrl}\n\nThis link expires in 1 hour. If you didn't request this, you can ignore this email.`,
    html: `<p>Reset your password by clicking the link below. This link expires in 1 hour.</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>If you didn't request this, you can ignore this email.</p>`,
  });
}
