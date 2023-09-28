import React, { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../assets/public.css";

Modal.setAppElement("#root"); // Set the app element for modal accessibility

const PostForm = ({ isOpen, onRequestClose, onAddPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [IspostEmpty, setIspostEmpty] = useState(false);
  const [IstagEmpty, setIstagEmpty] = useState(false);
  const [IstitleEmpty, setIstitleEmpty] = useState(false);

  const handleAddTag = () => {
    if (tagInput) {
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        setTagInput("");
      }
    }else {
      // Set a flag to indicate the content is empty and needs to be highlighted
  
      setIspostEmpty(true);
      setIstitleEmpty(true);
      setIstagEmpty(true)
    }
  };
  const handleCreatePost = () => {
    if (title.trim() !== "" && content.trim() !== "" && tags.length > 0) {
      const newTags = String(tags);
      // Create a new post object
      const newPost = {
        title,
        content,
        newTags,
        // Add any other properties you need
      };
  
      // Call the onAddPost function to add the post to the list
      onAddPost(newPost);
  
      // Clear the form fields
      setTitle("");
      setContent("");
      setTags([]);
      setTagInput("");
      onRequestClose();
    } else {
      // Set flags to indicate which fields are empty and need to be highlighted
      setIspostEmpty(title.trim() === "");
      setIstitleEmpty(content.trim() === "");
      setIstagEmpty(tags.length === 0);
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
          <p>{new Date().toLocaleString()}</p>
          <textarea
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={IspostEmpty  ? "error" : ""}
          />
            {/*  {IstitleEmpty && (
            <div className="alert-text">Title cannot be empty!</div>
          )}*/}
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={IspostEmpty  ? "error" : ""}
          />
          
          {/* Alert text for empty content */}
          {IspostEmpty && (
            <div className="alert-text">Title and Content cannot be empty!</div>
          )}
         
          {/* Tags */}
          {tags.length > 0 && (
            <div className="selected-tags">
              <strong>Selected Tags:</strong>{" "}
              {tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
         
          <br />
          <div className="tag-input">
            <textarea
              type="text"
              placeholder="Press Add Tag to Add more... "
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className={IstagEmpty ? "error" : ""}
            />
             {IstagEmpty && (
            <div className="alert-text">Tag cannot be empty!</div>
          )}
            <button onClick={handleAddTag}>Add Tag</button>
          </div>
        </div>
        <br />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>
    </Modal>
  );
};

export default PostForm;
