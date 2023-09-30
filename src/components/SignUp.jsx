import { useState } from "react";
import { API } from "../assets/API";
import { useNavigate } from "react-router-dom";

export default function SignUp({ closeSignupModal, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();
    const res = await fetch(`${API}/users/register`, {
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
    closeSignupModal();
  }

  return (
    <div id="sign-up">
      <form onSubmit={handleSignUp}>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>{error}</p>
    </div>
  );
}
