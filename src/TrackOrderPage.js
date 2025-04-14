import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import './OrderTrackingPage.css'; // reuse same styling

function TrackOrderPage() {
    const [searchParams] = useSearchParams();
    const trackingNumber = searchParams.get("trackingNumber");

    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!trackingNumber) return;

        const fetchOrder = async () => {
            setError('');
            setOrder(null);
            setLoading(true);

            try {
                const response = await fetch(`http://localhost:5001/dashboard/order/track/${trackingNumber}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
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

        fetchOrder();
    }, [trackingNumber]);

    return (
        <div className="order-tracking-page">
            <h2>Track Your Order</h2>

            {loading && <p>Loading order information...</p>}
            {error && <p className="error-message">{error}</p>}

            {!trackingNumber && <p>No tracking number provided in URL.</p>}

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
}

export default TrackOrderPage;
