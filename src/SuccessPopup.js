import React from "react";
import "./SuccessPopup.css";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // default icon

const SuccessPopup = ({ onClose, title, message, icon: Icon, redirectTo = "/" }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content success-popup">
        <h3>
          {title || "Message Sent Successfully!"}{" "}
          {Icon ? <Icon className="icon" /> : <FaCheckCircle className="icon" />}
        </h3>
        <p className="subtext">
          {message || "We’ll be in touch soon. Thanks for reaching out!"}
        </p>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <Link to={redirectTo} className="popup-home-button">
          {redirectTo === "/dashboard" ? "Go to Dashboard" : "Go Back to Homepage"}
        </Link>
      </div>
    </div>
  );
};

export default SuccessPopup;
