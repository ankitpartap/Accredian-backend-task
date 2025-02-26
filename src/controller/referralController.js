import prisma from "../config/db.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS, // App Password (without spaces)
  },
});

export const submitReferral = async (req, res) => {
  try {
    const { referrerName, referrerEmail, refereeName, refereeEmail, course, message } = req.body;

    // Ensure referrer and referee emails are different
    if (referrerEmail === refereeEmail) {
      return res.status(400).json({ error: "Referrer and referee emails must be different." });
    }

    // Save data to MySQL using Prisma
    const newReferral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
        course,
        message,
      },
    });

    console.log("Referral Saved:", newReferral);

    // Send Email Notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: refereeEmail,
      subject: `You've been referred to join ${course}!`,
      text: `Hello ${refereeName},\n\n${referrerName} has referred you to join ${course}.\n\nMessage: ${message}\n\nBest,\nYour Team`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Referral submitted successfully. Email sent!", data: newReferral });
  } catch (error) {
    console.error("Error saving referral:", error);
    res.status(500).json({ error: "Server error" });
  }
};
