import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    name: { type: String, default: "" },
    profilePic: { type: String, default: "" },

    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: null },

    settings: {
      showOnlineStatus: { type: Boolean, default: true },
      disappearMessages: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

// 🔐 hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model("User", userSchema);
