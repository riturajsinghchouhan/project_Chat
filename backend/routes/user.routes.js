import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  updateProfile,
  getMyProfile,
  updateDisappearSetting,
  searchUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

// 🔐 protected routes
router.get("/me", authMiddleware, getMyProfile);
router.put("/profile", authMiddleware, updateProfile);
router.put("/settings/disappear", authMiddleware, updateDisappearSetting);
router.get("/search", authMiddleware, searchUsers);
export default router;
