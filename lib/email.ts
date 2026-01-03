import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  try {
    await resend.emails.send({
      from: "ZeroETV <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email address",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 40px; margin: 20px 0;">
              <h1 style="color: #111827; margin-top: 0;">Welcome to ZeroETV</h1>
              <p style="font-size: 16px; color: #4b5563;">Thank you for signing up! Please verify your email address to get started.</p>
              <div style="margin: 32px 0;">
                <a href="${verificationUrl}" style="background-color: #111827; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">Verify Email Address</a>
              </div>
              <p style="font-size: 14px; color: #6b7280;">Or copy and paste this URL into your browser:</p>
              <p style="font-size: 14px; color: #6b7280; word-break: break-all;">${verificationUrl}</p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
              <p style="font-size: 12px; color: #9ca3af;">This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.</p>
            </div>
          </body>
        </html>
      `,
    });
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw new Error("Failed to send verification email");
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  try {
    await resend.emails.send({
      from: "ZeroETV <onboarding@resend.dev>",
      to: email,
      subject: "Reset your password",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 40px; margin: 20px 0;">
              <h1 style="color: #111827; margin-top: 0;">Reset Your Password</h1>
              <p style="font-size: 16px; color: #4b5563;">We received a request to reset your password. Click the button below to create a new password.</p>
              <div style="margin: 32px 0;">
                <a href="${resetUrl}" style="background-color: #111827; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">Reset Password</a>
              </div>
              <p style="font-size: 14px; color: #6b7280;">Or copy and paste this URL into your browser:</p>
              <p style="font-size: 14px; color: #6b7280; word-break: break-all;">${resetUrl}</p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
              <p style="font-size: 12px; color: #9ca3af;">This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.</p>
            </div>
          </body>
        </html>
      `,
    });
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
}
