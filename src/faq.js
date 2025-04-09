import React, { useState, useEffect } from "react";
import "./faq.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const FAQ = () => {
  const faqData = [
    {
      question: "What is Vinyl Vault?",
      answer: "We sell high-quality vinyl records to music enthusiasts worldwide.",
    },
    {
      question: "Is Vinyl Vault an online or physical store?",
      answer: "We are an online-only store, allowing us to reach a global audience and offer competitive prices.",
    },
    {
      question: "How can I get in touch with customer support?",
      answer: "Click on the 'Customer Support' button at the bottom of the page or email us at support@vinylstore.com.",
    },
    {
      question: "How do I sign up for a Vinyl Vault account?",
      answer: "Click on the 'Sign Up' button, enter your details, and follow the instructions to create an account.",
    },
    {
      question: "I forgot my password. How can I reset it?",
      answer: "Click on the 'Forgot Password' link on the login page, and follow the instructions to reset your password.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, PayPal, and other secure payment methods.",
    },
    {
      question: "What are your shipping times?",
      answer: "Shipping times vary by location but typically range from 3 to 10 business days.",
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes! We ship worldwide. Shipping costs and times may vary depending on your location.",
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 14 days of delivery, provided the item is in its original condition.",
    },
    {
      question: "Where can I find my order tracking information?",
      answer: "Once your order is shipped, you will receive a tracking number via email.",
    },
    {
      question: "Do you offer limited edition or rare vinyl?",
      answer: "Yes! We frequently stock limited edition and rare vinyl records, so be sure to check our new arrivals.",
    },
    {
      question: "Can I cancel an order after I've placed it?",
      answer: "Orders can only be canceled within 24 hours of purchase. After that, they are processed for shipping.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`faq-container ${loaded ? 'loaded' : ''}`}>
      <h1>Frequently Asked Questions</h1>
      {faqData.map((item, index) => (
        <div key={index} className="faq-item" style={{ "--index": index }}>
          <div className="faq-question" onClick={() => toggleAnswer(index)}>
            {item.question}
            <span className={`faq-icon ${activeIndex === index ? 'open' : ''}`}>
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
          <div className={`faq-answer ${activeIndex === index ? 'open' : ''}`}>{item.answer}</div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
