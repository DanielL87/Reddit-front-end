import { API } from "../assets/API";
import { Link } from "react-router-dom";

export default function SubReddits(props) {
  const { subreddit, user, fetchSubreddits, token, setSelectedSubreddit } =
    props;
  const canDelete = user && user.id === subreddit.userId;

  async function deleteSubreddit(e) {
    e.preventDefault();

    const res = await fetch(`${API}/subreddits/${subreddit.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();

    fetchSubreddits();
  }

  return (
    <div className="individual-subreddit">
      <Link to={`/subreddits/${subreddit.name}`}>{subreddit.name}</Link>
      {canDelete && <button onClick={deleteSubreddit}>Delete</button>}
    </div>
  );
}
