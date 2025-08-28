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
      html: `<p>Click <a href="${verifyUrl}">here</a> to verify your email.</p>`,
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