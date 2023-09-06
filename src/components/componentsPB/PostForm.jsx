import React, { useState } from "react";
import Modal from "react-modal";
import samplePosts from "../../data/samplePosts"; // Import samplePosts/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root"); // Set the app element for modal accessibility

const PostForm = ({ isOpen, onRequestClose, onAddPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddPost = () => {
    if (title && content) {
      const newPost = {
        id: Date.now(),
        title,
        content,
        author: "You",
        date: new Date().toLocaleDateString(),
        commentCount: 0,
        comments: []
      };
      onAddPost(newPost);
      setTitle("");
      setContent("");
      // You might also want to update the samplePosts array
      samplePosts.push(newPost);
      onRequestClose(); // Close the modal after adding the post
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="post-form-modal"
    >
      <div className="post-form">
        <div className="close-button" onClick={onRequestClose}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <h2>Create a New Post</h2>
        <div className="post-form-details">
          <p>{new Date().toLocaleString()}</p> {/* Display current time */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button onClick={handleAddPost}>Create Post</button>
      </div>
    </Modal>
  );
};

export default PostForm;
