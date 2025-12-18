import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  sendMessage,
  fetchChat,
  markSeen,
  getRecentChats,
} from "../controllers/chat.controller.js";

const router = express.Router();

// send message
router.post("/send", auth, sendMessage);

// fetch chat with user
router.get("/:otherUserId", auth, fetchChat);

// mark messages seen
router.post("/seen/:otherUserId", auth, markSeen);

router.get("/recent/list", auth, getRecentChats);

export default router;
