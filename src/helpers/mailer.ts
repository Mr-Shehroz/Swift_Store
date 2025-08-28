import { Resend } from 'resend';
import { User } from '@/models/user';
import bcryptjs from 'bcryptjs';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string | number;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        resetToken: hashedToken,
        resetTokenExpiry: Date.now() + 3600000,
      });
    }

    const verifyUrl = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;

    const { data, error } = await resend.emails.send({
      from: process.env.MAILER_EMAIL!, // Must be a verified domain in Resend
      to: 'mr.shehroz.khan2006@gmail.com',
      subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Password",
      html: `<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 16px; color: #4a5568; margin: 20px 0; line-height: 1.6;">
  Thank you for signing up! We just need to verify your email address before you can get started.
</p>

<div style="margin: 24px 0; text-align: center;">
  <a 
    href="${verifyUrl}" 
    style="
      display: inline-block;
      padding: 14px 32px;
      background-color: #10b981; /* Emerald green */
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 16px;
      font-weight: 600;
      text-decoration: none;
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      transition: background-color 0.3s ease, transform 0.2s ease;
    "
    onmouseover="this.style.backgroundColor='#0d9488'; this.style.transform='scale(1.05)';"
    onmouseout="this.style.backgroundColor='#10b981'; this.style.transform='scale(1)';"
  >
    Verify Your Email
  </a>
</div>

<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 15px; color: #718096; margin: 20px 0; line-height: 1.6;">
  If the button above doesn't work, copy and paste the following link into your browser:
</p>

<p style="
  word-break: break-word;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  background-color: #f7fafc;
  color: #4a5568;
  padding: 12px 16px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  margin: 16px 0;
  overflow-wrap: break-word;
  text-align: center;
">
  ${verifyUrl}
</p>

<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 15px; color: #718096; margin: 20px 0;">
  This link will expire in 24 hours for security reasons.
</p>

<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 15px; color: #4a5568; margin: 20px 0;">
  If you didn’t create an account, no further action is needed.
</p>`,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error(error.message);
    }

    console.log("Email sent:", data);
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};