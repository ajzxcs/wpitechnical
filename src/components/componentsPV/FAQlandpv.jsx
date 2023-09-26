import React, { useState } from "react";
import "../assets/FAQland.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FaqData3 } from "../Data/FaqData";

const FAQland = ({ toggleFAQVisibility }) => {
  const [faqs3, setFaqs3] = useState(FaqData3);

  const toggleFAQ = (index, listName) => {
    let updatedFaqs;

    if (listName === "faqs1") {
      updatedFaqs = faqs3.map((faq, i) => {
        if (i === index) {
          return { ...faq, isOpen: !faq.isOpen };
        }
        return { ...faq, isOpen: false };
      });
      setFaqs3(updatedFaqs);
    }
  };

  return (
    <div className="dispFAQ-title">
      <div className="dispFAQ-container">
        <div className="dispFAQ-list">
          {faqs3.map((faq, index) => (
            <div
              key={index}
              className={`dispFAQ-item ${faq.isOpen ? "open" : ""}`}
            >
              <div className="dispFAQ-content">
                <div
                  className="dispFAQ-question"
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
              {faq.isOpen && <div className="dispFAQ-answer">{faq.answer}</div>}
            </div>
          ))}
          <button onClick={toggleFAQVisibility} className="morebutton">
            More...
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQland;
