import React, { useState } from "react";
import "./faq.css"; 
const FAQ = () => {
  const faqData = [
    { question: "What does your company do?", answer: "It sells vinyls" },
    {
      question: "Do you have a physical store, or are you online only",
      answer: "It is an online website and we don't have any office",
    },
    {
      question: "How can I contact customer support",
      answer: "Click on the Customer support button given at the bottom",
    },
    {
      question: "How do I create an account?",
      answer: "Click on the signup button to create a new account",
    },
    {
      question: "How to reset my password?",
      answer: "Click on the forgot password link",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      {faqData.map((item, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleAnswer(index)}>
            {item.question}
            <span className="faq-icon">
              {activeIndex === index ? "-" : "+"}
            </span>
          </div>
          {activeIndex === index && (
            <div className="faq-answer">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;