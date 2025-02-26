import express from "express";
import { submitReferral } from "../controller/referralController.js";

const router = express.Router();

router.post("/submit", submitReferral);

export default router;
