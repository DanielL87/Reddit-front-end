import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../assets/API";

export default function Comment({
  setIsResponding,
  user,
  post,
  token,
  fetchPosts,
}) {
  const [responseText, setResponseText] = useState("");
  const navigate = useNavigate();

  async function handleSubmitResponse(e, post) {
    e.preventDefault();

    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: responseText,
        subredditId: post.subredditId,
        parentId: post.id,
      }),
    });
    const info = await res.json();

    fetchPosts();
    setIsResponding(false);
    navigate("/");
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmitResponse(e, post)}>
        <div>Comment as {user.username}</div>
        <input
          placeholder="What are your thoughts?"
          value={responseText}
          type="text"
          onChange={(e) => setResponseText(e.target.value)}
        />
        <button>Comment</button>
      </form>
      <button onClick={() => setIsResponding(false)}>Cancel</button>
    </div>
  );
}
