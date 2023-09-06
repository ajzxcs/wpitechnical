import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faThumbsUp,
  faThumbsDown,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import "../assets/PostDetail.css";

const PostDetail = ({ post, onDeletePost, onAddComment, onGoBack }) => {
  const [rating, setRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments); // Use post.comments
  const [commentCount, setCommentCount] = useState(post.commentCount); // Use post.commentCount

  useEffect(() => {
    const storedRating =
      parseFloat(localStorage.getItem(`post-${post.id}-rating`)) || 0;
    setRating(storedRating);
    setTotalRatings(post.commentCount);
  }, [post.id, post.commentCount]);

  useEffect(() => {
    localStorage.setItem(`post-${post.id}-rating`, rating.toString()); // Save the rating to local storage
  }, [rating, post.id]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setTotalRatings(totalRatings + 1);
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
      setCommentCount(commentCount + 1);
    }
  };

  const handleLikeDislike = (commentId, action) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        if (action === "like") {
          return { ...comment, likes: comment.likes + 1 };
        } else if (action === "dislike") {
          return { ...comment, dislikes: comment.dislikes + 1 };
        }
      }
      return comment;
    });

    setComments(updatedComments);
  };

  return (
    <div className="post-detail">
      <div className="back-button">
        <button onClick={onGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
      </div>
      <div className="title-and-delete">
        <h2>{post.title}</h2>

        <button onClick={() => onDeletePost(post.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <p>
        {post.author} - {post.date}
      </p>
      <div className="star-rating">
        <StarRatings
          rating={rating}
          starRatedColor="gold"
          starDimension="20px"
          starHoverColor="gold"
          changeRating={handleRatingChange}
          numberOfStars={5}
        />
        <p>{rating} / 5</p>
      </div>
      <p>{post.content}</p>

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
      </div>

      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p>{comment.text}</p>
          <div className="comment-buttons">
            <button
              className="like"
              onClick={() => handleLikeDislike(comment.id, "like")}
            >
              <FontAwesomeIcon icon={faThumbsUp} /> {comment.likes}
            </button>
            <button
              className="dislike"
              onClick={() => handleLikeDislike(comment.id, "dislike")}
            >
              <FontAwesomeIcon icon={faThumbsDown} /> {comment.dislikes}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostDetail;
