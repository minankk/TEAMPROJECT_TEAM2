import React, { useState, useEffect } from 'react';
import './OrderHistoryPage.css';

const OrderHistoryPage = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            setFetchError('Token not found. Please login again.');
            setLoading(false);
            return;
        }

        const fetchOrderHistory = async () => {
            try {
                const response = await fetch('http://localhost:5001/dashboard/order-history', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("Oops, we haven't got JSON!");
                }

                const data = await response.json();
                setOrderHistory(data);
                setFetchError(null);
            } catch (error) {
                console.error('Error fetching order history:', error);
                setFetchError(error.message);
                setOrderHistory([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, [token]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (fetchError) {
        return <p>{fetchError}</p>;
    }

    return (
        <div className="order-history-container">
            <h2>Order History</h2>
            {orderHistory.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderHistory.map(order => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                                <td>${order.total_amount.toFixed(2)}</td>
                                <td>{order.status}</td>
                                <td>
                                    <ul>
                                        {order.items.map(item => (
                                            <li key={item.product_id}>
                                                <img src={`http://localhost:5001${item.cover_image_url}`} alt={`Product ${item.product_id}`} style={{ width: '50px', marginRight: '10px' }} />
                                                Product ID: {item.product_id}, Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No order history found.</p>
            )}
        </div>
    );
};

export default OrderHistoryPage;