import React, { useState } from "react";
import "./PaymentPage.css";

function PaymentPage() {
  const [paymentData, setPaymentData] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/processPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });
      if (response.ok) {
        alert("Payment successful!");
        setPaymentData({
          name: "",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
          billingAddress: "",
        });
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="payment-page">
      <header className="payment-header">
        <h1>Secure Payment</h1>
        <p>Complete your order by entering your payment details below.</p>
      </header>

      <div className="payment-form-container">
        <form className="payment-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Cardholder Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
            value={paymentData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={paymentData.cardNumber}
            onChange={handleChange}
            required
          />

          <div className="card-details">
            <div>
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={paymentData.expiryDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="123"
                value={paymentData.cvv}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label htmlFor="billingAddress">Billing Address</label>
          <input
            type="text"
            id="billingAddress"
            name="billingAddress"
            placeholder="123 Main Street, City, Country"
            value={paymentData.billingAddress}
            onChange={handleChange}
            required
          />

          <button type="submit" onClick={() => window.location.href = "/order-success"}>Pay Now</button>
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;
