import express from "express";
const router = express.Router();
import { allTypes, addType, editType, deleteType } from "../controllers/tripsController.js";
import protect from "../middleware/authMiddleware.js";

router.get("/getTripTypes", allTypes);
router.post("/addTripType", addType);
router.put("/editType", editType);
// router.put("/editType/:typeID", editType);
router.delete("/deleteType", deleteType);

export default router;