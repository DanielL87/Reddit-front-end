import { Link, useOutletContext, useParams } from "react-router-dom";
import Posts from "./Posts";
import CreatePost from "./CreatePost";

export default function SingleSubreddit() {
  const { subredditName } = useParams();
  const { posts, fetchPosts, token, user } = useOutletContext();

  const filteredPosts = posts.filter(
    (post) => post.subreddit.name === subredditName
  );

  return (
    <div className="post-container">
      {filteredPosts.length === 0 ? (
        <div>
          <p>There is nothing to see here. Be the First to add post!</p>
          {user.id && <Link to={"/createpost"}>Create New Post!</Link>}
        </div>
      ) : (
        filteredPosts.map((post) => (
          <Posts
            key={post.id}
            post={post}
            fetchPosts={fetchPosts}
            token={token}
            user={user}
          />
        ))
      )}
    </div>
  );
}
