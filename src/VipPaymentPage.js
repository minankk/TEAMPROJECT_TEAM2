import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import "./VipPaymentPage.css";

function VipPaymentPage() {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState("");
    const [paymentData, setPaymentData] = useState({
        name: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePlanChange = (e) => {
        setSelectedPlan(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedPlan) {
            alert("Please select a subscription plan.");
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert("You are not logged in. Please log in to proceed with payment.");
            return;
        }

        // Set plan price
        const amount = selectedPlan === "monthly" ? 2.99 : 29.99;

        try {
            const response = await fetch("http://localhost:5001/membership/process-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    amount: amount,
                    paymentMethod: "card", // Fixed value used by backend
                }),
            });

            const responseData = await response.json();

            if (response.ok) {
                alert(`Payment successful! You are now a VIP member (${selectedPlan}).`);
                navigate('/vip-success');
            } else {
                alert(`Payment failed: ${responseData.message || "Please try again."}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="vip-payment-page">
            <header className="vip-payment-header">
                <h1>VIP Membership Payment</h1>
                <p>Select your subscription and enter your payment details below.</p>
            </header>

            <div className="vip-payment-container">
                <div className="plan-selection">
                    <h2>Select Your Plan</h2>
                    <select value={selectedPlan} onChange={handlePlanChange} required>
                        <option value="">-- Select a Plan --</option>
                        <option value="monthly">Monthly (£2.99/month)</option>
                        <option value="annual">Annual (£29.99/year)</option>
                    </select>
                </div>

                {selectedPlan && (
                    <div className="payment-form-container">
                        <h2>Payment Details</h2>
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

                            <button type="submit">Pay Now</button>
                        </form>
                    </div>
                )}

                <div className="payment-back-link">
                    <Link to="/vip-signup">Go back to VIP Signup</Link>
                </div>
            </div>
        </div>
    );
}

export default VipPaymentPage;
