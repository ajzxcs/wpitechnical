import React from "react";
// import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faTrash,
  faThumbsUp,
  faThumbsDown,
  faArrowLeft,
  // faCommentAlt
} from "@fortawesome/free-solid-svg-icons";
import "../assets/PostDetail.css";
import "../assets/public.css";

const Comment = ({ comment, onLikeDislike }) => (

  <div className="comment">
    <div className="comment-header">
      <p className="comment-author">{comment.Author}</p>
      <p className="comment-date">{String(comment.date[0]) + " " + String(comment.date[1])}</p>
      
    </div>
    <p className="comment-text">{comment.Text}</p>

  </div>
);

const PostDetail = ({ post, onDeletePost, onGoBack }) => {
  // const [rating, setRating] = useState(0);
  // const [totalRatings, setTotalRatings] = useState(0);

  React.useEffect(() => {

    
    console.log(post)
    // if (post) {
    //   const storedRating =
    //     parseFloat(localStorage.getItem(`post-${post.id}-rating`)) || 0;
    //   setRating(storedRating);
    //   setTotalRatings(post.comments ? post.comments.length : 0);
    // }
  }, []);

  // useEffect(() => {
  //   if (post) {
  //     localStorage.setItem(`post-${post.id}-rating`, rating.toString());
  //   }
  // }, [rating, post]);

  // const handleRatingChange = (newRating) => {
  //   setRating(newRating);
  //   setTotalRatings(totalRatings + 1);
  // };

  // const handleLikeDislike = (commentId, action) => {
  //   const updatedComments = post.comments.map((comment) => {
  //     if (comment.id === commentId) {
  //       if (action === "like") {
  //         return { ...comment, likes: comment.likes + 1 };
  //       } else if (action === "dislike") {
  //         return { ...comment, dislikes: comment.dislikes + 1 };
  //       }
  //     }
  //     return comment;
  //   });

  //   // Update the post object with the modified comments
  //   const updatedPost = { ...post, comments: updatedComments };

  //   // You may want to update the state or send this updatedPost to your backend API.
  //   // For now, let's just log it.
  //   console.log("Updated Post with Likes/Dislikes:", updatedPost);
  // };



  // const handleDeletePost = () => {
  //   // Call the onDeletePost function passed as a prop to delete the post
  //   if (post) {
  //     onDeletePost(post.id);
  //   }
  // };

  return (
    <div className="post-detail">
      <div className="back-button">
        <button onClick={onGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
      </div>
      <div className="title-and-delete">
        <h2>{post ? post.Title : "Post Not Found"}</h2>
{/* 
        <button onClick={handleDeletePost}>
          <FontAwesomeIcon icon={faTrash} />
        </button> */}
      </div>

      <p>{post ? `${post.Author} - ${post.date}` : "Author Not Found"}</p>
<br/>
      
      <p>{post ? post.Content : "Post Content Not Found"}</p>

      <div className="comment-section">
        <h3>Comments:</h3>

        {post && post.Comments ? (
          <div className="comment-list">
          May laman

            {Object.values(post.Comments).map((comment,index) => (
              <Comment
                key={index}
                comment={comment}
                // onLikeDislike={handleLikeDislike}
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
