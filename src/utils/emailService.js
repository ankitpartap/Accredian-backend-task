import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendReferralEmail = async (referrerName, referrerEmail, refereeName, refereeEmail, course, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: refereeEmail,
    subject: `You've been referred to join "${course}"!`,
    text: `Hello ${refereeName},

${referrerName} (${referrerEmail}) has referred you to join the "${course}" course.

Message from ${referrerName}:
"${message}"

Sign up today and explore this opportunity!

Best,
Accredian`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Referral email sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
