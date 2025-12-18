import Message from "../models/Message.model.js";
import User from "../models/User.model.js";
// helper
const makeChatId = (a, b) => [a, b].sort().join("_");

// 📩 SEND MESSAGE
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text, image } = req.body;
    const senderId = req.userId;

    if (!receiverId) {
      return res.status(400).json({ message: "Receiver required" });
    }

    const chatId = makeChatId(senderId, receiverId);

    const msg = await Message.create({
      chatId,
      sender: senderId,
      receiver: receiverId,
      text,
      image,
    });

    res.json({ msg: "Sent", message: msg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📥 FETCH CHAT MESSAGES
export const fetchChat = async (req, res) => {
  try {
    const chatId = makeChatId(req.userId, req.params.otherUserId);

    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✔✔ MARK SEEN
export const markSeen = async (req, res) => {
  try {
    const chatId = makeChatId(req.userId, req.params.otherUserId);

    await Message.updateMany(
      { chatId, receiver: req.userId, seen: false },
      { $set: { seen: true, seenAt: new Date() } }
    );

    res.json({ msg: "Messages marked as seen" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getRecentChats = async (req, res) => {
  try {
    const userId = req.userId;

    // find all chats where user involved
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .sort({ createdAt: -1 })
      .populate("sender receiver", "name mobile isOnline");

    // unique users map
    const chatMap = new Map();

    messages.forEach((msg) => {
      const otherUser =
        String(msg.sender._id) === String(userId)
          ? msg.receiver
          : msg.sender;

      if (!chatMap.has(otherUser._id.toString())) {
        chatMap.set(otherUser._id.toString(), {
          user: otherUser,
          lastMessage: msg.text,
          time: msg.createdAt,
        });
      }
    });

    res.json([...chatMap.values()]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
