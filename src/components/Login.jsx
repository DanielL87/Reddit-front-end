import { useState } from "react";
import { API } from "../assets/API";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const info = await res.json();
    if (!info.success) {
      return setError(info.error);
    }
    setToken(info.token);
    localStorage.setItem("token", info.token);
    navigate("/");
  }

  return (
    <div id="sign-up">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username.."
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password.."
        />
        <button>Login</button>
      </form>
      <p>{error}</p>
    </div>
  );
}
