import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: String,

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    text: String,
    image: String,
    audio: String,

    seen: { type: Boolean, default: false },
    seenAt: Date,

    // 🔥 DELETE FLAGS
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date,

    isDisappearing: Boolean,
    expireAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
