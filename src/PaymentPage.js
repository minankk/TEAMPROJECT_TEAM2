import React, { useState } from "react";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import "./PaymentPage.css";

function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, totalAmount, originalAmount, discountApplied } = location.state || {};
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

        if (!cartItems || cartItems.length === 0) {
            alert("Your cart is empty. Cannot proceed with payment.");
            return;
        }

        const token = localStorage.getItem('token');

        if (!token) {
            alert("You are not logged in. Please log in to place an order.");
            return;
        }

        console.log("Cart Items Full Structure:", JSON.stringify(cartItems, null, 2));

        try {
            const orderData = {
                items: cartItems.map(item => ({
                    product_id: item.product_id,  
                    quantity: item.quantity,
                    price: item.price
                })),
                shippingAddress: paymentData.billingAddress,
            };

            console.log("Submitting Order Payload:", orderData);

            const response = await fetch("http://localhost:5001/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                const responseData = await response.json();
                alert(
                    `Payment successful!\n\nOrder ID: ${responseData.orderId}\nMembership: ${responseData.membershipTier}\nOriginal: £${responseData.originalTotal.toFixed(2)}\nDiscount Applied: ${responseData.discountApplied}%\nFinal Total: £${responseData.finalTotalAmount}`
                  );
                  navigate('/order-success', {
                    state: {
                      trackingNumber: responseData.tracking_number,
                      orderSummary: {
                        orderId: responseData.orderId,
                        membershipTier: responseData.membershipTier,
                        discountApplied: responseData.discountApplied,
                        finalTotalAmount: responseData.finalTotalAmount
                      }
                    }
                  });
                    } else {
                const errorData = await response.json();
                alert(`Payment failed: ${errorData.message || "Please try again."}`);
            }
        } catch (error) {
            console.error("Error during payment:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div id="payment-page">
            <div className="payment-content">
                <header className="payment-header">
                    <h1>Secure Payment</h1>
                    <p>Complete your order by entering your payment details below.</p>
                </header>

                <div className="payment-details-container">
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

                            <label htmlFor="billingAddress">Shipping Address</label>
                            <input
                                type="text"
                                id="billingAddress"
                                name="billingAddress"
                                placeholder="123 Main Street, City, Country"
                                value={paymentData.billingAddress}
                                onChange={handleChange}
                                required
                            />

                            <button type="submit">Pay Now</button>
                        </form>
                    </div>

                    <div className="order-summary-container">
                    <h2>Order Summary</h2>
<ul>
  {cartItems.map((item) => (
    <li key={item.product_id}>
      {item.name} x {item.quantity} - £{(item.price * item.quantity).toFixed(2)}
    </li>
  ))}
</ul>

{discountApplied > 0 && (
  <div className="summary-discount">
    <div>Original: £{originalAmount.toFixed(2)}</div>
    <div>Discount: -£{discountApplied.toFixed(2)}</div>
  </div>
)}

<div className="summary-total">
  <strong>Final Total: £{totalAmount.toFixed(2)}</strong>
</div>
                        {paymentData.billingAddress && (
                            <div className="summary-shipping">
                                <strong>Shipping To:</strong>
                                <p>{paymentData.billingAddress}</p>
                            </div>
                        )}
                        <div className="summary-back">
                        <Link to="/cart" className="summary-back-link">Not sure? Go back</Link>                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;
