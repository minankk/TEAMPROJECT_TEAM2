import React, { useState } from "react";
import "./faq.css";

const FAQ = () => {
  const faqData = [
    {
      question: "What does your company do?",
      answer: "We sell high-quality vinyl records to music enthusiasts worldwide.",
    },
    {
      question: "Do you have a physical store, or are you online only?",
      answer: "We are an online-only store, allowing us to reach a global audience and offer competitive prices.",
    },
    {
      question: "How can I contact customer support?",
      answer: "Click on the 'Customer Support' button at the bottom of the page or email us at support@vinylstore.com.",
    },
    {
      question: "How do I create an account?",
      answer: "Click on the 'Sign Up' button, enter your details, and follow the instructions to create an account.",
    },
    {
      question: "How do I reset my password?",
      answer: "Click on the 'Forgot Password' link on the login page, and follow the instructions to reset your password.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, PayPal, and other secure payment methods.",
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary by location but typically range from 3 to 10 business days.",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes! We ship worldwide. Shipping costs and times may vary depending on your location.",
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 14 days of delivery, provided the item is in its original condition.",
    },
    {
      question: "How do I track my order?",
      answer: "Once your order is shipped, you will receive a tracking number via email.",
    },
    {
      question: "Do you sell limited edition vinyl records?",
      answer: "Yes! We frequently stock limited edition and rare vinyl records, so be sure to check our new arrivals.",
    },
    {
      question: "Can I cancel my order after placing it?",
      answer: "Orders can only be canceled within 24 hours of purchase. After that, they are processed for shipping.",
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
            <span className="faq-icon">{activeIndex === index ? "-" : "+"}</span>
          </div>
          {activeIndex === index && <div className="faq-answer">{item.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
