import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../assets/PostDetail.css";
import "../assets/public.css";

// database
import { deletePost,addComment } from '../Features/firebase/Database'


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
  const [commentText, setCommentText] = React.useState("");
  // const [comments, setComments] = React.useState(post.comments); // Use post.comments

  const handleDeletePost = () => {
   
    deletePost(post.id)
  };
  const handleAddComment = () => {
    // if (commentText.trim() !== "") {
    //   const newComment = {
    //     id: comments.length + 1,
    //     text: commentText,
    //     likes: 0,
    //     dislikes: 0
    //   };



      addComment(post.id,post.Author,commentText)
      .then(e=>{
        alert(e)
        window.location.reload()
      })
      .catch(e=>alert(e))

      // setComments([...comments, newComment]);
      // setCommentText("");
    // }
  };

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

      {/* Delete */}
        <button onClick={handleDeletePost}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      {/* Author, date and time */}
      <p>By <strong>{post?.Author}</strong> - {post.date && post.date[0]}, {post.date && post.date[1]}</p>

      <br />

      {/* Content */}
      <p>{post ? post?.Content : "Post Content Not Found"}</p>

      {/* Comment Section */}
      <div className="comment-section">

        {/* List of Comments */}
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
          
        {/* Comment section */}
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

      <br />
    </div>
  );
};

export default PostDetail;
