import { useState } from "react";
import API from "../../services/api";

const Register = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async () => {
    const res = await API.post("/auth/register", {
      mobile,
      password,
    });
    setMsg(res.data.message || "Registered");
  };

  return (
    <div>
      <h3>Register</h3>

      <input
        placeholder="Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={handleRegister}>Register</button>

      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Register;
