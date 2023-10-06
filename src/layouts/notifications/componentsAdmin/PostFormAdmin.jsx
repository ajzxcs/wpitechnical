import React, { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select"; // Import react-select
import "../assets/public.css";


const PostForm = ({ isOpen, onRequestClose, onAddPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brandInput, setBrandInput] = useState("");
  const [IspostEmpty, setIspostEmpty] = useState(false);

  const handleAddTag = () => {
    if (tagInput) {
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        setTagInput("");
      }
    }
  
    // Include selected brands as tags
    const selectedBrandTags = selectedBrands.map((brand) => ` ${brand.label}`);
    if (selectedBrandTags.length > 0) {
      const updatedTags = [...tags, ...selectedBrandTags];
      setTags(updatedTags);
      setSelectedBrands([]); // Clear selected brands
    }
  };

  const handleCreatePost = () => {
    if (content.trim() !== "") {
      const newTags = [...tags, ...selectedBrands.map((brand) => ` ${brand.label}`)];
      const newPost = {
        title,
        content,
        newTags: newTags.join(", "),
      };

      onAddPost(newPost);

      setTitle("");
      setContent("");
      setTags([]);
      setTagInput("");
      setSelectedBrands([]);
      setBrandInput("");
      onRequestClose();
    } else {
      setIspostEmpty(true);
    }
  };

  const brands = [
    { value: "Brand A", label: "Brand A" },
    { value: "Brand B", label: "Brand B" },
    { value: "Brand C", label: "Brand C" },
    // Add more brands as needed
  ];

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="post-form-modal">
      <div className="post-form">
        <div className="close-button" onClick={onRequestClose}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <h2>Create a New Post</h2>
        <div className="post-form-details">
          <p>{new Date().toLocaleString()}</p>
          <input
            type="text"
            placeholder="Topic"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Concern"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={IspostEmpty ? "error" : ""}
          />
          {IspostEmpty && (
            <div className="alert-text">Content cannot be empty!</div>
          )}

          <br />
          <br />
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

          {/* Brand selection */}
          <div className="brand-selection">
            <strong>Select Brands:</strong>
            <Select
              isMulti
              name="brands"
              options={brands}
              value={selectedBrands}
              onChange={(selectedOptions) => setSelectedBrands(selectedOptions)}
            />
          </div>

          <br />
          <div className="tag-input">
            <input
              type="text"
              placeholder="Type here your specific Tags "
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button onClick={handleAddTag}>Add Tag</button>
             <h6>To include tags, simply select the 'Add Tag' option.</h6>
          </div>
        </div>
        <br />
        <div style={{ textAlign: 'right' }}>
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
      </div>
    </Modal>
  );
};

export default PostForm;
