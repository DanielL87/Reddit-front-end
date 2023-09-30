import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { API } from "../assets/API";

export default function CreateSubReddit() {
  const [name, setName] = useState("");
  const { token, fetchSubreddits } = useOutletContext();
  const navigate = useNavigate();

  async function createSubreddit(e) {
    e.preventDefault();
    const res = await fetch(`${API}/subreddits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
      }),
    });
    const info = await res.json();
    navigate("/");
    fetchSubreddits();
  }

  return (
    <div>
      <h3>Create a New Subreddit</h3>
      <form action="" onSubmit={createSubreddit}>
        <input
          type="text"
          placeholder="Title..."
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
