import { useEffect, useState, useRef } from "react";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import { getChatMessages } from "../../services/chat.service";
import "./ChatWindow.css";

const ChatWindow = () => {
  const socket = useSocket();
  const { user } = useAuth();
  const { activeChat } = useChat();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const receiverId = activeChat?._id;

  /* LOAD CHAT */
  useEffect(() => {
    if (!receiverId) return;
    getChatMessages(receiverId).then(setMessages);
  }, [receiverId]);

  /* SCROLL */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* SOCKET LISTENERS */
  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (msg) =>
      setMessages((prev) => [...prev, msg])
    );

    socket.on("messageSent", (msg) =>
      setMessages((prev) => [...prev, msg])
    );

    socket.on("messageDeleted", ({ messageId }) => {
      setMessages((prev) =>
        prev.map((m) =>
          m._id === messageId ? { ...m, isDeleted: true } : m
        )
      );
    });

    socket.on("typing", () => setIsTyping(true));
    socket.on("stopTyping", () => setIsTyping(false));

    socket.on("seenUpdate", ({ chatId }) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.chatId === chatId ? { ...m, seen: true } : m
        )
      );
    });

    return () => {
      socket.off("newMessage");
      socket.off("messageSent");
      socket.off("messageDeleted");
      socket.off("typing");
      socket.off("stopTyping");
      socket.off("seenUpdate");
    };
  }, [socket]);

  /* SEND MESSAGE */
  const sendMessage = () => {
    if (!text.trim() || !receiverId) return;

    socket.emit("sendMessage", {
      receiverId,
      text,
    });

    socket.emit("stopTyping", { receiverId });
    setText("");
  };

  /* DELETE MESSAGE */
  const deleteMessage = (id) => {
    socket.emit("deleteMessage", { messageId: id, receiverId });
  };

  if (!activeChat) {
    return <div className="chat-window empty">Select a chat</div>;
  }

  return (
    <div className="chat-window">
      {/* HEADER */}
      <div className="chat-header">
        <div>
          <h4>{activeChat.name || activeChat.mobile}</h4>
          <small className="status">
            {isTyping
              ? "typing..."
              : activeChat.isOnline
              ? "Online"
              : activeChat.lastSeen
              ? `Last seen ${new Date(
                  activeChat.lastSeen
                ).toLocaleTimeString()}`
              : ""}
          </small>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="messages">
        {messages.map((m) => {
          const isSender = String(m.sender) === String(user._id);

          return (
            <div
              key={m._id}
              className={`msg ${isSender ? "sent" : "received"}`}
              onContextMenu={(e) => {
                e.preventDefault();
                if (isSender && !m.isDeleted) deleteMessage(m._id);
              }}
            >
              {m.isDeleted ? (
                <i className="deleted-text">🚫 Message deleted</i>
              ) : (
                <>
                  {/* IMAGE */}
                  {m.image && (
                    <img src={m.image} alt="" className="chat-image" />
                  )}

                  {/* AUDIO */}
                  {m.audio && (
                    <audio controls className="chat-audio">
                      <source src={m.audio} />
                    </audio>
                  )}

                  {/* TEXT */}
                  {m.text && <span>{m.text}</span>}

                  {/* META */}
                  <div className="meta">
                    <small className="time">
                      {new Date(m.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>

                    {isSender && (
                      <span
                        className={`tick ${
                          m.seen ? "blue" : "gray"
                        }`}
                      >
                        ✔✔
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            socket.emit("typing", { receiverId });
          }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
