import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown,  faTrash } from "@fortawesome/free-solid-svg-icons";


const PostList = ({ onSelectPost, posts }) => {
  // Access the samplePosts data directly
  // const posts = Object.values(samplePosts)
  //   .flatMap((author) => author.Posts)
  //   .sort((a, b) => {
  //     const dateA = new Date(a.date).getTime();
  //     const dateB = new Date(b.date).getTime();
  //     return dateB - dateA; // Sort by date in descending order (newest to oldest)
  //   });

  return (
    <div className="post-list">
      {posts && posts.map((postedData,outerKey) => (

        <div key={outerKey} className="post">

   {/* Delete Icon */}
   <div className="delete-icon">
      <FontAwesomeIcon icon={faTrash} />
    </div>

          {/* Tags */}
          <div className="tags">
            <h3>Tags:</h3>{" "}

            {String(postedData?.tags)?.split(",").map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
          
          {/* Title */}
          <h2>{postedData.Title}</h2>

          {/* Author,date and time */}
          <p>
          By <strong>{postedData?.Author}</strong> - {postedData.date && postedData.date[0]}, {postedData.date && postedData.date[1]}
          </p>

          {/* Content */}
          <p>{postedData.Content}</p>

          {/* add more */}
          <div className="comment-count" onClick={() => onSelectPost(postedData)}>
            <FontAwesomeIcon icon={faAngleDoubleDown} /> Read More
          </div>

        </div>
      ))}
    </div>
  );
};

export default PostList;
