import React from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import "./ThankYouPage.css"; // Import the CSS file

const ThankYouPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Default values if location.state is undefined
  const { amount = "0", method = "credit_card" } = location.state || {};

  const handleBackToHome = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <motion.div
      className="thank-you-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="thank-you-box">
        <h1 className="thank-you-heading">Thank You!</h1>
        <p className="thank-you-message">
          Your payment of <span className="font-semibold">£{amount}</span> via{" "}
          <span className="font-semibold">{method}</span> was successful.
        </p>
        <p className="thank-you-submessage">
          We appreciate your purchase. You will receive a confirmation email shortly.
        </p>
        <button
          onClick={handleBackToHome}
          className="thank-you-button"
        >
          Back to Home
        </button>
      </div>
    </motion.div>
  );
};

export default ThankYouPage;