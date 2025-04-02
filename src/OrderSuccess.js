import React from "react";
import "./OrderSuccess.css";
import { Link, useLocation } from 'react-router-dom';

function OrderSuccess() {
    const location = useLocation();
    console.log("OrderSuccess Location State:", location.state); 
    const trackingNumber = location.state?.trackingNumber;

    return (
        <div className="order-success-container">
            <div className="success-message">
                <h1>Payment Successful!</h1>
                <p>Thank you for your order. You will receive a confirmation email shortly.</p>
                {trackingNumber && (
                    <div className="tracking-info">
                        <p>Your order tracking number is:</p>
                        <strong className="tracking-number">{trackingNumber}</strong>
                        <p>You can track your order status <Link to={`/track-order?trackingNumber=${trackingNumber}`}>here</Link>.</p>
                    </div>
                )}
                <Link to="/" className="home-button">Return to Home</Link>
            </div>
        </div>
    );
}

export default OrderSuccess;