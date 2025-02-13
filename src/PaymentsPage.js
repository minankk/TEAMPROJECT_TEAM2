import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./PaymentPage.css"; // Import the CSS file

const PaymentsPage = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("credit_card");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cvc, setCvc] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handlePayment = () => {
    // Validate inputs before proceeding
    if (!amount || !address || !cardNumber || !cardHolderName || !cvc) {
      alert("Please fill in all fields.");
      return;
    }

    // Simulate payment processing
    console.log(`Processing ${method} payment of £${amount}`);

    // Redirect to the Thank You page with payment details
    navigate("/thank-you", {
      state: { amount, method }, // Pass payment details to the Thank You page
    });
  };

  return (
    <motion.div
      className="payment-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="payment-box">
        <h2 className="payment-heading">Make a Payment</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="payment-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Payment Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="payment-select"
          >
            <option value="credit_card">Credit Card</option>
            <option value="Debit_card">Debit Card</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="payment-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Enter card number"
            className="payment-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Card Holder Name</label>
          <input
            type="text"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
            placeholder="Enter card holder name"
            className="payment-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">CVC</label>
          <input
            type="text"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            placeholder="Enter CVC"
            className="payment-input"
          />
        </div>
        <button
          onClick={handlePayment}
          className="payment-button"
        >
          Pay Now
        </button>
      </div>
    </motion.div>
  );
};

export default PaymentsPage;