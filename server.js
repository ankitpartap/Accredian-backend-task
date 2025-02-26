import mysql from "mysql2";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import referralRoutes from "./src/routes/referralRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({origin: "https://localhost:3000", credentials: true}))
app.use(express.json());

// Routes
app.use("/api/referral", referralRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
