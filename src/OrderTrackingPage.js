import React, { useState } from 'react';
import './OrderTrackingPage.css';

const OrderTrackingPage = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setTrackingNumber(event.target.value);
    };

    const handleTrackOrder = async () => {
        setError('');
        setOrder(null);
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:5001/dashboard/order/track/${trackingNumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setOrder(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="order-tracking-page">
            <h2>Track Your Order</h2>
            <div className="tracking-input">
                <label htmlFor="trackingNumber">Tracking Number:</label>
                <input
                    type="text"
                    id="trackingNumber"
                    value={trackingNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your tracking number"
                />
                <button onClick={handleTrackOrder} disabled={loading}>
                    {loading ? 'Tracking...' : 'Track'}
                </button>
            </div>

            {loading && <p>Loading order information...</p>}

            {error && <p className="error-message">{error}</p>}

            {order && (
                <div className="order-details">
                    <h3>Order Details</h3>
                    <p><strong>Order ID:</strong> {order.order_id}</p>
                    <p><strong>Status:</strong> {order.order_status}</p>
                    <p><strong>Shipping Address:</strong> {order.shipping_address}</p>

                    {order.tracking_status && (
                        <p><strong>Tracking Status:</strong> {order.tracking_status}</p>
                    )}
                    {order.estimated_delivery_date && (
                        <p><strong>Estimated Delivery:</strong> {new Date(order.estimated_delivery_date).toLocaleDateString()}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrderTrackingPage;
