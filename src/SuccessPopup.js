import React from "react";
import "./SuccessPopup.css";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";


const SuccessPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content success-popup">
      <h3>
         Message Sent Successfully! <FaCheckCircle className="icon" />
      </h3>
        <p className="subtext">We’ll be in touch soon. Thanks for reaching out!</p>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <Link to="/" className="popup-home-button">
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default SuccessPopup;
