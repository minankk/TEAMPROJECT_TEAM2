import React, { useState } from 'react';
import './OrderTrackingPage.css'; // You'll create this CSS file

const OrderTrackingPage = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setTrackingNumber(event.target.value);
    };

    const handleTrackOrder = async () => {
        // Function to fetch order details will go here
        console.log('Tracking:', trackingNumber);
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
                    <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Shipping Address:</strong> {order.shipping_address}</p>
                    <h4>Order Items:</h4>
                    <ul>
                        {order.items && order.items.map(item => (
                            <li key={item.product_id}>
                                Product ID: {item.product_id}, Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    {order.tracking_updates && order.tracking_updates.length > 0 && (
                        <div className="tracking-updates">
                            <h4>Tracking Updates:</h4>
                            <ul>
                                {order.tracking_updates.map((update, index) => (
                                    <li key={index}>
                                        <strong>Status:</strong> {update.status},
                                        <strong>Date:</strong> {new Date(update.tracking_date).toLocaleString()}
                                        {update.estimated_delivery_date && (
                                            `, <strong>Estimated Delivery:</strong> ${new Date(update.estimated_delivery_date).toLocaleDateString()}`
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrderTrackingPage;