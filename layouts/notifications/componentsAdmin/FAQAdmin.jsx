import React, { useState } from "react";
import "./assets/FAQ.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Import the back arrow icon
import { FaqData, FaqData2 } from "../../../data/FaqData";
import "./assets/PostDetail.css";

const FAQ = ({ toggleFAQVisibility }) => {
  const [faqs1, setFaqs1] = useState(FaqData);
  const [faqs2, setFaqs2] = useState(FaqData2);

  const toggleFAQ = (index, listName) => {
    let updatedFaqs;

    if (listName === "faqs1") {
      updatedFaqs = faqs1.map((faq, i) => {
        if (i === index) {
          return { ...faq, isOpen: !faq.isOpen };
        }
        return { ...faq, isOpen: false };
      });
      setFaqs1(updatedFaqs);
    } else if (listName === "faqs2") {
      updatedFaqs = faqs2.map((faq, i) => {
        if (i === index) {
          return { ...faq, isOpen: !faq.isOpen };
        }
        return { ...faq, isOpen: false };
      });
      setFaqs2(updatedFaqs);
    }
  };

  return (
    <div className="faq-title">
      <div className="faq-container">
        <h2>Frequently Asked Questions</h2>
        <div className="back-button">
          <button onClick={toggleFAQVisibility}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
        </div>
        <div className="faq-list">
          {faqs1.map((faq, index) => (
            <div key={index} className={`faq-item ${faq.isOpen ? "open" : ""}`}>
              <div className="faq-content">
                <div
                  className="faq-question"
                  onClick={() => toggleFAQ(index, "faqs1")}
                >
                  {faq.question}
                </div>
                <FontAwesomeIcon
                  icon={faAngleDown}
                  onClick={() => toggleFAQ(index, "faqs1")}
                  className={`arrow ${faq.isOpen ? "open" : ""}`}
                />
              </div>
              {faq.isOpen && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
        <div className="faq-list">
          {faqs2.map((faq, index) => (
            <div key={index} className={`faq-item ${faq.isOpen ? "open" : ""}`}>
              <div className="faq-content">
                <div
                  className="faq-question"
                  onClick={() => toggleFAQ(index, "faqs2")}
                >
                  {faq.question}
                </div>
                <FontAwesomeIcon
                  icon={faAngleDown}
                  onClick={() => toggleFAQ(index, "faqs2")}
                  className={`arrow ${faq.isOpen ? "open" : ""}`}
                />
              </div>
              {faq.isOpen && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
