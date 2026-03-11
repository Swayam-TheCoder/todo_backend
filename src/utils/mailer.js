
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config(); // Loads your .env file variables

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (toEmail, userName) => {
  try {
    await resend.emails.send({
    from: `"My To-Do App" <${process.env.EMAIL_USER}>`, 
    to: toEmail,
    subject: "Welcome to Our To-Do App! ✅",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #4A90E2;">Thanks for joining, ${userName}! 🚀</h2>
        <p>We're thrilled to have you here. You’ve just taken the first step toward a more organized and productive life.</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4A90E2; margin: 20px 0;">
          <strong>Why use Amazing To-Do?</strong>
          <ul style="margin-top: 10px;">
            <li>✨ <strong>Capture ideas:</strong> Don't let important tasks slip away.</li>
            <li>📅 <strong>Stay organized:</strong> Group your work and personal life.</li>
            <li>✅ <strong>Get things done:</strong> There's no better feeling than checking off a task!</li>
          </ul>
        </div>

        <p>Ready to get started? Go ahead and add your first task right now!</p>

        <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;">
        <p style="font-size: 12px; color: #888;">Happy organizing,<br>The Amazing To-Do Team</p>
      </div>
    `,
    });
console.log("✅ Email sent");
  } catch (error) {
    console.error("Email error:", error);
  }
};