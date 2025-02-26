import prisma from "../config/db.js";

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
    console.log(newReferral);
    
    res.status(201).json({ message: "Referral submitted successfully", data: newReferral });
  } catch (error) {
    console.error("Error saving referral:", error);
    res.status(500).json({ error: "Server error" });
  }
};
