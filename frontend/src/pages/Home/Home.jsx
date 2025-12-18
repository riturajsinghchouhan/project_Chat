import { useAuth } from "../../context/AuthContext";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ContactList from "../../Components/ContactList/ContactList";
import ChatWindow from "../../Components/Chatwindow/ChatWindow";
import { useState } from "react";
import "./Home.css";

const Home = () => {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (!user) {
    return (
      <div className="auth-container">
        <div className="auth-tabs">
          <button onClick={() => setShowLogin(true)}>Login</button>
          <button onClick={() => setShowLogin(false)}>Register</button>
        </div>
        {showLogin ? <Login /> : <Register />}
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* LEFT SIDEBAR */}
      <ContactList />

      {/* RIGHT SIDE */}
      <div className="right-panel">
        {/* GLOBAL TOP BAR */}
        <div className="top-bar">
          <span>Welcome, {user.mobile}</span>
          <button onClick={logout}>Logout</button>
        </div>

        <ChatWindow />
      </div>
    </div>
  );
};

export default Home;
