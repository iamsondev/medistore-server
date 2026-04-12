import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASS,
    },
});
export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    advanced: {
        crossSubDomainCookies: {
            enabled: false,
        },
        defaultCookieAttributes: {
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production",
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "CUSTOMER",
            },
            status: {
                type: "string",
                defaultValue: "ACTIVE",
            },
        },
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendOnSignIn: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, token }) => {
            try {
                const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
                const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
</head>
<body style="margin:0; padding:0; background:#f4f7fb; font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 15px;">
        <table style="max-width:600px; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,.08);">
          
          <tr>
            <td style="background:linear-gradient(135deg,#4f46e5,#22c55e); padding:30px; text-align:center;">
              <h1 style="color:#fff; margin:0;">mediStore</h1>
              <p style="color:#e0f2fe; margin-top:6px;">Trusted online medicine platform</p>
            </td>
          </tr>

          <tr>
            <td style="padding:40px 30px; color:#1f2937;">
              <h2>Verify your email address</h2>

              <p style="color:#4b5563;">
                Hi <strong>${user.name ?? "there"}</strong>,<br /><br />
                Thanks for signing up with <strong>mediStore</strong>.
                Please verify your email to activate your account.
              </p>

              <div style="text-align:center; margin:30px 0;">
                <a href="${verificationUrl}"
                  style="background:#4f46e5; color:#fff; padding:14px 32px; text-decoration:none; border-radius:8px; display:inline-block;">
                  Verify Email
                </a>
              </div>

              <p style="font-size:14px; color:#6b7280;">
                Or copy this link:
              </p>

              <p style="font-size:13px; word-break:break-all; color:#2563eb;">
                ${verificationUrl}
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
              © 2026 mediStore • Do not reply to this email
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
                const info = await transporter.sendMail({
                    from: `"mediStore" <${process.env.APP_USER}>`,
                    to: user.email,
                    subject: "Verify your email – mediStore",
                    html: htmlTemplate,
                });
                console.log("Verification email sent:", info.messageId);
            }
            catch (err) {
                // ⚠️  Do NOT re-throw here. If we throw, Better Auth rolls back the
                // entire sign-up and returns "FAILED_TO_CREATE_USER" (422) to the client.
                // The user is already created in the DB at this point — just log the
                // email failure so we can debug SMTP issues without breaking sign-up.
                console.error("[sendVerificationEmail] Failed to send email:", err);
            }
        },
    },
    socialProviders: {
        google: {
            prompt: "select_account consent",
            accessType: "offline",
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            redirectURI: process.env.NODE_ENV === "production"
                ? `${process.env.APP_URL}/api/auth/callback/google`
                : "http://localhost:5000/api/auth/callback/google",
        },
    },
    trustedOrigins: [
        process.env.BETTER_AUTH_URL,
        process.env.APP_URL,
        process.env.CLIENT_URL,
        "https://medistore-client-bice.vercel.app",
        "http://localhost:5000",
        "http://localhost:3000",
    ],
});
//# sourceMappingURL=auth.js.map