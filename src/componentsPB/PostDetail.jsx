import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../assets/PostDetail.css";
import "../assets/public.css";

const Comment = ({ comment }) => (

  <div className="comment">
    <div className="comment-header">
      <p className="comment-author">{comment.Author}</p>
      <p className="comment-date">{String(comment.date[0]) + " " + String(comment.date[1])}</p>
      
    </div>
    <p className="comment-text">{comment.Text}</p>

  </div>
);

const PostDetail = ({ post, onGoBack }) => {

  return (
    <div className="post-detail">

      {/* Back Button */}
      <div className="back-button">
        <button onClick={onGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
      </div>

      {/* Post Title */}
      <div className="title-and-delete">
        <h2>{post.Title? post.Title : "Post Not Found"}</h2>
      </div>

      {/* Author, Date, Time */}
      <p>By <strong>{post?.Author}</strong> - {post.date && post.date[0]}, {post.date && post.date[1]}</p>
      <br/>
      
      {/* Posted Content */}
      <p>{post ? post.Content : "Post Content Not Found"}</p>

      {/* List of comment on Posted Code */}
      <div className="comment-section">
        <h3>Comments:</h3>

        {post && post.Comments ? 
          (<div className="comment-list">
            {Object.values(post.Comments)?.map((comment,index) => (
              <Comment
              key={index}
              comment={comment}
              />
            ))}
          </div>) : ( <p>No comments available.</p> )}
      </div>


      <br />

    </div>

  );
};

export default PostDetail;
