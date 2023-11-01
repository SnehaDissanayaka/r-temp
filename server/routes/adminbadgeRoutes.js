import express from "express";
const router = express.Router();
import { allBadges, addBadge, editBadge, deleteBadge } from "../controllers/adminbadgeController.js";
import protect from "../middleware/authMiddleware.js";

router.get("/getBadges", allBadges);
router.post("/addBadge", addBadge);
router.post("/editBadge", editBadge);
router.delete("/deleteBadge", deleteBadge);

export default router;    