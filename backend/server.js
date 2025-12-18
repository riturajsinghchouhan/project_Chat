import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./config/db.js";
import User from "./models/User.model.js";
import Message from "./models/Message.model.js";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const onlineUsers = new Map();

io.on("connection", async (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("Connected:", userId);

  if (userId) {
    onlineUsers.set(userId, socket.id);
    await User.findByIdAndUpdate(userId, {
      isOnline: true,
      lastSeen: null,
    });
  }

  /* SEND MESSAGE */
  socket.on("sendMessage", async ({ receiverId, text, image, audio }) => {
    if (!userId || !receiverId) return;

    const chatId = [userId, receiverId].sort().join("_");

    const msg = await Message.create({
      chatId,
      sender: userId,
      receiver: receiverId,
      text,
      image,
      audio,
    });

    const rSocket = onlineUsers.get(receiverId);
    if (rSocket) io.to(rSocket).emit("newMessage", msg);

    socket.emit("messageSent", msg);
  });

  /* DELETE MESSAGE */
  socket.on("deleteMessage", async ({ messageId, receiverId }) => {
    const msg = await Message.findById(messageId);
    if (!msg) return;

    if (String(msg.sender) !== String(userId)) return;

    msg.isDeleted = true;
    msg.text = "";
    msg.image = "";
    msg.audio = "";
    await msg.save();

    const rSocket = onlineUsers.get(receiverId);
    if (rSocket) io.to(rSocket).emit("messageDeleted", { messageId });

    socket.emit("messageDeleted", { messageId });
  });

  /* TYPING */
  socket.on("typing", ({ receiverId }) => {
    const rSocket = onlineUsers.get(receiverId);
    if (rSocket) io.to(rSocket).emit("typing");
  });

  socket.on("stopTyping", ({ receiverId }) => {
    const rSocket = onlineUsers.get(receiverId);
    if (rSocket) io.to(rSocket).emit("stopTyping");
  });

  /* SEEN */
  socket.on("markSeen", async ({ otherUserId }) => {
    const chatId = [userId, otherUserId].sort().join("_");

    await Message.updateMany(
      { chatId, receiver: userId, seen: false },
      { $set: { seen: true, seenAt: new Date() } }
    );

    const sSocket = onlineUsers.get(otherUserId);
    if (sSocket)
      io.to(sSocket).emit("seenUpdate", { chatId });
  });

  /* DISCONNECT */
  socket.on("disconnect", async () => {
    onlineUsers.delete(userId);
    await User.findByIdAndUpdate(userId, {
      isOnline: false,
      lastSeen: new Date(),
    });
  });
});

server.listen(5000, () =>
  console.log("🚀 Server running on 5000")
);
