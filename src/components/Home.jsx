import { Link, useOutletContext } from "react-router-dom";
import Posts from "./Posts";
import SubReddits from "./SubReddits";

export default function Home() {
  const { posts, fetchPosts, subreddits, user, fetchSubreddits, token } =
    useOutletContext();

  return (
    <div id="body-container">
      <div id="subreddit-container">
        <div className="header">
          {" "}
          <div>Subreddits</div>
          {user.id && <Link to={"/createsubreddit"}>Create SubReddit</Link>}
        </div>

        {subreddits.map((subreddit) => {
          return (
            <SubReddits
              key={subreddit.id}
              subreddit={subreddit}
              user={user}
              fetchSubreddits={fetchSubreddits}
              token={token}
            />
          );
        })}
      </div>

      <div className="post-container">
        <div className="header">
          {" "}
          <div>All Posts</div>
          <Link to={"/createpost"}>Create New Post!</Link>
        </div>
        {posts.map((post) => {
          return (
            <Posts
              key={post.id}
              post={post}
              token={token}
              fetchPosts={fetchPosts}
              user={user}
            />
          );
        })}
      </div>
    </div>
  );
}
