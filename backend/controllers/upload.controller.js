export const uploadChatImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/chat/${req.file.filename}`;

    res.json({
      message: "Image uploaded successfully",
      imageUrl,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
