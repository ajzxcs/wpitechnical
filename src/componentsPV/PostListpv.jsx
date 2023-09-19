import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import samplePosts from "../Data/samplePosts"; // Import the data

const PostList = ({ onSelectPost }) => {
  // Access the samplePosts data directly
  const posts = Object.values(samplePosts)
    .flatMap((author) => author.Posts)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Sort by date in descending order (newest to oldest)
    });

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id} className="post">
          {post && post.tags && post.tags.length > 0 && (
            <div className="tags">
              <h3>Tags:</h3>{" "}
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h2>{post.title}</h2>
          <p>
            By {post.Author} - {post.date} , {post.time}
          </p>
          <p>{post.content}</p>
          <div className="comment-count" onClick={() => onSelectPost(post)}>
            <FontAwesomeIcon icon={faAngleDoubleDown} /> Read More
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
