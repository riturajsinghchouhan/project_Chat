// import { io } from "socket.io-client";

// // 👇 apna real userId yahan daalna
// const socket = io("http://localhost:5000", {
//   query: {
//     userId: "693fa037cee27540f3a7069c",
//   },
// });

// socket.on("connect", () => {
//   console.log("✅ Connected to server with socket id:", socket.id);
// });

// socket.on("disconnect", () => {
//   console.log("❌ Disconnected from server");
// });

// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000", {
//   query: { userId: "693fac5a943fc6256f8bad16" },
// });

// socket.emit("sendMessage", {
//   receiverId: "693fa037cee27540f3a7069c",
//   text: "Hello bhai 🔥",
// });

// socket.on("messageSent", (msg) => {
//   console.log("Sent:", msg.text);
// });

import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  query: { userId: "693fac5a943fc6256f8bad16" },
});

socket.on("connect", () => {
  socket.emit("sendMessage", {
    receiverId: "693fa037cee27540f3a7069c",
    text: "This message will disappear 👻",
    image: "https://imgs.search.brave.com/6dMD-RAv1v5zcMSvZWnipXIKDjNXgO1Gk-ykDWeWLLM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvY3Jl/YXRpdmUtc3VpdGUv/dmlkZW8tY3JlYXRp/b24vaW50cm9zLW91/dHJvcy53ZWJw",
  });
});

socket.on("messageSent", (msg) => {
  console.log("Sent message:", msg);
});

