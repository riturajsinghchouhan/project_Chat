import { useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      mobile,
      password,
    });
    login(res.data);
  } catch (err) {
    console.log(err.response?.data); // 👈 VERY IMPORTANT
  }
  console.log("API URL 👉", import.meta.env.VITE_API_URL);

};


  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Mobile number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
