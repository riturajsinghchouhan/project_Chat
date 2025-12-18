import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  query: { userId: "693fa037cee27540f3a7069c" },
});

socket.on("newMessage", (msg) => {
  console.log("Received:", msg.text);

  // mark seen
  socket.emit("markSeen", { otherUserId: msg.sender });
});
