import React, { useState } from "react";
import PostForm from "./PostFormAdmin";
import ask from "../assets/Thinking face.gif";
import "../assets/public.css";
import Modal from "react-modal";

const AskQ = ({ onAddPost }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleAskClick = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="ask-question">
      <div className="ask-content">
        <img src={ask} alt="Thinking Face" className="think" />
        <div className="text-container">
          <p className="subtitle">Can't find an answer?</p>
          <p className="description">
            Make use of a qualified tutor to get the answer
          </p>
        </div>
      </div>
      <button className="ask-button" onClick={handleAskClick}>
        <h3>Ask a Question</h3>
      </button>

      <PostForm
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onAddPost={(newPost) => {
          onAddPost(newPost); // Assuming you have an onAddPost function in the parent component
          closeModal();
        }}
      />
    </div>
  );
};

export default AskQ;
