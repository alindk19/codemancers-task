import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import "./CreatePost.css";
import userImage from "../Post/guest-user.jpg";

const CreatePost = ({ open, onClose }) => {
  const [giphySrc, setGiphySrc] = useState("");
  const [giphyData, setGiphyData] = useState([]);
  const [gifOpen, setGifOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [content, setContent] = useState("");
  const [timer, setTimer] = useState(undefined);
  useEffect(() => {
    if (timer) clearTimeout(timer);
    setTimer(setTimeout(() => fetchData(search), 500));
    //eslint-disable-next-line
  }, [search]);
  const fetchData = (searchKeyword) => {
    let type = "trending";
    if (searchKeyword) type = "search";

    fetch(
      `https://api.giphy.com/v1/gifs/${type}?api_key=7dqoazeRxFyT72CvRKiqUwLPxsDFVPM6&q=${searchKeyword}`
    )
      .then((response) => response.json())
      .then((res) => setGiphyData(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let posts = JSON.parse(localStorage.getItem("posts"));
    if (!posts) posts = [];
    posts.unshift({
      giphySrc,
      name: "Anonymous",
      date: new Date(),
      content,
    });
    localStorage.setItem("posts", JSON.stringify(posts));
    setSearch("");
    setGiphySrc("");
    setContent("");
    onClose();
  };
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="createPostWrapper">
          <div className="header">
            <div className="profile-image">
              <img src={userImage} alt="" />
            </div>
            <textarea
              key="content"
              name="post"
              id="post"
              cols="30"
              placeholder="Write something here..."
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          {giphySrc && <img className="giphy-image" src={giphySrc} alt="gif" />}
          <div className="extras">
            <p>Tag friends</p>
            <p>Check in</p>
            <p onClick={() => setGifOpen(true)}>GIF</p>
            <p>Tag Event</p>
          </div>
          <div className="footer">
            <button onClick={handleSubmit}>Post</button>
          </div>
          {gifOpen && (
            <div className="gif-container">
              <input
                key="gif-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                name="gif-search"
                autoFocus={true}
              />
              {giphyData?.map((giphy, index) => (
                <div key={index} className="gif">
                  <img
                    onClick={(e) => {
                      setGiphySrc(e.target.src);
                      setGifOpen(false);
                    }}
                    src={giphy?.images?.fixed_height?.url}
                    alt="gif"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default CreatePost;
