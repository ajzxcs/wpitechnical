import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../assets/PostDetail.css";
import "../assets/public.css";
import { deletePost, addComment,viewComments,deleteComments } from "../../../firebase/Database";
import { IconButton } from "@mui/material";

const Comment = ({ comment, deleteComment }) => (
  <div className="comment">
    <div className="comment-header">
      <p className="comment-author">{comment.Author}</p>
      <p className="comment-date">
        {String(comment.date[0]) + " " + String(comment.date[1])}
      </p>
    {/* Delete Icon for Comment */}
      <IconButton onClick={()=>deleteComment(comment.id)}>
        <FontAwesomeIcon color="red" icon={faTrash} />
      </IconButton>

    </div>
    <p className="comment-text">{comment.Text}</p>
  </div>
);

const PostDetail = ({ post, onGoBack,onSelectedPost}) => {
  const [commentText, setCommentText] = useState("");
  const [isCommentEmpty, setIsCommentEmpty] = useState(false);
  const [Comments,setComments] = useState([])

  const handleDeletePost = () => {


    deletePost(post.Author,post.id).then(e=>{
      console.log(e)
      onSelectedPost(null)
      })
  };

  const handleAddComment = () => {

    if (commentText.trim() !== "") {

      addComment(post.id, post.Author, commentText)
        .then((e) => {
          alert(e);
        })
        .catch((e) => alert(e));

      setCommentText("");
      setIsCommentEmpty(false);
    } else {
      // Set a flag to indicate the comment is empty and needs to be highlighted
      setIsCommentEmpty(true);
      // Add a CSS class to trigger the color animation
      setTimeout(() => {
        setIsCommentEmpty(false); // Reset the flag after the animation completes
      }, 500); // Adjust the duration to match your CSS animation
    }
  };

  const handleDeleteComment = (CommentID) =>{


    // viewComments(post.id,post.Author).then(e=>console.log(e))

    // Comments(Comments.Author)

    deleteComments(post.Author,post.id,CommentID).then(e=>console.log(e))

  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchedComments  = async () => {
    const comments = await viewComments(post.id,post.Author)
    setComments(comments)
  }

  useEffect(()=>{

    let mounted = true;


      const fetchDataInterval = setInterval(() => {

        if (mounted) {
        // Ftech Data
        fetchedComments()

      }
      }, 1000); 

        // Cleanup function
    return () => {
      mounted = false;
      clearInterval(fetchDataInterval); // Clear the interval when the component unmounts
    };

  },[fetchedComments])

  return (
    <div className="post-detail">
      {/* Back button */}
      <div className="back-button">
        <button onClick={onGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
      </div>

      <div className="title-and-delete">
        {/* Title */}
        <h2>{post ? post.Title : "Post Not Found"}</h2>

        {/* Delete Icon for Comment */}
        <IconButton onClick={handleDeletePost}>
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>


      </div>

      {/* Author, date and time */}
      <p>
        By <strong>{post?.Author}</strong> - {post.date && post.date[0]},{" "}
        {post.date && post.date[1]}
      </p>

      <br />

      {/* Content */}
      <p>{post ? post?.Content : "Post Content Not Found"}</p>

      {/* Comment Section */}
      <div className="comment-section">
        {/* List of Comments */}
        <h3>Comments:</h3>

        {post && post.Comments ? (
          <div className="comment-list">
            {Comments && Object.values(Comments)?.map((comment, index) => (
              <Comment key={index} comment={comment} deleteComment={handleDeleteComment} />
            ))}
          </div>
        ) : (
          <p>No comments available.</p>
        )}

        {/* Comment section */}
        <textarea
          rows="4"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className={isCommentEmpty ? "error" : ""}
        />

        <button className="comment-button" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>

      <br />
    </div>
  );
};

export default PostDetail;
