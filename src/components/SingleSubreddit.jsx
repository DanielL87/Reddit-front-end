import { Link, useOutletContext, useParams } from "react-router-dom";
import Posts from "./Posts";

export default function SingleSubreddit() {
  const { subredditName } = useParams();
  const { posts, fetchPosts, token, user, setSelectedSubreddit, subreddits } =
    useOutletContext();

  const filteredPosts = posts.filter(
    (post) => post.subreddit.name === subredditName
  );

  // async function handleSelectedSubreddit(e) {
  //   e.preventDefault();
  //   const selectedSubreddit = subreddits.filter(
  //     (subreddit) => subreddit.name === subredditName
  //   );
  //   console.log(selectedSubreddit);
  // }

  return (
    <div className="post-container">
      {/* <Link to={"/createpost"}>
        <div onClick={handleSelectedSubreddit}>Post to R/{subredditName}</div>
      </Link> */}
      {filteredPosts.length === 0 ? (
        <p>There is nothing to see here. Be the First to add post!</p>
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
