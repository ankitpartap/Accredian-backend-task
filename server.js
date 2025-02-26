import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import referralRoutes from "./src/routes/referralRoutes.js";
import { PrismaClient } from "@prisma/client"; // Ensure Prisma is installed

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Fixed CORS
app.use(express.json());

// Routes
app.use("/api/referral", referralRoutes);

// Test DB Connection
async function testDb() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

testDb();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
