import express from "express";
const router = express.Router();
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUserProfile,
    getUserProfile,
    updateProfilePic, updateAdmin
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import { sendVerificationEmail, verifyEmail } from "../controllers/verificationController.js";


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile/:id", protect, getUserProfile);
router.get("/profile", getCurrentUserProfile);
router.put("/updateProfilePic", updateProfilePic);
// router.put("/profile", protect, updateUserProfile);
router.post("/sendVerificationEmail", sendVerificationEmail);
router.get("/verify/:token", verifyEmail);

router.put("/updateUser", updateAdmin);

export default router;
