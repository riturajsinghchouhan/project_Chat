import { useEffect, useState } from "react";
import { getRecentChats, searchUsers } from "../../services/chat.service";
import { useChat } from "../../context/ChatContext";
import "./ContactList.css";

const ContactList = () => {
  const { setActiveChat } = useChat();
  const [query, setQuery] = useState("");
  const [chats, setChats] = useState([]);

  // 🔥 Load recent chats
  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    const data = await getRecentChats();
    setChats(data);
  };

  // 🔍 Optional search
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 3) {
      loadChats();
      return;
    }

    const result = await searchUsers(value);
    setChats(result.map(u => ({ user: u })));
  };

  return (
    <div className="sidebar">
      <input
        className="search"
        placeholder="Search by number"
        value={query}
        onChange={handleSearch}
      />

      {chats.map((c, i) => (
        <div
          key={i}
          className="contact"
          onClick={() => setActiveChat(c.user)}
        >
          <div className="avatar" />
          <div className="info">
            <strong>{c.user.name || c.user.mobile}</strong>
            <p>{c.lastMessage || "No messages yet"}</p>
          </div>
          {c.user.isOnline && <span className="online-dot" />}
        </div>
      ))}
    </div>
  );
};

export default ContactList;
