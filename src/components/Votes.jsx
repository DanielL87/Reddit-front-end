import { useState } from "react";
import { API } from "../assets/API";
export default function Votes(props) {
  const { post, token, fetchPosts, user } = props;
  //   const [hasUpvoted, setHasUpvoted] = useState(false);
  //   const [hasDownvoted, setHasDownvoted] = useState(false);
  const hasUpvoted = post.upvotes.find((upvote) => upvote.userId === user.id)
    ? true
    : false;

  const hasDownvoted = post.downvotes.find(
    (downvote) => downvote.userId === user.id
  )
    ? true
    : false;

  async function handleUpvotes() {
    const upvote = post.upvotes.find((upvote) => upvote.userId === user.id);
    if (upvote) {
      await deleteVote("upvotes");
      //   setHasUpvoted(false);
    } else {
      await addVote("upvotes");
      //   setHasUpvoted(true);
    }
  }

  async function handleDownvotes() {
    const downvote = post.downvotes.find(
      (downvote) => downvote.userId === user.id
    );
    if (downvote) {
      await deleteVote("downvotes");
      //   setHasDownvoted(false);
    } else {
      await addVote("downvotes");
      //   setHasDownvoted(true);
    }
  }

  async function deleteVote(voteType) {
    const res = await fetch(`${API}/votes/${voteType}/${post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();
    fetchPosts();
  }

  async function addVote(voteType) {
    const res = await fetch(`${API}/votes/${voteType}/${post.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();
    fetchPosts();
  }

  return (
    <div className="votes-container">
      <div
        onClick={handleUpvotes}
        className={`vote-arrow ${hasUpvoted ? "upvoted" : ""}`}
      >
        ⬆{post.upvotes.length}
      </div>
      <div
        onClick={handleDownvotes}
        className={`vote-arrow ${hasDownvoted ? "downvoted" : ""}`}
      >
        ⬇{post.downvotes.length}
      </div>
    </div>
  );
}
