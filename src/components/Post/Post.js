import "./Post.css";
import user from "./guest-user.jpg";

const Post = ({ post }) => {
  return (
    <div className="postWrapper">
      <div className="postHeader">
        <div className="profile">
          <img src={user} alt="profile" />
          <div className="profileDetails">
            <p className="name">{post?.name}</p>
            <p>{new Date(post?.date).toDateString()}</p>
          </div>
        </div>
        <div>...</div>
      </div>
      <div className="postContent">
        <p>{post?.content}</p>
        <img src={post?.giphySrc} alt="gif" />
      </div>
    </div>
  );
};

export default Post;
