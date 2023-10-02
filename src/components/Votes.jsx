import { useState } from "react";
import { API } from "../assets/API";
export default function Votes({ post, token, fetchPosts, user }) {
  let hasUpvoted;
  let hasDownvoted;
  if (post.upvotes && post.downvotes) {
    hasUpvoted = post.upvotes.find((upvote) => upvote.userId === user.id)
      ? true
      : false;

    hasDownvoted = post.downvotes.find(
      (downvote) => downvote.userId === user.id
    )
      ? true
      : false;
  }

  async function handleUpvotes() {
    const upvote = post.upvotes.find((upvote) => upvote.userId === user.id);
    if (upvote) {
      await deleteVote("upvotes");
    } else {
      await addVote("upvotes");
    }
  }

  async function handleDownvotes() {
    const downvote = post.downvotes.find(
      (downvote) => downvote.userId === user.id
    );
    if (downvote) {
      await deleteVote("downvotes");
    } else {
      await addVote("downvotes");
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
        className={`vote-arrow ${hasUpvoted && hasUpvoted ? "upvoted" : ""}`}
      >
        ⬆{post.upvotes && post.upvotes.length}
      </div>
      <div
        onClick={handleDownvotes}
        className={`vote-arrow ${
          hasDownvoted && hasDownvoted ? "downvoted" : ""
        }`}
      >
        ⬇{post.downvotes && post.downvotes.length}
      </div>
    </div>
  );
}
