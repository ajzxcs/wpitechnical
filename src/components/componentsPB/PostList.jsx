import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const PostList = ({ posts, onSelectPost }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <div
          key={post.id}
          className="post"
          onClick={() => onSelectPost(post.id)}
        >
          <h2>{post.title}</h2>
          <p>
            By {post.author} - {post.date}
          </p>
          <p>{post.content}</p>
          <div className="comment-count">
            <FontAwesomeIcon icon={faComment} /> {post.commentCount}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
