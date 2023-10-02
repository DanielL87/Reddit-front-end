import Votes from "./Votes";
import { API } from "../assets/API";
import { useEffect, useState } from "react";
import EditPost from "./EditPost";
import Comment from "./Comment";

export default function Posts({ post, token, fetchPosts, user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [children, setChildren] = useState([]);

  const canChange = user && user.id === post.userId;

  async function handleDelete() {
    const res = await fetch(`${API}/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();

    fetchPosts();
  }

  //fetch children data from server

  async function fetchChildren() {
    let children = [];
    for (let child of post.children) {
      const res = await fetch(`${API}/posts/${child.id}`);
      const info = await res.json();
      children.push(info.post);
    }
    // if (children.length) {
    setChildren(children);
    // }
  }

  useEffect(() => {
    fetchChildren();
  }, []);

  return (
    <div className="individual-post">
      <div className="post-header">
        <Votes post={post} token={token} fetchPosts={fetchPosts} user={user} />
        <div className="post-content">
          {!isEditing ? (
            <div>
              {!post.parentId && (
                <div>
                  <div>Subreddit: {post.subreddit.name}</div>
                  <div>Title: {post.title}</div>
                </div>
              )}
              <div>Text: {post.text}</div>
              {!isResponding ? (
                <div className="button-container">
                  {user.id && (
                    <button onClick={() => setIsResponding(true)}>
                      Comment
                    </button>
                  )}
                  {canChange && (
                    <div className="change-buttons">
                      {" "}
                      <button onClick={handleDelete}>Delete</button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditing(true);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Comment
                  setIsResponding={setIsResponding}
                  post={post}
                  user={user}
                  token={token}
                  fetchPosts={fetchPosts}
                />
              )}
            </div>
          ) : (
            <EditPost
              setIsEditing={setIsEditing}
              post={post}
              fetchPosts={fetchPosts}
              token={token}
            />
          )}
        </div>
      </div>
      <div>
        {" "}
        {children.map((child) => (
          <Posts
            key={child.id}
            post={child}
            token={token}
            fetchPosts={fetchPosts}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}
