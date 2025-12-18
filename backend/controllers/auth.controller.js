import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "chatsphere_secret";

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    let { mobile, password } = req.body;

    mobile = mobile?.trim();
    password = password?.trim();

    if (!mobile || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({ mobile });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ❌ bcrypt.hash HATA DIYA
    // ✅ model khud hash karega
    await User.create({
      mobile,
      password, // plain password
    });

    res.json({ message: "Registered successfully" });
  } catch (err) {
    console.error("REGISTER ERROR 👉", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    let { mobile, password } = req.body;

    mobile = mobile?.trim();
    password = password?.trim();

    if (!mobile || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login success",
      token,
      user,
    });
  } catch (err) {
    console.error("LOGIN ERROR 👉", err);
    res.status(500).json({ message: "Server error" });
  }
};
