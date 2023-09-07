import express from "express";
const router = express.Router();
import { getTodayPReports } from "../controllers/reportsController.js";

router.get("/todayP", getTodayPReports);

export default router;