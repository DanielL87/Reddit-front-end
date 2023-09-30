import Votes from "./Votes";

export default function Posts(props) {
  const { post, token, fetchPosts, user } = props;

  return (
    <div className="individual-post">
      <Votes post={post} token={token} fetchPosts={fetchPosts} user={user} />
      <div className="post-content">
        <div>Subreddit: {post.subreddit.name}</div>
        <div>Title: {post.title}</div>
        <div>Text: {post.text}</div>
      </div>
    </div>
  );
}
