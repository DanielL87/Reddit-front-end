import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./components/Home.jsx";

import CreatePost from "./components/CreatePost.jsx";
import CreateSubReddit from "./components/CreateSubReddit.jsx";
import SingleSubreddit from "./components/SingleSubreddit.jsx";
import NotFound from "./components/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "createpost", element: <CreatePost /> },
      { path: "createsubreddit", element: <CreateSubReddit /> },
      { path: "*", element: <NotFound /> },
      { path: "subreddits/:subredditName", element: <SingleSubreddit /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
