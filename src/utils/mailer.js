import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (toEmail, userName) => {
  try {

    const response = await resend.emails.send({
      from: "My To-Do App <onboarding@resend.dev>",
      to: toEmail,
      subject: "Welcome to Our To-Do App! ✅",
      html: `<h2>Thanks for joining, ${userName}! 🚀</h2>`
    });

    console.log("Email sent:", response);

  } catch (error) {
    console.error("Email error:", error);
  }
};