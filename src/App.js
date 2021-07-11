import "./App.css";
import CreatePost from "./components/create-post/CreatePost";
import React, { useEffect, useState } from "react";
import Post from "./components/Post/Post";

function App() {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };
  const [posts, setPosts] = useState([]);
  const localStoragePosts = localStorage.getItem("posts");
  useEffect(() => {
    setPosts(JSON.parse(localStoragePosts));
  }, [localStoragePosts]);
  return (
    <div className="App">
      <button className="create-post" onClick={() => setOpen(onOpen)}>
        Create Post
      </button>
      <CreatePost open={open} onClose={onClose} />
      {posts?.map((post) => (
        <Post key={post?.date} post={post} />
      ))}
    </div>
  );
}

export default App;
