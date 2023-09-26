import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faThumbsUp,
  faThumbsDown,
  faArrowLeft,
  faCommentAlt
} from "@fortawesome/free-solid-svg-icons";
import "../assets/PostDetail.css";
import "../assets/public.css";

const Comment = ({ comment, onLikeDislike }) => (
  <div className="comment">
    <div className="comment-header">
      <p className="comment-author">{comment.author}</p>
      <p className="comment-date">{comment["date and time"]}</p>
    </div>
    <p className="comment-text">{comment.text}</p>
    <div className="comment-buttons">
      <button
        className="like"
        onClick={() => onLikeDislike(comment.id, "like")}
      >
        <FontAwesomeIcon icon={faThumbsUp} /> Like ({comment.likes})
      </button>
      <button
        className="dislike"
        onClick={() => onLikeDislike(comment.id, "dislike")}
      >
        <FontAwesomeIcon icon={faThumbsDown} /> Dislike ({comment.dislikes})
      </button>
    </div>
  </div>
);

const PostDetail = ({ post, onDeletePost, onGoBack }) => {
  const [rating, setRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments); // Use post.comments

  useEffect(() => {
    if (post) {
      const storedRating =
        parseFloat(localStorage.getItem(`post-${post.id}-rating`)) || 0;
      setRating(storedRating);
      setTotalRatings(post.comments ? post.comments.length : 0);
    }
  }, [post]);

  useEffect(() => {
    if (post) {
      localStorage.setItem(`post-${post.id}-rating`, rating.toString());
    }
  }, [rating, post]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setTotalRatings(totalRatings + 1);
  };

  const handleLikeDislike = (commentId, action) => {
    const updatedComments = post.comments.map((comment) => {
      if (comment.id === commentId) {
        if (action === "like") {
          return { ...comment, likes: comment.likes + 1 };
        } else if (action === "dislike") {
          return { ...comment, dislikes: comment.dislikes + 1 };
        }
      }
      return comment;
    });

    // Update the post object with the modified comments
    const updatedPost = { ...post, comments: updatedComments };

    // You may want to update the state or send this updatedPost to your backend API.
    // For now, let's just log it.
    console.log("Updated Post with Likes/Dislikes:", updatedPost);
  };
  const handleDeletePost = () => {
    // Call the onDeletePost function passed as a prop to delete the post
    if (post) {
      onDeletePost(post.id);
    }
  };
  const handleAddComment = () => {
    if (commentText.trim() !== "") {
      const newComment = {
        id: comments.length + 1,
        text: commentText,
        likes: 0,
        dislikes: 0
      };

      setComments([...comments, newComment]);
      setCommentText("");
    }
  };

  return (
    <div className="post-detail">
      <div className="back-button">
        <button onClick={onGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
      </div>
      <div className="title-and-delete">
        <h2>{post ? post.title : "Post Not Found"}</h2>

        <button onClick={handleDeletePost}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <p>{post ? `${post.Author} - ${post.date}` : "Author Not Found"}</p>
      <br />

      <p>{post ? post.content : "Post Content Not Found"}</p>

      <div className="comment-section">
        <textarea
          rows="4"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button className="comment-button" onClick={handleAddComment}>
          Add Comment
        </button>

        <h3>Comments:</h3>
        {post && post.comments ? (
          <div className="comment-list">
            {post.comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onLikeDislike={handleLikeDislike}
              />
            ))}
          </div>
        ) : (
          <p>No comments available.</p>
        )}
      </div>

      <br />
    </div>
  );
};

export default PostDetail;
