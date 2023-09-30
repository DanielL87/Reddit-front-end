import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { API } from "./assets/API";
import NavBar from "./components/NavBar";

function App() {
  const [posts, setPosts] = useState([]);
  const [subreddits, setSubreddits] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [selectedSubredditId, setSelectedSubredditId] = useState({});

  async function fetchPosts() {
    const res = await fetch(`${API}/posts`);
    const info = await res.json();
    setPosts(info.posts);
  }

  async function fetchSubreddits() {
    const res = await fetch(`${API}/subreddits/`);
    const info = await res.json();
    setSubreddits(info.subreddits);
  }

  async function fetchUser() {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }
    if (!token) {
      return;
    }
    const res = await fetch(`${API}/users/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();
    if (info.success) {
      setUser(info.user);
    }
  }

  useEffect(() => {
    fetchPosts();
    fetchSubreddits();
    fetchUser();
  }, [token]);

  return (
    <>
      <NavBar user={user} setToken={setToken} setUser={setUser} />
      <Outlet
        context={{
          posts,
          subreddits,
          setToken,
          fetchPosts,
          fetchSubreddits,
          user,
          token,
          setSelectedSubredditId,
          selectedSubredditId,
        }}
      />
    </>
  );
}

export default App;
