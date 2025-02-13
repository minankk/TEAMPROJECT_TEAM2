import React from "react";
import "./OrderSuccess.css";

function OrderSuccess() {
  return (
    <div className="order-success-container">
      <div className="success-message">
        <h1>Payment Successful!</h1>
        <p>Thank you for your order. You will receive a confirmation email shortly.</p>
        <a href="/" className="home-button">Return to Home</a>
      </div>
    </div>
  );
}

export default OrderSuccess;
