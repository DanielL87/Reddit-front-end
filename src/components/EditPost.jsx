import { useState } from "react";
import { API } from "../assets/API";

export default function EditPost({ setIsEditing, post, fetchPosts, token }) {
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedText, setEditedText] = useState(post.text);

  async function handleEditPost(e) {
    e.preventDefault();
    const res = await fetch(`${API}/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: editedTitle,
        text: editedText,
      }),
    });
    const info = await res.json();
    fetchPosts();
    setIsEditing(false);
  }

  return (
    <div>
      <form onSubmit={handleEditPost}>
        <div className="edit-post-content">
          <div>Edit Title</div>
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Edit title..."
          />
          <div>Edit Text</div>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            placeholder="Edit Text..."
          ></textarea>
        </div>
        <div className="edit-post-buttons">
          <button>Edit Post</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
