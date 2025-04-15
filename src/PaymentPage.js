import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import "./PaymentPage.css";

function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [paymentData, setPaymentData] = useState({
        name: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        billingAddress: "",
    });

    const [adjustedCartItems, setAdjustedCartItems] = useState([]);
    const [originalTotal, setOriginalTotal] = useState(0);
    const [discountedTotal, setDiscountedTotal] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discountPercent, setDiscountPercent] = useState(0);

    const locationCartItems = location.state?.cartItems || [];

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const calculateTotals = async () => {
            const baseTotal = locationCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            setOriginalTotal(baseTotal);

            try {
                const res = await fetch("http://localhost:5001/membership/status", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch VIP status");

                const data = await res.json();
                const discountRate = data.discount || 0;
                const discount = baseTotal * discountRate;
                const final = baseTotal - discount;

                setDiscountAmount(discount);
                setDiscountedTotal(final);
                setDiscountPercent(discountRate * 100);
                setAdjustedCartItems(locationCartItems);
            } catch (err) {
                console.error("VIP fetch error:", err);
                setDiscountedTotal(baseTotal);
                setAdjustedCartItems(locationCartItems);
            }
        };

        calculateTotals();
    }, [locationCartItems]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("You are not logged in.");
            return;
        }

        const orderData = {
            items: adjustedCartItems.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price
            })),
            shippingAddress: paymentData.billingAddress
        };

        try {
            const response = await fetch("http://localhost:5001/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                const resData = await response.json();
                alert(
                    `Payment successful!\nOrder ID: ${resData.orderId}\nMembership: ${resData.membershipTier}\nFinal Total: £${resData.finalTotalAmount}`
                );
                navigate("/order-success", {
                    state: {
                        trackingNumber: resData.tracking_number,
                        orderSummary: {
                            orderId: resData.orderId,
                            membershipTier: resData.membershipTier,
                            discountApplied: resData.discountApplied,
                            finalTotalAmount: resData.finalTotalAmount
                        }
                    }
                });
            } else {
                const error = await response.json();
                alert(`Payment failed: ${error.message || "Try again."}`);
            }
        } catch (err) {
            console.error("Payment error:", err);
            alert("An error occurred. Try again.");
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
                            {adjustedCartItems.map((item) => (
                                <li key={item.product_id}>
                                    {item.name} x {item.quantity} - £{(item.price * item.quantity).toFixed(2)}
                                </li>
                            ))}
                        </ul>
                        {discountAmount > 0 && (
                            <div className="summary-discount">
                                <div>Original: £{originalTotal.toFixed(2)}</div>
                                <div>Discount ({discountPercent}%): -£{discountAmount.toFixed(2)}</div>
                            </div>
                        )}
                        <div className="summary-total">
                            <strong>Final Total: £{discountedTotal.toFixed(2)}</strong>
                        </div>
                        {paymentData.billingAddress && (
                            <div className="summary-shipping">
                                <strong>Shipping To:</strong>
                                <p>{paymentData.billingAddress}</p>
                            </div>
                        )}
                        <div className="summary-back">
                            <Link to="/cart" className="summary-back-link">Not sure? Go back</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;
