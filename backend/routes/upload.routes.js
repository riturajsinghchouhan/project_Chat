import express from "express";
import upload from "../middleware/upload.middleware.js";
import { uploadChatImage } from "../controllers/upload.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/chat-image",
  auth,
  upload.single("image"),
  uploadChatImage
);

export default router;
