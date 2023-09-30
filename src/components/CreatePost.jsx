import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API } from "../assets/API";

export default function CreatePost() {
  const {
    subreddits,
    setSelectedSubredditId,
    selectedSubredditId,
    token,
    fetchPosts,
  } = useOutletContext();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const navigate = useNavigate();

  async function handlePost(e) {
    e.preventDefault();
    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        text,
        subredditId: selectedSubredditId,
        parentId: null,
      }),
    });
    const info = await res.json();
    console.log(info);
    fetchPosts();
    navigate("/");
  }
  return (
    <div>
      <form onSubmit={handlePost}>
        <select
          value={selectedSubredditId}
          onChange={(e) => setSelectedSubredditId(e.target.value)}
        >
          <option value="">Select a Subreddit</option>
          {subreddits.map((subreddit) => (
            <option key={subreddit.id} value={subreddit.id}>
              {subreddit.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Title.."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="text"
          placeholder="Text.."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button>Post</button>
      </form>
    </div>
  );
}
