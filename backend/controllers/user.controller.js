import User from "../models/User.model.js";

// 🔹 UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { name, profilePic } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,              // 🔥 JWT se
      { name, profilePic },
      { new: true }
    );

    res.json({
      msg: "Profile updated",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 GET MY PROFILE
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 DISAPPEARING SETTINGS
export const updateDisappearSetting = async (req, res) => {
  try {
    const { enable } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { "settings.disappearMessages": enable },
      { new: true }
    );

    res.json({
      msg: `Disappearing messages ${enable ? "enabled" : "disabled"}`,
      settings: user.settings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🔍 SEARCH USERS BY MOBILE
export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) return res.json([]);

    const users = await User.find({
      mobile: { $regex: q, $options: "i" }, // partial match
      _id: { $ne: req.userId },             // khud ko mat dikhao
    }).select("_id mobile name isOnline");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};